const Message = require('../models/message');
const fs = require('fs');
const { json } = require('express');
const Commentaire = require('../models/commentaire');
const sequelize = require('../models/config');
const Avis = require('../models/avis');

exports.getAllMessage = (req, res, next) => {
    Message.find()
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
        .then(Messages => res.status(200).json(Messages))
        .catch(error => res.status(400).json({ error }));
}

exports.createMessage = (req, res, next) => {
    const MessageObject = JSON.parse(req.body.Message);
    const Message = new Message({
        ...MessageObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    Message.save()
        .then(() => res.status(201).json({ message: 'Nouveaux Message créé !' }))
        .catch(error => res.status(400).json({ error }))
}

exports.updateMessage = (req, res, next) => {
    const MessageObject = req.file ?
        {
            ...JSON.parse(req.body.Message),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    if (req.file) {
        Message.findOne({ _id: req.params.id })
            .then(Message => {
                const filename = Message.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file");
                    }
                }));
            })
            .catch(error => res.status(400).json({ error }))
    }

    Message.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Message modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
        .then(Message => {
            const filename = Message.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Message.deleteOne({ _id: req.params.id })
                    .then(() => next())
                    .catch(error => res.status(400).json({ error }));
            })
            res.status(200).json({ message: 'Message supprimé'});
        })
        .catch(error => res.status(400).json({ error }))
}

exports.likeMessage = (req, res, next) => {
    const like = req.body.like
    const MessageId = req.params.id
    const userId = req.body.userId

    switch(like){
        case 1 :
             Message.updateOne({ _id: MessageId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
                .then(() => res.status(200).json({ message: `J'aime` }))
                .catch((error) => res.status(400).json({ error })) 
            break;
        case -1 :
             Message.updateOne({ _id: MessageId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
                .then(() => res.status(200).json({ message: `Je n'aime pas` }))
                .catch((error) => res.status(400).json({ error })) 
            break;  
        default :
             Message.findOne({ _id: req.params.id })
                .then(Message =>{
                    if (Message.usersLiked.includes(userId)){
                        Message.updateOne({ _id: MessageId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                        .then(() => res.status(200).json({ message: `Le like a été supprimé` }))
                        .catch((error) => res.status(400).json({ error })) 
                    }
                    else if(Message.usersDisliked.includes(userId)){
                        Message.updateOne({ _id: MessageId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                        .then(() => res.status(200).json({ message: `Le dislike a été supprimé` }))
                         .catch((error) => res.status(400).json({ error }))   
                    }
                })
            break;    
    }
}

