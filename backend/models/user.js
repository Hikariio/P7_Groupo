// const User = function (user) {
//     this.id = user.id;
//     this.lastname = user.lastname;
//     this.firstname = user.firstname;
//     this.email = user.email;
//     this.password = user.password;
//     this.isAdmin = user.isAdmin || 0;
// };
 

// module.exports = User;



module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          firstname: {
              type: DataTypes.STRING,
          },
          lastname: {
              type: DataTypes.STRING,
          },
          email: {
              type: DataTypes.STRING,
                  allowNull: false,
                  unique : {
                      msg : 'L\'email est déjà pris.'
                  },
                  validate: {
                      isEmail: {msg: "Choisir un email valide"}
                  }
          },
          password: {
              type: DataTypes.STRING,
              allowNull: false,
              validate : {
                  notNull : {msg: "Un mot de passe est requis pour s'inscrire"},
                  notEmpty: {msg: "Un mot de passe doit être rempli"},
              }
          },
    });
}
    