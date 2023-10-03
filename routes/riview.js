const express = require('express')
const router = express.Router()

const connection = require('../config/connect')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT riview.id_riview, riview.komen, users.nama_user, anime.nama_anime from riview join anime on riview.id_anime = anime.id_anime join users on riview.id_user = users.id_user', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Komentar :',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('komen').notEmpty(),
    body('id_user').notEmpty(),
    body('id_anime').notEmpty()
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        komen: req.body.komen,
        id_user: req.body.id_user,
        id_anime: req.body.id_anime,
    }
    connection.query('insert into riview set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err,
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'anda sudah berkomentar',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`select * from riview where id_riview = ${id}`, function(err,rows){
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
                message:'Komentar :',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('komen').notEmpty(),
    body('id_user').notEmpty(),
    body('id_anime').notEmpty()
], (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id
    let data = {
        komen: req.body.komen,
        id_user: req.body.id_user,
        id_anime: req.body.id_anime,
    }
    connection.query(`update riview set ? where id_riview = ${id}`, data, function(err,rows){
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
    connection.query(`delete from riview where id_riview = ${id}`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Komentar berhasil dihapus'
            })
        }
    })
})

module.exports = router