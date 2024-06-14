// TODO: Include packages needed for this application
const fs = require('fs').promises
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    
}

// fs.writeFile('readme.md', `#${answer.title}`);
// TODO: Create a function to initialize app
function init() {
inquirer
    .prompt([{
        type: 'input',
        message: 'Project title: ',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Description: ',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Installation instruction: ',
        name: 'installInstruction'
    },
    {
        type: 'input',
        message: 'Usage information: ',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Credits: ',
        name: 'credits'
    },
    {
        type: 'input',
        message: 'Contribution guidelines: ',
        name: 'contribution'
    },
    {
        type: 'input',
        message: 'Tests',
        name: 'tests'
    }])
    .then((answer) => {
        const fileName = 'readme.md';

        for (let answers in answer) {
            answer[answers] = 'N/A';
        }
        
        const fileContent = `# ${answer.title}\n\n` +
                            `## Description\n${answer.description}\n\n` +
                            `## Installation\n${answer.installInstruction}\n\n` +
                            `## Usage\n${answer.usage}\n\n` +
                            `## Credits\n${answer.credits}\n\n` +
                            `## How to contribute\n${answer.contribution}\n\n`+
                            `## Tests\n${answer.tests}`

        fs.writeFile(fileName, fileContent);
    })
}

// Function call to initialize app
init();
