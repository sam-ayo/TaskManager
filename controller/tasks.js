
const Task = require("../model/Task.js");



const getAllTasks = async (req, res) =>{
    try {
        const allTasks = await Task.find({});
        res.status(200).json({tasks:allTasks});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const createTask = async (req, res) =>{
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const getTask = async (req, res) =>{
    taskID = req.params.id;
    try {
    const task = await Task.findById(taskID);
    if (task){
        res.status(200).json({task});
    }else{
        res.status(404).json({msg:`${taskID} not found`});
    }
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const deleteTask = async (req, res) =>{
    taskID = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id:taskID});
        if (task){
            res.status(200).json({msg:`${taskID} deleted`, task});
        }else{
            res.status(404).json({msg:`${taskID} not found`});
        }
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const updateTask = async (req, res)=>{
    const taskID = req.params.id;
    try {
        const updatedTask = await Task.findOneAndUpdate({_id:taskID}, req.body,{new:true,runValidators:true});
        if (updatedTask){
            res.status(200).json({msg:`${taskID} Updated`, updatedTask});
        }else{
            res.status(404).json({msg:`${taskID} not found`});
        }
    } catch (error) {
        res.status(500).json({msg:error});
    }

}
module.exports = {
    getAllTasks, 
    createTask, 
    getTask,
    deleteTask, 
    updateTask};