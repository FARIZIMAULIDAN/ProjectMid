const express = require('express')
const router = express.Router()

const connection = require('../config/connect')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT * FROM manga order by id_manga desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data Manga :',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('nama_manga').notEmpty(),
    body('tahun_terbit').notEmpty()
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        nama_manga: req.body.nama_manga,
        tahun_terbit: req.body.tahun_terbit,
    }
    connection.query('insert into manga set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err,
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'Manga add',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`select * from manga where id_manga = ${id}`, function(err,rows){
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
                message:'Data Studio :',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('nama_manga').notEmpty(),
    body('tahun_terbit').notEmpty()
], (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id
    let data = {
        nama_manga: req.body.nama_manga,
        tahun_terbit: req.body.tahun_terbit,
    }
    connection.query(`update manga set ? where id_manga = ${id}`, data, function(err,rows){
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
    connection.query(`delete from manga where id_manga = ${id}`, function(err, rows){
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