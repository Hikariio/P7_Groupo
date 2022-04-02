const express = require('express');
const router = express.Router();
const commentaireCtrl = require('../controllers/commentaire');

const auth = require('../middleware/auth');

router.get('/:id', auth, commentaireCtrl.getAllCommentaire);
router.post('/', auth, commentaireCtrl.createCommentaire);



module.exports = router;