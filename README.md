# CS452: Computer Graphics, Project 1

Galaga

A and D, or Left arrow and Right arrow to move. Space bar to shoot.
You have 15 life points and must score 50 points to win.
Shoot enemies without being shot is the idea between this classic game. 

Implementing the game was a fun time. We have a setup function and an animate function
for each polygon in the game. 5 enemy polygons, 5 enemy bullets, 1 fighter, and 2 fighter bullets.
The setup functions consist of initalizing values such as coordinates, points, and the buffer. 
The animate functions describe what the polygon is doing while it is active, and what happens when
when the polygon collides with another (enemy gets hit  or fighter gets hit by bullet).
When life is lost of a point is scored, js accesses the html display by id to update the user. 
Render keeps the polygons updated and acts when a hit occurs, how many bullets are in stock, and when
a win/lose condition is met. It also keeps track of movement of the fighter.
The keys event function handles all the keyboard input possibilites from the user. 


We use pythagorean theorem to detect if the enemies or fighters get hit by the the bullets. 
The fighter and enemy has the "radius" of 0.05 and the bullet has the "radius" of 0.025. So we will take
the square root of((enemy x coord - bullet x coord)^2+(enemy y coord - bullet y coord )^2) and the result
should be less than or equal to the sum of the fighter "radius" and bullet "radius". Thus, the enemy will get hit.


For the translation of the 5 enemies. I make them go from left to right without going out of the canvas; they
translate to the opposite direction when they hit the right end of the canvas (Originally 1, But I set it to 0.93)
and left end of the canvas (-0.93).To do this, I set a count for each enemy; if the count < 1000, move to right and within this, if
we meet the right end of the canvas, move to left and set  count = 1000; then, it will go to if the count < 2000. move
to left and within this, if we meet the left end of canvas, move to right and set count = 2000; when count >= 2000, count = 0.

For the collision detection between enemies, I use the coordinate subtraction for each two enemies if the result is less than
or equal to the sum of the radius of two enemies(we set it to 0.095 more than the sum of radii of enemies); if this happens, they will move to different direction. For this implementation,
we encountered a lot float number precison problem; sometime the subtraction between coordinate have higher number than the 0.095, so that
they will not go to different direction and they will clip each other.

we have two bullet for fighter. we set different speed to first and second bullet. First bullet is faster than second bullet.

The game would be even harder if we made the enemy and enemy bullet animations respawn at seperate times, 
rather than the bullet resetting when the respective enemy dies.
