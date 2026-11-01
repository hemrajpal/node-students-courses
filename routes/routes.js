const express = require('express');
const router = express.Router();

const studentController = require('../controllers/stdController');
const courseController = require('../controllers/courseController');

router.post('/students', studentController.create);
router.get('/students', studentController.get);
router.get('/students/:id', studentController.getSingle);
router.put('/students/:id', studentController.update);
router.delete('/students/:id', studentController.delete);

router.post('/students/:id/enroll', studentController.enroll);
router.delete('/students/:studentId/courses/:courseId', studentController.dropEnroll);

router.post('/courses', courseController.create);
router.get('/courses', courseController.get);
router.get('/courses/:id', courseController.getSingle);
router.put('/courses/:id', courseController.update);
router.delete('/courses/:id', courseController.delete);

module.exports = router;