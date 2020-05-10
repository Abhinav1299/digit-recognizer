
const canvas = this.document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const conv = document.querySelector("#converted");
canvas.height = 280;
canvas.width = 280;
// canvas.
var myImageData;
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.color = "black";
ctx.lineWidth = 10;
ctx.lineJoin = 'round'; 
ctx.lineCap = 'round';

let painting = false;

canvas.addEventListener("mousedown",function(){
    painting = true;
    canvas.addEventListener("mousemove",draw);
    function draw(e)
    {
        if(!painting)
        {
            return;
        }
        ctx.lineWidth = ctx.lineWidth;
        // ctx.fillStyle = "red";
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineTo(e.clientX,e.clientY);
        ctx.strokeStyle = ctx.color;
        ctx.stroke();
        // ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX,e.clientY);
    }
});

canvas.addEventListener("mouseup",function(){
    painting = false;
    ctx.beginPath();
    // myImageData = ctx.getImageData(12, 12, 300, 300);
    // console.log(myImageData);
});