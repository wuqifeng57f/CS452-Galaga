var gl, shaderProgram, colorUniform;

var fighterId; // Fighter
var tx, ty;
var fighter_x, fighter_y;
var txUniform, tyUniform;
var half_square_length = 0.05;
var half_bullet_length = 0.025;
var fighterGetShot;

// Two enemies
var enemyId1, enemyId2, enemyId3, enemyId4, enemyId5; // enemy buffer
var enemy_x1, enemy_x2, enemy_x3, enemy_x4, enemy_x5;
var enemy_y1, enemy_y2, enemy_y3, enemy_y4, enemy_y5;
var enemyGetShot1, enemyGetShot2, enemyGetShot3, enemyGetShot4, enemyGetShot5;

var enemyBulletId1, enemyBulletId2, enemyBulletId3, enemyBulletId4, enemyBulletId5; // bullet buffer
var tx_enemy_bullet1, tx_enemy_bullet2, tx_enemy_bullet3, tx_enemy_bullet4, tx_enemy_bullet5; // enemy bullet
var ty_enemy_bullet1, ty_enemy_bullet2, ty_enemy_bullet3, ty_enemy_bullet4, ty_enemy_bullet5;
var ene_bullet_x1, ene_bullet_x2, ene_bullet_x3, ene_bullet_x4, ene_bullet_x5;
var ene_bullet_y1, ene_bullet_y2, ene_bullet_y3, ene_bullet_y4, ene_bullet_y5;
var temp_tx_enemy_bullet1, temp_tx_enemy_bullet2, temp_tx_enemy_bullet3, temp_tx_enemy_bullet4, temp_tx_enemy_bullet5;
var isEnemyShooting1, isEnemyShooting2, isEnemyShooting3, isEnemyShooting4, isEnemyShooting5; // enemy shooting
var tx_enemy1, tx_enemy2, tx_enemy3,tx_enemy4, tx_enemy5;

var life; // Loss condition
var score; // Win condition
var count1, count2, count3, count4, count5; // Translation
// Two Bullets
var bulletId1, bulletId2; // bullet buffers
var isShooting1, isShooting2; // if bullets are in use
var temp_tx_fighter1, temp_tx_fighter2; // temp bullet values
var tx_bullet1, tx_bullet2; // bullet translation
var ty_bullet1, ty_bullet2;
var bullet_x1, bullet_x2; // bullet coordinates
var bullet_y1, bullet_y2;

var temp_tx_enemy1, temp_tx_enemy2, temp_tx_enemy3,temp_tx_enemy4,temp_tx_enemy;

var pos = 0, neg = 0; // Key events for fighter

function init() {
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    gl.clearColor( 0.0, 0.0 , 0.0, 1.0 );
    
    shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(shaderProgram);

    life = 15; // Fighter Variables
    score = 0;
    tx = 0, ty = 0;
    tx_bullet1 = 0, ty_bullet1 = 0;
    tx_bullet2 = 0, ty_bullet2 = 0;
    isShooting1 = 0, isShooting2 = 0;
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    
    tx_enemy1 = 0;
    ty_enemy1 = 0;
    tx_enemy2 = 0;
    ty_enemy2 = 0;
    tx_enemy3 = 0;
    ty_enemy3 = 0;
    tx_enemy4 = 0;
    ty_enemy4 = 0;
    tx_enemy5 = 0;
    ty_enemy5 = 0;
    
    tx_enemy_bullet1 = 0;
    tx_enemy_bullet2 = 0;
    tx_enemy_bullet3 = 0;
    tx_enemy_bullet4 = 0;
    tx_enemy_bullet5 = 0;
    
    ty_enemy_bullet1 = ty_enemy_bullet2 = ty_enemy_bullet3 = ty_enemy_bullet4 = ty_enemy_bullet5 = 0;
    isEnemyShooting1 = isEnemyShooting2 = isEnemyShooting3 = isEnemyShooting4 = isEnemyShooting5 = 1;
    enemyGetShot1 = enemyGetShot2 = enemyGetShot3 = enemyGetShot4 = enemyGetShot5 = 0;
    
    setupFighter(); // Setup Functions

    setupEnemy1();
    setupEnemy2();
    setupEnemy3();
    setupEnemy4();
    setupEnemy5();

    tx_enemy_bullet1 = ene_bullet_x1;
    tx_enemy_bullet2 = ene_bullet_x2;
    tx_enemy_bullet3 = ene_bullet_x3;
    tx_enemy_bullet4 = ene_bullet_x4;
    tx_enemy_bullet5 = ene_bullet_x5;
    
    setupBullet1();
    setupBullet2();

    setupBulletForEnemy1();
    setupBulletForEnemy2();
    setupBulletForEnemy3();
    setupBulletForEnemy4();
    setupBulletForEnemy5();
    
    render();
}

function setupFighter(){
    // Set up array of points for fighter.
    var p0 = vec2(0.05, -0.85);
    var p1 = vec2(-0.05, -0.85);
    var p2 = vec2(-0.05,-0.95);
    var p3 = vec2(0.05, -0.95);
    
    var arrayOfPoints = [p0, p1, p2, p3];
    
    fighter_x = 0;
    fighter_y = 0.90;
    
    fighterId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fighterId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints),gl.STATIC_DRAW);
} // Fighter

function setupEnemy1() { // Enemy1
    var p0 = vec2(0.05, 0.95);
    var p1 = vec2(-0.05, 0.95);
    var p2 = vec2(-0.05,0.85);
    var p3 = vec2(0.05, 0.85);
    
    var arrayOfPoints = [p0, p1, p2, p3];

    enemy_x1 = 0 + tx_enemy1;
    enemy_y1 = 0.9;
    ene_bullet_x1 = 0;
    ene_bullet_y1 = 0.775;
    ty_enemy_bullet1 = 0;
    
    enemyId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints),gl.STATIC_DRAW);
} // Position: .0
function setupEnemy2() { // Enemy2
    var p0 = vec2(0.5, 0.95);
    var p1 = vec2(0.4, 0.95);
    var p2 = vec2(0.4, 0.85);
    var p3 = vec2(0.5, 0.85);

    var arrayOfPoints = [p0, p1, p2, p3];

    enemy_x2 = 0.45 + tx_enemy2;
    enemy_y2 = 0.9;
    ene_bullet_x2 = 0.45;
    ene_bullet_y2 = 0.775;
    ty_enemy_bullet2 = 0;

    enemyId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
} // Position: .45
function setupEnemy3() { // Enemy3
    var p0 = vec2(-0.4, 0.95);
    var p1 = vec2(-0.5, 0.95);
    var p2 = vec2(-0.5, 0.85);
    var p3 = vec2(-0.4, 0.85);

    var arrayOfPoints = [p0, p1, p2, p3];

    enemy_x3 = -0.45 + tx_enemy3;
    enemy_y3 = 0.9;
    ene_bullet_x3 = -0.45;
    ty_enemy_bullet3 = 0;

    enemyId3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
} // Position: -.45
function setupEnemy4() { // Enemy4
    var p0 = vec2(0.95, 0.95);
    var p1 = vec2(0.85, 0.95);
    var p2 = vec2(0.85, 0.85);
    var p3 = vec2(0.95, 0.85);

    var arrayOfPoints = [p0, p1, p2, p3];

    enemy_x4 = 0.9 + tx_enemy4;
    enemy_y4 = 0.9;
    ene_bullet_x4 = 0.9;
    ty_enemy_bullet4 = 0;

    enemyId4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
} // Position: .9
function setupEnemy5() { // Enemy5
    var p0 = vec2(-0.85, 0.95);
    var p1 = vec2(-0.95, 0.95);
    var p2 = vec2(-0.95, 0.85);
    var p3 = vec2(-0.85, 0.85);

    var arrayOfPoints = [p0, p1, p2, p3];

    enemy_x5 = -0.9 + tx_enemy5;
    enemy_y5 = 0.9;
    ene_bullet_x5 = -0.9;
    ty_enemy_bullet5 = 0;

    enemyId5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
} // Position: -.9

function setupBullet1(){
    var p0 = vec2(0.025, -0.75);
    var p1 = vec2(-0.025, -0.75);
    var p2 = vec2(-0.025,-0.80);
    var p3 = vec2(0.025, -0.80);
    
    bullet_x1 = 0;
    bullet_y1 = -0.775;
    
    var arrayOfPoints = [p0, p1, p2, p3];
    
    bulletId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bulletId1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints),gl.STATIC_DRAW);
} // Fighter bullets
function setupBullet2() {
    var p0 = vec2(0.025, -0.75);
    var p1 = vec2(-0.025, -0.75);
    var p2 = vec2(-0.025, -0.80);
    var p3 = vec2(0.025, -0.80);

    bullet_x2 = 0;
    bullet_y2 = -0.775;

    var arrayOfPoints = [p0, p1, p2, p3];

    bulletId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bulletId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
}

function setupBulletForEnemy1(){ // Enemy bullets
    var p0 = vec2(0.025, 0.75);
    var p1 = vec2(-0.025, 0.75);
    var p2 = vec2(-0.025, 0.80);
    var p3 = vec2(0.025, 0.80);
    
    var arrayOfPoints = [p0, p1, p2, p3];
    
    temp_tx_enemy_bullet1 = ene_bullet_x1;
    enemyBulletId1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints),gl.STATIC_DRAW);
} // Enemy Bullets
function setupBulletForEnemy2() {
    var p0 = vec2(0.025, 0.75);
    var p1 = vec2(-0.025, 0.75);
    var p2 = vec2(-0.025, 0.80);
    var p3 = vec2(0.025, 0.80);

    var arrayOfPoints = [p0, p1, p2, p3];

    temp_tx_enemy_bullet2 = ene_bullet_x2;
    enemyBulletId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
}
function setupBulletForEnemy3() {
    var p0 = vec2(0.025, 0.75);
    var p1 = vec2(-0.025, 0.75);
    var p2 = vec2(-0.025, 0.80);
    var p3 = vec2(0.025, 0.80);

    var arrayOfPoints = [p0, p1, p2, p3];

    temp_tx_enemy_bullet3 = ene_bullet_x3;
    enemyBulletId3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
}
function setupBulletForEnemy4() {
    var p0 = vec2(0.025, 0.75);
    var p1 = vec2(-0.025, 0.75);
    var p2 = vec2(-0.025, 0.80);
    var p3 = vec2(0.025, 0.80);

    var arrayOfPoints = [p0, p1, p2, p3];

    temp_tx_enemy_bullet4 = ene_bullet_x4;
    enemyBulletId4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
}
function setupBulletForEnemy5() {
    var p0 = vec2(0.025, 0.75);
    var p1 = vec2(-0.025, 0.75);
    var p2 = vec2(-0.025, 0.80);
    var p3 = vec2(0.025, 0.80);

    var arrayOfPoints = [p0, p1, p2, p3];

    temp_tx_enemy_bullet5 = ene_bullet_x5;
    enemyBulletId5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (tx < .93)  { tx += pos * .03; fighter_x += pos * .03; }
    if (tx > -.93) { tx += neg * -.03; fighter_x += neg * -.03; }

    txUniform =  gl.getUniformLocation(shaderProgram, "tx");
    tyUniform = gl.getUniformLocation(shaderProgram, "ty");
    colorUniform = gl.getUniformLocation(shaderProgram, "shapeColor");
     
    animateFighter();

    if(!enemyGetShot1){
        animateEnemy1();
        animateEnemyBullet1();
    } else {
        setupEnemy1();
        setupBulletForEnemy1();
    }

    if (!enemyGetShot2) {
        animateEnemy2();
        animateEnemyBullet2();
    } else {
        setupEnemy2();
        setupBulletForEnemy2();
    }

    if (!enemyGetShot3) {
        animateEnemy3();
        animateEnemyBullet3();
    } else {
        setupEnemy3();
        setupBulletForEnemy3();
    }

    if (!enemyGetShot4) {
        animateEnemy4();
        animateEnemyBullet4();
    } else {
        setupEnemy4();
        setupBulletForEnemy4();
    }

    if (!enemyGetShot5) {
        animateEnemy5();
        animateEnemyBullet5();
    } else {
        setupEnemy5();
        setupBulletForEnemy5();
    }

    if (!isShooting1) { // Bullet 1
        temp_tx_fighter1 = tx; // store the x axis of bullet.
    } else {
        animateBullet1();
    }
    if (!isShooting2) { // Bullet 2
        temp_tx_fighter2 = tx; // store the x axis of bullet.
    } else {
        animateBullet2();
    }

    requestAnimFrame(render);
    
    if (life <= 0) window.location.replace("loser.html");
    if (score >= 50) window.location.replace("winner.html");
}

function animateFighter(){
    gl.bindBuffer(gl.ARRAY_BUFFER, fighterId);
    
    var myPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPositionAttribute);

    gl.uniform1f(txUniform, tx);
    gl.uniform1f(tyUniform, 0);
    gl.uniform4f(colorUniform, 0.0, 1.0, 1.0, 1.0);

    if (Math.sqrt(Math.pow((ene_bullet_x1 - fighter_x), 2) + Math.pow((ene_bullet_y1 - fighter_y), 2))
        <= (half_square_length + half_bullet_length)) { 
        fighterGetShot = 1;
        life--;
        document.getElementById("LIFE").innerHTML = "LifeTotal: " + life; 
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    if (Math.sqrt(Math.pow((ene_bullet_x2 - fighter_x), 2) + Math.pow((ene_bullet_y2 - fighter_y), 2))
        <= (half_square_length + half_bullet_length)) { 
      fighterGetShot = 1;
        life--;
        document.getElementById("LIFE").innerHTML = "LifeTotal: " + life; 
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    if (Math.sqrt(Math.pow((ene_bullet_x3 - fighter_x), 2) + Math.pow((ene_bullet_y3 - fighter_y), 2))
        <= (half_square_length + half_bullet_length)) { 
      fighterGetShot = 1;
        life--;
        document.getElementById("LIFE").innerHTML = "LifeTotal: " + life; 
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    if (Math.sqrt(Math.pow((ene_bullet_x4 - fighter_x), 2) + Math.pow((ene_bullet_y4 - fighter_y), 2))
        <= (half_square_length + half_bullet_length)) { 
      fighterGetShot = 1;
        life--;
        document.getElementById("LIFE").innerHTML = "LifeTotal: " + life; 
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    if (Math.sqrt(Math.pow((ene_bullet_x5 - fighter_x), 2) + Math.pow((ene_bullet_y5 - fighter_y), 2))
        <= (half_square_length + half_bullet_length)) { 
      fighterGetShot = 1;
        life--;
        document.getElementById("LIFE").innerHTML = "LifeTotal: " + life; 
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function animateEnemy1(){
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId1);
    
    var enemyPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(enemyPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(enemyPositionAttribute);
    
    if(count1 < 1000){
        tx_enemy1 += 0.003;
        enemy_x1 +=0.003;
        count1 ++;
        if(enemy_x1 >= 0.93){
            tx_enemy1 -= 0.003;
            enemy_x1 -=0.003;
            count1 = 1000;
        }
    
        if(Math.abs(rounddown(enemy_x2) - roundup(enemy_x1)) <= 0.095 || Math.abs(rounddown(enemy_x1) - roundup(enemy_x3)) <= 0.095){
                count1 = 1000;
        }
    }else{
        
        if(count1 < 2000){
            tx_enemy1 -= 0.003;
            enemy_x1 -= 0.003;
            count1 ++;
            if(enemy_x1 <= -0.93){
                tx_enemy1 += 0.003;
                enemy_x1 +=0.003;
                count1 = 2000;
            }
             if(Math.abs(rounddown(enemy_x2) - roundup(enemy_x1)) <= 0.095 || Math.abs(rounddown(enemy_x1) - roundup(enemy_x3)) <= 0.095){
                count1 = 2000;
            }
        }else{
            count1 = 0;
        }
    }
    
    temp_tx_enemy1 = tx_enemy1;
    
    gl.uniform1f(txUniform, tx_enemy1); // not following the move of fighter
    gl.uniform1f(tyUniform, 0);
    gl.uniform4f(colorUniform, 0.0, 0.0, 1.0, 1.0);
    
    if (Math.sqrt(Math.pow((enemy_x1 - bullet_x1),2) + Math.pow((enemy_y1 - bullet_y1),2))
                    <= (half_square_length+half_bullet_length)){
         enemyGetShot1 = 1;
         score++;
         document.getElementById("SCORE").innerHTML = "Score: " + score;
         gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);           
    }
    
    if (Math.sqrt(Math.pow((enemy_x1 - bullet_x2),2) + Math.pow((enemy_y1- bullet_y2),2))
                   <= (half_square_length+half_bullet_length)){
        enemyGetShot1 = 1;
        score++;
        document.getElementById("SCORE").innerHTML = "Score: " + score;
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
} 
function animateEnemy2() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId2);

    var enemyPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(enemyPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(enemyPositionAttribute);
     if(count2 < 1000){
        tx_enemy2 += 0.003;
        enemy_x2 +=0.003;
        count2 ++;
        if(enemy_x2 >= 0.93){
            tx_enemy2 -= 0.003;
            enemy_x2 -=0.003;
            count2 = 1000;
        }
        if( Math.abs(rounddown(enemy_x4) - roundup(enemy_x2)) <= 0.095 ||  Math.abs(rounddown(enemy_x2) - roundup(enemy_x1)) <= 0.095){
                count2 = 1000;
        }
    }else{
        
        if(count2 < 2000){
            tx_enemy2 -= 0.003;
            enemy_x2 -= 0.003;
            count2 ++;
            if(enemy_x2 <= -0.93){
                tx_enemy2 += 0.003;
                enemy_x2 +=0.003;
                count2 = 2000;
            }
             if( Math.abs(rounddown(enemy_x4) - roundup(enemy_x2)) <= 0.095 || Math.abs(rounddown(enemy_x2) - roundup(enemy_x1)) <= 0.095){
                count2 = 2000;
            }
        }else{
            count2 = 0;
        }
    }
    
    temp_tx_enemy2 = tx_enemy2;

    gl.uniform1f(txUniform, tx_enemy2); // not following the move of fighter
    gl.uniform1f(tyUniform, 0);
    gl.uniform4f(colorUniform, 0.0, 0.5, 0.5, 1.0);

    if (Math.sqrt(Math.pow((enemy_x2 - bullet_x1),2) + Math.pow((enemy_y2 - bullet_y1),2))
                    <= (half_square_length+half_bullet_length)){
         enemyGetShot2 = 1;
         score++;
         document.getElementById("SCORE").innerHTML = "Score: " + score;
         gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);           
    }
    
    if (Math.sqrt(Math.pow((enemy_x2 - bullet_x2),2) + Math.pow((enemy_y2- bullet_y2),2))
                   <= (half_square_length+half_bullet_length)){
        enemyGetShot2 = 1;
        score++;
        document.getElementById("SCORE").innerHTML = "Score: " + score;
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemy3() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId3);

    var enemyPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(enemyPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(enemyPositionAttribute);
    
     if(count3 < 1000){
        tx_enemy3 += 0.003;
        enemy_x3 +=0.003;
        count3 ++;
        if(enemy_x3 >= 0.93){
                tx_enemy3 -= 0.003;
                enemy_x3 -=0.003;
                count3 = 1000;
        }
        if(Math.abs(rounddown(enemy_x3) - roundup(enemy_x5)) <= 0.095 || Math.abs(rounddown(enemy_x1) - roundup(enemy_x3)) <= 0.095){
           count3 = 1000;
        }
    }else{
        
        if(count3 < 2000){
            tx_enemy3 -= 0.003;
            enemy_x3 -= 0.003;
            count3 ++;
            if(enemy_x3 <= -0.93){
                tx_enemy3 += 0.003;
                enemy_x3 +=0.003;
                count3 = 2000;
            }
            if(Math.abs(rounddown(enemy_x3) - roundup(enemy_x5)) <= 0.095 || Math.abs(rounddown(enemy_x1) - roundup(enemy_x3)) <= 0.095){
                count3 = 2000;
            }
        }else{
            count3 = 0;
        }
    }
    temp_tx_enemy3 = tx_enemy3;

    gl.uniform1f(txUniform, tx_enemy3); 
    gl.uniform1f(tyUniform, 0);
    gl.uniform4f(colorUniform, 0.5, 0.5, 0.0, 1.0);

    if (Math.sqrt(Math.pow((enemy_x3 - bullet_x1),2) + Math.pow((enemy_y3 - bullet_y1),2))
                    <= (half_square_length+half_bullet_length)){
         enemyGetShot3 = 1;
         score++;
         document.getElementById("SCORE").innerHTML = "Score: " + score;   
         gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);           
    }
    
    if (Math.sqrt(Math.pow((enemy_x3 - bullet_x2),2) + Math.pow((enemy_y3- bullet_y2),2))
                   <= (half_square_length+half_bullet_length)){
        enemyGetShot3 = 1;
        score++;
        document.getElementById("SCORE").innerHTML = "Score: " + score;
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemy4() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId4);

    var enemyPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(enemyPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(enemyPositionAttribute);
    
     if(count4 < 1000){
        tx_enemy4 += 0.003;
        enemy_x4 +=0.003;
        count4 ++;
        if(enemy_x4 >= 0.93){
            tx_enemy4 -= 0.003;
            enemy_x4 -=0.003;
            count4 = 1000;
        }
        if(Math.abs(rounddown(enemy_x4) - roundup(enemy_x2)) <= 0.095 ){
                count4 = 1000;
        }
        
    }else{
        
        if(count4 < 2000){
            tx_enemy4 -= 0.003;
            enemy_x4 -= 0.003;
            count4 ++;
            if(enemy_x4 <= -0.93){
                tx_enemy4 += 0.003;
                enemy_x4 +=0.003;
                count4 = 2000;
            }
            if(Math.abs(rounddown(enemy_x4) - roundup(enemy_x2)) <= 0.095 ){
                count4 = 2000;
            }
        }else{
            count4 = 0;
        }
    }
    temp_tx_enemy4 = tx_enemy4;

    gl.uniform1f(txUniform, tx_enemy4); // not following the move of fighter
    gl.uniform1f(tyUniform, 0);
    gl.uniform4f(colorUniform, 0.5, 0.2, 0.5, 1.0);

    if (Math.sqrt(Math.pow((enemy_x4 - bullet_x1),2) + Math.pow((enemy_y4 - bullet_y1),2))
                    <= (half_square_length+half_bullet_length)){
         enemyGetShot4 = 1;
         score++;
         document.getElementById("SCORE").innerHTML = "Score: " + score;    
         gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);           
    }
    
    if (Math.sqrt(Math.pow((enemy_x4 - bullet_x2),2) + Math.pow((enemy_y4- bullet_y2),2))
                   <= (half_square_length+half_bullet_length)){
        enemyGetShot4 = 1;
        score++;
        document.getElementById("SCORE").innerHTML = "Score: " + score;
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemy5() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyId5);

    var enemyPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(enemyPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(enemyPositionAttribute);

     if(count5 < 1000){
        tx_enemy5 += 0.003;
        enemy_x5 +=0.003;
        count5 ++;
            if(enemy_x5 >= 0.93){
                tx_enemy5 -= 0.003;
                enemy_x5 -=0.003;
                count5 = 1000;
            }
        
         if(Math.abs(rounddown(enemy_x3) - roundup(enemy_x5)) <= 0.095 ){
               
                count5 = 1000;
         }
    }else{
        
        if(count5 < 2000){
            tx_enemy5 -= 0.003;
            enemy_x5 -= 0.003;
            count5 ++;
            if(enemy_x5 <= -0.93){
                tx_enemy5 += 0.003;
                enemy_x5 +=0.003;
                count5 = 2000;
            }
            if(Math.abs(rounddown(enemy_x3) - roundup(enemy_x5)) <= 0.095 ){
                count5 = 2000;
            }
        }else{
            count5 = 0;
        }
    }
    temp_tx_enemy5 = tx_enemy5;
    gl.uniform1f(txUniform, tx_enemy5); // not following the move of fighter
    gl.uniform1f(tyUniform, 0);
    gl.uniform4f(colorUniform, 1.0, 0.5, 0.0, 1.0);

    if (Math.sqrt(Math.pow((enemy_x5 - bullet_x1),2) + Math.pow((enemy_y5 - bullet_y1),2))
                    <= (half_square_length+half_bullet_length)){
         enemyGetShot5 = 1;
         score++;
         document.getElementById("SCORE").innerHTML = "Score: " + score;
         gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);           
    }
    
    if (Math.sqrt(Math.pow((enemy_x5 - bullet_x2),2) + Math.pow((enemy_y5- bullet_y2),2))
                   <= (half_square_length+half_bullet_length)){
        enemyGetShot5 = 1;
        score++;
        document.getElementById("SCORE").innerHTML = "Score: " + score;
        gl.uniform4f(colorUniform, 1.0, 0.0, 0.0, 1.0);
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function resetEnemies(){
        enemyGetShot1 = 0;
        enemyGetShot2 = 0;
        enemyGetShot3 = 0;
        enemyGetShot4 = 0;
        enemyGetShot5 = 0;
}
    
function animateBullet1(){
    gl.bindBuffer(gl.ARRAY_BUFFER, bulletId1);
    
    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);
       
    tx_bullet1 = temp_tx_fighter1;
    
    gl.uniform1f(txUniform, tx_bullet1);
    gl.uniform1f(tyUniform, ty_bullet1);
    gl.uniform4f(colorUniform, 0.0, 1.0, 1.0, 1.0);
    
    if(isShooting1){
        ty_bullet1 = ty_bullet1 + .045;
        bullet_y1 += 0.045;
    }
    if (ty_bullet1 > 2.0){
        isShooting1 = 0;
        resetEnemies();
    }else{
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
} // Fighter Bullets
function animateBullet2() {
    gl.bindBuffer(gl.ARRAY_BUFFER, bulletId2);

    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);

    tx_bullet2 = temp_tx_fighter2;

    gl.uniform1f(txUniform, tx_bullet2);
    gl.uniform1f(tyUniform, ty_bullet2);
    gl.uniform4f(colorUniform, 1.0, 1.0, 0.0, 1.0);

    if (isShooting2) {
        ty_bullet2 = ty_bullet2 + .045;
        bullet_y2 += 0.045;
    }
    if (ty_bullet2 > 2.0) {
        isShooting2 = 0;
        resetEnemies();
    } else {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
}

function animateEnemyBullet1(){
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId1);
    
    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);
     
    temp_tx_enemy_bullet1 += temp_tx_enemy1;
    
    gl.uniform1f(txUniform, tx_enemy_bullet1);
    gl.uniform1f(tyUniform, ty_enemy_bullet1);
    gl.uniform4f(colorUniform, 0.0, 0.0, 1.0, 1.0);
    
    ty_enemy_bullet1 -= 0.03;
    ene_bullet_y1 -= 0.03;

    if (ty_enemy_bullet1 <= -2.0) {
        ty_enemy_bullet1 = 0;
        ene_bullet_x1 = tx_enemy_bullet1;
        ene_bullet_y1 = 0.90;
        temp_tx_enemy_bullet1 = enemy_x1;
        tx_enemy_bullet1 = enemy_x1;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemyBullet2() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId2);

    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);

    
    temp_tx_enemy_bullet2 += temp_tx_enemy2;
    
    gl.uniform1f(txUniform, tx_enemy_bullet2);
    gl.uniform1f(tyUniform, ty_enemy_bullet2);
    gl.uniform4f(colorUniform, 0.0, 0.5, 0.5, 1.0);

    ty_enemy_bullet2 -= 0.03;
    ene_bullet_y2 -= 0.03;

    if (ty_enemy_bullet2 <= -2.0) {
        ty_enemy_bullet2 = 0;
        ene_bullet_x2 = tx_enemy_bullet2;
        ene_bullet_y2 = 0.90;
        temp_tx_enemy_bullet2 = enemy_x2;
        tx_enemy_bullet2 = enemy_x2;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemyBullet3() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId3);

    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);

   
    temp_tx_enemy_bullet3 += temp_tx_enemy3;
    
    gl.uniform1f(txUniform, tx_enemy_bullet3);
    gl.uniform1f(tyUniform, ty_enemy_bullet3);
    gl.uniform4f(colorUniform, 0.5, 0.5, 0.0, 1.0);

    ty_enemy_bullet3 -= 0.03;
    ene_bullet_y3 -= 0.03;

    if (ty_enemy_bullet3 <= -2.0) {
        ty_enemy_bullet3 = 0;
        ene_bullet_x3 = tx_enemy_bullet3;
        ene_bullet_y3 = 0.90;
        temp_tx_enemy_bullet3 = enemy_x3;
        tx_enemy_bullet3 = enemy_x3;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemyBullet4() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId4);

    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);
    
    
    temp_tx_enemy_bullet4 += temp_tx_enemy4;
    
    gl.uniform1f(txUniform, tx_enemy_bullet4);
    gl.uniform1f(tyUniform, ty_enemy_bullet4);
    gl.uniform4f(colorUniform, 0.5, 0.2, 0.5, 1.0);

    ty_enemy_bullet4 -= 0.03;
    ene_bullet_y4 -= 0.03;

    if (ty_enemy_bullet4 <= -2.0) {
        ty_enemy_bullet4 = 0;
        ene_bullet_x4 = tx_enemy_bullet4;
        ene_bullet_y4 = 0.90;
        temp_tx_enemy_bullet4 = enemy_x4;
        tx_enemy_bullet4 = enemy_x4;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
function animateEnemyBullet5() {
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyBulletId5);

    var bulletPositionAttribute = gl.getAttribLocation(shaderProgram, "myPosition");
    gl.vertexAttribPointer(bulletPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bulletPositionAttribute);

    
    temp_tx_enemy_bullet5 += temp_tx_enemy5;
    
    gl.uniform1f(txUniform, tx_enemy_bullet5);
    gl.uniform1f(tyUniform, ty_enemy_bullet5);
    gl.uniform4f(colorUniform, 1.0, 0.5, 0.0, 1.0);

    ty_enemy_bullet5 -= 0.03;
    ene_bullet_y5 -= 0.03;

    if (ty_enemy_bullet5 <= -2.0) {
        ty_enemy_bullet5 = 0;
        ene_bullet_x5 = tx_enemy_bullet5;
        ene_bullet_y5 = 0.90;
        temp_tx_enemy_bullet5 = enemy_x5;
        tx_enemy_bullet5 = enemy_x5;
    }
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function rounddown(num){
    return (Math.floor(num * 100) /100);
    
}
function roundup(num){
    return (Math.round(num * 100) /100);
}

function keys(event) {
    var map = []; // You could also use an array
    onkeydown = onkeyup = function (e) {
        e = e || event; // to deal with IE

        // WASD and Arrow Keys
        map[e.keyCode] = e.type == 'keydown';
        // Space key
        if (map[32]) { // Fire
            if (isShooting1 == 0) {
                ty_bullet1 = 0;
                isShooting1 = 1;
                bullet_x1 = temp_tx_fighter1;
                bullet_y1 = -0.775;
                
            } else if (isShooting2 == 0) {
                ty_bullet2 = 0;
                isShooting2 = 1;
                bullet_x2 = temp_tx_fighter2;
                bullet_y2 = -0.775;
            }
        }
        // WASD and Arrow Keys
        if (map[68]) { pos = 1 } // d key right
        if (map[65]) { neg = 1 } // a key left
        if (map[39]) { pos = 1 } // right key
        if (map[37]) { neg = 1 } // left key
        map[e.keyCode] = e.type == 'keyup';
        if (map[68]) { pos = 0 } // d key right
        if (map[65]) { neg = 0 } // a key left
        if (map[39]) { pos = 0 } // right key
        if (map[37]) { neg = 0 } // left key
    }
}