const express = require('express');
const MusicController = require("../Controller/music");
// const { handleRequest } = require('../services/index');
const router = express.Router();

router.get('/list', MusicController.findAllMusic);
// router.post('/addMusic', MusicController.addMusic);
// router.put('/:id', UserController.update);
// router.delete('/:id', UserController.delete);

module.exports = router;