<template>
    <div>
       <Header/>
       <div>
            <button @click="suppr">supprimer</button>
            <button @click="returnMain">Non</button>
       </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default ({
    components: {
        Header,
    },
    data(){
        return{
            userId: localStorage.getItem('user'),
            token: localStorage.getItem('token'),
        }
    },
    methods:{
        suppr: function(){
            fetch("http://localhost:3000/api/auth/" + this.userId, {
                method: 'DELETE',
                headers:{
                    'Accept': "application/json",
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + this.token,
                }
            } ).then(() => {
                 this.$router.push({ path: '/'})
            }).catch(error => {error});
        },
        returnMain: function(){
            this.$router.push({ path: '/Main'})
        }
    }
})
</script>

<style scoped>
p{
    color: white
}
button{
    border: 1px solid rgb(129, 23, 64);
    background-color: #555454;
    color: rgb(129, 23, 64);
    width: 75px;
    height: 50px;
    border-radius: 15px;
    margin: 0 30px;
}
/*=============================================
                    TABLET
=============================================*/
@media only screen and (min-width : 768px) {
}
/*=============================================
                    DESKTOP
=============================================*/
@media only screen and (min-width : 1224px) {
}
</style>