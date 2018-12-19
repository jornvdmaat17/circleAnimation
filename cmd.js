var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var detectedAnything = false;

var divX = 0;
var divY = 0;

var interval = setInterval(draw, 10);

var canvdiv = document.getElementById("canvdiv");

var d = document.documentElement;

var cred = "#FE3519";
var cblue = "#1E77F9";


var circles = [];
circles.push(new circleText(100, 190, 65, "", cred , "#FF0000" ));
circles.push(new circleText(250, 275, 65, "", cred, "#FF0000" ));
circles.push(new circleText(280, 130, 65, "", cblue, "#FF0000" ));
circles.push(new circleText(200, 200, 100, "", "#2B2B29", "#FF0000" ));

circles.push(new circleText(350, 340, 15, "", "black", "black"));


function draw(){
    detectedAnything = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.onmousemove = function(event){
        x = event.clientX;
        y = event.clientY;
        divX = event.pageX - canvdiv.offsetLeft;
        divY = event.pageY - canvdiv.offsetTop;

        for(i = circles.length; i > 0; i--){
            circles[i - 1].detect();
        }
    }     
    for(c of circles){
        c.display();
    }

    
}

function circleText(cx , cy, radius, txt, color, hovercolor){
    this.x = cx;
    this.y = cy;
    this.radius = radius;
    this.txt = txt;
    this.color = color;
    this.hovercolor = hovercolor;
    this.detected = false;

    this.display = function(){
        ctx.beginPath();
        if(this.detected){
            ctx.fillStyle = this.hovercolor;
        }else{
            ctx.fillStyle = this.color;
        }
        ctx.globalAlpha = 0.99
        ctx.arc(this.x + x / 20,this.y + y/20, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.font = String(this.radius / 4) + "px Verdena";
        var l = txt.length;
        ctx.fillText(txt, this.x + x/20 - l * this.radius , this.y + y/20 );
    }

    this.detect = function(){
        if(Math.pow(divX - (this.x + x/20), 2) + Math.pow(divY - (this.y + y/20), 2) < Math.pow(this.radius, 2) && !detectedAnything){
            this.detected = true;
            detectedAnything = true;
        }else{
            this.detected = false;
        }
    }

}