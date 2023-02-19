const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });        
    } catch (error) {
        res.status(500).json({ msg: error });        
    }
}

const getTask = asyncWrapper( async (req, res) => {
    const { id: task_id} = req.params;
    const task = await Task.findOne({ _id: (task_id) });

    if(!task) {
        return res.status(404).json({ msg: `No task with id: ${task_id}` });
    }

    res.status(200).json({ task });
});

const updateTask = asyncWrapper( async (req, res) => {
    const { id: task_id } = req.params;

    const task = await Task.findOneAndUpdate({ _id: task_id }, req.body, {
        new: true, 
        runValidators: true 
    });

    if(!task) {
        return res.status(404).json({ msg: `No task with id: ${task_id}` });
    }

    res.status(200).json({ task });  
});

const deleteTask = asyncWrapper( async (req, res) => {
        const { id: task_id } = req.params; 
        const task = await Task.findOneAndDelete({ _id: task_id });

        if(!task) {
            return res.status(404).json({ msg: `No task with id: ${task_id}` });
        }

        res.status(200).json({ task });
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}