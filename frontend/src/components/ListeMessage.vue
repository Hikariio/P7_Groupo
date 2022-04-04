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
        tableauMessage[2].classList.add('conteneur_image')
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

      tableauMessage[16].classList.add('fa-thumbs-up')
      tableauMessage[16].classList.add('far') // like vide (icon)
      tableauMessage[17].classList.add("far")
      tableauMessage[17].classList.add("fa-thumbs-down")  // dislike vide
      tableauMessage[18].classList.add("fa-thumbs-up")
      tableauMessage[18].classList.add("fas") // like rempli
      tableauMessage[19].classList.add("fa-thumbs-down")
      tableauMessage[19].classList.add("fas")  // dislike rempli

      tableauMessage[14].innerText = donnee['like']
      tableauMessage[15].innerText = donnee['dislike']   

      tableauMessage[12].onclick = this.sendAvis
      tableauMessage[13].onclick = this.sendAvis

      
      tableauMessage[0].id = donnee['id'];
      tableauMessage[16].classList.add('like_vide')
      tableauMessage[18].classList.add('like_plein')

      tableauMessage[0].classList.add('conteneur_message')
      tableauMessage[1].classList.add('conteneur_texte')
      tableauMessage[3].classList.add('conteneur_contenu')
      tableauMessage[4].classList.add('conteneur_avis')



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
      let idMess;
      let avis = 0;
      if(e.target.tagName.toLowerCase() === "div"){
        idMess = e.target.parentNode.parentNode.id;
        avis = e.target;
      } else if(e.target.tagName.toLowerCase() === "p"){
         idMess = e.target.parentNode.parentNode.parentNode.id;
         avis = e.target.parentNode;
      }else{
        idMess = e.target.parentNode.parentNode.parentNode.id;
        avis = e.target.parentNode;
      }
      if(avis.className === "likes"){
        avis = 1;
      }else{
        avis = 2;
      }
      console.log(avis,idMess)
      fetch("http://localhost:3000/api/message/like/",{
        method:'POST' ,
        headers:{
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
        body: JSON.stringify({message_principale: idMess, author: this.user, avis: avis})
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
    .conteneur_message{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 30px auto;
        border: 1px solid rgb(129, 23, 64);
        border-radius: 15px;
        color: white;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        background-color: rgb(102, 101, 101);
    }
    
    /* Titre + bouton suppr */
    .conteneur_texte{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(129, 23, 64);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .conteneur_texte p{
        width: 20%;
        margin-left: 10px;
    }
    .conteneur_texte input{
        position: absolute;
        border-radius: 15px;
        height: 30px;
        width: 30px;
        margin: auto 10px;
        background-color: #5f5d5d;
        border: 1px solid rgb(165, 10, 69);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        color: rgb(184, 168, 174);
        top: 2%;
        right: 1%;
    }
    .conteneur_texte input:hover{
        font-weight: bold;
        color: rgb(168, 24, 24);
        border-color: red;
    }
    /* IMAGE GESTION */
    .conteneur_image{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-bottom: 1px solid rgb(129, 23, 64);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .conteneur_image img{
        min-width: 100%;
        min-height: 100%;
    }
    /* Avis */
    .conteneur_avis {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 35px;   
    }
    .conteneur_avis div{
        cursor: pointer;
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgb(129, 23, 64);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
    .dislikes{
        position: relative;
    }
    .dislikes:hover{
        color: rgb(121, 19, 19);
    }
    .likes{
        position: relative;
    }
    .likes:hover{
        color: rgb(114, 161, 59);
    }
    .conteneur_avis svg{
        position: absolute;
    }
    .fa-thumbs-up{
        right: 55%;
    }
    .fa-thumbs-down{
        right: 55%;
    }
    .invisible{
        opacity: 0;
    }
    /* Texte */
    .conteneur_contenu{
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid rgb(129, 23, 64);
    }
    .conteneur_contenu p {
        margin-left: 5px;
    }
    /*-----------------------------------------------
                    Commentaire 
    ------------------------------------------------*/
    .commentaire{
        border: 1px solid rgb(129, 23, 64);
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
        border-bottom: 1px solid rgb(129, 23, 64);
        width: 100%;
        display: flex;
    }
    .commentaire div p{
        margin: 10px 0;
    }
    /*-----------------------------------
                    SAISIE
    -----------------------------------*/
    .conteneur_saisie{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        height: 40px;
    }
    .zoneSaisie_commentaire{
        border: 1px solid rgb(129, 23, 64);
        height: 95%;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        width: 82%;
        padding-left: 10px;
    }
    .btn_commentaire{
        color: rgb(129, 23, 64);
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        height: 100%;
        border: 1px solid rgb(129, 23, 64);
        background-color: #555454;
        font-size: 1.5em;
    }
    .btn_commentaire:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        font-weight: bold;
    }
    /*=============================================
                        TABLET
    =============================================*/
    @media only screen and (min-width : 768px) {
          #acceuilMessage{
            max-width: 850px;
            margin: 0 auto;
        }
    }
    /*=============================================
                        DESKTOP
    =============================================*/
    @media only screen and (min-width : 1224px) {
    }
</style>