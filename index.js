const inquirer = require("inquirer");
const fs = require('fs');
let globalAnswers = {
    manager: {

    },
    interns: [],
    engineers: []
}

inquirer.prompt([
    {
        name: 'teamManager',
        message: 'What is the team managers name?',
        type: 'input'
    },
    {
        name: 'managerEmployeeId',
        message: "What is the team manager's employeeID number",
        type: "input"
    },
    {
        name: 'managerEmailAddress',
        message: "What is the team manager's email address",
        type: "input"
    },
    {
        name: 'managerOfficeNumber',
        message: "What is the team manager's office number/cost center",
        type: "input"
    },
    // {
    //     name: 'addEmployees',
    //     message: "What would you like to do?",
    //     choices:["Add an Engineer?", "Add an Intern?", "Finish Building Team"],
    //     type: "list"
    // }
])
    .then(function (answer) {
        // const htmlAnswer = generateHtml(answer);
        // console.log(htmlAnswer)
        
        // writeToFile(htmlAnswer);
        globalAnswers = {...globalAnswers, manager: answer}
        addTeamMember()
    });

    function addTeamMember() {
        inquirer.prompt([
            {
                name: 'addEmployees',
                message: "What would you like to do?",
                choices:["Add an Engineer?", "Add an Intern?", "Finish Building Team"],
                type: "list"
    }]).then(function(answer){
        console.log(answer)
        if(answer.addEmployees === "Add an Engineer?") {
            addEngineer()
        } 
        else if(answer.addEmployees === "Add an Intern?") {
            addIntern()
        } else {
            const html = generateHtml()
            writeToFile(html)
            console.log(globalAnswers)
        }
    })}

    function addEngineer(){
        inquirer.prompt([
            {
                name: 'engineerName',
                message: "What is the engineer's name?",
                type: 'input'
            },
            {
                name: 'engineerId',
                message: "What is the engineer's employeeID number",
                type: "input"
            },
            {
                name: 'engineerEmail',
                message: "What is the engineer's email?",
                type: 'input'
            },
            {
                name: 'engineerGithub',
                message: "What is the engineer's Github username?",
                type: 'input'
            }
        ]).then(function(answer) {
            globalAnswers.engineers.push(answer)
            addTeamMember()
        })
        
    }

    function addIntern(){
        inquirer.prompt([
            {
                name: 'internName',
                message: "What is the intern's name?",
                type: 'input'
            },
            {
                name: 'internId',
                message: "What is the intern's employeeID number",
                type: "input"
            },
            {
                name: 'internEmail',
                message: "What is the intern's email",
                type: "input"
            },
            {
                name: 'internSchool',
                message: "what is the intern's school?",
                type: 'input'
            }
        ]).then(function(answer) {
            globalAnswers.interns.push(answer)
            addTeamMember()
        })
        
    }

    function generateHtml() {
        const body = globalAnswers.manager.teamManager;
        const bodyTwo = globalAnswers.manager.managerEmployeeId;
        const bodyThree = globalAnswers.manager.managerEmailAddress;
        const bodyFour = globalAnswers.manager.managerOfficeNumber;
        const bodyFive = globalAnswers.interns.map((intern) => {
            return `
            <div>Intern Name: ${intern.internName}</div> 
            <div>Intern ID: ${intern.internId}</div> 
            <div>Intern Email: ${intern.internEmail}</div>
            <div>Intern School: ${intern.internSchool}</div>
            `
        } )
        const bodySix = globalAnswers.engineers.map((engineer) => {
            return `
            <div>Engineer Name: ${engineer.engineerName}</div>
            <div>Engineer ID: ${engineer.engineerId}</div> 
            <div>Engineer Email: ${engineer.engineerEmail}</div>
            <div>Engineer Github: <a href ="https://www.github.com/${engineer.engineerGithub}">github</a></div>
            `
        })
        // const bodySeven = globalAnswers.engineers.map((engineer) => {
        //     return `github.com/${engineer.engineerGithub}`
        // })
      
        return '<!DOCTYPE html>'
             + '<html><head>' + '</head><body>' + 
             'Team Manager: ' + body + ' ' + 
             'Manager Employee Number: ' + bodyTwo + ' ' +
             'Manager Email Address:' + `<a href=mailto:${bodyThree}>${bodyThree}</a>` + ' ' +
             'Manager Office Number: ' + bodyFour + ' ' +

             bodyFive + ' ' +

             bodySix + ' ' +
             '</body></html>';
      };

      function writeToFile(data){
            fs.writeFile('./assets/index.html', data, err => {
                if(err) {
                    console.error(err);
                }
            });
      }
