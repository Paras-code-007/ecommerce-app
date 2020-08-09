const route= require('express').Router()
const {Users} = require('../../db')
// const Users= require('../../db').Users

route.get('/',function (req,res) {
    Users.findAll()
        .then(function (data) {
            // res.sendStatus(200).send(data)  //response was saying OK
            //we got ststus code ka english translation as response 
            res.status(200).send(data) 
            //satus set the status code 
            //send ststus sets the status code and send it as a response 
        })
        .catch(function (err) {
            console.error(err)
            // res.sendStatus(500).send({
            //     error: err
            // })
            res.status(500).send({
                error: err
            })
        })
})

route.post('/',function (req,res) {
    Users.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
        business: (req.body.business? req.body.business : false)
    })
    .then(function (data) {
        // res.sendStatus(201).send(data)
        // res.status(201).send(data)
        res.redirect('/')
    })
    .catch(function (err) {
        // res.sendStatus(501).send({
        //     error: err
        // })
        res.status(501).send({
            error: err
        })
    })
})


exports= module.exports= route