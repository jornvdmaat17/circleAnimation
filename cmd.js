var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var detectedObject = null;
var first;

var divX = 0;
var divY = 0;

var ratio = 25;
var interval = setInterval(draw, 10);
var canvdiv = document.getElementById("canvdiv");
var canvasHeight = canvas.scrollHeight;
var canvasWidth = canvas.scrollWidth;

var Offset = canvasHeight / 45;

var d = document.documentElement;

//Red colors
var cred = "#FF3419";
var chred = "#E82E15";
//Blue colors
var cblue = "#1E77F9";
var chblue = "#1466DE";
//Gray colors
var cgray = "#161616";
var chgray = "#000000";

//Keeps track of circles
var circles = [];
//Main circles
circles.push(new circleText( 3.2,  2.1 ,  6.0, "      logos", cred , chred , true, "#logos"));
circles.push(new circleText( 1.6,  1.55 ,  6.0, "    branding", cred, chred, true, "#branding"));
circles.push(new circleText( 1.5,  2.9 ,  6.0, "    websites", cblue, chblue ,true,"#websites"));
circles.push(new circleText( 2.0,  2.0 ,  4.0, " mijn capaciteiten :)", cgray, chgray, true, "#capaciteiten" ));

//Small circles
circles.push(new circleText( 1.35,  1.2 ,  22.2, "", "black", "black", false));
circles.push(new circleText( 3.2,  1.5 ,  40, "", "black", "black", false));
circles.push(new circleText( 3.5,  1.4 ,  80.0, "", cblue, cblue, false));
circles.push(new circleText( 2.5,  3.8,  27.0 ,"", cred, cred, false));
circles.push(new circleText( 3.4,  4.0 ,  36.4 , "", "black", "black", false));
circles.push(new circleText( 1.45,  6.5,  33.3, "", "black", "black" , false));
circles.push(new circleText( 1.4,  10.0,  38.0, "", cblue, cblue , false));


function draw(){
    first = true;
    detectedObject = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.onmousemove = function(event){
        x = event.clientX;
        y = event.clientY;
        divX = event.pageX - canvas.offsetLeft;
        divY = event.pageY - canvas.offsetTop;
    }
    for(i = circles.length; i > 0; i--){
        if(circles[i - 1].detectMouse()){
            if(first){
                detectedObject = circles[i - 1].duplicate();
                first = false;
            }            
        }
    }

    for(c of circles){
        c.display();
    } 
    if(detectedObject != null){
        detectedObject.setHover(true);
        detectedObject.display();
    }

    document.addEventListener("click", function(event) {
        if(detectedObject.mainCircle){
            detectedObject.goToPage();
        }        
    })
    
}

function circleText(cx , cy, radius, txt, color, hovercolor, mainCircle, href){
    this.x = canvasHeight / cx  - Offset * 0.8;
    this.y = canvasWidth / cy + Offset * 0.8;
    this.radius =  canvasHeight / radius * 0.8;
    this.txt = txt;
    this.color = color;
    this.hovercolor = hovercolor;
    this.detected = false;
    this.mainCircle = mainCircle;
    this.href = href;

    this.display = function(){
        if(this.detected && mainCircle){
            ctx.beginPath();
            ctx.arc(this.x + x/ratio, this.y + y / ratio, this.radius * 1.05, 0, 2 * Math.PI);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = this.hovercolor;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(this.x + x/ratio, this.y + y / ratio, this.radius * 1.025, 0, 2 * Math.PI);
            ctx.globalAlpha = 0.85;
            ctx.fillStyle = this.hovercolor;
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = this.hovercolor;
        }else{
            ctx.beginPath();
            ctx.fillStyle = this.color;
        }
        ctx.globalAlpha = 0.9999;
        ctx.arc(this.x + x / ratio ,this.y + y / ratio, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.font = String(canvasHeight / 20) + "px Monda";
        ctx.fillStyle = "white";
        ctx.fillText(this.txt, this.x + x / ratio - this.radius, (this.y + y / ratio) * 1.02);
    }

    this.detectMouse = function(){
        if(Math.pow(divX - (this.x + x / ratio), 2) + Math.pow(divY - (this.y + y / ratio), 2) < Math.pow(this.radius, 2)){       
            return true;
        }else{ 
            return false;       
        }
    }

    this.goToPage = function() {
        location.href = this.href;
    }

    this.setHover = function(set){
        this.detected = set;
    }

    this.duplicate = function(){
        return new circleText(cx , cy, radius, txt, color, hovercolor, mainCircle, href);
    }

}
