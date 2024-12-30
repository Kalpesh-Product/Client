const router = require("express").Router();

const {
    createProject,createTasks,getProjects,
} = require('../controllers/tasksControllers/tasksControllers');

router.post("/create-project", createProject);
router.post("/create-tasks", createTasks);
router.get("/get-projects",getProjects);

module.exports = router;