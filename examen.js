var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var x1 = 0; // первый множитель
var x2 = 0; // второй множитель
var pr_d = 0; // кол-во десятков в произведении
var pr_e = 0; // кол-во единиц в произведении
var pr = 0; // значение произведения		
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
var c = 0; // изначально цвет черный
var timerId;
var x2_n = 0;

stop(x1); // Функция очистки и перерисовки экрана	

// функция перевода из градусов в радианы
function inRad(num) {
	return num * Math.PI / 180;
}

// по нажатию кнопки Стоп и при загрузке
function stop(x1) {
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
	context.fillText("множители", 300, 25);				
	context.fillText("произведение", 300, 725);	
	context.fillText("X", 300, 80);				
	context.strokeStyle = "black"
	context.strokeRect(200, 40, 50, 50);
	context.fillText(x1, 225, 80); // первый множитель			
	context.strokeRect(350, 40, 50, 50);
	context.fillText(x2, 375, 80); // второй множитель		
	
	if (x1 == 5) {	
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
}

function random_x1_x2() { // рандомно два множителя
	x1 = parseInt((9 * Math.random()) + 1);
	x2 = parseInt((9 * Math.random()) + 1);
	combo1.value = x1;
	combo2.value = x2;
	dr_x1_x2(x1,x2);
	answer.value = ''
	smile.src = 'sm1.png'
	stop(x1);
}
function combo_ch() { // выбор множителя из выпадающего списка
	x1 = combo1.value;
	x2 = combo2.value;
	dr_x1_x2(x1,x2);
	answer.value = ''
	smile.src = 'sm1.png'
	stop(x1);
}
function dr_x1_x2(x1,x2) { // перерисовка первого и второго множителя
	context.fillStyle = "black"	;
	context.textAlign = "center";
	context.textBaseline="alphabetic";
	context.font = "30pt Courier New monospace";
	context.clearRect(201, 41, 48, 48); // очистить поле
	context.fillText(x1, 225, 80); // первый множитель	
	context.clearRect(351, 41, 48, 48); // очистить поле				
	context.fillText(x2, 375, 80); // второй множитель
}

// функция подсчета десятков и единиц в произведении
function pr_d_e(pr) { 
	if (pr >= 10) {
		pr_e = pr % 10; // значение единиц произведения
		pr_d = Math.floor(pr / 10) % 11; // значение десятков произведения
	}
	else { // если десятков = 0
		pr_e = pr % 10; // значение единиц произведения
		pr_d = 0; // значение десятков произведения
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
	context.font = "bold 30pt Courier New monospace";
	context.fillStyle = "red";
	context.fillText(j,nx[j],ny[j]);
	}
}

function test() {
	x1 = combo1.value;
	x2 = combo2.value;
	if (x1 != 0 && x2 != 0) { // не равны нулю множители
		if (answer.value == x1 * x2) {
			smile.src = 'sm3.png';
			timerId = setInterval(function() { schet(x1,x2) }, 500);
			
		}
		else {
			smile.src = 'sm2.png';
			alert("ОТВЕТ НЕВЕРНЫЙ! ПОПРОБУЙ ЕЩЕ РАЗОК!");
		}
	}
	else {
		alert("Нажмите кнопку 'УМНОЖЬТЕ' для выбора множителей!");
	}
}

// функция обрисовки окружности в соотв с множителями	
function schet(x1,x2) {	
	x2_n = x2_n + 1;
	if (x2_n <= x2) {
		context.fillStyle = "black"	
		context.textAlign = "center";
		context.textBaseline="alphabetic";
		context.font = "30pt Courier New monospace"
		
		context.clearRect(351, 41, 48, 48); // очистить поле				
		context.fillText(x2, 375, 80); // второй множитель
		pr = x1 * x2_n;
		pr_d_e(pr);
		if (x1 == 5) {
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
		if (x2_n == 1) {
			i = 0;
		}
		else {
			i = j;
		}
		j = pr_e;
		if (x1 == 5 || pr_e == x1) {
			c = (parseInt(c) + parseInt(x1)) % 11; // меняет цвет, когда пройден круг обводки
		}
		d_line(i,j,c,8); // начальная точка, конечная точка, цвет, толщина
	}
	else {					
		clearInterval(timerId);
		x2_n = 0;
		c = 0;
		alert("МОЛОДЕЦ! ОТЛИЧНО СПРАВИЛСЯ С ЗАДАНИЕМ!");
		stop(x1);
		smile.src = 'sm1.png'
	}
}
