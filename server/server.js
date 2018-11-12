let express = require('express');
let bodyParser = require('body-parser');
let {ObjectId} = require('mongodb'); 

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/user');

let app = express();

let port = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    let user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
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


app.delete('/users/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send("Id is invalid");
    }

    User.findOneAndDelete(id).then((user) => {
        if (!user) {
           return res.status(404).send();
        }
        res.send({user});
    }).catch ((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };