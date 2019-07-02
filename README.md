# Mars-Rover-CLI
This is a simple Javascript Program that simulates a Mars Rover control with CLI control

## ASSUMPTIONS
   - The plateau is clear of any previous rover before placing a new rover on it
   - Valid directions are N, S, E and W

## INPUT
  - First line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0. 
  - The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. 
    The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore 
    the plateau. The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates 
    and the rover's orientation.
  - Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has 
    finished moving.
    
 ## OUTPUT
  - The output for each rover should be its final co-ordinates and heading.
  
## EXAMPLE:
    Test Input:
    
        5 5
        1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMRMRRM
        
    Expected Output:
    
        1 3 N
        5 1 E
        
## CLI interface

	![cli](https://user-images.githubusercontent.com/39042426/60539724-bfa95180-9d50-11e9-91a9-31c6e688eaef.png)

   
## Tests

	![test](https://user-images.githubusercontent.com/39042426/60538743-8b349600-9d4e-11e9-9e09-91c2e85c256c.png)
   
   
