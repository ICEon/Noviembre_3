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

      var content = ('La aplicaci&oacute;n se paus&oacute; \n' );
    eventHistory('La aplicaci&oacute;n se paus&oacute;');
    writeFiles(content);
   }, false); //pausa

  document.addEventListener("resume", function(){//Al volver a la aplicaci�n
   var content = ('La aplicaci&oacute;n ha reaunudado; \n');
   eventHistory('La aplicaci&oacute;n ha reanudado;');
   writeFiles(content);
   
      navigator.notification.confirm('¿que desea hacer?', function(boton){ 
		
					switch(boton){
				case 1:
				pgAlert ('Hola');
				pgAlert (''+device.Version);
				
				readFiles();
					
					break;
				case 2:
					navigator.notification.vibrate(500);
					break;
			} //switch
		
		
		
		},"Práctica 1","Version, Vibrar, Cancelar"); // confirm
		   
   
   
   
}, false); //resume
	 
	 
 });//device




}); //ready

function writeFiles(c){

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
fileSystem.root.getFile('log.txt', { create: true }, function(archivo){
archivo.createWriter(function(escritor){
escritor.onwrite = function(e){
pgAlert("El archivo fue escrito Correctamente!");
};
//***********************

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




					function readFiles(){
                     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                      fileSystem.root.getFile('log.txt', null, function(archivo){
                       archivo.file(function(archivo){
                         var lector = new FileReader();
                         lector.onloadend = function(e){
alert(e.target.result);

                         }
					   					   pgAlert(' Version:' + device.version + '\n' + lector.readAsText(file));                       

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
	