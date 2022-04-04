<template>
    <div class="conteneur_form">
        <div class="conteneur_input">
            <p>Email :</p>
            <input type="email" required v-model="email">
        </div>

        <div class="conteneur_input">
            <p>Nom :</p>
            <input type="text" required v-model="name">
        </div>

        <div class="conteneur_input">
            <p>Mot de passe :</p>
            <input type="password" v-model="password" required>
        </div>
        
        <div class="conteneur_input">
            <p>Confirmer le mot de passe :</p>
            <input type="password" required v-model="passwordChk">
        </div>
        <button @click="checkForm">Connection</button>
        <button @click="retourHome">Retour</button>
    </div>
</template>

<script>
export default ({
    name: 'FormRegister',
    data() {
        return{
            email: null,
            password: null,
            passwordChk: null,
            name: null
        }
    },
    methods: {
        checkForm: async function(){
            if(this.email && this.password && this.passwordChk && this.name && (this.password == this.passwordChk)){
                await this.sendForm();
            }
            this.errors = [];
            if(!this.email){
                this.errors.push('Email requis');
            }
            if(!this.password){
                this.errors.push('Mot de passe requis');
            }
            if(!this.name){
                this.errors.push('Nom requis');
            }
            if(this.passwordChk != this.password){
                this.errors.push('Les mots de passe ne correspond pas');
            }
            this.$router.push({ path: '/login'})   
        },
        sendForm: function(){
            fetch('http://localhost:3000/api/auth/signup',{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: this.email, name: this.name, password: this.password})
            })
            .then(donnee => console.log(donnee))
        },
        retourHome: function(){
            this.$router.push({ path: '/'})
        }
    }
})
</script>

<style scoped>
.conteneur_form{
    margin: 0 auto;
    width: 90%;
    font-size: 1.3em;
    display: flex;
    flex-direction: column;
    color: white;
}
.conteneur_input {
    display: flex;
    flex-direction: column;
}
p{
    margin: 10px 0;
}
input{
    height: 25px;
    border-radius: 15px;
    padding-left: 10px;
}
button{
    border: 1px solid rgb(129, 23, 64);
    background-color: #555454;
    color: rgb(129, 23, 64);
    width: 220px;
    height: 60px;
    border-radius: 15px;
    margin: 30px auto 0px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
}
button:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-weight: bold;
}
</style>
