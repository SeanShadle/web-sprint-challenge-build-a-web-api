const e = require('express');
const express = require('express');
const { getProjectActions } = require('./projectModel');
const router = express.Router();
const Projects = require('./projectModel');

router.get("/", (req, res) => {
    Projects.get()
        .then((project) => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The project information cannot be retrieved'
            })
        })
})

router.get("/:id", (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot get project with this id"
            })
        })
})

router.get("/:id/actions", validateProjectId, (req, res) => {
    Projects.getProjectActions(req.project.id)
        .then(actions => {
            console.log(actions);
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        });
});

router.post("/", validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Cannot post to database"
            })
        })
})

router.put("/:id", (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(id => {
            if(id) {
                res.status(200).json(id)
            } else {
                res.status(404).json({
                    message: 'The project with the specified ID cannot be found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
})

router.delete("/:id", validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "The project was deleted successfully"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Cannot delete this project'
            })
        })
})

//middleware

function validateProject(req, res, next) {
    if(!req.body){
        return res.status(400).json({message: "Missing project data"})
    } else if(!req.body.name){
        return res.status(400).json({message: "Missing required name field"})
    } else if(!req.body.description){
        return res.status(400).json({message: "Missing required description field"})
    } else {
        next();
    }
}

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(project => {
            console.log(project);
            if(project){
                req.project = project;
                return next();
            } else {
                return res.status(404).json({message: 'Project not found'})
            }
        })
        .catch(err => {
            return res.status(400).json({message: 'Invalid Project ID'})
        })
}

module.exports = router;