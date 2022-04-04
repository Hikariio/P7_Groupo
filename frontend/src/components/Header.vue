<template>
    <div>
        <router-link to="/Profile">Profile</router-link>
        <router-link to="/" @click='quitter'> Abandonner </router-link>
     </div>
</template>

<script>

export default ({
    name: 'Header',
    methods:{
        quitter: function(){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
        }
    }
})
</script>


