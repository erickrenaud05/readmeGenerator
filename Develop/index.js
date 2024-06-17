// TODO: Include packages needed for this application
const fs = require('fs').promises
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
class Questions {
    constructor(type, message, name){
        this.type = type;
        this.message = message;
        this.name = name;
    }
}

const titleQuestion = new Questions('input', 'Project title: ', 'title');
const descriptionQuestion = new Questions('input', 'Description: ', 'description');
const usageQuestion = new Questions('input', 'Usage information: ', 'usage');
// const installationQuestion = new Questions('input', 'Installation: ', 'installation');

const questions = [titleQuestion, descriptionQuestion, usageQuestion];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    
}

// fs.writeFile('readme.md', `#${answer.title}`);
// TODO: Create a function to initialize app
function init() {
inquirer
    .prompt({
        type: 'checkbox',
        message: 'Please select any extra sections you would like to add to your readme',
        name: 'extras',
        choices: ['Table of contents', 'Installation', 'Collaboration', 'Test', 'Credits']
    })
    .then((answer) => {
        for (let extra of answer.extras) {
            const newQuestion = new Questions('input', `${extra}: `, extra);            
            questions.push(newQuestion);
        }
    inquirer
        .prompt(questions)
        .then((answer) => {
            const fileName = 'readme.md';
    
            var fileContent = `# ${answer.title}\n\n`;
            var x = 0;
            for (let answers in answer) {
                if(answer[answers] === '') {
                    answer[answers] = 'N/A';
                }
                if(x > 0) {
                    fileContent += `## ${answers}\n${answer[answers]}\n\n`;
                }
                x++
            }
            
            // const fileContent = `# ${answer.title}\n\n` +
            //                     `## Description\n${answer.description}\n\n` +
            //                     `## Installation\n${answer.Installation}\n\n` +
            //                     `## Usage\n${answer.usage}\n\n` +
            //                     `## Credits\n${answer.Credits}\n\n` +
            //                     `## How to contribute\n${answer.Collaboration}\n\n`+
            //                     `## Tests\n${answer.Test}`
    
            fs.writeFile(fileName, fileContent);
        })
    })
}

// Function call to initialize app
init();
