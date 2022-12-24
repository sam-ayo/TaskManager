
const Task = require("../model/Task.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const {createCustomError} = require("../errors/custom-error.js");


const getAllTasks = asyncWrapper( async (req, res, next) =>{
    const allTasks = await Task.find({});
    res.status(200).json({tasks:allTasks});
})

const createTask = asyncWrapper(async (req, res) =>{
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
})

const getTask = asyncWrapper(async (req, res, next) =>{
    taskID = req.params.id;
    const task = await Task.findById(taskID);
    if (!task){
        const customError = createCustomError(`${taskID} not found`, 404);
        return next(customError);
    }
    res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res) =>{
    taskID = req.params.id;
    const task = await Task.findOneAndDelete({_id:taskID});
    if (!task){
        const customError = createCustomError(`${taskID} not found`, 404);
        return next(customError);
    }
    res.status(200).json({msg:`${taskID} deleted`, task});
});

const updateTask = asyncWrapper(async (req, res)=>{
    const taskID = req.params.id;
    const updatedTask = await Task.findOneAndUpdate({_id:taskID}, req.body,{new:true,runValidators:true});
    if (!updatedTask){
        const customError = createCustomError(`${taskID} not found`, 404);
        return next(customError);
    }
        res.status(200).json({msg:`${taskID} Updated`, updatedTask});
});

module.exports = {
    getAllTasks, 
    createTask, 
    getTask,
    deleteTask, 
    updateTask};