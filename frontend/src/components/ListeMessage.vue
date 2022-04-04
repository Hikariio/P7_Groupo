<template>
  <div id="acceuilMessage"></div>
</template>

<script>

export default( {
  name: "ListeMessage",
  data() {
    return {
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
      role: localStorage.getItem("role"),
      value: null,
    };
  },
  methods: {
    recupDonnee: function () {
      fetch("http://localhost:3000/api/message/", {
        method: "GET",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((value) => {
          this.affichageMessage(value);
        })
        .catch();
    },

    affichageMessage: function (donnee) {
      for (let i = 0; i < donnee.length; i++) {
        this.creationMessage(donnee[i]);
      }
    },

    creationMessage: function (donnee) {
      let tableauMessage = [];

      tableauMessage[0] = document.createElement("div"); // Div principale parent
      tableauMessage[1] = document.createElement("div"); // Nom de la personne qui poste et qui contient btn pour admin

      if (donnee["img_url"] != null) {
        tableauMessage[2] = document.createElement("div");
        tableauMessage[0].appendChild(tableauMessage[2]);
        tableauMessage[11] = document.createElement("img");
        tableauMessage[2].appendChild(tableauMessage[11]);
        tableauMessage[11].setAttribute("src", donnee["img_url"]);
      }
      tableauMessage[3] = document.createElement("div"); // text
      tableauMessage[4] = document.createElement("div"); // like/ dislike
      tableauMessage[5] = document.createElement("div"); // commentaire

      tableauMessage[0].appendChild(tableauMessage[1]);
      tableauMessage[0].appendChild(tableauMessage[3]);
      tableauMessage[0].appendChild(tableauMessage[4]);
      tableauMessage[0].appendChild(tableauMessage[5]);

      tableauMessage[6] = document.createElement("p"); // Nom
      tableauMessage[7] = document.createElement("p"); // text
      tableauMessage[8] = document.createElement("i"); // like
      tableauMessage[9] = document.createElement("i"); // dislike

      tableauMessage[1].appendChild(tableauMessage[6]);
      tableauMessage[3].appendChild(tableauMessage[7]);
      tableauMessage[7].innerText = donnee["contenu"];

      tableauMessage[4].appendChild(tableauMessage[8]);
      tableauMessage[4].appendChild(tableauMessage[9]);

      fetch("http://localhost:3000/api/auth/" + donnee["author"], {
        method: "GET",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
      })
      .then(res =>
          {if(res.ok){
            return res.json();
          }
          }).then(donnee => {
            console.log(donnee[0]);
            tableauMessage[6].innerText = donnee[0]["name"] ;
          })

      if (
        donnee["author"] == localStorage.getItem("user") ||
        localStorage.getItem('role') == "admin"
      ) {
        tableauMessage[10] = document.createElement("input");
        tableauMessage[1].appendChild(tableauMessage[10]);
        tableauMessage[10].setAttribute("type", "button");
        tableauMessage[10].value = "X";
        tableauMessage[10].onclick = this.deleteMessage;
      }
        

      tableauMessage[11] = document.createElement("p");
      tableauMessage[5].appendChild(tableauMessage[11]);
      this.recupCom(donnee['id'],tableauMessage[5]);

      tableauMessage[12] = document.createElement("div") // parent btn like
      tableauMessage[13] = document.createElement("div") // parent btn dislike
      tableauMessage[14] = document.createElement("p") // nbm like
      tableauMessage[15] = document.createElement("p") // nbm dislike

      tableauMessage[16] = document.createElement("i") // like vide (icon)
      tableauMessage[17] = document.createElement("i") // dislike vide
      tableauMessage[18] = document.createElement("i") // like rempli
      tableauMessage[19] = document.createElement("i") // dislike rempli

      tableauMessage[12].appendChild(tableauMessage[14]);  // lien like
      tableauMessage[12].appendChild(tableauMessage[16]);
      tableauMessage[12].appendChild(tableauMessage[18]);

      tableauMessage[13].appendChild(tableauMessage[15]);  // lien dislike
      tableauMessage[13].appendChild(tableauMessage[17]);
      tableauMessage[13].appendChild(tableauMessage[19]);

      tableauMessage[4].appendChild(tableauMessage[12]);
      tableauMessage[4].appendChild(tableauMessage[13]);

      tableauMessage[12].classList.add('likes');
      tableauMessage[13].classList.add('dislikes');

      
      tableauMessage[0].id = donnee['id'];





      document.getElementById('acceuilMessage').appendChild(tableauMessage[0]);
    },
    recupCom: function(id, parentCom){
      fetch("http://localhost:3000/api/commentaire/" + id, {
        method: "GET",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
      })
      .then(res => {
        if(res.ok){
          return res.json();
        }
      })
      .then(allCom => {
        this.affichageCom(allCom,parentCom);
      })
      .catch(error => {error});
    },
    affichageCom: function(donnee,parentCom){
      for(let i=0; i<donnee.length; i++){
        this.createCom(donnee[i],parentCom);
      }
      let saisie = this.zoneSaisie()
      parentCom.appendChild(saisie);
    },
    createCom: function(commentaire,parentCom){
      let tabCommentaire = [];
            tabCommentaire[0] = document.createElement("div"); // Div englobant le commentaire
            tabCommentaire[1] = document.createElement("div"); // Div contenant le nom ainsi que le bouton pour le supprimer
            tabCommentaire[2] = document.createElement("p"); // Contient le nom de l'auteur
            tabCommentaire[3] = document.createElement("p"); // Contient le contenu du commentaire
            tabCommentaire[0].appendChild(tabCommentaire[1]);
            tabCommentaire[0].appendChild(tabCommentaire[3]);
            tabCommentaire[1].appendChild(tabCommentaire[2]);
            tabCommentaire[0].classList.add("commentaire");
            fetch('http://localhost:3000/api/auth/' + commentaire["author"], { 
                method: 'GET',
                headers:{
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            })
            .then(value => {
                tabCommentaire[2].innerText = value[0]["name"];
            })
            .catch()
            tabCommentaire[3].innerText = commentaire["contenu"];
            console.log(tabCommentaire[0]);
            parentCom.appendChild(tabCommentaire[0]);
    },
    zoneSaisie: function(){
      let tabSaisie = [];
            tabSaisie[0] = document.createElement("div"); // Div englobant le tout
            tabSaisie[1] = document.createElement("input"); // Zone de saisie
            tabSaisie[2] = document.createElement("input"); // Bouton d'envoie
            tabSaisie[0].appendChild(tabSaisie[1]);
            tabSaisie[0].appendChild(tabSaisie[2]);
            tabSaisie[1].setAttribute("placeholder", "Saisir un commentaire");
            tabSaisie[2].setAttribute("type", "button");
            tabSaisie[0].classList.add("conteneur_saisie");
            tabSaisie[1].classList.add("zoneSaisie_commentaire");
            tabSaisie[2].classList.add("btn_commentaire");
            tabSaisie[2].value = "+";
            tabSaisie[2].onclick = this.envoiCommentaire;
            return tabSaisie[0];
    },
    envoiCommentaire: function(e){
      let mess = e.target.parentNode.parentNode.parentNode.id;
      let contenu = e.target.previousSibling.value;
      let donnee = {author: this.user, msgId: mess, contenu: contenu};
      fetch("http://localhost:3000/api/commentaire/",{
        method:'POST' ,
        headers:{
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
        body: JSON.stringify(donnee)
      }).then(() => {
        this.refPage();
      })
      .catch(error => {error});
    },
    sendAvis: function(e){
      let idMessage;
      let avis = 0;
      if(e.target.tagName.toLowerCase() === "div"){
        idMessage = e.target.parentNode.parentNode.id;
        avis = e.target;
      } else if(e.target.tagName.toLowerCase() === "p"){
         idMessage = e.target.parentNode.parentNode.parentNode.id;
         avis = e.target.parentNode;
      }else{
        idMessage = e.target.parentNode.parentNode.parentNode.parentNode.id;
        avis = e.target.parentNode.parentNode;
      }
      if(avis.className === "likes"){
        avis = 1;
      }else{
        avis = 2;
      }
      fetch("http://localhost:3000/api/message/like/",{
        method:'POST' ,
        headers:{
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
        body: JSON.stringify({message_principale: idMessage, author: this.user, avis: avis})
    }).then(() =>{
      this.refPage();
    }).catch(error => {error});
    },
    deleteMessage: function(e){
      let idMessage = e.target.parentNode.parentNode.id;
      fetch("http://localhost:3000/api/message/" + idMessage, {
        method: 'DELETE',
        headers:{
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        }
      }).then(() => {
        this.refPage();
      }).catch(error => alert (error))
    },
    refPage: function(){
      location.reload();
    }
  },
  beforeMount() {
    this.recupDonnee();
  },
});
</script>


<style>
    .commentaire{
        border: 1px solid orange;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        border-radius: 5px;
        width: 90%;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
    }
    .commentaire div{
        border-bottom: 1px solid orange;
        width: 100%;
        display: flex;
    }
    .commentaire div p{
        margin: 10px 0;
    }
</style>