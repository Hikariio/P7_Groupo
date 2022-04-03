const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Avis = require('../models/avis');
const Commentaire = require('../models/commentaire');
const Message = require('../models/message');

// Gére l'inscription d'un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = User.build({name: req.body.name, email: req.body.email, password: hash});
      user.save()
      res.status(201).json({message: "Utilisateur ajouté"})
    })
    .catch(error => res.status(503).json({ error }))
};

// Gére la connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findAll({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if(!user){
          return res.status(401).json({error: 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password, user[0].password)
      .then(valid => {
          if (!valid) {
              return res.status(401).json({error: 'Mot de passe incorrect !'});
          }
          res.status(200).json({
              userId: user[0].id,
              role: user[0].role,
              token: jwt.sign(
                  { userId: user.id},
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
              )
          })
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  User.findAll({
      where: {
          id: req.params.id
      }
  })
  .then(user => {
    console.log("Utilisateur : " + user)
      res.status(201).json(user)
  })
  .catch(error => {
      res.status(500).json({ error })
  })
};

exports.deleteUser = (req, res, next) => {
  Avis.destroy({
    where: {
      author: req.params.id
    }
  });
  Commentaire.destroy({
    where: {
      author: req.params.id
    }
  });
  Message.destroy({
    where: {
      author: req.params.id
    }
  });
  User.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(201).json({message: "Utilisateur supprimé"});
}
