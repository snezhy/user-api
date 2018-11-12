require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb'); 

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
        const newUser = user.save();
        res.send(newUser);
    } catch(error) {
        res.status(400).send(error);
    }
    
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (err) => {
        res.status(400).send(err);
    });
});


app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    
    if (!ObjectId.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send();
         }
         res.send({user});
    }).catch ((e) => {
        res.status(400).send(e);
    });
});


app.delete('/users/:id', async (req, res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    try {
        const user = await User.findOneAndDelete(id);
        if (!user) {
           return res.status(404).send();
        }
        res.send({user});
    } catch (e) {
        res.status(400).send();
    };
});

app.patch('/users/:id', (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['email', 'firstName', 'lastName', 'address']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    User.findOneAndUpdate(id, {$set: body}, {new: true}).then((user) => {
        if (!user) {
          return res.status(404).send();
        }
  
        res.send({user});
      }).catch ((e) => {
        res.status(400).send();
    })

} )

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };