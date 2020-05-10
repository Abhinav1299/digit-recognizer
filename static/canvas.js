
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var painting = document.getElementById("con");
var paintStyle = getComputedStyle(painting);
var clear = document.getElementById("clear");

canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));

var mouse = {x:0,y:0};
canvas.addEventListener("mousemove",function(e){
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
},false);

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.lineWidth = 10;
ctx.lineJoin = 'round'; 
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

canvas.addEventListener("mousedown",function(e){
    ctx.beginPath();
    ctx.moveTo(mouse.x,mouse.y);
    canvas.addEventListener("mousemove",onPaint,false);
},false);

canvas.addEventListener("mouseup",function(e){
    canvas.removeEventListener("mousemove",onPaint,false);
},false);

var onPaint = function(){
    ctx.lineTo(mouse.x,mouse.y);
    ctx.stroke();
}

clear.addEventListener("click",function(){
    ctx.clearRect(0,0,280,280);
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
})














// const canvas = this.document.querySelector("#canvas");
// const ctx = canvas.getContext("2d");
// // canvas.height = 280;
// // canvas.width = 280;
// // canvas.

// var mouse = {x:0,y:0};
// var last_mouse = {x:0,y:0};
// ctx.fillStyle = "white";
// ctx.fillRect(0,0,canvas.width,canvas.height);
// ctx.color = "black";



// let painting = false;

// canvas.addEventListener("mousedown",function(e){
//     canvas.addEventListener("mousemove",onpaint,false);
// });

// canvas.addEventListener("mouseup",function(e){
//     canvas.removeEventListener("mousemove",onpaint,false);
// });

// canvas.addEventListener("mousemove",function(e){
//     last_mouse.x=mouse.x;
//     last_mouse.y=mouse.y;

//     mouse.x=e.pageX-this.offsetLeft;
//     mouse.y=e.pageY-this.offsetTop;
// });

// var onPaint = function(){
//     ctx.lineWidth = ctx.lineWidth;
//     ctx.lineJoin = "round";
//     ctx.lineCap = "round";
//     ctx.strokeStyle = ctx.color;
//     ctx.beginPath();
//     ctx.moveTo( lastMouse.x, lastMouse.y );
//     ctx.lineTo( Mouse.x, Mouse.y );
//     ctx.closePath();
//     ctx.stroke();

// }

// painting = true;
//     canvas.addEventListener("mousemove",draw);
//     function draw(e)
//     {
//         if(!painting)
//         {
//             return;
//         }
//         ctx.lineWidth = ctx.lineWidth;
//         // ctx.fillStyle = "red";
//         ctx.lineCap = 'round';
//         ctx.lineJoin = 'round';
//         ctx.lineTo(e.clientX,e.clientY);
//         ctx.strokeStyle = ctx.color;
//         ctx.stroke();
//         // ctx.fill();
//         ctx.beginPath();
//         ctx.moveTo(e.clientX,e.clientY);
//     }

// canvas.addEventListener("mouseup",function(){
//     painting = false;
//     ctx.beginPath();
//     // myImageData = ctx.getImageData(12, 12, 300, 300);
//     // console.log(myImageData);
// });