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
var canvasHeight = canvas.height;
var canvasWidth = canvas.width;
var Offset = canvasHeight / 45;

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
circles.push(new circleText( 3.2,  2.1 ,  6.0, "       logos", cred , chred , true, "subdomains/logos.html" , false));
circles.push(new circleText( 1.6,  1.55 ,  6.0, "    branding", cred, chred, true, "subdomains/branding.html" , false));
circles.push(new circleText( 1.5,  2.9 ,  6.0, "    websites", cblue, chblue ,true,"subdomains/websites.html" ,false));
circles.push(new circleText( 2.0,  2.0 ,  4.0, " mijn capaciteiten :)", cgray, chgray, true, "subdomains/capaciteiten.html" , false));

//Small circles
circles.push(new circleText( 1.35,  1.2 ,  22.2, "", "black", "black", false, "", false));
circles.push(new circleText( 3.2,  1.5 ,  40, "", "black", "black", false,  "", false));
circles.push(new circleText( 3.5,  1.4 ,  80.0, "", cblue, cblue, false, "", false));
circles.push(new circleText( 2.5,  3.8,  27.0 ,"", cred, cred, false, "", false));
circles.push(new circleText( 3.4,  4.0 ,  36.4 , "", "black", "black", false, "", false));
circles.push(new circleText( 1.45,  6.5,  33.3, "", "black", "black" , false, "", false));
circles.push(new circleText( 1.4,  10.0,  38.0, "", cblue, cblue , false, "", false));

//Function set on an interval to keep deleting and drawing the circles again.
function draw(){
    //Reset variables
    first = true;
    detectedObject = null;
    //Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //When the mouse moves, these positions should be updated
    document.onmousemove = function(event){
        x = event.clientX;
        y = event.clientY;
        divX = event.pageX - canvas.offsetLeft;
        divY = event.pageY - canvas.offsetTop;
    }
    //Test if a circles has been hovered over
    for(i = circles.length; i > 0; i--){
        if(circles[i - 1].detectMouse()){
            if(first){
                detectedObject = circles[i - 1].duplicate();
                first = false;
            }            
        }
    }

    //Draw the circles
    for(c of circles){
        c.display();
    } 

    //Draw a hovered circle again if it is found
    if(detectedObject != null){
        detectedObject.display();
    }

    //Detect when we click on a maincircle
    document.addEventListener("click", function(event) {
        if(detectedObject != null){
            if(detectedObject.mainCircle){
                detectedObject.goToPage();
            }    
        }            
    })
    
}

function circleText(cx , cy, radius, txt, color, hovercolor, mainCircle, href, detected){
    this.x = canvasHeight / cx  - Offset * 0.8;
    this.y = canvasWidth / cy + Offset * 0.8;
    this.radius =  canvasHeight / radius * 0.8;
    this.txt = txt;
    this.color = color;
    this.hovercolor = hovercolor;
    this.detected = detected;
    this.mainCircle = mainCircle;
    this.href = href;

    this.display = function(){
        if(this.detected && mainCircle){
            ctx.beginPath();
            ctx.arc(this.x + x/ratio, this.y + y / ratio, this.radius * 1.075, 0, 2 * Math.PI);
            ctx.fillStyle = this.hovercolor;
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = this.hovercolor;
        }else{
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.96;
        }
       
        ctx.arc(this.x + x / ratio ,this.y + y / ratio, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        if(this.detected && mainCircle){
            ctx.beginPath();
            ctx.font = String(canvasHeight / 19) + "px Verdena";
            ctx.fillStyle = "white";
            ctx.fillText(this.txt.substring(1, this.txt.length), this.x + x / ratio - this.radius, (this.y + y / ratio) * 1.02);
        }else{
            ctx.beginPath();
            ctx.font = String(canvasHeight / 20) + "px Verdena";
            ctx.fillStyle = "white";
            ctx.fillText(this.txt, this.x + x / ratio - this.radius, (this.y + y / ratio) * 1.02);
        }
        
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

    this.duplicate = function(){
        return new circleText(cx , cy, radius, txt, color, hovercolor, mainCircle, href, true);
    }

}
