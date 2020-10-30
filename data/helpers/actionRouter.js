const express = require('express');
const { post } = require('../../server');
const Actions = require('./actionModel')
const router = express.Router();

router.get('/', (req, res)=>{
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The action information cannot be retrieved'
            })
        })
})

router.get('/:id', (req, res)=>{
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot get action with this id"
            })
        })
})

router.post('/projects/:id', (req, res)=>{
    Actions.insert({...req.body, project_id: req.params.id})
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot post to database"
            })
        })
})

router.put('/:id', (req, res)=>{
    Actions.update(req.params.id, req.body)   
        .then(() => {
            res.status(200).json({data: req.body})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

router.delete('/:id', (req, res)=>{
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "The action was deleted successfully"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot delete this action'
            })
        })
})

module.exports = router;