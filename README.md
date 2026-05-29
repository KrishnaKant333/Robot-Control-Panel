2D Robot Control Simulator Made using HTML/CSS/JS. 
In a 15x15 2D grid, the user can control a robot icon which can move cell by cell. Users can also give keyboard inputs to move the robot.

Current Position : Shows the current position of the robot in Cartesian coordinate system starting with (0,0) as the top left cell.
Direction : Shows the direction in which the robot is moving.
Steps : With each cell movement, the step counter increases by 1.
Battery : With each cell movement, the battery decreases by 1.

Boundary : The robot cannot move to the cells beyond the grid size, upon movement of which will display a message in the status bar.
Status bar : It shows the current status of the robot (eg. Autopilot mode, recharging,..) above the dashboard.
Dashboard : The coordinates, direction facing, steps taken, and battery of the robot are displayed in a dashboard.
Control buttons : The buttons for movement are given below the dashboard.

Keybindings : 
w/UP Arrow : Upward Movement
a/LEFT Arrow : Left Movement
s/DOWN Arrow : Downward Movement
d/RIGHT Arrow : Right Movement
f : AutoPilot Mode
Enter/Space : Start/Stop the robot

Obstacle Placement : The user can click on grid cells to place/remove obstacles. Robot can not pass through these obstacles. If the robot is made to move through an obstacle, it will show a message in the status bar.
AutoPilot Mode : The robot moves in a square loop in this mode until it is obstructed by obstacles or walls. Upon hindrance, autopilot mode is turned off.
Stop Button : The stop button is used to pause the movements of the robot in all direction and also disables autopilot mode. When the robot is stopped, it's battery recharges.
Breadcrumb Trail : Shows the path the robot has taken on the grid.
