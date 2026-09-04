<div align="center">

# 📱 Calculadora de IMC - React Native

[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-57.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  Um aplicativo mobile moderno e intuitivo para cálculo do <b>Índice de Massa Corporal (IMC)</b>, desenvolvido em <b>React Native</b> com <b>Expo</b>, seguindo boas práticas de componentização e arquitetura modular.
</p>

</div>

---

## 📌 Sobre o Projeto

O aplicativo foi desenvolvido com foco em simplicidade, usabilidade e organização de código. Permite ao usuário inserir seu peso e altura para calcular o IMC instantaneamente, recebendo a classificação correspondente de acordo com as diretrizes da Organização Mundial da Saúde (OMS).

Este projeto faz parte do portfólio de desenvolvimento mobile em **Engenharia de Software**, demonstrando conceitos essenciais como gerenciamento de estados (`useState`), validação e sanitização de dados, comunicação entre componentes via *props* e estilização nativa com `StyleSheet`.

---

## ✨ Funcionalidades

- [x] **Cálculo Preciso do IMC:** Cálculo baseado na fórmula padrão $\text{IMC} = \frac{\text{peso}}{\text{altura}^2}$.
- [x] **Tratamento Inteligente de Entradas:**
  - Suporta altura tanto em centímetros (ex: `175`) quanto em metros (ex: `1.75`).
  - Aceita separador decimal por vírgula ou ponto (ex: `70,5` ou `70.5`).
- [x] **Classificação Automática com Feedback Visual:**
  - Abaixo do peso $(< 18.5)$
  - Peso normal $(18.5 - 24.9)$
  - Sobrepeso $(25.0 - 29.9)$
  - Obesidade $(\ge 30.0)$
- [x] **Validação de Formulário:** Alertas claros caso algum campo esteja vazio ou com valores inválidos.
- [x] **Tema Escuro (Dark Mode):** Alternância dinâmica entre Modo Claro e Escuro com detecção inicial do tema do sistema operacional (`useColorScheme`).
- [x] **Experiência do Usuário (UX):**
  - Ocultamento automático do teclado ao tocar fora dos campos (`TouchableWithoutFeedback`).
  - Botão dinâmico para calcular ou resetar os dados.

---

## 🏗️ Arquitetura e Componentização

O projeto adota uma estrutura modular e desacoplada, separando responsabilidades em componentes reutilizáveis:

```text
projeto-01/
├── App.js                   # Container principal (SafeAreaView e StatusBar)
└── src/
    └── components/
        ├── Title/
        │   └── index.js     # Componente de cabeçalho da aplicação
        └── Form/
            ├── index.js     # Formulário, inputs, validações e cálculo
            ├── ResultImc/
            │   └── index.js # Exibição do valor calculado e badge de classificação
            └── TableImc/
                └── index.js # Tabela de referência com destaque dinâmico da faixa de IMC
```

### 🧩 Responsabilidades dos Componentes

| Componente | Responsabilidade |
| :--- | :--- |
| **`Title`** | Renderiza o título e identidade visual da aplicação. |
| **`Form`** | Gerencia os estados (`weight`, `height`, `imc`, `classification`), valida as entradas e dispara o cálculo. |
| **`ResultImc`** | Exibe via *props* o resultado numérico e o badge colorido com o diagnóstico. |
| **`TableImc`** | Exibe as faixas da OMS e destaca automaticamente a faixa do usuário quando calculado. |
| **`App`** | Ponto de entrada, integrando o tema (Dark/Light), barra de status e layout geral. |

---

## 📊 Tabela de Referência de IMC

| Faixa de IMC | Classificação |
| :---: | :---: |
| Menor que 18,5 | Abaixo do peso |
| 18,5 a 24,9 | Peso normal |
| 25,0 a 29,9 | Sobrepeso |
| 30,0 a 34,9 | Obesidade Grau I |
| Maior que 35,0 | Obesidade Grau II / III |

---

## 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)** — Framework de desenvolvimento mobile cross-platform.
- **[Expo](https://expo.dev/)** — Plataforma e conjunto de ferramentas para ecossistema React Native.
- **[React Hooks](https://react.dev/)** — Gerenciamento de ciclo de vida e estado com `useState`.
- **JavaScript (ES6+)** — Sintaxe moderna.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão LTS recomendada)
- Gerenciador de pacotes **npm** ou **yarn**
- Aplicativo **Expo Go** instalado no seu celular (Android ou iOS) ou um emulador configurado.

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GVPortes/Mobile-IMC-Calculator-App.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd projeto-01
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
   ```

5. **Execute no dispositivo:**
   - Abra o app **Expo Go** no celular e escaneie o **QR Code** exibido no terminal.
   - Ou pressione `a` para abrir no emulador Android ou `i` para o simulador iOS.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<div align="center">
  Feito com 💙 por <b>Gabriel Portes</b>
</div>
