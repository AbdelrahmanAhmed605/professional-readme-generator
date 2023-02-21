//Packages needed for this application
const inquirer = require("inquirer");
const validator = require("email-validator");
const fs = require("fs");

//Array of questions for user input
const questions = [
  {
    type: "input",
    message: "Please enter your Project Title: ",
    name: "title",
    default: () => usersEntry.title,
  },
  {
    type: "input",
    message: "Please enter your Project Description: ",
    name: "description",
    default: () => usersEntry.description,
  },
  {
    type: "input",
    message: "Please enter your Project's Installation Instructions: ",
    name: "installation",
    default: () => usersEntry.installation,
  },
  {
    type: "input",
    message: "Please enter your Project's Usage Information: ",
    name: "usage",
    default: () => usersEntry.usage,
  },
  {
    type: "input",
    message: "Please enter your Project's Contribution Guidelines: ",
    name: "contributions",
    default: () => usersEntry.contributions,
  },
  {
    type: "input",
    message: "Please enter your Project's Test Instructions: ",
    name: "testing",
    default: () => usersEntry.testing,
  },
  {
    type: "list",
    message: "Please select a license for your project",
    name: "license",
    choices: [
      "N/A",
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
    //Checks to see the user entered a valid email
    validate: function (value) {
      if (validator.validate(value)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
];

//Prompts the user to choose their next steps (submit their input, make changes to their input, or exit the application)
const nextAction = [
  {
    type: "list",
    message: "Please select your next action: ",
    name: "userChoice",
    choices: [
      { name: "Submit my entry to the markdown file", value: "submit" },
      { name: "Make changes to my input", value: "change" },
      { name: "Exit the application", value: "exit" },
    ],
  },
];

//Prompts the user to select the specific topics in which they want to change their input for
const changeEntries = [
  {
    type: "checkbox",
    message: "Please select the options you want to change",
    name: "changeTopics",
    choices: [
      { name: "Project Title", value: "title" },
      { name: "Project Description", value: "description" },
      {
        name: "Project's Installation Instructions",
        value: "installation",
      },
      { name: "Project's Usage Information", value: "usage" },
      {
        name: "Project's Contribution Guidelines",
        value: "contributions",
      },
      { name: "Project's Test Instructions", value: "testing" },
      { name: "Project's License", value: "license" },
      { name: "Your Github Username", value: "username" },
      { name: "Your Email Address", value: "email" },
    ],
  },
];

//Keeps track of the users most recent entries
let usersEntry = {
  title: "",
  description: "",
  installation: "",
  usage: "",
  contributions: "",
  testing: "",
};

/*Initialize's app by calling the prompts to the user. After answering the prompts, the function checks if the user 
is satisfied with their input, wishes to make changes to their input, or end the application. If the user is 
satisfied with their input, then a markdown file is created with their information
*/
function init() {
  inquirer
    .prompt(questions)
    .then((userAnswers) => {
      console.log("Project Information:", userAnswers);
      usersEntry = userAnswers;

      return inquirer.prompt(nextAction);
    })
    .then((userAction) => {
      if (userAction.userChoice.includes("submit")) {
        console.log("Proceeding with the above answers...");
        writeToFile("readme.md", usersEntry);
      } else if (userAction.userChoice.includes("change")) {
        repeatPrompt();
      } else {
        console.log("ending program now...");
        return;
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

/* Repeatedly prompts the user (using incursion) to make changes to their initial input until they confirm they are 
satisfied with their input or exit the application. The function takes the users new input and updates the object 
containing the user's entries that are to be placed in the markdown file.
 */
function repeatPrompt() {
  inquirer.prompt(changeEntries).then((selectedChanges) => {
    //Contains the topics the user wishes to make changes to
    const selectedTopics = selectedChanges.changeTopics;
    const selectedQuestions = questions.filter((question) => {
      //returns an array containing the prompts for the topics in which the user wishes to make changes to
      return selectedTopics.includes(question.name);
    });
    console.log(selectedQuestions);
    inquirer
      .prompt(selectedQuestions)
      .then((newAnswers) => {
        for (const key in newAnswers) {
          if (newAnswers.hasOwnProperty(key)) {
            //Keeps track of users most recent entries by updating the userEntry array to accept the new input
            usersEntry[key] = newAnswers[key];
          }
        }
        console.log("Project Information:", usersEntry);
        return inquirer.prompt(nextAction);
      })
      .then((userAction) => {
        if (userAction.userChoice.includes("submit")) {
          console.log("Proceeding with the above answers...");
          writeToFile("readme.md", usersEntry);
        } else if (userAction.userChoice.includes("change")) {
          repeatPrompt();
        } else {
          console.log("ending program now...");
          return;
        }
      });
  });
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// Function call to initialize app
init();
