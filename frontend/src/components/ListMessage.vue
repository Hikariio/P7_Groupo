<template>
  <div></div>
</template>

<script>
export default {
  name: "ListeMessage",
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
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
        creationMesssage(donnee[i]);
      }
    },

    creationMesssage: function (donnee) {
      let tableauMessage = [];

      tableauMessage[0] = document.createElement("div"); // Div principale parent
      tableauMessage[1] = document.createElement("div"); // Nom de la personne qui poste et qui contient btn pour admin

      if (donnee["imageUrl"] != null) {
        tableauMessage[2] = document.createElement("div");
        tableauMessage[0].appendChild(tableauMessage[2]);
        tableauMessage[11] = document.createElement("img");
        tableauMessage[2].appendChild(tableauMessage[11]);
        tableauMessage[11].setAttribute("src", donnee["imageUrl"]);
      }
      tableauMessage[3] = document.createElement("div"); // text
      tableauMessage[4] = document.createElement("div"); // like/ dislike
      tableauMessage[5] = document.createElement("div"); // commentaire

      tableauMessage[0].appendChild(tableauMessage[1]);
      tableauMessage[0].appendChild(tableauMessage[2]);
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

      //    axios.get(API_URL + donnee["author"])
      //    .then(res =>
      //     {if(res.ok){
      //       return res.json();
      //     }
      //     }).then(donnee => {
      //       tableauMessage[6].innerText = donnee[0]["firstname"] + donnee[0]["lastname"];
      //     })

      fetch("http://localhost:3000/api/" + donnee["author"], {
        method: "GET",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + this.token,
        },
      });

      if (
        donnee["author"] == localStorage.getItem("user")["userId"] ||
        localStorage.getItem("user")["role"] == "admin"
      ) {
        tableauMessage[10] = document.createElement("input");
        tableauMessage[1].appendChild(tableauMessage[10]);
        tableauMessage[10].setAttribute("type", "button");
        tableauMessage[10].value = "X";
      }
    },
  },
  beforeMount() {
    this.recupDonnee();
  },
};
</script>
