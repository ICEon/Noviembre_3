//alertas del dispositivo

function pgAlert(mess){
var title=$('title').text();
var btnName='Aceptar';
function error(){
//alert(mess);
}
navigator.notification.alert(mess, error, title, btnName);
}

$(document).ready(function(){
 document.addEventListener("deviceready",function(){
	 
	    document.addEventListener("pause", function(){//Al pausar la aplicaci�n

      var content = ('La aplicación se pausó \n' );
    eventHistory('La aplicaci&oacute;n se paus&oacute;');
 writeFiles(content);
   }, false); //pausa

  document.addEventListener("resume", function(){//Al volver a la aplicaci�n
   var content = ('La aplicación ha reaunudado; \n');
   eventHistory('La aplicaci&oacute;n ha reanudado');
   writeFiles(content);
   
      navigator.notification.confirm('¿que desea hacer?', function(boton){ 
		
					switch(boton){
				case 1:
						
				leerArchivo();
					
					break;
				case 2:
					navigator.notification.vibrate(1000);
leerArchivo();
					break;
			} //switch
		
		
		
		},"Práctica 1","Version, Vibrar, Cancelar"); // confirm
		   
   
   
   
}, false); //resume
	 
	 
 });//device




function leerArchivo(){
//pgAlert('Fuera Version:' + device.uuid);

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){

  fileSystem.root.getFile('log.txt', null, function(archivo){
   archivo.file(function(archivo){
    var lector = new FileReader();
    lector.onloadend = function(e){
      pgAlert(e.target.result);
     }
    pgAlert(' Version:' + device.uuid + '\n' + lector.readAsText(archivo));
   },function(){
      pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
     }
  );},function(err){
       pgAlert("No se pudo acceder al sistema de archivos");
      });
 },function(err){
    pgAlert("No se pudo acceder al sistema de archivos");
   });


}



}); //ready

function writeFiles(c){

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
fileSystem.root.getFile('log.txt', { create: true }, function(archivo){
archivo.createWriter(function(escritor){
escritor.onwrite = function(e){
pgAlert("El archivo fue escrito Correctamente!");
};
//***********************
escritor.seek(escritor.length);
escritor.write(c);

//***********************

}, function(){
pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
});
}, function(err){
pgAlert("No se pudo acceder al sistema de archivos");
});
}, function(err){
pgAlert("No se pudo acceder al sistema de archivos");
});
}








function eventHistory(action){
$('#eventsHistory').append('<li>'+action+'</li>');
}




