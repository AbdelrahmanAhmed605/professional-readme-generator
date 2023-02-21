//Packages needed for this application
const inquirer = require("inquirer");
const validator = require("email-validator");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");

//Helper functions to output text in the terminal in different colors
const outputRedText = (text) => console.log(`\u001b[31m${text}\u001b[0m`);
const outputGreenText = (text) => console.log(`\u001b[92m${text}\u001b[0m`);
const outputCyanText = (text) => console.log(`\u001b[36m${text}\u001b[0m`);

//Array of questions for user input
const questions = [
  {
    type: "input",
    message: "Please enter your Project Title: ",
    name: "title",
    default: () => usersEntry.title,
    validate: function (value) {
      return value === ""
        ? "Field cannot be blank, please enter your Project Title"
        : true;
    },
  },
  {
    type: "input",
    message: "Please enter your Project Description: ",
    name: "description",
    default: () => usersEntry.description,
    validate: function (value) {
      return value === ""
        ? "Field cannot be blank, please enter your Project Description"
        : true;
    },
  },
  {
    type: "input",
    message: "Please enter your Project's Installation Instructions: ",
    name: "installation",
    default: () => {
      return usersEntry.installation === "" ? "N/A" : usersEntry.installation;
    },
  },
  {
    type: "input",
    message: "Please enter your Project's Usage Information: ",
    name: "usage",
    default: () => {
      return usersEntry.usage === "" ? "N/A" : usersEntry.usage;
    },
  },
  {
    type: "input",
    message: "Please enter your Project's Contribution Guidelines: ",
    name: "contributions",
    default: () => {
      return usersEntry.contributions === "" ? "N/A" : usersEntry.contributions;
    },
  },
  {
    type: "input",
    message: "Please enter your Project's Test Instructions: ",
    name: "testing",
    default: () => {
      return usersEntry.testing === "" ? "N/A" : usersEntry.testing;
    },
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
    validate: function (value) {
      return value === ""
        ? "Field cannot be blank, please enter your Github Username"
        : true;
    },
  },
  {
    type: "input",
    message: "Please enter your Email Address: ",
    name: "email",
    //Checks to see the user entered a valid email
    validate: function (value) {
      return validator.validate(value)
        ? true
        : "Please enter a valid email address";
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
      outputCyanText(
        "Project Information: " + JSON.stringify(userAnswers, null, "\t")
      );
      usersEntry = userAnswers;

      return inquirer.prompt(nextAction);
    })
    .then((userAction) => {
      if (userAction.userChoice.includes("submit")) {
        outputGreenText("Proceeding with the above answers...");
        writeToFile("README.md", usersEntry);
      } else if (userAction.userChoice.includes("change")) {
        repeatPrompt();
      } else {
        outputRedText("ending program now...");
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
        outputCyanText("Project Information: "+ JSON.stringify(usersEntry));
        return inquirer.prompt(nextAction);
      })
      .then((userAction) => {
        if (userAction.userChoice.includes("submit")) {
          outputGreenText("Proceeding with the above answers...");
          writeToFile("README.md", usersEntry);
        } else if (userAction.userChoice.includes("change")) {
          repeatPrompt();
        } else {
          outputRedText("ending program now...");
          return;
        }
      });
  });
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  const markdownText = generateMarkdown(data);
  fs.writeFile(fileName, markdownText, (err) =>
    err ? console.log(err) : outputGreenText("Successfully created readme file!")
  );
}

// Function call to initialize app
init();
