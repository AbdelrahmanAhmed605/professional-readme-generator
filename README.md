# Professional README Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A command-line application that dynamically generates a professional README.md file from a user's input using the Inquirer package. The Inquirer package allows for the creation of command lind prompts to get input on a project's information from the user. Using this information, a markdown file is generated containing all of the user's information formatted into a professional readme file. During this project, Abdelrahman learnt the following skills: 
- using npm to install packages to the project 
- using npm init to create a package.json file where project dependencies can be tracked 
- using require to load modules into the project and attach them to a variable 
- using the inquirer and file-system packages appropriately through reading their documentation 
- using modularization to create multiple js files and export and import the modules

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation

As the project does not use publishing softwares like Heroku and is only availabe in the command line, the user will have to install the inquirer and email-validator packages. To install these packages, the user must run these commands in the terminal before running the application: `npm i inquirer@8.2.4` and `npm i email-validator`. Please ensure you are in the project directory when installing these packages.

## Usage

For a walkthrough of how to use the application, refer to the following demonstration: https://watch.screencastify.com/v/SR1BIZoG2LNoiX5MNCSU

Once the packages are installed, to run the application, the user must type `node index` in the terminal.  This will then generate a sequence of prompts requesting project information from the user. Once all the prompts have been completed, the user will be presented with all their input for them to review and then given the option to submit their input, make changes to their input, or end the application. If the user opts to make changes, they will be prompted to choose which sections they wish to make their changes to. The user will then be allowed to update their information as many times as they'd like until they are satisfied with the data that is displayed for them to review. Once the user is satisfied with their input and submit their input, a README.md file will be generated containig all the information they placed.

## License

This project is licensed under the MIT License. To see the license permissions for commercial and non-commercial use, modification, and distribution of the software, please see the full text of the license, available at https://opensource.org/licenses/MIT.

## How to Contribute

N/A

## Tests

N/A

## Questions

If you have any questions regarding this application, feel free to reach me at abdelrahman.ahmed605@hotmail.com with the subject title "Question for Professional-readme-generator"
You can also find me on github here: https://github.com/AbdelrahmanAhmed605
