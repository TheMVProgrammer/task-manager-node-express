const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'You must provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);