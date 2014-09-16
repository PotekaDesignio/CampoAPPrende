$(document).ready(function () {

    DescargarDatos();
    $('#btnReiniciarDatos').click(function () {



        delete window.localStorage["estadoAvance"];
        delete window.localStorage["narrador"];
        delete window.localStorage["resultado"];
        delete window.localStorage["ContadorIngresosActuales"];
        delete window.localStorage["ContadorGastosActuales"];
        delete window.localStorage["contadorSeAtreve"];

        delete window.localStorage["respuestaCorrecta"];
        delete window.localStorage["mensajeCorrecto"];
        delete window.localStorage["mensajeError"];
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["totalRespuestasCorrectas"];

        for (var i = 0; i <= 6; i++) {

            delete window.localStorage["Presupuesto_" + i.toString()];
            delete window.localStorage["Ahorro_" + i.toString()];
        }

        //Equipo Android
        //window.location = "../html/index.html";
        //Navegador web
        window.location = "index.html";
        DescargarDatos();

    });


});

function DescargarDatos() {
    jQuery.support.cors = true;
    // Obtener el objeto del local storage
    var retrievedObject = localStorage.getItem('resultado');

    if (retrievedObject == null) {
        $.ajax(
               {
                   type: "GET",
                   url: 'http://servicedatosabiertoscolombia.cloudapp.net/v1/Banco_Agrario/banappgrario?$format=json&callback=?',
                   data: "",
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   success: function (data) {



                       $.each(data, function (i, theItem) {
                           //console.log(theItem);
                           var combo = document.getElementById("ddlModulosDummie");

                           for (var key in theItem) {
                               var option = document.createElement("option");
                               var rr = theItem[key].tema.toString();

                               try {
                                   option.text = rr;
                                   option.value = rr;
                                   combo.add(option, null); // Other browsers
                               }
                               catch (error) {
                                   alert('error found' + error.toString());
                                   combo.add(option); // really old browser
                               }
                           }

                       });

                       var usedNames = {};
                       var indice = 1;
                       $("select[name='ddlModulosDummie'] > option").each(function () {
                           if (usedNames[this.text]) {
                               $(this).remove();
                           } else {

                               usedNames[this.text] = this.value;
                               if (indice <= 6) {
                                   var strResultado = this.value
                                   strResultado = strResultado.replace(";", ",");
                                   $("#lblOpcion" + indice.toString()).text(strResultado);
                                   indice++;
                               }
                           }
                       });
                       localStorage.setItem('resultado', JSON.stringify(data));
                   },
                   error: function (msg, url, line) {
                       alert('error trapped in error: function(msg, url, line)');
                       alert('msg = ' + msg + ', url = ' + url + ', line = ' + line);

                   }
               });
    }
    else {
        //alert("Ya existe");
        $.each(JSON.parse(retrievedObject), function (i, theItem) {
            //console.log(theItem);
            var combo = document.getElementById("ddlModulosDummie");

            for (var key in theItem) {
                var option = document.createElement("option");
                var rr = theItem[key].tema.toString();

                try {
                    //alert(key);
                    option.text = rr;
                    option.value = rr;
                    combo.add(option, null); // Other browsers
                }
                catch (error) {
                    alert('error found' + error.toString());
                    combo.add(option); // really old browser
                }
            }

        });

        var usedNames = {};
        var indice = 1;
        $("select[name='ddlModulosDummie'] > option").each(function () {
            if (usedNames[this.text]) {
                $(this).remove();
            } else {
                usedNames[this.text] = this.value;

                if (indice <= 6) {

                    var strResultado = this.value
                    strResultado = strResultado.replace(";", ",");
                    $("#lblOpcion" + indice.toString()).text(strResultado);
                    indice++;
                }

            }
        });

    }

}