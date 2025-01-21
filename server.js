// const notes = require('./notes.js');

// var age = notes.age;
// console.log(age);

// console.log("hello node js ");

// var add = (a,b) => { return a+b};

// console.log(add(5,6));

// function callback(){
//     console.log("this is the callback function ");
// }

// sum = (a,b) => {
//     console.log(a+b);
//     callback();
// }
// sum(5,10);

//packages

// let fs = require('fs');
// let os = require('os')

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt','hi '+ user.username+'!\n',() => {
//     console.log('file is created successfully')
// });

// console.log(fs)

// JSON -->
// const objectToconvert = {
//     "name" : 'john',
//     "age" : 24,
// }

// const json = JSON.stringify(objectToconvert);
// console.log(json);

// console.log(typeof json);




// Creating first Node js Server
const express = require('express')
const app = express();
const db = require('./db');
const MenuItem = require('./models/MenuItem');
const Person = require('./models/Person');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // requre-body


app.get('/',  (req, res) =>  {
    res.send('welcome to my first server');
})

//post route method to add a person
app.post('/person', async(req, res) => {
    try {
        const data = req.body // body contains person data

        //create a new person document using mongoose model 
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }
    catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})

// get method data from database
app.get('/person', async(req, res) => {
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);

    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// post method to add a menu item
app.post('/menu', async(req, res) => {
    try {
        const data = req.body
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data Saved');
        res.status(200).json(response);
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
// get method to get the menu items
app.get('/menu', async(req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// parametrized  of get method to fetch data from databse on work type
app.get('/person/:worktype',async(req, res) =>{
    try{
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
            const response = await Person.find({work: worktype});
            console.log('response fetched');
            res.status(200).json(response);
        }else {
            res.status(400).json({error: 'Invalid work type'})
        }
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'internal Server Error'});
    }
})

//import  the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.listen(4008, () => {
    console.log('your server is live');
});

