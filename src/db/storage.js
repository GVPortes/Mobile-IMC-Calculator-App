import firebase from './firebase';

export default class Storage {
  listContents(onContentUpdate) {
    return firebase
      .firestore()
      .collection('imc')
      .onSnapshot((querySnapshot) => {
        let contents = [];
        querySnapshot.forEach((doc) => {
          const { resultado, data } = doc.data();
          let id = doc.id;
          contents.push({ id, resultado, data });
        });
        onContentUpdate(contents);
      });
  }

  edit(index, content) {
    const registro = {
      resultado: content.resultado !== undefined ? content.resultado : "",
      data: content.data || new Date().toLocaleString('pt-BR'),
    };
    firebase.firestore().collection('imc').doc(index).set(registro);
  }

  add(content) {
    const registro = {
      resultado: content.resultado !== undefined ? content.resultado : "",
      data: content.data || new Date().toLocaleString('pt-BR'),
    };
    return firebase
      .firestore()
      .collection('imc')
      .add(registro)
      .then((docRef) => {
        console.log('IMC salvo no banco com sucesso! ID:', docRef?.id);
      })
      .catch((error) => {
        console.log('Erro ao salvar IMC no banco:', error);
      });
  }

  deleteContent(index) {
    firebase
      .firestore()
      .collection('imc')
      .doc(index)
      .delete()
      .then(() => {
        console.log('Apagado com sucesso');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
