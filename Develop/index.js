// TODO: Include packages needed for this application
const fs = require('fs').promises
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
class Questions {
    constructor(type, message, name, choices){
        this.type = type;
        this.message = message;
        this.name = name;

        if(choices){
            this.choices = choices
        }
    }
}

const titleQuestion = new Questions('input', 'Project title: ', 'title');
const descriptionQuestion = new Questions('input', 'Description: ', 'Description');
const usageQuestion = new Questions('input', 'Usage information: ', 'Usage');
const licenseQuestion = new Questions('list', 'Please select your license', 'license', ['N/A', 'MIT', 'MPL_2.0', 'ISC'])
const githubUsernameQuestion = new Questions('input', 'Please enter github username', 'username');
const emailAddressQuestion = new Questions('input', 'Please enter email address', 'email');
// const installationQuestion = new Questions('input', 'Installation: ', 'installation');

const questions = [githubUsernameQuestion, emailAddressQuestion, titleQuestion, descriptionQuestion, usageQuestion, licenseQuestion];

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
            const fileName = 'README.md';
            var fileContent = `# ${answer.title}\n\n`;
            var questionsSection = false;
            var x = 0
            for (let answers in answer) {
                if(tableOfContents && x === 2) {
                    fileContent += `## Table of content\n`;
                    for (let question in questions) {
                        if(question > 2) {
                            fileContent += `[${questions[question].name}](#${questions[question].name.toLowerCase()})\\\n`;
                        }
                    }
                    if(answer.username !== 'N/A' && !questionsSection || answer.email !== 'N/A' && !questionsSection){
                        fileContent += `[Questions](#questions)`
                        questionsSection = true;
                    }
                    fileContent += '\n\n';
                }
                if(answer[answers] === '') {
                    answer[answers] = 'N/A';
                }
                if(answers !== 'title' && answers !== 'license' && answers !== 'username' && answers !== 'email') {
                    fileContent += `## ${answers}\n${answer[answers]}\n\n`;
                }
                x++
            }
            if(answer.license !== 'N/A') {
                fileContent += `## License\nPlease refer to license in repo or badge area\n\n`;
                fileContent += `## Badges\n![${answer.license}](https://img.shields.io/badge/license-${answer.license}-blue)\n\n`;
            }

            if(answer.username !== 'N/A' && answer.email !== 'N/A'){
                fileContent += `## Questions\nIf you have any questions, email me at ${answer.email}, or visit my github page at https://github.com/${answer.username}\n\n`;
            } else if(answer.username === 'N/A' && answer.email !== 'N/A') {
                fileContent += `## Questions\nIf you have any questions, email me at ${answer.email}.`;
            } else if(answer.username !== 'N/A' && answer.email === 'N/A'){
                fileContent += `## Questions\nIf you have any questions, visit my github at https://github.com/${answer.username}.`;
            }

            fs.writeFile(fileName, fileContent);
        })
    })
}

// Function call to initialize app
init();
