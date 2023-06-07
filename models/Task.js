const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please Include a title']
    }, 
    description : {
        type : String,
        required : [true, 'Please Include a description']
    }, 
    dueDate : {
        type : Date,
        required : [true, 'Please Include a date']
    }, 
    status : {
        type : String,
        required : [true, 'Please Include a status']
    }, 
    assignedTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)