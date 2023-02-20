// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const validator = require("email-validator");
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    message: "Please enter your Project Title: ",
    name: "title",
  },
  {
    type: "input",
    message: "Please enter your Project Description: ",
    name: "description",
  },
  {
    type: "input",
    message: "Please enter your Project's Installation Instructions: ",
    name: "installation",
  },
  {
    type: "input",
    message: "Please enter your Project's Usage Information: ",
    name: "usage",
  },
  {
    type: "input",
    message: "Please enter your Project's Contribution Guidelines: ",
    name: "contributions",
    default: "N/A",
  },
  {
    type: "input",
    message: "Please enter your Project's Test Instructions: ",
    name: "testing",
  },
  {
    type: "list",
    message: "Please select a license for your project",
    name: "license",
    choices: [
      "Apache License 2.0",
      "BSD 2-Clause 'Simplified' License",
      "BSD 3-Clause 'New' or 'Revised' License",
      "GNU General Public License v2.0",
      "GNU General Public License v3.0",
      "MIT License",
      "Mozilla Public License 2.0",
      "The Unlicense",
    ],
  },
  {
    type: "input",
    message: "Please enter your Github Username: ",
    name: "username",
  },
  {
    type: "input",
    message: "Please enter your Email Address: ",
    name: "email",
    validate: function (value) {
        if (validator.validate(value)) {
          return true;
        } else {
          return 'Please enter a valid email address.';
        }
      }
  }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      console.log("Answers:", answers);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Function call to initialize app
init();
