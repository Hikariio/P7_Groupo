<template>
    <div>
       <Header/>
       <div>
            <button @click="suppr">Yes</button>
            <button @click="returnMain">No</button>
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

<style>
    
</style>