const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const User = require('../models/userModel')

//Get all workouts
const getWorkouts = async (req,res) =>{

//fetch all workout
const workouts = await Workout.find({}).sort({createdAt: -1})
res.status(200).json(workouts)
}

//Get a single workout
const getWorkout = async (req,res) => {
const { id } = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
}

const workout = await Workout.findById(id)

if (!workout) {
    return res.status(404).json({error: 'No such workout'})
}
res.status(200).json(workout)
}


//create a new workout
const createWorkout = async (req,res) => {
const {title, reps,load} = req.body


let emptyFields = []

if(!title) {
    emptyFields.push('title')
}

if(!reps) {
    emptyFields.push('reps')
}

if(!load){
    emptyFields.push('load')
}

if (emptyFields.length > 0) {
    return res.status(400).json({error: "All fields shouldn't be empty", emptyFields})
}


//add document to database
try{
const workout = await Workout.create({title, reps, load})
res.status(200).json(workout)
}catch(error){
 res.status(400).json({error: error.message})
}
}

//Delete a workout
const deleteWorkout = async (req,res) => {
 const {id} = req.params

 if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout to delete'})
 }

 const workout = await Workout.findOneAndDelete({_id: id})

 if (!workout){
    return res.status(400).json({error: 'No such workout to delete'})
 }

 res.status(200).json(workout)
}

//Update a workout
const updateWorkout = async(req,res) => {
 const { id } = req.params

 if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json ({error: 'No such workout to update'})
}

const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
})

if (!workout) {
    return res.status(400).json({error: 'No such work update'})
}
res.status(200).json(workout)
}


module.exports = {
   getWorkout,
   getWorkouts,
   createWorkout,
   deleteWorkout,
   updateWorkout
}