const canvas=document.getElementById("gamecanvas");
const context=canvas.getContext("2d");
canvas.width=700;
canvas.height=500;
const box=20;
let snake=[{x:200,y:200}];
let direction="RIGHT";
let food=generatefood();
let score=0;
document.addEventListener("keydown",changeDirection);
setInterval(updateGame,100);
function updateGame()
{
    moveSnake();
    if(collision())
    {
        alert("Game Over!Your score is "+score);
        resetGame();
    }
    draw();
}
function draw() {
    context.fillStyle="white";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle="lime";
    snake.forEach(segment=> context.fillRect(segment.x,segment.y,box,box));
    context.fillStyle="green";
    context.fillRect(food.x,food.y,box,box);


    
}
function moveSnake()
{
    let head={...snake[0]};
    if(direction==="UP")head.y-=box;
    if(direction==="DOWN")head.y+=box;
    if(direction==="LEFT") head.x-=box;
    if(direction==="RIGHT") head.x+=box;
    snake.unshift(head);
    if(head.x===food.x && head.y===food.y)
    {
        score++;
        food=generatefood();

    }
    else{
        snake.pop();
    }
}
function changeDirection(event) {
    if(event.key==="ArrowUp" && direction!="DOWN")direction="UP";
    if(event.key==="ArrowDown"&& direction!="UP")direction="DOWN";
    if(event.key==="ArrowRight" && direction!="LEFT")direction="RIGHT";
    if(event.key==="ArrowLeft"&& direction!="RIGHT")direction="LEFT";

    
}
function collision(){
    const head=snake[0];
    if(head.x<0||head.x>=canvas.width||head.y<0||head.y>=canvas.height)
    {
        return true;
    }
    return false;
}
function generatefood(){
    return{
    x:Math.floor(Math.random()*(canvas.width/box))*box,
    y:Math.floor(Math.random()*(canvas.height/box))*box,
};

}
function resetGame(){
    snake=[{x:200,y:200}];
    direction="right";
    score=0;
    food=generatefood();
}