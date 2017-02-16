;(function(w){
	var Star = function(opt){

		this.opt = {
			starCount:200,
			meteorCount:20,
			starArr:[],
			meteorArr:[],
			speed:5,
			canvas:document.getElementById("canvas")
		}
		var _this = this;
		if(opt && typeof opt == "object"){
			for(arr in opt){
				_this.opt[arr] = opt[arr];
			}
		}
	}
	Star.prototype.init = function(){
		var opt = this.opt;
		opt.canvas.width = opt.canvas.parentNode.clientWidth;
		opt.canvas.height = opt.canvas.parentNode.clientHeight;
		
		this.star.init(this.opt);
		this.meteor.init(this.opt);
	}

	Star.prototype.star = {
		opt:null,
		init:function(obj){
			this.opt = obj;
			this.drawStar();
			this.runStar();
		},
		madeStar:function(obj){
			var	_this = obj;
			var opt = _this.opt;
			var cxt = opt.canvas.getContext("2d");

			this.x = Math.random()*opt.canvas.width;
			this.y = Math.random()*opt.canvas.height;

			this.init = function(){
				var n = Math.random();
				var color ;
				if(n>0.5){
					color = "#fff"
				}else{
					color = "#222"
				}

				cxt.save();
				cxt.beginPath();
				cxt.fillStyle = color;
				cxt.fillText("·",this.x,this.y);
				cxt.closePath();
				cxt.fill();
				cxt.restore();
			}
		},
		drawStar:function(){
			var MadeStar = this.madeStar;
			var _this = this;
			for(var i = 0;i<this.opt.starCount;i++){
				var obj = new MadeStar(_this);
					obj.init();
					_this.opt.starArr.push(obj);
			}
			
		},
		runStar:function(){
			var _this = this;
			for(var i = 0;i<_this.opt.starArr.length;i++){
				
				_this.opt.starArr[i].init();
			}
			setTimeout(function(){
				_this.runStar();
			},80)
		}
	}

	Star.prototype.meteor = {
		opt:null,
		init:function(obj){
			this.opt = obj;

			this.drawMeteor();
			this.runMeteor();
		},
		drawMeteor:function(){
			var MadeMeteor = this.madeMeteor;
			var _this =this;
			for(var i =0;i<_this.opt.meteorCount;i++){
				var meteor = new MadeMeteor(_this);
					meteor.init();
					_this.opt.meteorArr.push(meteor);
			}
		},
		madeMeteor:function(obj){
			var _this =obj;
			var opt = _this.opt;

			this.x = Math.random()*opt.canvas.width;
			this.y = Math.random()*opt.canvas.height;


			var cxt = opt.canvas.getContext("2d");
			var meteorLength = Math.random()*30+40;

			this.init = function(){
				var _this = this;
				cxt.clearRect(_this.x,_this.y-meteorLength,meteorLength,meteorLength);
				cxt.save();
				cxt.beginPath();

				var line = cxt.createLinearGradient(_this.x,_this.y,_this.x-meteorLength,_this.y+meteorLength);
				line.addColorStop(0,"#000");
				line.addColorStop(1,"#fff");

				cxt.strokeStyle = line;
				cxt.moveTo(_this.x,_this.y);
				cxt.lineTo(_this.x-meteorLength,_this.y+meteorLength);
				cxt.closePath();
				cxt.stroke();
			}

			this.getPotion = function(){
				this.x -= opt.speed;
				this.y += opt.speed;
				this.init();
			}
		},
		runMeteor:function(){
			var _this = this;
			var opt = this.opt;
			var MadeMeteor = this.madeMeteor;
			for(var i=0; i<opt.meteorArr.length ; i++) {

				opt.meteorArr[i].getPotion();

				if (opt.meteorArr[i].y > opt.canvas.height) {
					opt.meteorArr[i] = new MadeMeteor(_this);
					opt.meteorArr[i].init();
				}
			}
				//console.log(opt.meteorArr)
			setTimeout(function(){
				_this.runMeteor();
			},30)
		},

	}

	w.Star = Star;
})(window);