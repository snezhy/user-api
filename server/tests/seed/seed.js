const {ObjectID} = require('mongodb');

const {User} = require ('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: new ObjectID(),
    email: 'email_one@test.com',
    firstName: 'FirstNameOne',
    lastName: 'LastNameOne',
    address: "1 Dream Lane"
}, {
    _id: new ObjectID(),
    email: 'email_two@test.com',
    firstName: 'FirstNameTwo',
    lastName: 'LastNameTwo',
    address: "2 Dream Lane"
}];

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        return User.insertMany(users);
      }).then(() => done());
}

module.exports = {users, populateUsers};