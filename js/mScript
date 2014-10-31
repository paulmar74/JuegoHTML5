var canvasDos,preloader,imagenes;
imagenes = ['http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVRERDcXpIVmEzbGc',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVU2FsUVlOaHBKc1U',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVcm5CdUJ4cjNfblU',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVSml1b3ctQU1qVFU',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVRjVQMFJnbTZnRms',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVSUVldkYtdk1kMms',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVZnNCMVJsMDk1Wk0',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVNzVzQ21JdGJzLTA',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVODdTWHZfeU1SZlU',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVWGxuUlZ0WEdJS1E',
'http://drive.google.com/uc?export=view&id=0B31lrqy0GyeVYlVtemZydjUzdDg'];
$(document).on("ready",iniciarApp);
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
	preloader = new PreloadJS();
	preloader.onProgress = progresoCarga;
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
	cargar();
}
function cargar()
{
	while(imagenes.length > 0)
	{
		var imagen = imagenes.shift();
		preloader.loadFile(imagen);	
	}
}
function progresoCarga()
{
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
	var progresoEntero = parseInt(preloader.progress*100);
	$("#porcentaje").text(progresoEntero+"%");
	if(preloader.progress == 1)
	{
		$("#preloader").remove();
		$("#wrapper").fadeIn();
		var interval = window.setInterval(frameLoop,1000/55);
	}
}
