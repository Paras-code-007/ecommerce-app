const route= require('express').Router()
const {Products} = require('../../db')
// const Users= require('../../db').Users

route.get('/',function (req,res) {
    Products.findAll()
        .then(function (data) {
            // res.sendStatus(200).send(data)
            res.status(200).send(data)
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
    if(isNaN(parseFloat(req.body.price))){
        // res.sendStatus(300).send({
        //     error: "price is not a valid number"
        // })
        res.status(300).send({
            error: "price is not a valid number"
        })
        return
    }
    
    Products.create({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        price: parseFloat(req.body.price)
    })
    .then(function (data) {
        // res.sendStatus(201).send(data)
        // res.status(201).send(data)
        res.send(data)
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