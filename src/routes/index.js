const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
    const { id } = req.params;
    const questions = await pool.query('select * from question');
    // const answer = await pool.query('select * from answer where question_id = ?', [id]);
    res.render('index', {questions});
});


module.exports = router;