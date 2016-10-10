var clock = document.getElementById("clock");

var ctx = clock.getContext("2d");


var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var pro = width/300;
function drawClock(){

	ctx.clearRect(0,0,width,height);                 //清除画布每秒画一次
	ctx.save(); 									//保存当前环境，以便下面的 圆心偏移
	ctx.translate(r,r);
	ctx.lineWidth = 6*pro;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.stroke();

	var hourMath = [3,4,5,6,7,8,9,10,11,12,1,2]      //钟上面的，由于画圆实在x轴开始 是3点的位置所有数组0的位置是3

	for (var i=0;i<hourMath.length;i++){
		
		var ram = 2*Math.PI/12;
		
		var x = Math.cos(ram*i)*(r-40*pro);
		var y = Math.sin(ram*i)*(r-40*pro);
		
		
		ctx.font = 20*pro+"px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.beginPath();
		ctx.arc(0,0,r*pro-30*pro,0,2*Math.PI,false);
		ctx.fillText(hourMath[i],x,y);

	}

	for (var n=0;n<60;n++){
		
		var ram = 2*Math.PI/60;
		
		var x = Math.cos(ram*n)*(r-18*pro);
		var y = Math.sin(ram*n)*(r-18*pro);

		
		ctx.beginPath();
		if (n%5 == 0) {
			ctx.fillStyle = "#000"
		}else {
			ctx.fillStyle = "#ccc"
		}
		if (n%5 == 0) {
			ctx.arc(x,y,3*pro,0,2*Math.PI,false);
		}else {
			ctx.arc(x,y,2*pro,0,2*Math.PI,false);
		}
		
		ctx.fill();
	}

}

function drawHour(hour,minute){

	ctx.save();
	var ram = 2*Math.PI/12*hour;
	var mram = 2*Math.PI/12/60*minute;
	ctx.lineWidth = 6*pro;
	ctx.lineCap = "round"
	ctx.rotate(ram+mram);
	ctx.beginPath();
	ctx.moveTo(0,20*pro);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();

}

function drawM(minute){
	ctx.save();
	var ram = 2*Math.PI/60*minute;
	ctx.lineWidth = 3*pro;
	ctx.lineCap = "round";
	ctx.rotate(ram);
	ctx.beginPath();
	ctx.moveTo(0,20*pro);
	ctx.lineTo(0,-r+40*pro);
	ctx.stroke();
	ctx.restore();
}


function drawSecond(second){
	ctx.save();
	var ram = 2*Math.PI/60*second;
	ctx.lineWidth = 3*pro;
	ctx.lineCap = "round";
	ctx.strokeStyle="#f00";
	ctx.rotate(ram);
	ctx.beginPath();
	ctx.moveTo(0,20*pro);
	ctx.lineTo(0,-r+20*pro);
	ctx.stroke();
	ctx.restore();
}



function drawRound(){
	ctx.beginPath();
	ctx.fillStyle = "#f00";
	ctx.arc(0,0,6*pro,0,2*Math.PI,false);
	ctx.fill();
	ctx.restore();
}

function run(){
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();

	drawClock();
	drawHour(hour,minute);
	drawM(minute);
	drawSecond(second);
	drawRound();
}


run()

setInterval(run,1000);