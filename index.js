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
            return `<div>${intern.internName}</div>`
        } )
      
        return '<!DOCTYPE html>'
             + '<html><head>' + '</head><body>' + 
             'Team Manager: ' + body + ' ' + 
             'Manager Employee Number: ' + bodyTwo + ' ' +
             'Manager Email Address:' + `<a href=mailto:${bodyThree}>${bodyThree}</a>` + ' ' +
             'Manager Office Number: ' + bodyFour + bodyFive +
             '</body></html>';
      };

      function writeToFile(data){
            fs.writeFile('./assets/index.html', data, err => {
                if(err) {
                    console.error(err);
                }
            });
      }
