var timer = 60;
var score = 0;
var hitrn = 0;

function setScore(){
    score += 10;
    document.querySelector("#score").textContent = score
}

function makeBubble(){
    var clutter = "";

    for(var i = 1; i <= 102; i++){
        var num = Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${num}</div>`;
    }

    document.querySelector("#pBottom").innerHTML = clutter;
}

function runTimer(){
    var timerInt = setInterval(() => {
        if(timer > 0){
            timer--;
            document.querySelector("#timer").textContent = timer;
        }
        else{
            document.querySelector("#pBottom").innerHTML = `<h1>Game Over<h1/>`;
            clearInterval(timerInt);
        }
    }, 1000)
}

function setHit(){
    hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hit").textContent = hitrn;
}

document.querySelector("#pBottom").addEventListener("click", (d) => {
    var clickedNum = Number(d.target.textContent);
    if(clickedNum == hitrn){
        setScore();
        makeBubble();
        setHit();
    }
})

makeBubble();
runTimer();
setHit();

