const Commentaire = require('../models/commentaire');

exports.getAllCommentaire = (req, res, next) => {
    Commentaire.findAll({
        where:{
            message_principale: req.params.id
        },
        order: [['date_creation']]
    })
    .then(commentaires => {
        console.log('Resultat commentaire' + commentaires);
        res.status(201).json(commentaires)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error })
    })
}

exports.createCommentaire = (req, res, next) => {
    const commentaire = Commentaire.build({contenu: req.body.contenu, author: req.body.author, message_principale: req.body.msgId});
    commentaire.save();
    res.status(201).json({message: 'Message créé'});
}
