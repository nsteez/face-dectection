///import express from 'express';
const express = require('express');
const req = require('express/lib/request');
const app = express();
const cors = require('cors');
const knex = require('knex');

app.use(express.urlencoded({extended: false})); // parses object to postman
app.use(express.json()); //parses to json?
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //local host
      //port : 3306,
      user : 'postgres',
      password : '',
      database : 'facedetectionDB'
    }
  });


//console.log(db.select('*').from('users'));




const database = {
    users: [
        {
            id: '123',
            name:'John',
            email: 'john@email.com',
            password:"cookies",
            entries: 0,
            dateJoined: new Date()
        },
        {
            id: '124',
            name:'Sally',
            email: 'sally@email.com',
            password:"bananas",
            entries: 0,
            dateJoined: new Date()
        }

    ],
    login:[
        {
        id:'987',
        hash:"",
        email: 'john@email.com'
        }
     ]
}

app.get('/',(req, res)=>{
    //res.send("working")
    res.send(database.users)
})

/**Hashing passwords */
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });
// bcrypt.hash(password, saltRounds, function(err, hash) {
//     console.log(hash);
// });

/**Sign In */
app.post('/signin', (req, res) =>{
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json(database.users[0])
      //res.json('success');
        //console.log(res.json(database.users[0]))
        // let name = database.users[0].name
        //let user = res.json(database.users[0])
    //return res.json(database.users[0]);
    //return res.json(req.)

    }else {
        res.status(400).json('error logging in');
    }
})
// app.post("/signin", (req, res)=>{
//     // Load hash from your password DB.
//     bcrypt.compare("fruits", "$2b$10$IaOFcw0GAPxrSrvxJVHoMekcef6aWJPRnOx9Xpn1WX.zA/Yy8w6ou", function(err, result) {
//         // result == true
//         console.log("first",result)
//     });
//     bcrypt.compare(someOtherPlaintextPassword, "$2b$10$IaOFcw0GAPxrSrvxJVHoMekcef6aWJPRnOx9Xpn1WX.zA/Yy8w6ou", function(err, result) {
//         // result == false
//         console.log("second", result)
//     });
//     if (req.body.email=== database.users[0].email && req.body.password === database.users[0].password){
//         res.json('success')
//     } else{
//         res.status(400).json('error logging in')
//     }
//     res.json("signin")
// })

/** Register*/
app.post('/register', (req,res) =>{
    const { email, name, password } = req.body;
    db('users').returning('*').insert({
        name:name,
        email:email,
        datejoined: new Date()
    }).then(user =>{
        res.json(user[0]);
    }).catch(err=> res.status(400).json('error cannot register'))


    // database.users.push({
    //     id:'126',
    //     name: name,
    //     email:email,
    //     entries: 0,
    //     dateJoined:new Date()
    // })

    // res.json(database.users[database.users.length-1])
    //console.log(req.body)
    // return res.json(req.body)
})

/** User by Id*/
app.get('/profile/:id', (req,res) => { // syntax to grabs id
    const { id } = req.params;
    let found = false
        db.select('*').from('users').where('id', id).then(user=> {
            // console.log(user[0]);
            res.json(user[0])
        })
        // database.users.forEach((user) => {
    //     if (user.id === id){
    //         found = true
    //         return res.json(user)
    //         //console.log("yes")
    //     }
    // })
        if (!found) {
            res.status(400).json("not found")
        }

    });

app.put('/image',(req, res)=>{
    const { id } = req.body;
    let found = false
    database.users.forEach((user) => {
        if (user.id === id){
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

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
