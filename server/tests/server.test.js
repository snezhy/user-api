const expect = require("expect");
const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');

beforeEach((done) => {
    User.deleteMany({}).then(() => done());
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

                User.find().then((users) => {
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
                    expect(users.length).toBe(0);
                    done();
                }).catch((e) => done(e))
            })
    });
});
