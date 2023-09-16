const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const routes = express.Router()




//Get all workouts
routes.get('/', getWorkouts)

//Get a sigle workout
routes.get('/:id', getWorkout)

//Post a new workout
routes.post('/', createWorkout)

//Delete a workout
routes.delete('/:id', deleteWorkout)

//Update a workout
routes.patch('/:id', updateWorkout)
module.exports = routes