require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb'); 

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/user');

let app = express();

let port = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.post('/users', async (req, res) => {
    let user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address
    });

    try {
        const newUser = await user.save();
        res.send(newUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send({users});
    } catch (e)  {
        res.status(400).send(e);
    };
});


app.get('/users/:id', async (req, res) => {
    let id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send();
         }
         res.send({user});
    } catch (e) {
        res.status(400).send(e);
    };
});


app.delete('/users/:id', async (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
           return res.status(404).send();
        }
        res.send({user});
    } catch (e) {
        res.status(400).send();
    };
});

app.patch('/users/:id', async (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['email', 'firstName', 'lastName', 'address']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    try {
        const user = await User.findOneAndUpdate({_id: id}, {$set: body}, {new: true}); 
        if (!user) {
          return res.status(404).send();
        }

        res.send({user});
      } catch (e) {
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };