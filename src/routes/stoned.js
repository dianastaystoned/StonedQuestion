const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');

router.get('/makeaquestion', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const cat = await pool.query('select * from category where id = ?', [id]);
    res.render('stoned/makeQuestion', {cat:cat[0]});
});

router.post('/makeaquestion', isLoggedIn, async (req, res) => {
    const { title, description, image, category_id } = req.body;
    const { id } = req.params;
    const newQuestion = { 
        title, 
        description,
        image,
        category_id,
        user_id: req.user.id
    };
    await pool.query('insert into question set ?', [newQuestion]);
    req.flash('success', 'Question posted, hope you have an answer asap:)');
    res.redirect('/');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('delete from question where id = ?', [id]);
    req.flash('success','Your question has been deleted, we hope you can have an answer');
    res.redirect('/stoned/myquestions');
});

//List all questions of the user
router.get('/myquestions', isLoggedIn, async (req, res) => {
    const questions = await pool.query('select q.title, q.description, c.category_name from category c, question q where q.category_id = c.id && user_id = ?', [req.user.id]);
    res.render('stoned/user/myQuestions', {questions});
});

//List all answers of the user
router.get('/myanswers', isLoggedIn, async (req, res) => {
    // const answers = await pool.query('select a.desc_answer, q.title, q.description from question q, answer a where a.question_id = q.id && user_id = ?', [req.user.id]);
    const answers = await pool.query('select q.title, q.description, a.desc_answer from question q, answer a where q.id = a.question_id && users_id = ?', [req.user.id]);
    res.render('stoned/user/myAnswers', {answers});
}); 

//Post an answer
router.get('/respondaquestion/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const q = await pool.query('select * from question');
    const question = await pool.query('select a.desc_answer, u.username from answer a, users u where a.users_id = u.id && a.question_id = ?', [id]);
    const answer = await pool.query('select q.title, q.description, c.category_name, u.username from users u, question q, category c where c.id = q.category_id && q.user_id = u.id &&  q.id = ?', [id]);
    res.render('stoned/respondQuestion', {answer, question, q:q[0]});
});

router.post('/respondaquestion/:id', async (req, res) => {
    const { id } = req.params;
    const { desc_answer } = req.body;
    const newAnswer = { 
        desc_answer,
        question_id: id,
        users_id: req.user.id
    };
    console.log(id);
    await pool.query('insert into answer set ?', [newAnswer]);
    req.flash('success', 'Your answer is posted, thxs for ur help:)');
    res.redirect('/');
});

module.exports = router;