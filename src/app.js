/* 
    ASSUMPTIONS :
    - The plateau is clear of any previous rover before placing a new rover on it
    - Valid directions are N, S, E and W
*/

const Command = {
    LEFT:   "L",
    RIGHT:  "R",
    MOVE:   "M"
};

const Direction = {
    NORTH:  "N",
    SOUTH:  "S",
    EAST:   "E",
    WEST:   "W"
};


function CustomException(message) {
    const error = new Error(message);
    return error;
}
  
CustomException.prototype = Object.create(Error.prototype);



/*
    Rover Class
*/
function Rover() 
{
    this.minLocation = { x: 0, y: 0 };
    this.cleared = false;
    this.maxLocation = { x: 0, y: 0 };
    this.location = { x: 0, y: 0 };
    this.direction = '';
}

/* 
    Sets the max border 
*/
Rover.prototype.setMaxLocation = function(x, y) 
{
    if (x < this.minLocation.x || isNaN(x))
        throw new CustomException('Invalid X value');
    if (y < this.minLocation.y || isNaN(y))
        throw new CustomException('Invalid Y value');        
        
    this.maxLocation.x = x;
    this.maxLocation.y = y;
};

/* 
    Places the rover on the plateau if the parameters are of valid values
*/
Rover.prototype.placeRover = function(x, y, newDirection) 
{
    if (x < this.minLocation.x || x > this.maxLocation.x || isNaN(x))
        throw new CustomException('Invalid X value');
    if (y < this.minLocation.y || y > this.maxLocation.y || isNaN(y))
        throw new CustomException('Invalid Y value');
    if (!Object.values(Direction).includes(newDirection.toUpperCase()))    
        throw new CustomException('Invalid direction value');

    this.location.x = x;
    this.location.y = y;
    this.direction = newDirection.toUpperCase();
    this.cleared = true;
    return true;
};

/*
    will return TRUE if:
    rover has already landed on the plateau (cleared = true)
    and
    the intended next position is still on the plateau
*/
Rover.prototype.move = function() 
{
    if (!this.cleared || this.direction == null) {
        return false;
    } else {
        let tempXLoc = this.location.x;
        let tempYLoc = this.location.y;
        switch (this.direction) {
            case Direction.NORTH:
                tempYLoc++;
                break;
            case Direction.SOUTH:
                tempYLoc--;
                break;
            case Direction.WEST:
                tempXLoc--;
                break;
            case Direction.EAST:
                tempXLoc++;
                break;
        }
        if ((tempXLoc > this.maxLocation.x || tempXLoc < this.minLocation.x ) || (tempYLoc > this.maxLocation.y || tempYLoc < this.minLocation.y )) {
            return false;
        } else {
            this.location.x = tempXLoc;
            this.location.y = tempYLoc;
        }
        return true;
    }
}

/*
    will change the value of direction (to the left of current orientation) if:
    rover has already landed on the plateau (cleared = true)
    and
    direction value is a valid value
*/
Rover.prototype.turnLeft = function() 
{
    if (this.cleared || this.direction != null) {
        switch (this.direction) {
            case Direction.NORTH:
                this.direction = Direction.WEST;
                break;
            case Direction.SOUTH:
                this.direction = Direction.EAST;
                break;
            case Direction.WEST:
                this.direction = Direction.SOUTH;
                break;
            case Direction.EAST:
                this.direction = Direction.NORTH;
                break;
        }
    }
};

/*
    will change the value of direction (to the right of current orientation) if:
    rover has already landed on the plateau (cleared = true)
    and
    direction value is a valid value
*/
Rover.prototype.turnRight = function() 
{
    if (this.cleared || this.direction != null) {
        switch (this.direction) {
            case Direction.NORTH:
                this.direction = Direction.EAST;
                break;
            case Direction.SOUTH:
                this.direction = Direction.WEST;
                break;
            case Direction.WEST:
                this.direction = Direction.NORTH;
                break;
            case Direction.EAST:
                this.direction = Direction.SOUTH;
                break;
        }
    }
}

/*
    returns the current location of the rover
*/
Rover.prototype.getLocation =function() 
{
    return this.location.x + " " + this.location.y + " " + this.direction;
}

Rover.prototype.getxLocation = function() {
    return this.location.x;
}

Rover.prototype.getyLocation = function() {
    return this.location.y;
}

Rover.prototype.getDirection = function() {
    return this.direction;
}

Rover.prototype.getCleared = function() {
    return this.cleared;
}






module.exports = {

    checkIfValidMaxLocation: function(maxLocation) {
        let maxLocationCoordinate = maxLocation.split(" ");
        
        if(maxLocationCoordinate.length != 2)
            return false;
        if (!(!isNaN(maxLocationCoordinate[0]) && parseInt(maxLocationCoordinate[0]) > -1))   
            return false;
        if (!(!isNaN(maxLocationCoordinate[1]) && parseInt(maxLocationCoordinate[1]) > -1))
            return false; 

        return true;           
    },

    checkIfValidInitialPosition: function(maxLocation, position) {
        let maxLocationCoordinate = maxLocation.split(" ");
        let initialPosition = position.split(" ");

        if (!module.exports.checkIfValidMaxLocation(maxLocation)) 
            return false;
        if(initialPosition.length != 3) 
            return false;
        if (!(!isNaN(initialPosition[0]) && parseInt(initialPosition[0]) > -1 && parseInt(initialPosition[0]) <= parseInt(maxLocationCoordinate[0]))) 
            return false;
        if (!(!isNaN(initialPosition[1]) && parseInt(initialPosition[1]) > -1 && parseInt(initialPosition[1]) <= parseInt(maxLocationCoordinate[1]))) 
            return false;
        if (!Object.values(Direction).includes(initialPosition[2].toUpperCase())) 
            return false;
        
        return true;           
    },

    checkIfValidRoverCommands: function(newCommand) {
        if (newCommand.length < 1) 
            return false;
            
        for(let j = 0; j < newCommand.length; j++) {
            if (!Object.values(Command).includes(newCommand.charAt(j).toUpperCase())) {
                return false;
            }
        }
        return true;           
    },

    submit: function(input) {
        let output = '';
        let splitted = input.split("\n"); 
        const newLine = "\n";
        let initial = [];
        let lineCommands = [];
               
        let rover = new Rover();

        // get Max location
        let maxLocationCoordinate = splitted[0].split(" ");
        rover.setMaxLocation(maxLocationCoordinate[0], maxLocationCoordinate[1]);

        for(let i = 1; i<splitted.length; i+=2) {
            
            initial = splitted[i].split(" ");
            rover.placeRover(initial[0], initial[1], initial[2]);

            lineCommands = splitted[i+1];
            for(let j = 0; j < lineCommands.length; j++) {
                switch (lineCommands.charAt(j).toUpperCase()) {
                    case Command.LEFT:
                        rover.turnLeft();
                        break;
                    case Command.RIGHT:
                        rover.turnRight();
                        break;
                    case Command.MOVE:
                        rover.move();
                        break;
                    default:
                        break;
                }
            }
            output += rover.getLocation().concat(newLine);
        }

        return output.slice(0, output.length - 1);
    }    

}





