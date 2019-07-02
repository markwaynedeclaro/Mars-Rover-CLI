
const assert = require('chai').assert;
var rewire = require("rewire");

const App = require('../src/app');
const AppRewire = rewire('../src/app');
const Rover = AppRewire.__get__('Rover');

const validMaxLocation = '5 5';
const invalidMaxLocation = '-1 -5';

describe('App', function(){

    describe('Test checkIfValidMaxLocation()', function(){
        it('Test Valid Max locations', function(){
            assert.equal(App.checkIfValidMaxLocation(validMaxLocation), true);
            assert.equal(App.checkIfValidMaxLocation('0 0'), true);
            assert.equal(App.checkIfValidMaxLocation('1000 1000'), true);     
        });  
        
        it('Test Invalid Max locations', function(){
            assert.equal(App.checkIfValidMaxLocation('-1 0'), false);
            assert.equal(App.checkIfValidMaxLocation('0 -1'), false);
            assert.equal(App.checkIfValidMaxLocation('-1 -1'), false);
            assert.equal(App.checkIfValidMaxLocation('1'), false);
            assert.equal(App.checkIfValidMaxLocation('1 N'), false);
            assert.equal(App.checkIfValidMaxLocation('N'), false);
            assert.equal(App.checkIfValidMaxLocation('1 1 1'), false);
            assert.equal(App.checkIfValidMaxLocation('1 1 N'), false);
            assert.equal(App.checkIfValidMaxLocation('N n 1'), false);
            assert.equal(App.checkIfValidMaxLocation('N N'), false);  
        });          
    });    
    
    describe('Test checkIfValidInitialPosition()', function(){
        it('Test Valid Max locations, Valid Initial Position', function(){
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '0 0 N'), true);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '0 0 n'), true);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, validMaxLocation + ' N'), true);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, validMaxLocation + ' n'), true);
        });  
        
        it('Test Invalid Max locations, Valid Initial Position', function(){
            assert.equal(App.checkIfValidInitialPosition('-1 0', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('0 -1', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('-1 -1', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('1', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('1 N', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('N', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('1 1 1', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('1 1 N', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('N n 1', validMaxLocation + ' N'), false);
            assert.equal(App.checkIfValidInitialPosition('N N', validMaxLocation + ' N'), false);  
        });       
        
        it('Test Valid Max locations, Invalid Initial Position', function(){
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '1'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, 'N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '1 1'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '1 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '1 1 X'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '1 1 1'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '5 6 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '6 5 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '-1 1 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '1 -1 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '10 10 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, '10 10 N'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, validMaxLocation + ' N 1'), false);
            assert.equal(App.checkIfValidInitialPosition(validMaxLocation, validMaxLocation + ' N S'), false);
        });  

        it('Test Invalid Max locations, Invalid Initial Position', function(){
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '1'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, 'N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '1 1'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '1 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '1 1 X'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '1 1 1'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '5 6 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '6 5 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '-1 1 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '1 -1 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '10 10 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, '10 10 N'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, validMaxLocation + ' N 1'), false);
            assert.equal(App.checkIfValidInitialPosition(invalidMaxLocation, validMaxLocation + ' N S'), false);
        });          
    });  

    
    describe('Test checkIfValidRoverCommands()', function(){
        it('Test Valid Rover Commands', function(){
            assert.equal(App.checkIfValidRoverCommands('R'), true);
            assert.equal(App.checkIfValidRoverCommands('L'), true);
            assert.equal(App.checkIfValidRoverCommands('M'), true);
            assert.equal(App.checkIfValidRoverCommands('RL'), true);
            assert.equal(App.checkIfValidRoverCommands('RM'), true);
            assert.equal(App.checkIfValidRoverCommands('LM'), true);
            assert.equal(App.checkIfValidRoverCommands('r'), true);
            assert.equal(App.checkIfValidRoverCommands('l'), true);
            assert.equal(App.checkIfValidRoverCommands('m'), true);
            assert.equal(App.checkIfValidRoverCommands('rl'), true);
            assert.equal(App.checkIfValidRoverCommands('rm'), true);
            assert.equal(App.checkIfValidRoverCommands('lm'), true);
            assert.equal(App.checkIfValidRoverCommands('RrMrRllLLMMmrRm'), true);
        });  
        
        it('Test Invalid Rover Commands', function(){
            assert.equal(App.checkIfValidRoverCommands(''), false);
            assert.equal(App.checkIfValidRoverCommands('2'), false);
            assert.equal(App.checkIfValidRoverCommands('x'), false);
            assert.equal(App.checkIfValidRoverCommands('z'), false);
            assert.equal(App.checkIfValidRoverCommands('a'), false);
            assert.equal(App.checkIfValidRoverCommands('RMx'), false);
            assert.equal(App.checkIfValidRoverCommands('RM1'), false);
            assert.equal(App.checkIfValidRoverCommands('RM M'), false);
            assert.equal(App.checkIfValidRoverCommands('RrMx'), false);
            assert.equal(App.checkIfValidRoverCommands('RmL45'), false);
            assert.equal(App.checkIfValidRoverCommands('Rr Mx'), false);
            assert.equal(App.checkIfValidRoverCommands('Rm L45'), false);
        });          
    });  

    describe('Test submit()', function(){
        it('Test Valid input - single rover', function(){
            assert.equal(App.submit('5 5\n1 2 N\nLMLMLMLMM'), '1 3 N'); 
            assert.equal(App.submit('5 5\n1 2 N\nlmlmlmlmm'), '1 3 N'); 
            assert.equal(App.submit('5 5\n1 2 n\nLMLMLMLMM'), '1 3 N'); 
            assert.equal(App.submit('5 5\n1 2 n\nlmlmlmlmm'), '1 3 N'); 
            assert.equal(App.submit('5 5\n3 3 E\nMMRMMRMRRM'), '5 1 E'); 
            assert.equal(App.submit('5 5\n3 3 E\nmmrmmrmrrm'), '5 1 E'); 
            assert.equal(App.submit('5 5\n3 3 e\nMMRMMRMRRM'), '5 1 E'); 
            assert.equal(App.submit('5 5\n3 3 e\nmmrmmrmrrm'), '5 1 E'); 
        });  

        it('Test Valid input - multiple rover', function(){
            assert.equal(App.submit('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM'), '1 3 N\n5 1 E'); 
            assert.equal(App.submit('5 5\n1 2 N\nlmlmlmlmm\n3 3 E\nMMRMMRMRRM'), '1 3 N\n5 1 E'); 
            assert.equal(App.submit('5 5\n1 2 N\nlmlmlmlmm\n3 3 E\nmmrmmrmrrm'), '1 3 N\n5 1 E'); 
            assert.equal(App.submit('5 5\n1 2 n\nlmlmlmlmm\n3 3 E\nMMRMMRMRRM'), '1 3 N\n5 1 E'); 
            assert.equal(App.submit('5 5\n1 2 n\nlmlmlmlmm\n3 3 E\nmmrmmrmrrm'), '1 3 N\n5 1 E'); 
        });          
        
        it('Test modified input - single rover', function(){
            assert.notEqual(App.submit('5 5\n1 2 N\nLMLMLMLMMLM'), '1 3 N'); 
        });  

        it('Test modified input - multiple rover', function(){
            assert.notEqual(App.submit('5 5\n1 2 N\nLMLMLMLMMRM\n3 3 E\nMMRMMRMRRM'), '1 3 N\n5 1 E'); 
        }); 

    });   


    describe('Test Robot Class', function(){

        let rover = new Rover();
        
        it('Test setMaxLocation() - invalid max location', function(){
            assert.throws(() => rover.setMaxLocation(-1, 1));
            assert.throws(() => rover.setMaxLocation(1, -1));
            assert.throws(() => rover.setMaxLocation('N', 1));
            assert.throws(() => rover.setMaxLocation(1, 'N'));
        }); 

        
        it('Test placeRover() - invalid rover location', function(){
            rover.setMaxLocation(5, 5);
            assert.throws(() => rover.placeRover(-1, 1, 'N'));
            assert.throws(() => rover.placeRover(1, -1, 'N'));
            assert.throws(() => rover.placeRover(1, 1, 'X'));
        }); 

        it('Test placeRover() on an initial coordinate', function(){
            rover.placeRover(1, 2, 'N');
            assert.equal(rover.getLocation(), '1 2 N'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '2'); 
            assert.equal(rover.getDirection(), 'N'); 
            assert.equal(rover.getCleared(), true); 
        }); 

        it('Test move rover 1 unit towards it\'s current direction', function(){
            rover.move();
            assert.equal(rover.getLocation(), '1 3 N'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '3'); 
            assert.equal(rover.getDirection(), 'N'); 
            assert.equal(rover.getCleared(), true); 
        }); 

        it('Test turn rover to it\'s left relative to it\'s current direction', function(){
            rover.turnLeft();
            assert.equal(rover.getLocation(), '1 3 W'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '3'); 
            assert.equal(rover.getDirection(), 'W'); 
            assert.equal(rover.getCleared(), true); 
        }); 

        it('Test turn rover to it\'s right relative to it\'s current direction', function(){
            rover.turnRight();
            assert.equal(rover.getLocation(), '1 3 N'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '3'); 
            assert.equal(rover.getDirection(), 'N'); 
            assert.equal(rover.getCleared(), true); 
        }); 

        it('Test move rover to the edge of the boundery (will not go outside boundery)', function(){
            rover.move();
            assert.equal(rover.getLocation(), '1 4 N'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '4'); 
            assert.equal(rover.getDirection(), 'N'); 
            assert.equal(rover.getCleared(), true); 

            rover.move();
            assert.equal(rover.getLocation(), '1 5 N'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '5'); 
            assert.equal(rover.getDirection(), 'N'); 
            assert.equal(rover.getCleared(), true); 

            rover.move();
            assert.equal(rover.getLocation(), '1 5 N'); 
            assert.equal(rover.getxLocation(), '1'); 
            assert.equal(rover.getyLocation(), '5'); 
            assert.equal(rover.getDirection(), 'N'); 
            assert.equal(rover.getCleared(), true); 
        }); 

    });
});
