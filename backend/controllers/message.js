const Message = require('../models/message');
const Avis = require('../models/avis');
const Commentaire = require('../models/commentaire');
const sequelize = require('../models/config');

exports.getAllMessage = (req, res, next) => {
    Message.findAll({
         order: [['date_creation', 'DESC']]
    })
    .then(message => {
        res.status(201).json(message)
    })
    .catch(error => {
        res.status(500).json({ error })
    })
};

exports.getOneMessage = (req, res, next) => {
    Message.findAll({
        where: {
            id: req.body.id
        }
    })
    .then(message => {
        res.status(201).json(message)
    })
    .catch(error => {
        res.status(500).json({ error })
    })
};

exports.createMessage = (req, res, next) => {
    const messageObject = JSON.parse(req.body.donnee);
    const message = Message.build({contenu: messageObject.contenu, author: messageObject.author, img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});
    message.save();
    res.status(201).json({message: 'Message créé'});
};

exports.deleteMessage = (req, res, next) => {
    Avis.destroy({
        where: {
            message_principale: req.params.id
        }
    })
    .then(() => { 
        Commentaire.destroy({
            where: {
                message_principale: req.params.id
            }
        })
        .then(() => {
            Message.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.status(201).json({message: 'Message supprimé'})
            })
        })
    })
    .catch(error => {
        res.status(500).json({ error })
    })
};

exports.updateMessage = (req, res, next) => {
    Message.update({contenu: contenu, author: author, img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`},{
        where: {
            id: req.body.id
        },
        returning: true
    })
    .then(() => res.status(201).json({message: 'Message mise a jour'}))
    .catch(error => {
        res.status(500).json({ error })
    })
};
exports.likeMessage = (req, res, next) => {
    Avis.findAll({
        where: {
            message_principale: req.body.message_principale,
            author: req.body.author
        }
    })
    .then(async value => {
        // Si utilisateur n'a jamais like ou dislike
        if(value == ''){
            const avis = await Avis.build({author: req.body.author, message_principale: req.body.message_principale, avis: req.body.avis});
            avis.save();
        } else {
            await Avis.update({avis: req.body.avis},{
                where: {
                    message_principale: req.body.message_principale,
                    author: req.body.author
                }
            })
        }
        
        // Mise a jour du nombre de like
        const like = await Avis.count({
            where: {
                message_principale: req.body.message_principale,
                avis: 1
            }
        })
        // Mise a jour du nombre de dislike
        const dislike = await Avis.count({
            where: {
                message_principale: req.body.message_principale,
                avis: 2
            },
        })
        console.log(like);
        console.log(dislike);
        await Message.update({like: like, dislike: dislike},{
            where: {
                id: req.body.message_principale
            }
        })
    })
    .then(() => {
        res.status(201).json({message: "Avis bien mis a jour"});
    })
};