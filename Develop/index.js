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
        let tableOfContents = false;
        for (let extra of answer.extras) {
            if(extra !== 'Table of contents') {
                const newQuestion = new Questions('input', `${extra}: `, extra);            
                questions.push(newQuestion);
            } else {
                tableOfContents = true;
            }
        }
    inquirer
        .prompt(questions)
        .then((answer) => {
            const fileName = 'readme.md';
            '[text](#name)'
            var fileContent = `# ${answer.title}\n\n`;
            var x = 0;
            for (let answers in answer) {
                if(tableOfContents && x === 2) {
                    fileContent += `## Table of content\n`;
                    for (let question in questions) {
                        if(question > 1) {
                            fileContent += `[${questions[question].name}](#${questions[question].name})\n`;
                        }
                    }
                    fileContent += '\n';
                }
                if(answer[answers] === '') {
                    answer[answers] = 'N/A';
                }
                if(x > 0) {
                    fileContent += `## ${answers}\n${answer[answers]}\n\n`;
                }
                x++
            }
            
            fs.writeFile(fileName, fileContent);
        })
    })
}

// Function call to initialize app
init();
