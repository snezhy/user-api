# user-api

User API build with node js and Mongo DB. Testing is done using Mocha.js.

## Install

1. Checkout the repository
2. Open Terminal and from the root of the project run:

npm install (This will install all dependancies and create a folder node_modules in the root of the project).

3. Make sure you have Mongo DB installed on your machine
4. Create a folder in your home directory mongo-data
5. Open a new tab in Terminal and navigate to mongo/bin start Mongo DB Server
   ./mongod --dbpath ~/mongo-data
   
You are all set!

## How to use

In Postman run the following:

###### Create a New User 

POST Request <br/>
localhost:3000/users

Select Body and set to raw/JSON

Sample data for creating a user
...json
{
  "email": "postman@test.com",
  "firstName": "Postman",
  "lastName": "Posted",
  "address": "8 Dream Lane"
}
...

###### View all users

GET Request <br/>
localhost:3000/users/

###### View User By Id

GET Request <br/>
localhost:3000/users/{id}

###### Update User

PATCH Request <br/>
localhost:3000/users/{id}

###### Delete User

DELETE Request <br/>
localhost:3000/users/{id}

## Run Mocha Tests

In Terminal, from the root of the project run:
npm test

## Heroku 
The API has also been deployed on Heroku on the following URL:

https://ancient-ravine-50416.herokuapp.com/users

However, to create, update and delete users you will still need to use Postman.

## Future improvements
1. Adding a custom UI to consume the API

