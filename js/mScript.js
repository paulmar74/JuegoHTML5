var canvasDos,motorPreload;
var preloader = {
		progress : 0,
			
	}

function iniciarApp()
{
	
	canvasDos = document.getElementById('miCanvas');
	$("#miCanvas").css({
		'top':($('html').height()-canvasDos.height)/4+'px',
		'left':($('html').width()-canvasDos.width)/2+'px'
	});
	$("#porcentaje").css({
		'top':($('html').height()-$("#porcentaje").height())/3.5+'px',
		'left':($('html').width()-$("#porcentaje").width())/2+'px'
	});
	$('#preloader').css('display','block');
	motorPreload = window.setInterval(function(){
		progresoCarga()
	},1000/55)
	prepararCanvas();
}
function prepararCanvas()
{
	var ctxD = canvasDos.getContext('2d');
	var radio = 98;
	var posX = radio +2;
	var posY = radio +2;
	ctxD.arc(posX,posY,radio,0,2 * Math.PI, false);
	ctxD.strokeStyle= "gray";
	ctxD.lineWidth= 4;
	ctxD.stroke();
	//cargar();
}
/*function cargar()
{
	while(imagenes.length > 0)
	{
		var imagen = imagenes.shift();
		preloader.loadFile(imagen);	

	}
}*/
function progresoCarga()
{
	preloader.progress = preloader.progress + 0.004;
	console.log(preloader.progress)
	var ctxD = canvasDos.getContext('2d');
	ctxD.beginPath();
	var radio= 98;
	var posX = radio +2;
	var posY = radio +2;
	var endAngle = (preloader.progress * (2*Math.PI));
	ctxD.arc(posX,posY,radio,0,endAngle, false);
	ctxD.strokeStyle = "black";
	ctxD.lineWidth = 4;
	ctxD.stroke();
	var progresoEntero = parseInt((preloader.progress)*100);
	$("#porcentaje").text(progresoEntero+"%");
	if(progresoEntero == 100)
	{
		$("#preloader").remove();
		//$("#wrapper").fadeIn();
		//var intervalo = window.setInterval(frameloop,1000/55);
		intervalo = window.setInterval(frameloop,1000/55);
		setTimeout(function(){window.clearInterval(motorPreload)});
	}
}
