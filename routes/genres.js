const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const logger = require('../startup/logger');
const router = express.Router();

// Ways to async middleware 
// asyncMiddleware; other options is to use express-async-errors module
/**
router.get("/", asyncMiddleware(async(req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
}));
*/

router.get("/", asyncMiddleware(async(req, res) => {
    const genres = await Genre.find().sort("name");
    res.send(genres);
}));

router.post('/', auth, asyncMiddleware(async(req, res) => {
    logger.info(`POST request`, req.body);

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
}));

router.put('/:id', asyncMiddleware(async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
}));

router.delete('/:id', [auth, admin], asyncMiddleware(async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
}));

router.get('/:id', asyncMiddleware(async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
}));

module.exports = router;