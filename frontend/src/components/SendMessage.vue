<template>
    <div class="conteneur_sendMessage">
        <div>
            <p>Poster un message</p>
        </div>

        <div class="conteneur_texte_send">
            <textarea required v-model="contenu"></textarea>
        </div>

        <div class="conteneur_envoie">
            <p>Ajouter une image</p>
            <div class="conteneur_sendFile">
                <input type="file" @change='onFileSelected' accept="image/*">
                <button @click='envoieForm' class="btn">Envoyé</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default({
    name: 'SendMessage',
    data(){
        return{
            contenu: null,
            file: null,
        }
    },
    methods: {
        onFileSelected: function(event){
            this.file = event.target.files[0]
        },
        chkForm: function(){
            if(this.contenu){
                return true;
            }
            return false;
        },
        envoieForm: function(){
            if(this.chkForm()){
                let donnee;
                let token =  localStorage.getItem('token');
                console.log(this.file);
                if(this.file){
                    donnee = {contenu: this.contenu, file: this.file, author: localStorage.getItem('user')};
                    let fd = new FormData();
                    fd.append('image', this.file);
                    fd.append('donnee', JSON.stringify(donnee));
                    console.log(fd);
                    fetch('http://localhost:3000/api/message/', { 
                        method: 'POST',
                        headers:{
                            'Accept': 'multipart/form-data', 
                            'Authorization': 'Bearer ' + token
                        },
                        body: fd
                    })
                    .then(() =>{
                        location.reload();
                    })
                    .catch(error => alert(error))
                } else {
                    donnee = {contenu: this.contenu, author: localStorage.getItem('user')};
                    let fd = new FormData();
                    fd.append('donnee', JSON.stringify(donnee)); 
                    fd.append('image', '');
                    console.log(donnee);
                    fetch('http://localhost:3000/api/message/', { 
                        method: 'POST',
                        headers:{
                            'Accept': 'multipart/form-data', 
                            'Authorization': 'Bearer ' + token
                        },
                        body: fd,
                    })
                    .then(() =>{
                        location.reload();
                    })
                    .catch(error => alert(error))
                }
            } else {
                alert("Veuillez remplir la zone texte");
            }
        }
    }
})
</script>

<style>
.conteneur_sendMessage{
    width: 90%;
    margin: 10px auto 0 auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    border: 1px solid rgb(105, 4, 26);
    color: white;
    font-weight: bold;
    background-color: rgb(65, 63, 63);
}
.conteneur_texte_send{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(92, 3, 29);
    height: 140px;
}
textarea{
    width: 90%;
    height: 100px;
    font-size: 1.5em;
    resize: none;
    border-radius: 15px;
    padding: 10px;
}
.conteneur_envoie{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 5px;
    align-items: center;
    border-top: 1px solid rgb(119, 7, 50);
}
.conteneur_envoie:last-child{
    justify-self: flex-end;
}
.conteneur_sendFile{
    display: flex;
    flex-direction: column;
}
.btn{
    background-color: #aaa0a0;
    border: 1px solid rgb(99, 5, 36);
    width: 45%;
    margin: 20px auto;
    height: 35px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: rgb(155, 11, 35);
    cursor: pointer;
}
.btn:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-weight: bold;
}
/*=============================================
                    TABLET
=============================================*/
@media only screen and (min-width : 768px) {
    .conteneur_sendMessage{
        max-width: 750px;
        margin: 30px auto 10px auto;
    }
}
/*=============================================
                    DESKTOP
=============================================*/
@media only screen and (min-width : 1224px) {
}
</style>