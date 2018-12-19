var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var detectedAnything = false;
var detectedObject = null;

var divX = 0;
var divY = 0;

var ratio = 20;

var interval = setInterval(draw, 10);

var canvdiv = document.getElementById("canvdiv");

var d = document.documentElement;

var cred = "#FF3419";
var chred = "#E82E15";

var cblue = "#1E77F9";
var chblue = "#1466DE";

var cgray = "#161616";
var chgray = "#000000";



var circles = [];
//Main circles
circles.push(new circleText(100, 190, 65, "logos", cred , chred ));
circles.push(new circleText(250, 275, 65, "", cred, chred));
circles.push(new circleText(280, 130, 65, "websites", cblue, chblue ));
circles.push(new circleText(200, 200, 100, "mijn capaciteiten :)", cgray, chgray ));

//Smaal circles
circles.push(new circleText(350, 340, 18, "", "black", "black"));
circles.push(new circleText(90, 290 , 10, "", "black", "black"));
circles.push(new circleText(70, 310, 5, "", cblue, cblue));
circles.push(new circleText(160, 85, 14,"", cred, cred));
circles.push(new circleText(120, 80 , 11, "", "black", "black"));
circles.push(new circleText(290, 40, 12, "", "black", "black"));
circles.push(new circleText(305, 15, 8, "", cblue, cblue));


function draw(){
    detectedAnything = false;
    detectedObject = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.onmousemove = function(event){
        x = event.clientX;
        y = event.clientY;
        divX = event.pageX - canvdiv.offsetLeft;
        divY = event.pageY - canvdiv.offsetTop;

        for(i = circles.length; i > 0; i--){
            detectedObject = circles[i - 1].detect();
        }
    } 
    for(c of circles){
        c.display();
    }  

    if(detectedObject != null){
        detectedObject.display();
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
        ctx.globalAlpha = 0.9999
        ctx.arc(this.x + x / ratio ,this.y + y / ratio, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.font ="25px Monda";
        ctx.fillStyle = "white";
        ctx.fillText(txt, this.x + x / ratio + this.radius / ratio - this.txt.length * this.radius / ratio, this.y + y / ratio + this.radius / ratio );
    }

    this.detect = function(){
        if(Math.pow(divX - (this.x + x / ratio), 2) + Math.pow(divY - (this.y + y / ratio), 2) < Math.pow(this.radius, 2) && !detectedAnything){
            this.detected = true;            
            detectedAnything = true;
            return this;
        }else{
            this.detected = false;
            return null;            
        }
    }

}
