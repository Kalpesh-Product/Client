const router = require("express").Router();

const {
    createProject
} = require('../controllers/tasksControllers/tasksControllers');

router.post("/create-project", createProject);

module.exports = router;