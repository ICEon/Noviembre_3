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
						
				readFiles();
					
					break;
				case 2:
					navigator.notification.vibrate(500);
									readFiles();
					break;
			} //switch
		
		
		
		},"Práctica 1","Version, Vibrar, Cancelar"); // confirm
		   
   
   
   
}, false); //resume
	 
	 
 });//device




function readFiles(){
//pgAlert('Fuera Version:' + device.uuid);

        fileSystem.root.getFile("log.txt", null, gotFileEntry, fail);


}

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readAsText(file);
    }


    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
			

			pgAlert(evt.target.result);
			pgAlert('0 Version:' + device.uuid + '\n' + reader.readAsText(file));                       
        };


			pgAlert('1 Version:' + device.uuid + '\n' + reader.readAsText(file));                       
    }

    function fail(evt) {
        pgAlert(evt.target.error.code);
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




