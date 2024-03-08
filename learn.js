var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var k = 0; // столбец умножения
var x1 = 0; // первый множитель
var x2 = 0; // второй множитель
var pr_d = 0; // кол-во десятков в произведении
var pr_e = 0; // кол-во единиц в произведении
var pr = 0; // значение произведения		
var timerId;
var c_start = true; // можно ли нажимать кнопку Старт
var x = canvas.width / 2; // середина коорд по х
var y = canvas.height / 2; // середина коорд по у
var radius = 250; // радиус окружности
var angle = (inRad(-90)); // угол в радианах			
var tx = Array(); // массив координат точек по х
var ty = Array(); // массив координат точек по y
var nx = Array(); // массив координат надписей по х
var ny = Array(); // массив координат надписей по y	
var cl = Array(); // массив цветов линий
cl[0] = "rgb(0,0,0)"
cl[1] = "rgb(255,0,255)"
cl[2] = "rgb(0,0,128)"
cl[3] = "rgb(255,255,0)"
cl[4] = "rgb(0,255,0)"
cl[5] = "rgb(0,0,255)"
cl[6] = "rgb(128,0,128)"
cl[7] = "rgb(255,0,0)"
cl[8] = "rgb(0,255,255)"
cl[9] = "rgb(0,128,0)"
cl[10] = "rgb(128,0,0)"

stop(k); // Функция очистки и перерисовки всего на экране			

// функция перевода из градусов в радианы
function inRad(num) {
	return num * Math.PI / 180;
}

// функция обрисовки окружности в соотв с множителями	
function schet(k) {	
	x2 = x2 + 1;
	if (x2 <= 10) {
		context.fillStyle = "black"	
		context.textAlign = "center";
		context.textBaseline="alphabetic";
		context.font = "30pt Courier New monospace"
		
		context.clearRect(351, 41, 48, 48); // очистить поле				
		context.fillText(x2, 375, 80); // второй множитель
		pr = x1 * x2;
		pr_d_e(pr);
		if (k == 5) {
		context.clearRect(251, 381, 38, 38); // очистить поле
		context.fillText(pr_d, 270, 415); // десяток произведения в центре
		}
		else {
		context.clearRect(281, 381, 38, 38); // очистить поле
		context.fillText(pr_d, 300, 415); // десяток произведения в центре
		}		
		context.clearRect(251, 741, 48, 48); // очистить поле					
		context.fillText(pr_d, 275, 780); // десяток произведения
		context.clearRect(301, 741, 48, 48); // очистить поле
		context.fillText(pr_e, 325, 780); // единицы произведения
		if (x2 == 1) {
			i = 0;
		}
		else {
			i = j;
		}
		j = pr_e;
		if (k == 5 || pr_e == x1) {
			c = (parseInt(c) + parseInt(k)) % 11; // меняет цвет, когда пройден круг обводки
		}
		d_line(i,j,c,8); // начальная точка, конечная точка, цвет, толщина
	}
	else {					
		clearInterval(timerId);					
		alert("Конец! Нажмите старт для повторного изучения!");					
		stop(k);
		radio1.checked = false;
	}
}

// функция подсчета десятков и единиц в произведении
function pr_d_e(pr) { 
	if (pr >= 10) {
		pr_e = pr % 10; // значение единиц произведения
		pr_d = Math.floor(pr / 10) % 11; // значение десятков произведения
	}
	else { // если десятков = 0
		pr_e = pr % 10 // значение единиц произведения
		pr_d = 0 // значение десятков произведения
	}
}

// функция рисования линии
function d_line(i,j,c,w) { // начальная точка, конечная точка, цвет, толщина
	context.beginPath();			
	context.moveTo(tx[i], ty[i]); // предыд. единица произведения
	context.lineTo(tx[j], ty[j]); // текущ. единица произведения
	context.lineWidth = w;
	context.strokeStyle = cl[c];					
	context.stroke(); // рисуем линию
	if (c != 0) {
	context.textBaseline="middle";
	context.font = "bold 30pt Courier New monospace"
	context.fillStyle = "red";
	context.fillText(j,nx[j],ny[j]);
	}
}

// по нажатию кнопки Старт
function start(k) {
	if (k > 0) {
		if (c_start == true) {
			c_start = false;
			x1 = k;
			context.clearRect(201, 41, 48, 48); // очистить поле
			context.fillStyle = "black"	
			context.textAlign = "center";
			context.textBaseline="alphabetic";
			context.font = "30pt Courier New monospace"
			context.fillText(x1, 225, 80); // первый множитель
			timerId = setInterval(function() { schet(k) }, 2000);
		}
	}
	else {
		alert('Выберите столбец умножения для изучения!');
		radio1.checked = false;
	}
}

// по нажатию кнопки Пауза
function pause() {
	clearInterval(timerId);
	c_start = true;
}			

// по нажатию кнопки Стоп и при загрузке
function stop(k) {
	clearInterval(timerId);
	c_start = true;
	x1 = k;
	x2 = 0;
	pr = 0;
	pr_d = 0;
	pr_e = 0;
	angle = (inRad(-90));
	
	context.clearRect(0, 0, canvas.width, canvas.height); // очистка всего холста				
	//Прорисовка полей
	context.lineWidth = 1;
	context.fillStyle = "black"	
	context.textAlign = "center";
	context.textBaseline="alphabetic";
	context.font = "30pt Courier New monospace"
	//context.font = "italic 30pt Arial";
	context.fillText("множители", 300, 25);				
	context.fillText("произведение", 300, 725);	
	//context.font = "30pt Courier New monospace"
	context.fillText("X", 300, 80);				
	context.strokeStyle = "black"
	context.strokeRect(200, 40, 50, 50);
	context.fillText(x1, 225, 80); // первый множитель			
	context.strokeRect(350, 40, 50, 50);
	context.fillText(x2, 375, 80); // второй множитель		
	
	if (k == 5) {	
	context.strokeRect(250, 380, 40, 40);	
	context.fillText(pr_d, 270, 415); // десяток произведения в центре
	}
	else {
	context.strokeRect(280, 380, 40, 40);			
	context.fillText(pr_d, 300, 415); // десяток произведения в центре
	}
	
	context.strokeRect(250, 740, 50, 50);	
	context.fillText(pr_d, 275, 780); // десяток произведения
	context.strokeRect(300, 740, 50, 50);	
	context.fillText(pr_e, 325, 780); // единицы произведения
	
	// окружность			
	context.beginPath();
	context.arc(x, y, radius, angle, (inRad(270)), false);
	context.closePath();
	context.lineWidth = 3;
	context.strokeStyle = 'black';
	context.stroke();
	
	start_angle = angle;
	// точки на окружности
	angle = start_angle - inRad(36); // каждые 36 градусов точка					
	for(var i = 0; i < 10; i++) {
		angle = angle + inRad(36);				
		tx[i] = x + radius * Math.cos(angle);
		ty[i] = y + radius * Math.sin(angle);
		context.beginPath();
		context.arc(tx[i],ty[i], 5, 0, Math.PI * 2, false);
		context.closePath();
		context.lineWidth = 1;
		context.fillStyle = "black";
		context.fill();
		
		nx[i] = x + (radius + 20) * Math.cos(angle);
		ny[i] = y + (radius + 20) * Math.sin(angle);
		context.textBaseline="middle";
		context.font = "30pt Courier New monospace"
		context.fillText(i,nx[i],ny[i]);
	}							
	if (k > 0) { // если передано значение столбца, сделать абрис
		for(var n = 1; n <= 10; n++) {
			x2 = x2 + 1;
			pr = x1 * x2;
			pr_d_e(pr);
			if (x2 == 1) {
				i = 0;
			}
			else {
				i = j;
			}
			j = pr_e;
			c = 0;
			d_line(i,j,c,3); // начальная точка, конечная точка, цвет, толщина
		}
		// вернуться к начальным значениям
		x1 = k;
		x2 = 0;
		pr = 0;
		pr_d = 0;
		pr_e = 0;
	}
	//alert('stop exit '+(k));
}
	
function check() {
	k = x1;
	if (radio1.checked) {
		start(k);					
	}
	else if (radio2.checked) {
		pause();
	}
	else if (radio3.checked) {
		stop(k);
	}
}

function check2() {
	var inp = document.getElementsByName('vibor');
	for (var n = 0; n < inp.length; n++) {
		if (inp[n].type == "radio" && inp[n].checked) {
			stop(inp[n].value);
		}
	}
}

			/*function start(j) {
	for(var i = 1; i <= j; i++) {
	  var timerId = setTimeout(d_line, i * 1000, i);
	}*/			
