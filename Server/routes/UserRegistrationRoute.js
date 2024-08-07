const express = require('express');
const router = express.Router();
const { getUserProjects, createProject, getAllProjects, deleteProject, updateProject, getOneProject, getOtherProjects } = require('../controllers/UserRegistrationController');

router.get('/user-projects', getUserProjects);

router.get('/getoneproject/:id', getOneProject);

router.post('/create', createProject);

router.get('/allprojects', getAllProjects);

router.delete('/delete/:id', deleteProject);

router.put('/update/:id', updateProject);

// fetch user data 
router.get('/otherview/:id', getOtherProjects);

module.exports = router;
