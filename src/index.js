const inquirer = require('inquirer');
const App = require('./app');
let input = '';
let maxCoordinate = '';
let roverCount = 0;

let question_1 = [
    {
        type: 'input',
        name: 'input_maxCoordinate',
        message: "Plateau's Max Coordinate : ",
    }
];

let question_2 = [
    {
        type: 'input',
        name: 'input_roverPosition',
        message: "",
    },
    {
        type: 'input',
        name: 'input_roverCommands',
        message: "",
    }   
];

let question_3 = [
    {
        type: 'input',
        name: 'input_moreRover',
        message: "Add Rover? ( Y/N ) : ",
    },   
];

let prompt1 = (question) => {
    return inquirer.prompt(question).then(answers => {

        if (!App.checkIfValidMaxLocation(`${answers['input_maxCoordinate']}`)) {
            console.info("-- Invalid Max Coordinate --")
            return prompt1(question_1);
        } else {
        
            validMaxCoordinate = true;    
            input = answers['input_maxCoordinate'];    
            maxCoordinate = answers['input_maxCoordinate'];
           
            let prompt2 = (question) => {

                roverCount++; 
                question_2[0].message = "Position of Rover "+roverCount+": ";
                question_2[1].message = "Commands for Rover "+roverCount+": ";

                return inquirer.prompt(question).then(answers => {
                                        
                    if (App.checkIfValidInitialPosition(maxCoordinate, answers['input_roverPosition']) && 
                        App.checkIfValidRoverCommands(answers['input_roverCommands'])) {
                                                                           
                        input += "\n" + answers['input_roverPosition'];  
                        input += "\n" + answers['input_roverCommands'];

                    }  else {
                        console.info("-- Invalid Input for Rover "+roverCount+" --")
                        roverCount--; 
                        return prompt2(question_2);
                    }
  
                    inquirer.prompt(question_3).then(answers => {
                        if (answers['input_moreRover'].toUpperCase() == "Y") {
                            return prompt2(question_2);
                        } else {
                            if (roverCount > 0) {
                                console.info("-----------------------------\n");
                                console.info(App.submit(input));
                                console.info("\n-----------------------------");
                            }
                        }
                    });

                });
            };

            prompt2(question_2);

        }

    });

};


prompt1(question_1);




