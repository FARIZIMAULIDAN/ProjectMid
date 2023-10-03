const express = require('express')
const router = express.Router()

const connection = require('../config/connect')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT seiyu.id_seiyu, seiyu.nama_seiyu, seiyu.tanggal_lahir, anime.nama_anime from seiyu join anime on seiyu.id_anime = anime.id_anime', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data Seiyu :',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('nama_seiyu').notEmpty(),
    body('tanggal_lahir').notEmpty(),
    body('id_anime').notEmpty()
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        nama_seiyu: req.body.nama_seiyu,
        tanggal_lahir: req.body.tanggal_lahir,
        id_anime: req.body.id_anime,
    }
    connection.query('insert into seiyu set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err,
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'Seiyu add',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`select * from seiyu where id_seiyu = ${id}`, function(err,rows){
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
                message:'Data Seiyu :',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('nama_seiyu').notEmpty(),
    body('tanggal_lahir').notEmpty(),
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
        nama_seiyu: req.body.nama_seiyu,
        tanggal_lahir: req.body.tanggal_lahir,
        id_anime: req.body.id_anime,
    }
    connection.query(`update seiyu set ? where id_seiyu = ${id}`, data, function(err,rows){
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
    connection.query(`delete from seiyu where id_seiyu = ${id}`, function(err, rows){
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