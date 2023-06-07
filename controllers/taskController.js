const Task = require('../models/Task.js')
const asyncHandler = require('express-async-handler')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('sendgrid_api_key');

// Create Tasks
// Accrss : private

const createTask = asyncHandler ( async (req, res)=> {
    const { title, description, dueDate, status, assignedTo } = req.body

    if(!title || !description || !dueDate || !status) {
        res.status(400)
        throw new Error('Please include all the fields')
    }

    // Create New Task
    const task = await Task.create({
        title ,
        description ,
        dueDate ,
        status ,
        assignedTo,
        createdBy : req.user.id

    }) 

        //  Send email notification to the assigned user
        // const assignedUser = await User.findById(assignedTo);
        // const msg = {
        //   to: assignedUser.email,
        //   from: 'nahidankur@gmail.com',
        //   subject: 'New Task Assignment',
        //   text: `You have been assigned a new task: ${title}`,
        //   html: `<p>You have been assigned a new task: ${title}</p>`,
        // };
        // await sgMail.send(msg);

    if(task){
        res.status(201).json(task)
    }
 
} )

// Fetch All Tasks
// Accrss : private

const getTask = asyncHandler(async(req, res)=> {
    const tasks = await Task.find({createdBy : req.user.id})

    res.status(200).json(tasks)
})

//filter tasks
// Access: Private

const filteredTask = async (req, res, next) => {
    try {
      const { sortBy, sortOrder, status, assignedTo } = req.query;
      const filterOptions = { createdBy: req.user.id };
      const sortOptions = {};
  
      // Apply filters
      if (status) {
        filterOptions.status = status;
      }
  
      if (assignedTo) {
        filterOptions.assignedTo = assignedTo;
      }
  
      // Apply sorting
      if (sortBy === 'dueDate') {
        sortOptions.dueDate = sortOrder === 'desc' ? -1 : 1;
      }
  
      const tasks = await Task.find(filterOptions).sort(sortOptions);
      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  };

// Update individual Task
// access Private
const updateTask = asyncHandler(async(req, res)=> {
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(404)
        throw new Error('Task Not Found')
    }

   // check user
   if(!req.user) {
    res.status(404)
    throw new Error('User Not Found')

   }

    // check logged in user owns the movie table
    if(task.createdBy.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized!')
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(201).json(updatedTask)
})


// Delete a task by id
// Access: Private
const deleteTask = asyncHandler(async(req, res)=> {
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(404)
        throw new Error('Task Not Found')
    }

    if(!req.user) {
        re.status(404)
        throw new Error('User not Found')
    }

    if(task.createdBy.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized')
    }

    await task.deleteOne()
    res.status(200).json({message : "Task Deleted Successfully", id: req.params.id})
})
module.exports = {
    createTask, getTask, updateTask, deleteTask, filteredTask
}