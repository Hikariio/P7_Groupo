<template>
    <div class="liste_message">
    
    </div>
</template>

<script>
export default ({
    name: 'ListeMessage',
    data(){
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('user'),
            role: localStorage.getItem("role"),
            value: null
        }
    },
    methods: {
        recuperationDonnee: function(){
            fetch('http://localhost:3000/api/message/', { 
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
                this.affichageMessage(value);
            })
            .catch()
        },
        affichageMessage: function(donnee){
            for(let i=0; i < donnee.length; i++){
                this.creationMessage(donnee[i]);
            }
        },
        creationMessage: async function(donnee){
            let tabMessage = [];
            tabMessage[0] = document.createElement('div'); // Div Principale
            tabMessage[1] = document.createElement('div'); // Div Nom / supprimer le message
            tabMessage[2] = document.createElement('div'); // div Texte
            tabMessage[4] = document.createElement('div'); // div like 
            tabMessage[5] = document.createElement('div'); // Div commentaire
            tabMessage[6] = document.createElement('p'); // Conteneur nom
            tabMessage[1].appendChild(tabMessage[6]);
            tabMessage[0].appendChild(tabMessage[1]);
            if(donnee["author"] == this.userId || this.role == "admin"){
                tabMessage[7] = document.createElement('input'); // button
                tabMessage[1].appendChild(tabMessage[7]);
                tabMessage[7].classList.add("btn_suppr");
                tabMessage[7].setAttribute('type', 'button');
                tabMessage[7].value = 'X';
                tabMessage[7].onclick = this.deleteMessage;
            }
            tabMessage[8] = document.createElement('p'); // Texte du message
            if(donnee["img_url"] != null){
                tabMessage[3] = document.createElement('div'); // div image
                tabMessage[3].classList.add("conteneur_image");
                tabMessage[0].appendChild(tabMessage[3]);
                tabMessage[9] = document.createElement('img'); // Image du message
                tabMessage[3].appendChild(tabMessage[9]);
                tabMessage[9].setAttribute("src", donnee["img_url"]);
            }
            tabMessage[10] = document.createElement('div'); // Bouton Like
            tabMessage[11] = document.createElement('div'); // Bouton dislike
            tabMessage[14] = document.createElement('p'); // Nombre Like
            tabMessage[15] = document.createElement('p'); // Nombre Dislike
            tabMessage[16] = document.createElement('i'); // Icone Like
            tabMessage[17] = document.createElement('i'); // Icone Dislike
            tabMessage[18] = document.createElement('i'); // Icone like remplie
            tabMessage[19] = document.createElement('i'); // Icone Dislike remplie
            tabMessage[20] = document.createElement('p'); // Text 'Commentaire'
            
            tabMessage[0].appendChild(tabMessage[2]);
            tabMessage[0].appendChild(tabMessage[4]);
            tabMessage[0].appendChild(tabMessage[5]);
            
            tabMessage[2].appendChild(tabMessage[8]);
            // Like / Dislike
            tabMessage[4].appendChild(tabMessage[10]);
            tabMessage[4].appendChild(tabMessage[11]);
            
            tabMessage[10].appendChild(tabMessage[16]);
            tabMessage[10].appendChild(tabMessage[18]);
            tabMessage[10].appendChild(tabMessage[14]);
            tabMessage[11].appendChild(tabMessage[17]);
            tabMessage[11].appendChild(tabMessage[19]);
            tabMessage[11].appendChild(tabMessage[15]);
            // Récupération et affichage du nom de l'auteur
            fetch('http://localhost:3000/api/auth/' + donnee["author"], { 
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
                tabMessage[6].innerText = value[0]["name"];               
            })
            .catch()
            
            // Ajout du texte du message
            tabMessage[8].innerText = donnee["contenu"];
            // Gestion Like / Dislike
            tabMessage[14].innerText = donnee["like"];
            tabMessage[15].innerText = donnee["dislike"];
            tabMessage[20].classList.add("titre_commentaire")
            tabMessage[20].innerText = "↓    Commentaires    ↓ ";
            
            tabMessage[0].classList.add("conteneur_message");
            tabMessage[0].id = donnee["id"];
            tabMessage[1].classList.add("conteneur_texte");
            tabMessage[2].classList.add("conteneur_contenu");
            tabMessage[4].classList.add("conteneur_avis");
            tabMessage[5].classList.add('conteneur_commentaire');
            tabMessage[10].classList.add("likes");
            tabMessage[11].classList.add("dislikes");
            
            tabMessage[16].classList.add("fa-thumbs-up");
            tabMessage[16].classList.add("far");
            tabMessage[16].classList.add("fa-thumbs-up");
            tabMessage[17].classList.add("far");
            tabMessage[17].classList.add("fa-thumbs-down");
            tabMessage[18].classList.add("fas");
            tabMessage[18].classList.add("fa-thumbs-up");
            tabMessage[18].classList.add("invisible");
            tabMessage[19].classList.add("fas");
            tabMessage[19].classList.add("fa-thumbs-down");
            tabMessage[19].classList.add("invisible");
            tabMessage[10].onclick = this.envoiAvis;
            tabMessage[11].onclick = this.envoiAvis;
            /*-----------------------------------------------------
                                COMMENTAIRE
            -----------------------------------------------------*/
            tabMessage[5].appendChild(tabMessage[20]);
            this.recuperationCommentaire(donnee["id"], tabMessage[5])
            let conteneurMessage = document.getElementsByClassName("liste_message");
            conteneurMessage[0].appendChild(tabMessage[0]);
        },
        recuperationCommentaire: function(id, eltParent){
            fetch('http://localhost:3000/api/commentaire/' + id, { 
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
                this.affichageCommenaire(value, eltParent);
            })
            .catch(error => {error})
            
        },
        affichageCommenaire: function(donnee, eltParent){
            for(let i=0; i < donnee.length; i++){
                this.creationCommentaire(donnee[i], eltParent);
            }
            let saisie = this.zoneSaisie()
            eltParent.appendChild(saisie);
        },
        creationCommentaire: function(commentaire, elementParent){
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
            elementParent.appendChild(tabCommentaire[0]);
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
            let msg = e.target.parentNode.parentNode.parentNode.id;
            let contenu = e.target.previousSibling.value;
            let donnee = {author: this.userId, msgId: msg, contenu: contenu};
            fetch('http://localhost:3000/api/commentaire/', { 
                method: 'POST',
                headers:{
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify(donnee)
            })
            .then(() =>{
                this.refreshPage();
            })
            .catch(error => alert(error))
        },
        refreshPage: function(){
            location.reload();
        },
        envoiAvis: function(e){
            let idMessage;
            let avis = 0;
            if(e.target.tagName.toLowerCase() === "div"){
                idMessage = e.target.parentNode.parentNode.id;
                avis = e.target;
            } else if(e.target.tagName.toLowerCase() === "p") {
                idMessage = e.target.parentNode.parentNode.parentNode.id;
                avis = e.target.parentNode;
            } else{
                idMessage = e.target.parentNode.parentNode.parentNode.parentNode.id;
                avis = e.target.parentNode.parentNode;
            }
            if(avis.className === "likes"){
                avis = 1;
            }else{
                avis = 2;
            }
            fetch('http://localhost:3000/api/message/like/', { 
                method: 'POST',
                headers:{
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify({message_principale: idMessage, author: this.userId, avis: avis})
            })
            .then(() =>{
                this.refreshPage();
            })
            .catch(error => alert(error))
            
        },
        deleteMessage: function(e){
            let idMessage = e.target.parentNode.parentNode.id;
            fetch('http://localhost:3000/api/message/'+ idMessage, { 
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
            })
            .then(() =>{
                    this.refreshPage();
            })
            .catch(error => alert(error))
        }
    },
    beforeMount(){
        this.recuperationDonnee();
    }
})
</script>

<style>
    .conteneur_message{
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 30px auto;
        border: 1px solid orange;
        border-radius: 15px;
        color: white;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        background-color: rgb(102, 101, 101);
    }
    
    /* Titre + bouton suppr */
    .conteneur_texte{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid orange;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .conteneur_texte p{
        width: 20%;
        margin-left: 10px;
    }
    .conteneur_texte input{
        border-radius: 15px;
        height: 30px;
        width: 30px;
        margin: auto 10px;
        background-color: #555454;
        border: 1px solid orange;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        color: orange;
    }
    .conteneur_texte input:hover{
        font-weight: bold;
        color: red;
        border-color: red;
    }
    /* IMAGE GESTION */
    .conteneur_image{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-bottom: 1px solid orange;
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
        border: 1px solid orange;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
    .dislikes{
        position: relative;
    }
    .dislikes:hover{
        color: red;
    }
    .likes{
        position: relative;
    }
    .likes:hover{
        color: yellowgreen;
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
        border-bottom: 1px solid orange;
    }
    .conteneur_contenu p {
        margin-left: 5px;
    }
    /*-----------------------------------------------
                    Commentaire 
    ------------------------------------------------*/
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
        border: 1px solid orange;
        height: 95%;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        width: 82%;
        padding-left: 10px;
    }
    .btn_commentaire{
        color: orange;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        height: 100%;
        border: 1px solid orange;
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
        .liste_message{
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