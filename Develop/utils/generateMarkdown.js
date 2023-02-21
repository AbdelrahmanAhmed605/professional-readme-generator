// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  switch (license) {
    case "Apache License 2.0":
      return "[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    case "BSD 2-Clause 'Simplified' License":
      return "[![License: BSD 2-Clause](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
    case "BSD 3-Clause 'New' or 'Revised' License":
      return "[![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
    case "GNU General Public License v2.0":
      return "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
    case "GNU General Public License v3.0":
      return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    case "MIT License":
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    case "Mozilla Public License 2.0":
      return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    case "The Unlicense":
      return "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
    default:
      return "";
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch (license) {
    case "Apache License 2.0":
      return "https://www.apache.org/licenses/LICENSE-2.0";
    case "BSD 2-Clause 'Simplified' License":
      return "https://opensource.org/licenses/BSD-2-Clause";
    case "BSD 3-Clause 'New' or 'Revised' License":
      return "https://opensource.org/licenses/BSD-3-Clause";
    case "GNU General Public License v2.0":
      return "https://www.gnu.org/licenses/gpl-2.0.html";
    case "GNU General Public License v3.0":
      return "https://www.gnu.org/licenses/gpl-3.0.html";
    case "MIT License":
      return "https://opensource.org/licenses/MIT";
    case "Mozilla Public License 2.0":
      return "https://www.mozilla.org/en-US/MPL/2.0/";
    case "The Unlicense":
      return "http://unlicense.org/";
    default:
      return "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === "N/A") {
    return;
  }
  const licenseBadge = renderLicenseBadge(license);
  const licenseLink = renderLicenseLink(license);
  const licenseSection = `##License
${licenseBadge}
This project is licensed under the ${license}. To see the license permissions for commercial and non-commercial use, modification, and distribution of the software, please see the full text of the license, available at ${licenseLink}.`;

  return licenseSection;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const licenseSection = renderLicenseSection(data.license);

  return `# ${data.title}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

## Installation

${data.installation}

## Usage

${data.usage}

## Credits

Github Username: ${data.username}
Contact Email: ${data.email}

${licenseSection}

## How to Contribute

${data.contributions}

## Tests

${data.testing}
`;
}

module.exports = generateMarkdown;
