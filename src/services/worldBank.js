const BASE_URL = 'https://api.worldbank.org/v2/country/BRA/indicator';
const YEAR = 2022;

const INDICATORS = {
  feminino: { overweight: 'SH.STA.OWAD.FE.ZS', obesity: 'SH.STA.OB18.FE.ZS' },
  masculino: { overweight: 'SH.STA.OWAD.MA.ZS', obesity: 'SH.STA.OB18.MA.ZS' },
};

async function fetchPercentage(indicator) {
  const url = `${BASE_URL}/${indicator}?format=json&source=14&date=${YEAR}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar ${indicator}`);
  }

  // A API responde no formato [paginação, registros]
  const [, records] = await response.json();
  const value = records?.[0]?.value;

  if (typeof value !== 'number') {
    throw new Error(`Sem dados para ${indicator}`);
  }

  return value;
}

export async function getPopulationBySex(sex) {
  const { overweight, obesity } = INDICATORS[sex];

  const [aboveNormal, obese] = await Promise.all([
    fetchPercentage(overweight),
    fetchPercentage(obesity),
  ]);

  // O indicador de sobrepeso é IMC >= 25, então os obesos já estão dentro dele
  return {
    normal: 100 - aboveNormal,
    overweight: aboveNormal - obese,
    obese,
  };
}
