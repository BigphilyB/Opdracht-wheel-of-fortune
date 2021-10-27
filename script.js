var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var colors = ["#FFCD00", "#68FF00", "#00FFEC", "#002EFF",
              "#FF2E00", "#F700FF", "#002EFF", "#68FF00",
              "#FFCD00", "#FF2E00", "#68FF00", "#002EFF", "#00FFEC", "#F700FF", "#68FF00"];
var numbers = ["12", "1", "2", "3",
               "4", "5", "6", "7",
               "8", "9", "10", "11", "12"];
var pocketCount=12;
var random_number=Math.floor(Math.random() * 12) + 1;
var cheatText=numbers[random_number];
$('#cheat').text('Stop on '+cheatText);

var cw=canvas.width=ch=canvas.height=600;
var cx=cw/2;
var cy=ch/2;

// wheel & arrow are used often so cache them
var wheelCanvas=drawRouletteWheel();
var arrow=drawArrow();

var wheel={
  cx:cw/2,
  cy:ch/2,
  radius:Math.min(cw,ch)/2-20,
  startAngle:0,
  endAngle:Math.PI*4+cheatingSpin(cheatText),
  totalSteps:360,
  currentStep:0,
}

drawAll(wheel);

$('#spin').click(function(){requestAnimationFrame(animate);});


// functies

function cheatingSpin(hit){
  var PI=Math.PI;
  var PI2=PI*2;
  var index=numbers.indexOf(cheatText);
  var pocketSweep=PI2/pocketCount;
  var bet = 1;
  // cheatText not in numbers[]? -- then spin randomly
  if(index<0){return(PI2*2+Math.random()*PI2);}
  // if cheating, calc random endAngle inside desired number's pocket
  return((PI2-pocketSweep*(index+1))+Math.random()*pocketSweep-PI/2);
  
}

function othername() {
    bet = document.getElementById("userInput").value;
    console.log(bet);
    
}

function animate(time){
  if(wheel.currentStep>wheel.totalSteps){return;}
  drawAll(wheel);
  wheel.currentStep++;
  requestAnimationFrame(animate);
}

function checkNumbers(){
  console.log("Hello world!");
  if( bet == random_number ) {
    
  alert("CONGRATULATIONS YOU WIN!!!!!!!!!");

} else{
  alert("Ahhhhhhh das jammer je hebt niet gewonnen");
}
}

function easing(w){
  var t=w.currentStep;
  var b=w.startAngle;
  var d=w.totalSteps;
  var c=w.endAngle-w.startAngle;
  return (-c*((t=t/d-1)*t*t*t-1)+b+w.startAngle);    
}

function drawAll(w){
  var angle=easing(w);
  ctx.clearRect(0,0,cw,ch);
  ctx.translate(cx,cy);
  ctx.rotate(angle);
  ctx.drawImage(wheelCanvas,-wheelCanvas.width/2,-wheelCanvas.height/2);
  ctx.rotate(-angle);
  ctx.translate(-cx,-cy);
  ctx.drawImage(arrow,cx-arrow.width/2,44);
}

function drawRouletteWheel() {
  var outsideRadius = 200;
  var textRadius = 160;
  var insideRadius = 0;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");   
  canvas.width=canvas.height=outsideRadius*2+6;
  var x=outsideRadius+3;
  var y=outsideRadius+3;
  var arc = Math.PI / (pocketCount/2);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.font = 'bold 18px Helvetica, Arial';
  // wheel
  for (var i = 0; i < pocketCount; i++) {
    var angle = i * arc;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.arc(x,y, outsideRadius, angle, angle + arc, false);
    ctx.arc(x,y, insideRadius, angle + arc, angle, true);
    ctx.stroke();
    ctx.fill();
    ctx.save();
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.translate(x+Math.cos(angle + arc / 2) * textRadius,
                  y+Math.sin(angle + arc / 2) * textRadius);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    var text = numbers[i];
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }
  //
  return(canvas);
}

function drawArrow(){
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");   
  canvas.width=18;
  canvas.height=18;
  //Arrow
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(5,0);
  ctx.lineTo(13,0);
  ctx.lineTo(13,10);
  ctx.lineTo(18,10);
  ctx.lineTo(9,18);
  ctx.lineTo(0,10);
  ctx.lineTo(5,10);
  ctx.lineTo(5,0);
  ctx.fill();
  return(canvas);
}