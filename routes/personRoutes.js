const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


// post route method to add a person
router.post('/', async(req, res) => {
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
router.get('/', async(req, res) => {
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);

    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//person worktype method
router.get('/:worktype',async(req, res) =>{
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

module.exports = router;
