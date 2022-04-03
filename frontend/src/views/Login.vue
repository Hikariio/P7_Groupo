<template>
    <div class="conteneur_globale">
        <div class="conteneur_image_login">
            <img src="@/assets/icon-left-font-monochrome-black.svg" alt="Logo de Groupomania">      
        </div>
        <FormLogin/>

    </div>
</template>

<script>
import FormLogin from '@/components/FormLogin.vue'
export default {
    components: {
        FormLogin
    }
}
</script>




<style scoped>
/*  MOBILE */
.conteneur_globale{
    display: flex;
    flex-direction: column;
    background-color: rgb(102, 101, 101);
    border-radius: 25px;
    height: 84vh;
    margin: 50px auto 0 auto;
    width: 90%;
}
.conteneur_image_login{
    width: 75%;
    margin: 30px auto 75px auto;
}
img{
    width: 95%;
}
/*=============================================
                    TABLET
=============================================*/
@media only screen and (min-width : 768px) {
    .conteneur_globale{
        max-width: 500px;
    }
}
/*=============================================
                    DESKTOP
=============================================*/
@media only screen and (min-width : 1224px) {
}
</style>