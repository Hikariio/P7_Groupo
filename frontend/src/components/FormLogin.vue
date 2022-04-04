<template>
    <div class="conteneur_form">
        <div class="conteneur_input">
            <p>Email :</p>
            <input type="email" required id="email" v-model="email">
        </div>
        <div class="conteneur_input">
            <p>Mot de passe :</p>
            <input type="password" required id="password" v-model="password">
        </div>
        <button @click="envoieFormulaire">Connection</button>
        <button @click="retourHome">Retour</button>
    </div>
</template>

<script>
export default ({
    name: 'FormLogin',
    data() {
        return {
        email: null,
        password: null,
        errors: []
        }
    },
    methods: {
        checkForm: function(){
            if(this.email && this.password){
                return true;
            }
            this.errors = [];
            if(!this.email){
                this.errors.push('Email requis');
            }
            if(!this.password){
                this.errors.push('Mot de passe requis');
            }
            return false;
        },
        envoieFormulaire: function(){
            if(this.checkForm()){
                fetch('http://localhost:3000/api/auth/login', { 
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: this.email, password: this.password})
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                })
                .then(value => {
                    localStorage.setItem('token', value.token);
                    localStorage.setItem('user', value.userId);
                    localStorage.setItem('role', value.role);
                    // this.$router.push({ path: '/Main'})
                })
                .catch()
            } else{
                alert(this.errors[0])
            }
        },
        // goMainPage: function(){
        //     this.$router.push({ path: '/Main'})
        // },
        // retourHome: function(){
        //     this.$router.push({ path: '/'})
        // }
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
    border: 1px solid orange;
    background-color: #555454;
    color: orange;
    width: 220px;
    height: 60px;
    border-radius: 15px;
    margin: 60px auto 0px auto;
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