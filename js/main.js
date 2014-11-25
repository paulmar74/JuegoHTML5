//alert('act1')
var part;
var choosePartido = {
	load:function(){
		//$('body').css('height',(window.height));
		 $(window).keydown(function (event) {console.info(event.keyCode)
			if (event.which == 32 ) {
				event.preventDefault();
			}
		});
		var startGame = document.getElementById('sg');
		var partido = document.getElementById('wrap_partido');
		var partidAtt = partido.getElementsByTagName('a');
		for(var i = 0; i < partidAtt.length; i ++){
			if (partidAtt[i].nodeName.toLowerCase() == 'a'){
				partidAtt[i].addEventListener('click',function(){
					part = this.getAttribute('data-partido');
					partidAtt[0].style.display = 'none';
					partidAtt[1].style.display = 'none';	
					this.style.display='block';	
					startGame.style.display = 'block'
					document.getElementsByTagName('h2')[0].style.display = 'none';
					document.getElementsByTagName('h3')[0].style.display = 'none';
					
				})
			}
		
			
		}

	
	 var wrap = document.getElementsByClassName('wrapper-lb')[0];
	 	 startGame.addEventListener('click',function(){
			/* if (part != ''){*/
				wrap.style.display = 'none';
				agregarEventosTeclado();
				iniciarApp();
				loadMedia();
				//
				
				
			/* }*/
		 })
	
	}	 
	
}

//objetos importantes de canvas

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
//definir var para fondo
var config = {
	velNave: 5,
	velBombasEnemigo: 5,
	velEnemigos: 1,
	velNaveDisparos: 8,
	filasEnemigos:2
	
}
var fondo,imgEnemigo,imgEnemigoHit,imgNave,imgNaveHit,fired,imgLanza;
var intervalo;
// crear nave
var teclado = {};
var move = {};

//array para los disparos
var disparos = [];
//array que almacena los enemigos
var enemigos = [];
//array para los disparos del enemigo
var disparosEnemigos = [];
var nave = {
	x:100,
	y:canvas.height-100,
	width:120,
	height:80,
	estado:'vivo',
	contador:0
	
	}
var juego = {
	estado: 'iniciando'
}
var textoRespuesta = {
	contador: -1,
	titulo: '',
	subtitulo: '' 
}
// definicion de funciones
function loadMedia(){
	fondo = new Image();
	fondo.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVSml1b3ctQU1qVFU';
	imgLanza = new Image();
	imgLanza.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVZnNCMVJsMDk1Wk0';
	/*if (part == 'dd'){*/
	 imgEnemigo = new Image();
	 imgEnemigo.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVRjVQMFJnbTZnRms';
	 imgEnemigoHit = new Image();
	 imgEnemigoHit.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVSUVldkYtdk1kMms';
	/*}*/
	if(part == 'amd'){
		imgEnemigo = new Image();
	    imgEnemigo.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVU2FsUVlOaHBKc1U';
		imgEnemigoHit = new Image();
	    imgEnemigoHit.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVcm5CdUJ4cjNfblU';
	}
	imgNave = new Image();
	imgNave.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVNzVzQ21JdGJzLTA';
	imgNaveHit = new Image();
	imgNaveHit.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVODdTWHZfeU1SZlU';
	fired = new Image();
	fired.src = 'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVcGk1cl9JaHd6Z28';
	fondo.onload = function(){
			 
			  //setTimeout(function(){window.clearInterval(intervalo)},10000);	
	}
	if(fondo.complete&&imgLanza.complete&&imgEnemigo.complete&&imgEnemigoHit.complete&&imgNave.complete&&imgNaveHit.complete&&fired.complete){
			
	}
}
function dibujarEnemigos(){
	
	for (var i in enemigos){
		var enemigo = enemigos[i];
		ctx.save();
		if(enemigo.estado == 'vivo')imagenEnemigo = imgEnemigo;
		if(enemigo.estado == 'hit')imagenEnemigo = imgEnemigoHit;
		ctx.drawImage(imagenEnemigo,enemigo.x,enemigo.y,enemigo.width,enemigo.height);
		/*ctx.fillRect(enemigo.x,enemigo.y,enemigo.width,enemigo.height);*/
		ctx.restore();
	}	
}
function dibujarFondo(){
	ctx.drawImage(fondo,0,0);	
}
function dibujarNave(){
	
	ctx.save();
	
	/*ctx.fillStyle='#fff';*/
	/*ctx.fillRect(nave.x,nave.y,nave.width,nave.height);*/	
	if(nave.estado == 'vivo')imagenNave = imgNave;
	if(nave.estado == 'hit'){imagenNave = imgNaveHit;nave.y=canvas.height-80}
	ctx.drawImage(imagenNave,nave.x,nave.y,nave.width,nave.height);
	ctx.restore();
}

function agregarEventosTeclado(){
	var toLeft = document.getElementById('tLeft');
	var toRight = document.getElementById('tRight');
	var toShot = document.getElementById('tShot');
	
	agregarEvento(document,'keydown',function(e){
		//ponemos en true la tecla presionada
		teclado[e.keyCode] = true;
	});
	agregarEvento(document,'keyup',function(e){
		//desabilitamos la tecla poniendola en false
		teclado[e.keyCode] = false;	
	});
	
	agregarEvento(toLeft,'touchenter',function(e){
		//ponemos en true la tecla presionada
		e.preventDefault();
		move.left = true;

	});
	agregarEvento(toLeft,'touchleave',function(e){
		//desabilitamos la tecla poniendola en false
		e.preventDefault();
		move.left = false;	
	});
	agregarEvento(toRight,'touchenter',function(e){
		//ponemos en true la tecla presionada
		e.preventDefault();
		move.right = true;
	});
	agregarEvento(toRight,'touchleave',function(e){
		//desabilitamos la tecla poniendola en false
		e.preventDefault();
		move.right = false;	
	});
	agregarEvento(toShot,'touchenter',function(e){
		//ponemos en true la tecla presionada
		e.preventDefault();
		move.shot = true;
	});
	agregarEvento(toShot,'touchleave',function(e){
		//desabilitamos la tecla poniendola en false
		e.preventDefault();
		move.shot = false;	
	});

	function agregarEvento(elemento,nombreEvento,funcion){
		if(elemento.addEventListener){
			//navegadores modernos
			elemento.addEventListener(nombreEvento,funcion,false);	
		}else if(elemento.attachEvent){
			//Internet explorer
			elemento,attachEvent(nombreEvento,funcion);
		}
	}

}

function moverNave(){
	//move to left
	if ((teclado[37])||(move.left)){
		nave.x -= config.velNave;
		if(nave.x < 0) nave.x = 0;
		window.focus();

		// Remove focus from any focused element
		if (document.activeElement) {
			document.activeElement.blur();
		}
	}
	//move to right
	if ((teclado[39])||(move.right)){
		var limite = canvas.width - nave.width;
		nave.x += config.velNave;
		if(nave.x > limite) nave.x = limite;
	}
	if (((teclado[32])&&( nave.estado == 'vivo'))||((move.shot) && (nave.estado == 'vivo'))){
		//console.log(teclado.fire + ' teclado.fire');
		//teclado.fire es un booleano que creamos y que le damos los valores en el if de abajo
		//para que dispare una bala a a la vez la nave
		if(!teclado.fire){
			fire();
			teclado.fire = true;
		}
		
	}else {
		teclado.fire = false
	}
	
	if(nave.estado == 'hit'){
		nave.contador++;
		if(nave.contador >= 20){
			nave.contador = 0;
			nave.estado = 'muerto';
			juego.estado = 'perdido';
			textoRespuesta.titulo = 'Game Over';
			textoRespuesta.subtitulo = 'Presiona la tecla (R) para seguir defendiendo nuestra selva';
			textoRespuesta.contador = 0;
		}	
	}
	
}
function dibujarDisparosEnemigos(){
	for(var i in disparosEnemigos){
		var disparo = disparosEnemigos[i];
		
		ctx.save();
		//ctx.fillStyle = 'yellow';
		ctx.drawImage(fired,disparo.x,disparo.y,disparo.width,disparo.height);
		ctx.restore();	
	}
		
}

function moverDisparosEnemigos(){
	for(var i in disparosEnemigos){
		var disparo = disparosEnemigos[i];
		disparo.y += config.velBombasEnemigo;
	}
	disparosEnemigos = disparosEnemigos.filter(function(disparo){
		return disparo.y < canvas.height;
	})
}


function actualizaEnemigos(){
	function agregarDisparosEnemigos(enemigo){
	 	return {
			x:enemigo.x,
			y:enemigo.y+60,
			width:14,
			height:37,
			contador:0	
			
		}	
	}
	if (juego.estado == 'iniciando'){
		for (var j = 0; j < config.filasEnemigos; j++){
			var fila = j*95;
			for(var i = 0; i < 10; i++){
				enemigos.push({
					x:10 + (i*90),
					y:10+fila,
					height:80,
					width:80,
					estado:'vivo',
					contador:0
				})
			}
		}
		juego.estado = 'jugando';
	}
	//mover enemigos con la funcion matematica seno
	for (var i in enemigos){
		var enemigo = enemigos[i];
		if(!enemigo) continue;
		if (enemigo && enemigo.estado == 'vivo'){
			enemigo.contador++;
			enemigo.x += Math.sin(enemigo.contador * Math.PI/(90/config.velEnemigos))*(5*config.velEnemigos);
			
			if(aleatorio(0,enemigos.length * 10) == 4){
				disparosEnemigos.push(agregarDisparosEnemigos(enemigo));
			}	
		}
		if(enemigo && enemigo.estado == 'hit'){
			enemigo.contador++;
		  	//console.log(enemigo.contador + ' contadores');
			if(enemigo.contador >= 20){
				enemigo.estado = 'muerto';
				enemigo.contador = 0;		
			}
		}
	}
	enemigos = enemigos.filter(function(enemigo){
		if(enemigo && enemigo.estado != 'muerto') return true;
		return false
	})
}


function moverDisparos(){
	for (var i in disparos){
		var disparo = disparos[i];
		//hacemos que suban los disparos
		disparo.y -= config.velNaveDisparos;		
	}
	disparos = disparos.filter(function(disparo){
		return disparo.y > 0;
	})
}
function fire(){
	//tamaño y posicion inicial de los disparos
	disparos.push({
		x:nave.x + 20,
		y:nave.y - 10,
		width: 10,
		height: 30	
	});
}
function dibujarDisparos(){
	
	ctx.save();
	for (var i in disparos){
		var disparo = disparos[i];
		ctx.drawImage(imgLanza,disparo.x,disparo.y,disparo.width,disparo.height);
	}
	ctx.restore();	
}
function dibujarTexto(){
	if(textoRespuesta.contador == -1)return;
	var alpha = textoRespuesta.contador/50.0;
	if(alpha>1){
		for(var i in enemigos){
			delete enemigos[i];	
		}
		
	}
	var colorLetter = 'yellow';
	ctx.save();
	ctx.globalAlpha = alpha;
	if(juego.estado == 'perdido'){
		ctx.fillStyle = colorLetter;
		ctx.font = 'bold 70pt Arial';
		ctx.fillText(textoRespuesta.titulo,140,250);
		ctx.font = '20pt Arial';
		ctx.fillText(textoRespuesta.subtitulo,140,300);
	}
	if(juego.estado == 'victoria'){
		ctx.fillStyle = colorLetter;
		ctx.font = 'bold 55pt Arial';
		ctx.fillText(textoRespuesta.titulo,140,200);
		ctx.font = '20pt Arial';
		ctx.fillText(textoRespuesta.subtitulo,140,250);
	}
	ctx.restore();	
}
function actualizarEstadoJuego(){	
	if(juego.estado == 'jugando' && enemigos.length == 0){
		juego.estado = 'victoria';
		textoRespuesta.titulo = 'Derrotaste a los mineros';
		textoRespuesta.subtitulo = 'Presiona la tecla (R) para reiniciar la defensa de nuestra selva';	
		textoRespuesta.contador = 0;
	}
	if(textoRespuesta.contador >= 0){
		textoRespuesta.contador++;	
	}	
	if((juego.estado == 'perdido' || juego.estado == 'victoria') && teclado[82]){
		juego.estado = 'iniciando';
		nave.estado = 'vivo';
		textoRespuesta.contador = -1;	
	}
}
//verificando si existe o no colisiones
function hit(a,b){
	var hit = false;
	if(b.x + b.width >= a.x && b.x < a.x + a.width){
		if(b.y + b.height >= a.y && b.y < a.y + a.height){
			hit = true;
		}
	}
	if(b.x <= a.x && b.x + b.width >= a.x + a.width){
		if(b.y <= a.y && b.y + b.height >= a.y + a.height){
			hit = true;
		}
	}
	if(a.x <= b.x && a.x + a.width >= b.x + b.width){
		if(a.y <= b.y && a.y + a.height >= b.y + b.height){
			hit = true;
		}
	}

	return hit;	
}
function verificarContacto(){
	for(var i in disparos){
		var disparo = disparos[i];
		for(j in enemigos){
			var enemigo = enemigos[j];
			if(hit(disparo,enemigo)){
				enemigo.estado = 'hit';
				enemigo.contador = 0;
				//console.log('chocado');	
			}
			
		}
	}
	if(nave.estado == 'hit'	 || nave.estado == 'muerto')return;
	for(var i in disparosEnemigos){
		var disparo = disparosEnemigos[i];
		if(hit(disparo,nave)){
			nave.estado = 'hit';
			console.log('te dieron');	
		}
		
	}	
	
}
function aleatorio(inferior,superior){
	var posibilidades = superior - inferior;
	var a = Math.random() * posibilidades;
	a = Math.floor(a);
	return parseInt(inferior) + a;
}
function frameloop(){
	actualizarEstadoJuego();
	moverNave();
	actualizaEnemigos();
	moverDisparos();
	moverDisparosEnemigos();
	dibujarFondo();
	verificarContacto();
	dibujarEnemigos();
	dibujarDisparosEnemigos();
	dibujarDisparos();
	dibujarTexto();
	dibujarNave();
}
// ejecucion de funcion que a su vez ejecutara las otras funciones.

loadMedia();
choosePartido.load();
