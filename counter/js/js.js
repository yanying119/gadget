window.onload = function(){
	counter();
}


function counter(){
	var counter = document.getElementById("counter"),
		buttons = counter.getElementsByTagName("button"),
		countView = document.getElementById("countView"),
		numberOne = document.getElementById("numberOne"),
		numberTwo = document.getElementById("numberTwo"),
		methods = document.getElementById("methods"),
		resulted = 0;//是否计算了一次

		for (var i = buttons.length - 1; i >= 0; i--) {
			
			buttons[i].onclick =function(){

				var text = this.innerHTML;
				countRun(text);
			}
		}

		document.onkeydown = function(event){
			var e = event || window.event ;
			var code = e.keyCode;
			var text = KeyValue(code);
			//ie下小键盘的enter键有个默认行为取消掉
			if (code == 13) {
				e.returnValue  = false;
			}
			countRun(text)
		}
		//	插入计算数据
		function ctrateView(obj,data){
			var spans = document.createTextNode(data);
				obj.appendChild(spans);
		}

		//返回计算结果
		function countResult(){

			if (methods.innerHTML == "/" && numberTwo.innerHTML=="0"){
				numberOne.innerHTML = "除数不能为0，请从新计算";
				initView();
			}else {
				var countResult = eval(numberOne.innerHTML + methods.innerHTML + numberTwo.innerHTML);
				numberOne.innerHTML = countResult;
			}
			resulted = 1;

		}
		//重置数据
		function initView(){

			numberTwo.innerHTML = "";
			methods.innerHTML = "";
		}
		//判断正负数
		function numbelType(numbels){

			if(/^\-/.exec(numbels)){
				return numbels = numbels.slice(1);
			}else{
				return numbels = "-"+numbels;
			}
		}

		
		//按键返回字符
		function KeyValue(code){
			switch(code) {
				case 96:
					return 0;
					break;
				case 48:
					return 0;
					break;
				case 97:
					return 1;
					break;
				case 49:
					return 1;
					break;
				case 98:
					return 2;
					break;
				case 50:
					return 2;
					break;
				case 99:
					return 3;
					break;
				case 51:
					return 3;
					break;
				case 100:
					return 4;
					break;
				case 52:
					return 4;
					break;
				case 101:
					return 5;
					break;
				case 53:
					return 5;
					break;
				case 102:
					return 6;
					break;
				case 54:
					return 6;
					break;
				case 103:
					return 7;
					break;
				case 55:
					return 7;
					break;
				case 104:
					return 8;
					break;
				case 56:
					return 8;
					break;
				case 105:
					return 9;
					break;
				case 57:
					return 9;
					break;
				case 107:
					return "+";
					break;
				case 109:
					return "-";
					break;
				case 106:
					return "*";
					break;
				case 111:
					return "/";
					break;
				case 187:
					return "=";
					break;
				case 13:
					return "=";
					break;
				case 110:
					return ".";
					break;
				case 190:
					return ".";
					break;
				case 27:
					return "MC";
					break;
				case 189:
					return "+-";
					break;
				case 8:
					return "←";
					break;
				default:
					return null;
			}
		}
		//计算方法
		function countRun (text){
			var methodsValue = methods.innerHTML;

			if (numberOne.innerHTML == "0" && /^[\d]?$/.exec(text)){
				numberOne.innerHTML = "";
			}
			//计算结果之后 在按数字就会重新输入公式计算,如果连续计算也不会重新计算
			if (resulted == 1 && /^[\d]?$/.exec(text) && methods.innerHTML == "") {
				numberOne.innerHTML = "";
				resulted = 0;
			}
			//重置
			if (text == "MC") {
				initView();
				numberOne.innerHTML = "0";
			}
			//按数字按钮
			if (/^[\d\.]?$/.exec(text) && methodsValue == ""){
				
				ctrateView(numberOne,text);
			}

			// + - * / 按钮
			if(/^[\+\-\*\/]?$/.exec(text)){
			
				if (numberTwo.innerHTML) {
					countResult();
					initView()
					methods.innerHTML = text;
				}else{
					methods.innerHTML = text;
				}

			}

			// + - * / 按了之后第二个数字
			if(/^[\d\.]?$/.exec(text) && methodsValue != "") {
				ctrateView(numberTwo,text);
			}

			// 按=号
			if (text == "=" && methodsValue != "") {
				countResult();
				initView()
			}	
			//控制正负号
			if (text == "+-") {

				if(methods.innerHTML){
					numberTwo.innerHTML = numbelType(numberTwo.innerHTML);
				}else {
					numberOne.innerHTML = numbelType(numberOne.innerHTML);
				}
			}
			//回退按钮 
			if (text == "←"){

				if(methods.innerHTML &&　numberTwo.innerHTML.length>0){
					numberTwo.innerHTML = numberTwo.innerHTML.slice(0,numberTwo.innerHTML.length-1);
				}else if (methods.innerHTML == "" && numberOne.innerHTML.length>0){
					numberOne.innerHTML = numberOne.innerHTML.slice(0,numberTwo.innerHTML.length-1);
				}
			}
			//求根方法
			if (text == "√"){
				numberOne.innerHTML = Math.sqrt( +numberOne.innerHTML );
			}
			//n分之1
			if (text == "1/X"){
				numberOne.innerHTML = 1/(+numberOne.innerHTML);
			}
		}
}