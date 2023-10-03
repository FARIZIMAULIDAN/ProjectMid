const express = require('express')
const router = express.Router()

const connection = require('../config/connect')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT anime.id_anime, anime.nama_anime, anime.episode, anime.tahun_terbit, genre.genre, studio.nama_studio, manga.nama_manga FROM anime JOIN genre ON anime.id_genre = genre.id_genre JOIN studio ON anime.id_studio = studio.id_studio JOIN manga ON anime.id_manga = manga.id_manga', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data anime :',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('nama_anime').notEmpty(),
    body('id_genre').notEmpty(),
    body('episode').notEmpty(),
    body('id_studio').notEmpty(),
    body('tahun_terbit').notEmpty(),
    body('id_manga').notEmpty(),
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        nama_anime: req.body.nama_anime,
        id_genre: req.body.id_genre,
        episode: req.body.episode,
        id_studio: req.body.id_studio,
        tahun_terbit: req.body.tahun_terbit,
        id_manga: req.body.id_manga,
    }
    connection.query('insert into anime set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err,
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'Anime add',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`select * from anime where id_anime = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err,
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data Anime :',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('nama_anime').notEmpty(),
    body('id_genre').notEmpty(),
    body('episode').notEmpty(),
    body('id_studio').notEmpty(),
    body('tahun_terbit').notEmpty(),
    body('id_manga').notEmpty(),
], (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id
    let data = {
        nama_anime: req.body.nama_anime,
        id_genre: req.body.id_genre,
        episode: req.body.episode,
        id_studio: req.body.id_studio,
        tahun_terbit: req.body.tahun_terbit,
        id_manga: req.body.id_manga,
    }
    connection.query(`update anime set ? where id_anime = ${id}`, data, function(err,rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'update Berhasil',
                data:rows[0]
            })
        }
    })
})

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id
    connection.query(`delete from anime where id_anime = ${id}`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data di hapus'
            })
        }
    })
})

module.exports = router