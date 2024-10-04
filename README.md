# NoSQL Challenge: Social Network API

## Description
In this challenge, I built a set of APIs for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, the bcrypt package to hash passwords, and the express-session and connect-session-sequelize npm packages for authentication.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Review](#review)
* [Contact](#contact)


## Installation
Clone this project repository to your computer. You must have mongoDB installed.
Use the terminal to run the commands:
- use the command "npm install" to install application dependecies;
- use the command "npm start" to start server.
    

## Usage 
Use Postman or Insomnia Core client to test API routes.

/api/users

    * GET to get all users
    * POST to add a new user

/api/users/:userid

    * GET a single user by its _id
    * PUT to update a user by its _id
    * DELETE to delete user by its _id

/api/users/:userid/friends/:friendid

    * POST to add a new friend to a user's friend list
    * DELETE to delete a friend from a user's friend list

/api/thoughts

    * GET to get all thoughts
    * POST to add a new thought

/api/thoughts/:thoughtid

    * GET to get a single thought by its _id
    * PUT to update a thought by its _id
    * DELETE to delete a thought by its _id

/api/thoughts/:thoughtid/reactions

    * POST to add a new reaction

/api/thoughts/:thoughtid/reactions

    * DELETE to delete a reaction by the reactionid

## Screenshots

GET a single user by its _id

![alt text](/screenshots/image.png)

POST to add a new us/screenshots/er

![alt text](/screenshots/image-1.png)

POST to add a new friend to a user's friend list

![alt text](/screenshots/image-3.png)

GET to get a single thought by its _id

![alt text](/screenshots/image-4.png)

PUT to update a thought by its _id

![alt text](/screenshots/image-5.png)

POST to add a new reaction

![alt text](/screenshots/image-6.png)

## Review
A walkthrough video demonstrating the functionality of the application: https://drive.google.com/file/d/1jqhZn1k2b1lgIrfpzVml6QeBC7rAkk6R/view

The URL of the GitHub repository: https://github.com/akravt1274/Challenge-Social-Network-API

## Contact
Contact me with any ideas or requests: akravt1274@gmail.com
