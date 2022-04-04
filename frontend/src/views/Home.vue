<template>
  <div class="conteneur_menu_principale">
    <div class="conteneur_img_menu">
      <img alt="Logo Groupomania" src="@/assets/icon-left-font-monochrome-black.svg">
    </div>
    <div class="conteneur_menu">
      <router-link to="/login">Connexion</router-link>
      <router-link to="/register">S'enregistrer</router-link>
    </div>
  </div>
</template>


<style scoped>
.conteneur_menu_principale{
  margin-top: 100px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.conteneur_menu{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
}
.conteneur_img_menu{
  width: 85%;
  margin: 10px auto;
}
.conteneur_img_menu img{
  width: 100%;
}
a{
    border: 1px solid rgb(129, 23, 64);
    background-color: #555454;
    color: rgb(129, 23, 64);
    width: 220px;
    height: 60px;
    border-radius: 15px;
    margin: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    
}
a:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
/*=============================================
                    TABLET
=============================================*/
@media only screen and (min-width : 768px) {
    .conteneur_menu_principale{
      max-width: 700px;
      margin: 0 auto;
      height: 800px;
    }
    .conteneur_menu{
      height: 250px;
    }
    a{
      width: 320px;
      height: 100px;
    }
    
}
/*=============================================
                    DESKTOP
=============================================*/
@media only screen and (min-width : 1224px) {
    .conteneur_menu_principale{
      max-width: 900px;
      margin: 0 auto;
      height: 700px;
    }
    .conteneur_menu{
      height: 250px;
    }
    a{
      width: 320px;
      height: 100px;
    }
}
</style>