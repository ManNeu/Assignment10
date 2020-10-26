const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

function askUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "teamMember",
            message: "Select a team member you want to add:",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members",
            ],
        },
    ]);
}

// Manager Questions
function managerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the name of a Manager?",
        },
        {
            type: "input",
            name: "managerID",
            message: "What is ID of the Manager?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Enter Manager's email: ",
        },
        {
            type: "input",
            name: "office",
            message: "Enter Manager's Office Number: ",
        },
    ]);
}

//Intern questions
function internQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is Intern's name?",
        },
        {
            type: "input",
            name: "internID",
            message: "What is ID of Intern?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "Provide Intern's email:",
        },
        {
            type: "input",
            name: "internSchool",
            message: "Provide the school name of Intern:",
        },
    ]);
}
// Engineer Questions
function engineerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is Engineer's name?",
        },
        {
            type: "input",
            name: "engineerID",
            message: "Provide Engineer's ID",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is Engineer's email?",
        },
        {
            type: "input",
            name: "engineerGit",
            message: "What is Engineer's GitHub username?",
        },
    ]);
}

function createHTML() {
    // save the result of render into a variable
    const HTML = render(team);
    fs.writeFile("team.html", HTML, error => {
        if (error) {
            console.log(error);

        } else {
            console.log("all done");

        }

    });
}

async function init() {
    try {
        const managerInfo = await managerQuestions();
        const newManager = new Manager(
            managerInfo.managerName,
            managerInfo.managerID,
            managerInfo.managerEmail,
            managerInfo.office
        );

        team.push(newManager);
        createNewTeamMember();
    } catch (err) {
        console.log(err);
    }
}

async function createNewTeamMember() {
    const newEmployeeType = await askUser();

    switch (newEmployeeType.teamMember) {
        case "Engineer":
            const newEngineerInfo = await engineerQuestions();
            const newEngineer = new Engineer(
                newEngineerInfo.engineerName,
                newEngineerInfo.engineerID,
                newEngineerInfo.engineerEmail,
                newEngineerInfo.engineerGit
            );
            team.push(newEngineer);
            createNewTeamMember();
            break;
        case "Intern":
            const newInternInfo = await internQuestions();
            const newIntern = new Intern(
                newInternInfo.internName,
                newInternInfo.internID,
                newInternInfo.internEmail,
                newInternInfo.internSchool
            );
            team.push(newIntern);
            createNewTeamMember();
            break;
        default:
            // generate HTML and save to the disk
            createHTML();
            console.log("success");
    }
    console.log(team);
}

init();
