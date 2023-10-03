const express = require('express')
const router = express.Router()

const connection = require('../config/connect')
const {body, validationResult} = require('express-validator')

router.get('/', function(req,res){
    connection.query('SELECT * FROM genre order by id_genre desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message:'Data genre :',
                data: rows
            })
        }
    })
})

router.post('/store', [
    body('genre').notEmpty()
], (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let Data = {
        genre: req.body.genre,
    }
    connection.query('insert into genre set ? ', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server failed',
                error : err,
            })
        } else {
            return res.status(201).json({
                status: true,
                message:'genre add',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id= req.params.id
    connection.query(`select * from genre where id_genre = ${id}`, function(err,rows){
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
                message:'Data genre :',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('genre').notEmpty(),
], (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id
    let data = {
        genre: req.body.genre,
    }
    connection.query(`update genre set ? where id_genre = ${id}`, data, function(err,rows){
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
    connection.query(`delete from genre where id_genre = ${id}`, function(err, rows){
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