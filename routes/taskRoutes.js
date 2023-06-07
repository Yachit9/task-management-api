const express= require('express')
const router = express.Router()
const { createTask, getTask, updateTask, deleteTask, filteredTask }  = require('../controllers/taskController.js')
const {protected }  = require('../middleware/authMiddleware.js')

router.post('/createtask',protected, createTask)
router.get('/gettasks', protected, getTask)
router.get('/filter', protected, filteredTask)
router.put('/:id', protected, updateTask)
router.delete('/:id', protected, deleteTask)

module.exports = router