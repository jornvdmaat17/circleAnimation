var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;


ctx.stroke();

var interval = setInterval(draw, 10);

var canvHeight = canvas.clientHeight;
var canvWidth = canvas.clientWidth;

var d = document.documentElement;
var dH = d.scrollHeight;
var dW = d.scrollWidth;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.onmousemove = function(event){
        x = event.clientX;
        y = event.clientY;
    }     

    console.log(x + " " + y)

    new circleText(200, 200, 100, "Hello World").display();
}

function circleText(cx , cy, radius, txt){
    this.x = cx;
    this.y = cy;
    this.radius = radius;
    this.txt = txt;

    this.display = function(){
        ctx.beginPath()
        ctx.arc(this.x + x / 20,this.y + y/20, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.font = String(this.radius / 4) + "px Verdena";
        var l = txt.length;
        ctx.fillText(txt, this.x + x/20 - l * this.radius , this.y + y/20 );
    }


}