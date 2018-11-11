const expect = require("expect");
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {User} = require('./../models/user');

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

beforeEach((done) => {
    User.deleteMany({}).then(() => {
      return User.insertMany(users);
    }).then(() => done());
});
   

describe('POST /users', () => {
    it("should create a new user", (done) => {
        let email = "test@test.com";
        let firstName = "Some First Name";
        let lastName = "Some Last Name";
        let address = "Some Address";

        request(app)
            .post('/users')
            .send({email, firstName, lastName, address})
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
                expect(res.body.firstName).toBe(firstName);
                expect(res.body.lastName).toBe(lastName);
                expect(res.body.address).toBe(address);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({email}).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].email).toBe(email);
                    expect(users[0].firstName).toBe(firstName);
                    expect(users[0].lastName).toBe(lastName);
                    expect(users[0].address).toBe(address);
                    done();
                }).catch((e) => done(e));
            });
            
    });

    it("should not create user with invalid body data", (done) => {

        request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find().then((users) => {
                    expect(users.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            });
    });
});

describe('GET /users', () => {
    it("should get all users", (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body.users.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /users/:id', () => {
    it("should return user doc", (done) => {
        request(app)
            .get(`/users/${users[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.user.email).toBe(users[0].email);
                expect(res.body.user.firstName).toBe(users[0].firstName);
                expect(res.body.user.lastName).toBe(users[0].lastName);
                expect(res.body.user.address).toBe(users[0].address);
            })
            .end(done);
    });


// TODO: check why the following fails
    it('should return 404 if user not found', (done) => {
        let hexId = new ObjectID().toHexString();
    
        request(app)
          .get(`/users/${hexId}`)
          .expect(404)
          .end(done);
      });


    it("should return 404 for non-object id", (done) => {

        request(app)
        .get('/users/123')
        .expect(404)
        .end(done);
    })
});
