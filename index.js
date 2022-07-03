// start project 
const express = require('express')
const uuid = require('uuid')

const port = 3000

const app = express() 
app.use(express.json())

const users = [] 

// Obter 
app.get('/users', ( request, response) => {
    return response.json(users)
})

// create 
app.post('/users', (request, response) => {
    
    const {username, password} = request.body

    const user = { id: uuid.v4(), username, password }

    users.push(user)

    return response.status(201).json(user)
})  
 
// update 
app.put('/users/:id', (request, response) => {

    const { id } = request.params
    const { username, password } = request.body

    let status = 'changed user.'
    const updateUser = {id, username, password, status}

    const index = users.findIndex(user => user.id === id)
        if ( index < 0 ) {
            return response.status(404).json( {message: "User not find."} )
        }

    users[index] = updateUser

    return response.status(204).json(updateUser)
})

// delete
app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const deleteIndex = users.findIndex(user => user.id === id ) 
        if (deleteIndex < 0) {
            return response.status(404).json( {message: "User not find."} )
        } 

    users.splice(deleteIndex, 1)

    return response.status(202).json()
})


app.listen(port, () => {
    console.log('🚀')
})