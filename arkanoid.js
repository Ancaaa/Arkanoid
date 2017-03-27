var canvas, ctx, w, h, game = true;
var ball, paddle, bricks, rowheight, row, col;
var toLeft = true, toRight = true;
var score = 0, time = 0, tmpTime = 0;

var BALL = function(x,y){
    this.x = x;
    this.y = y;

    this.color = "red";
    this.radius = 10;
    this.vx = 3;
    this.vy = -4;
}

var PADDLE = function(x,y){
    this.x = x;
    this.y = y;
    
    this.color = "black";
    this.width = 100;
    this.height = 5;
    this.vx=10;
}

var BRICKS = function (width, height, rows, columns){
    this.rows = rows;
    this.columns = columns;
    this.width = width;
    this.height = height;
    this.padding = 2;
    
    this.obj;   
}


window.onload = init;



document.addEventListener('keydown', function(event){
             
//alert(event.keyCode);

if(event.keyCode == 37){  //platform to left
   toLeft = true;
   toRight = false;
}
else
    if(event.keyCode == 39 ){    //platform to right
       toRight =true;
       toLeft = false;
}
       
       else
       if(event.keyCode == 40){   //stop platform
            toRight = false;
            toLeft = false;
    }
      });

document.addEventListener('mousemove', function(event){
    var x = event.offsetX; //coord for x
    paddle.x = x - paddle.width/2;
});

function init(){
    
    
    score = 0;
    time = 0;
    tmpTime = 0;
   
    clearInterval(tmpTime);
    game = true;
    
    document.getElementById("btn1").style.display = "none";

    canvas = document.getElementById("canvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.font = "30px Arial";
    
    ball  =new BALL(w/2, h/2+50);
    
    paddle = new PADDLE(w/2, h-20);
  //  paddle.x -= paddle.width/2;
    
    bricks = new BRICKS((w/20) - 2, 20, 6, 20);
    
    bricks.obj = [];
    
     for (var i = 0; i< bricks.rows; i++){
         bricks.obj[i] = [];
        for (var j = 0; j < bricks.columns; j++){
            bricks.obj[i][j] = 1;
        }
     }
    
    /*  111111
        111111
        111101
        000000
        000000
    
    */

    beginGame();
}


/*function Timer(){
 time++;
}*/

function cresteTimer(){
  //  time.innerHTML = parseInt(time.innerHTML) + 1;
    time++;
}


function beginGame() {
    if(game){
        ctx.clearRect(0,0,w,h);
        
       
        
        
        ball.x += ball.vx;      //moving ball
        ball.y += ball.vy;
        
       
    
        
       tmpTime = setInterval(cresteTimer(), 1000);
       
        
    //    if (tmpTime == 300){
    //         ctx.clearRect(0,0,w,h);  
    //        clearInterval(tmpTime);
    //        gameOver();
    //    }
            var tempTime = "Time : " + tmpTime/100;
        
        
          ctx.fillStyle = "black";
          ctx.strokeText(tempTime, 20, h/2 - 25);
        
  //      setTimeout(function(){ /*alert("Time's up!");*/ game = false; 
//                    clearInterval(tmpTime);}, 
//                            3000);
        
          
        
          var tmpScore = "Score : " + score;
          ctx.fillStyle = "black";
          ctx.strokeText(tmpScore, 20, h/2);
        
        if((ball.x + ball.radius) + ball.vx > w || (ball.x-ball.radius) + ball.vx < 0){ // goes to the left
                ball.vx = -ball.vx;
        }
        
        if((ball.y - ball.radius) + ball.vy <0){    //falls
                ball.vy = -ball.vy;
        } else
            
       if((ball.y + ball.radius+ball.vy)>(h-paddle.height - 10)&&(ball.y+ball.radius) +ball.vy<h){
                if(ball.x > paddle.x && ball.x < (paddle.x + paddle.width)){
                 ball.vy = -ball.vy;
                 ball.vx = 10*(ball.x - (paddle.x + paddle.width/2))/paddle.width;
                }
                else{
                    game=false;
                }
              
            }
        
        
        
        if(toRight && paddle.x + paddle.width < w){
            paddle.x+=paddle.vx;                //paddle goes to the right
        }
            if(toLeft && paddle.x >0){
                paddle.x-=paddle.vx;            //paddle goes to the left
            }
        
        rowheight = bricks.height + bricks.padding;     //collision with bricks
        row = Math.floor(ball.y/(rowheight));
        col = Math.floor(ball.x/(bricks.width+bricks.padding));
        
        if(ball.y < bricks.rows*rowheight && col > 0 && row > 0 &&  bricks.obj[row][col] == 1){
            bricks.obj[row][col] = 0
            ball.vy = -ball.vy;
            score++;
            
        }
        
        
        
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0,2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = paddle.color;
        ctx.beginPath();
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.closePath();
        
        ctx.fillStyle = "orange";
       
      //  ctx.strokeStyle = "black"
        
        for (var i = 0; i< bricks.rows; i++){
        for (var j = 0; j < bricks.columns; j++){
            if(bricks.obj[i][j] == 1){
                ctx.beginPath();
                
                ctx.fillRect(j*(bricks.width + bricks.padding), i*(bricks.height+bricks.padding), bricks.width, bricks. height)
                ctx.closePath();
            }
        }}
    
   //    setTimeout(beginGame, 10);
    window.requestAnimationFrame(beginGame);
        
        
    }
    else{
        gameOver();
    }
    
}

function gameOver(){
    var text = "Game Over";
    var text2 = "Score: " + score;
    ctx.clearRect(0,0,w,h);                 //whitescreen
   // clearInterval(tmpTime);
  //  time = 0;
//    tmpTime = 0;
    
    ctx.fillStyle = "Black";
    
    var text_length = ctx.measureText(text).width;
    var text2_length = ctx.measureText(text2).width;
    ctx.fillText(text, w/2-text_length/2, h/2-50);
    ctx.font = "20px Arial";
    ctx.fillText(text2, w/2-text2_length/2, h/2-20);
    
    document.getElementById("btn1").style.display = "block";
    document.getElementById("btn1").value = "Play again?";

    

}