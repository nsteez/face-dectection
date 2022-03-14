//import express from 'express';
const express = require('express');
const req = require('express/lib/request');
const app = express();

app.use(express.urlencoded({extended: false})); // parses object to postman
app.use(express.json()); //parses to json?


const database = {
    users: [
        {
            id: '123',
            name:'John',
            email: 'john@email.com',
            password:'cookies',
            entries: 0,
            dateJoined: new Date()
        },
        {
            id: '124',
            name:'Sally',
            email: 'sally@email.com',
            password:'peanuts',
            entries: 0,
            dateJoined: new Date()
        },

    ]
}


app.get('/',(req, res)=>{
    //res.send("working")
    res.send(database.users)
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})

/**Sign In */
app.post("/signin", (req, res)=>{
    if (req.body.email=== database.users[0].email && req.body.password === database.users[0].password){
        res.json('success')
    } else{
        res.status(400).json('error logging in')
    }
    res.json("signin")
})

/** Register*/
app.post('/register', (req,res) =>{
    const {email, name, password} = req.body;
    database.users.push({
        id:'125',
        name: name,
        email:email,
        password:password,
        entries: 0,
        dateJoined:new Date()
    })
    res.json(database.users[database.users.length-1])
})

/** User by Id*/
app.get('/profile/:id', (req,res) => { // syntax to grabs id
    const { id } = req.params;
    let found = false
    database.users.forEach((user) => {
        if (user.id == id){
            found = true
            return res.json(user)
            //console.log("yes")
        }
    })
        if (!found) {
            res.status(400).json("not found")
        }

    });

app.post('/image',(req,res)=>{
    const { id } = req.body;
    let found = false
    database.users.forEach((user) => {
        if (user.id == id){
            found = true
            user.entries++
            return res.json(user.entries)
            //console.log("yes")
        }
    })
    if (!found) {
        res.status(400).json("not found")
    }

})
