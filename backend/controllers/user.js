const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db-config');

const {User} = require('../models/config');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        })
        .then(() => res.status(201).json({ message: "utilisateur créé" }))
        .catch(error => {
            const message = `La tentativee à echouée`;
            return res.status(400).json({ message, data: error })
        });
    })
    .catch(error => res.status(500).json({ error }))
};

exports.login = async(req, res, next) => {
    try {
        User.findOne({ where: { email: req.body.email }})
            .then(user => {
                console.log(user)  
               bcrypt.compare(req.body.password,user.password).then(valid => {
                if (! valid) return res.status(404).json({ error: 'Email ou password incorrect' });
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                })
            })
        })
        .catch(error => {
                const message = `L'utilisateur n'as pas pu etre connecte`;
                return res.status(500).json({ message, data: error});
            });
    } catch (error) {
        res.status(500).json({error});
    }
};


