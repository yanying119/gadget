;(function($){
	/*
	plug-in  0.0.1
	Date:2016.04.14 13:28:00
	add:杭州市
	author:糯米团子
	*/

	$.fn.myFun = function(opt){
		//定义一个方法
		var defaults = {
			names:'糯米团子',
			ages:26,
			heights:170,
			setFunction:null
		};
		var opt = $.extend({},defaults,opt);
		var _this = this;

		var neiFun = {
			obj:_this,
			opt:opt,
			init:function(){
				this.getName();
				this.setFunction();
			},
			getName:function(){
				this.obj.text("我叫"+this.opt.names+",我今年"+this.opt.ages+"岁了")
			},
			setFunction:function(){
				var _this=this.obj;
				if(typeof this.opt.setFunction  =="function"){
					this.opt.setFunction(_this);
				}
				
			}
		};

		return this.each(function(){
			neiFun.init();
		});

	};
})(jQuery);