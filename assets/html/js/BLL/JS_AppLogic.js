$(document).ready(function () {

    /* Inicio ConfiguraciÃ³n de la aplicaciÃ³n */
    delete window.localStorage["idModulo"];
    verificarEstadoAvance();
    verificarEstadoNarrador(true);

    $('#btnNarrador').click(function () {

        verificarEstadoNarrador(false);
    });

    function verificarEstadoNarrador(primeraCarga) {
        var narrador = localStorage.getItem('narrador');

        if (primeraCarga) {
            if (narrador == null) {
                narrador = "true";
            }

            if (narrador == "true") {

                //Equipo Android
                //$("#btnNarrador").css("background", "url('../html/images/tablet/buttons/action/boton_narrador_on.png') no-repeat right");
                //NavegadorInternet
                $("#btnNarrador").css("background", "url('images/tablet/buttons/action/boton_narrador_on.png') no-repeat right");
                $("#btnNarrador").css("-webkit-background-size", "80%");
                $("#btnNarrador").css("-moz-background-size", "80%");
                $("#btnNarrador").css("-o-background-size", "80%");
                $("#btnNarrador").css("background-size", "80%");

            }
            else {
                //Equipo Android
                //$("#btnNarrador").css("background", "url('../html/images/tablet/buttons/action/boton_narrador_off.png') no-repeat right");
                //NavegadorInternet
                $("#btnNarrador").css("background", "url('images/tablet/buttons/action/boton_narrador_off.png') no-repeat right");
                $("#btnNarrador").css("-webkit-background-size", "80%");
                $("#btnNarrador").css("-moz-background-size", "80%");
                $("#btnNarrador").css("-o-background-size", "80%");
                $("#btnNarrador").css("background-size", "80%");

            }
        }
        else {

            if (narrador == null) {
                narrador = "true";
            }

            if (narrador == "true") {
                //Equipo Android
                //$("#btnNarrador").css("background", "url('../html/images/tablet/buttons/action/boton_narrador_off.png') no-repeat right");
                //NavegadorInternet
                $("#btnNarrador").css("background", "url('images/tablet/buttons/action/boton_narrador_off.png') no-repeat right");
                $("#btnNarrador").css("-webkit-background-size", "80%");
                $("#btnNarrador").css("-moz-background-size", "80%");
                $("#btnNarrador").css("-o-background-size", "80%");
                $("#btnNarrador").css("background-size", "80%");

                narrador = false;

                try {
                    var testVal = "Narrador desactivado";
                    AndroidFunctionToast.showToast(testVal);
                }
                catch (err) {
                    //var iframe = document.createElement("IFRAME");
                    //iframe.setAttribute("src", 'data:text/plain,');
                    //document.documentElement.appendChild(iframe);
                    //window.frames[0].window.alert("Narrador desactivado");
                    //iframe.parentNode.removeChild(iframe);

                }
            }
            else {
                //Equipo Android
                //$("#btnNarrador").css("background", "url('../html/images/tablet/buttons/action/boton_narrador_on.png') no-repeat right");
                //NavegadorInternet
                $("#btnNarrador").css("background", "url('images/tablet/buttons/action/boton_narrador_on.png') no-repeat right");
                $("#btnNarrador").css("-webkit-background-size", "80%");
                $("#btnNarrador").css("-moz-background-size", "80%");
                $("#btnNarrador").css("-o-background-size", "80%");
                $("#btnNarrador").css("background-size", "80%");

                narrador = true;

                try {
                    var testVal = "Narrador activado";
                    AndroidFunctionToast.showToast(testVal);
                    AndroidFunctionTalk.speakText(testVal);
                }
                catch (err) {
                    //var iframe = document.createElement("IFRAME");
                    //iframe.setAttribute("src", 'data:text/plain,');
                    //document.documentElement.appendChild(iframe);
                    //window.frames[0].window.alert(testVal);
                    //iframe.parentNode.removeChild(iframe);
                    //calliOSFunction("Narrador activado", ["Ram"], onSuccess,
                    //              function (ret) {
                    //                  if (ret)
                    //                      document.write("Error executing native function : <br>" + ret.message);
                    //              }
                    //              );

                    try {
                        var audio = new Audio();
                        audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                        audio.defaultPlaybackRate = 1.5;
                        audio.play();

                    } catch (e) {

                    }
                }
            }

        }




        localStorage.setItem('narrador', narrador);
    }

    function verificarEstadoAvance() {

        /*$("#tdTotal").css("font-size", "800pt");*/

        var estadoAvance = localStorage.getItem('estadoAvance');
        var idModulo = localStorage.getItem('idModulo');
        var totalRespuestasCorrectas = localStorage.getItem("totalRespuestasCorrectas");
        var contadorSeAtreve = localStorage.getItem('contadorSeAtreve');

        if (contadorSeAtreve == "")
            contadorSeAtreve = 0;

        for (var i = 1; i <= 6; i++) {
            $("#btnOpcion" + i.toString()).attr("disabled", "disabled");
        }

        if (estadoAvance == null) {
            estadoAvance = 1;
        }

        if (totalRespuestasCorrectas == 5 && idModulo == estadoAvance) {
            
            var strMensajeFinalizacionModulo = "FACEBOOK_FINAL-MODULO_" + $('#lblTituloGeneralModulo').text() + "_Felicitaciones!! Has culminado exitosamente el módulo: " + $('#lblTituloGeneralModulo').text();

            try {
                AndroidFunctionToast.showToast(strMensajeFinalizacionModulo);
            }
            catch (err) {
                try {
                    //var iframe = document.createElement("IFRAME");
                    //iframe.setAttribute("src", 'data:text/plain,');
                    //document.documentElement.appendChild(iframe);
                    //window.frames[0].window.alert(strMensajeFinalizacionModulo);
                    //iframe.parentNode.removeChild(iframe);

                    alert(strMensajeFinalizacionModulo);

                } catch (e) {
                    alert(strMensajeFinalizacionModulo);
                }

            }

            if (estadoAvance == 6 && totalRespuestasCorrectas == 5) {
                var strMensajeFinalizacionJuego = "¡Felicitaciones! Has finalizado CampoAPPrende! Aprovecha el conocimiento que has adquirido y aplícalo en tu vida diaria.";
                try {
                    AndroidFunctionToast.showToast(strMensajeFinalizacionJuego);
                }
                catch (err) {
//                    var iframe = document.createElement("IFRAME");
//                    iframe.setAttribute("src", 'data:text/plain,');
//                    document.documentElement.appendChild(iframe);
//                    window.frames[0].window.alert(strMensajeFinalizacionJuego);
                    //                    iframe.parentNode.removeChild(iframe);
                    alert(strMensajeFinalizacionJuego);
                }
            }
            totalRespuestasCorrectas = 0;
            localStorage.setItem('totalRespuestasCorrectas', totalRespuestasCorrectas);
            estadoAvance++;
            contadorSeAtreve = 0;
            localStorage.setItem('contadorSeAtreve', 0);
            localStorage.setItem('preguntasResueltas', "");

            $("#btn5050").removeAttr("disabled");
            $("#btnLlamada").removeAttr("disabled");
            $("#btnPreguntaRedes").removeAttr("disabled");
        }
        else if (totalRespuestasCorrectas == 5) {

            var strMensajeFinalizacionModulo = "Buen trabajo!! Nunca está de más repasar los conceptos aprendidos. Ya has superado previamente el módulo: " + $('#lblTituloGeneralModulo').text();
            totalRespuestasCorrectas = 0;
            contadorSeAtreve = 0;
            localStorage.setItem('contadorSeAtreve', 0);
            localStorage.setItem('totalRespuestasCorrectas', totalRespuestasCorrectas);

            try {
                AndroidFunctionToast.showToast(strMensajeFinalizacionModulo);
            }
            catch (err) {
                //var iframe = document.createElement("IFRAME");
                //iframe.setAttribute("src", 'data:text/plain,');
                //document.documentElement.appendChild(iframe);
                //window.frames[0].window.alert(strMensajeFinalizacionModulo);
                //iframe.parentNode.removeChild(iframe);

                alert(strMensajeFinalizacionModulo);
            }

        }

        for (var i = 1; i <= estadoAvance; i++) {
            $("#btnOpcion" + i.toString()).removeAttr("disabled");

            if (i == estadoAvance) {
                //Equipo Android
                //$("#btnOpcion" + i.toString()).css("background", "url('../html/images/tablet/buttons/action/opcion_" + i.toString() + "_color_actual.png') no-repeat bottom");
                //NavegadorInternet
                $("#btnOpcion" + i.toString()).css("background", "url('images/tablet/buttons/action/opcion_" + i.toString() + "_color_actual.png') no-repeat bottom");
                $("#btnOpcion" + i.toString()).css("-webkit-background-size", "99%");
                $("#btnOpcion" + i.toString()).css("-moz-background-size", "99%");
                $("#btnOpcion" + i.toString()).css("-o-background-size", "99%");
                $("#btnOpcion" + i.toString()).css("background-size", "99%");
                $("#lblOpcion" + i.toString()).addClass('currento');
            }
            else {
                //Equipo Android
                //$("#btnOpcion" + i.toString()).css("background", "url('../html/images/tablet/buttons/action/opcion_" + i.toString() + "_color_ok.png') no-repeat bottom");
                //NavegadorInternet
                $("#btnOpcion" + i.toString()).css("background", "url('images/tablet/buttons/action/opcion_" + i.toString() + "_color_ok.png') no-repeat bottom");
                $("#btnOpcion" + i.toString()).css("-webkit-background-size", "99%");
                $("#btnOpcion" + i.toString()).css("-moz-background-size", "99%");
                $("#btnOpcion" + i.toString()).css("-o-background-size", "99%");
                $("#btnOpcion" + i.toString()).css("background-size", "99%");
                $("#lblOpcion" + i.toString()).addClass('currento');
            }
        }

        localStorage.setItem('estadoAvance', estadoAvance);
    }

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
        window.location = "../html/index.html";
        //Navegador web
        //        window.location = "index.html";

    });
    /* Fin ConfiguraciÃ³n de la aplicaciÃ³n */

    /*Inicio Definicion del Concepto */
    $('#btnMasInfo').click(function () {
        $("#divDefinicionConceptos").html("Selecciona una de las opciones de la izquierda para obtener más información.");
        cargarDetallesConcepto();
    });

    $('#btnConoceMas1, #btnConoceMas2, #btnConoceMas3, #btnConoceMas4, #btnConoceMas5, #btnConoceMas6').click(function () {

        cargarDetalleDefiniones($(this).val());
    });

    function cargarDetallesConcepto() {
        jQuery.support.cors = true;
        var idModulo = localStorage.getItem('idModulo');
        var retrievedObject = localStorage.getItem('resultado');

        $("select[name='ddlInformacionDetalleModulo'] > option").each(function () {
            $(this).remove();
        });

        $.each(JSON.parse(retrievedObject), function (i, theItem) {
            var combo = document.getElementById("ddlInformacionDetalleModulo");

            for (var key in theItem) {
                var option = document.createElement("option");
                if (theItem[key].temaid.toString() == idModulo && theItem[key].temaid.toString() != "No Aplica") {
                    var rr = theItem[key].textobotondefinicion.toString();

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
            }

        });

        var usedNames = {};
        var indice = 1;

        $("select[name='ddlInformacionDetalleModulo'] > option").each(function () {
            if (usedNames[this.text]) {
                $(this).remove();
            } else {
                usedNames[this.text] = this.value;

                var strResultado = this.value
                strResultado = strResultado.replace(/;/g, ",");
                $("#btnConoceMas" + indice.toString()).val(strResultado);
                indice++;
            }
        });
    }


    function cargarDetalleDefiniones(nombreControl) {
        jQuery.support.cors = true;

        var idModulo = localStorage.getItem('idModulo');
        var retrievedObject = localStorage.getItem('resultado');
        var nombreModulo = nombreControl;



        $("select[name='ddlContenidoConoceMasDummie'] > option").each(function () {
            $(this).remove();
        });

        $.each(JSON.parse(retrievedObject), function (i, theItem) {
            var combo = document.getElementById("ddlContenidoConoceMasDummie");

            for (var key in theItem) {
                var option = document.createElement("option");
                if (theItem[key].temaid.toString() == idModulo && theItem[key].temaid.toString() != "No Aplica" && theItem[key].textobotondefinicion.toString() == nombreModulo) {

                    var rr = theItem[key].definicionpag1.toString();

                    if (theItem[key].definicionpag2.toString() != "" && theItem[key].definicionpag2.toString() != "No Aplica") {
                        rr = rr + "-salto-" + theItem[key].definicionpag2.toString();
                    }

                    if (theItem[key].definicionpag3.toString() != "" && theItem[key].definicionpag3.toString() != "No Aplica") {
                        rr = rr + "-salto-" + theItem[key].definicionpag3.toString() + "-salto-";
                    }

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
            }

        });

        var usedNames = {};
        var indice = 1;

        $("select[name='ddlContenidoConoceMasDummie'] > option").each(function () {
            if (usedNames[this.text]) {
                $(this).remove();
            } else {
                usedNames[this.text] = this.value;

                var strResultado = this.value
                var strResultado1 = strResultado.replace(/-salto-/g, "<br /><br />");
                var strResultado2 = strResultado1.replace(/;/g, ",");
                var strResultado3 = strResultado2.replace(/No Aplica/g, "");

                if (strResultado3.indexOf("http://") > -1) {
                    strResultado3 = "<a href='#' class='spanLinkInteres'>" + strResultado3 + "</a>";
                    /*Aqui hay que meter un boton y que lo maneje android */
                }

                $("#divDefinicionConceptos").html(strResultado3);
                indice++;
                $("#divDefinicionConceptos").scrollTop(0);
            }
        });

        $('.spanLinkInteres').click(function () {
            var strLinkAbrir = "LINK_" + $(this).html();

            try {
                AndroidFunctionToast.showToast(strLinkAbrir);
            }
            catch (err) {
                var iframe = document.createElement("IFRAME");
                iframe.setAttribute("src", 'data:text/plain,');
                document.documentElement.appendChild(iframe);
                window.frames[0].window.alert(strLinkAbrir);
                iframe.parentNode.removeChild(iframe);
            }

        });
    }
    /*Fin Definicion del Concepto */

    /*Inicio Trivia Preguntas */
    $('#btnTrivia').click(function () {

        //var estadoAvance = localStorage.getItem('estadoAvance');
        //estadoAvance++;

        //localStorage.setItem('estadoAvance', estadoAvance);
        ////localStorage.setItem('estadoAvance', null);

        //verificarEstadoAvance();

    });

    $('#btnVerdad').click(function () {

        //$("#btn5050").removeAttr("disabled");

        $("#btnRespuesta1").removeAttr("disabled");
        $("#btnRespuesta2").removeAttr("disabled");
        $("#btnRespuesta3").removeAttr("disabled");
        $("#btnRespuesta4").removeAttr("disabled");

        jQuery.support.cors = true;

        var idModulo = localStorage.getItem('idModulo');
        var retrievedObject = localStorage.getItem('resultado');

        var nombreModulo = $(this).val();
        var respuestaCorrecta = "";
        var mensajeCorrecto = "";
        var mensajeError = "";
        var numeropreguntasDataSet = 0;

        var preguntasResueltas = ",0,";

        if (localStorage.getItem('preguntasResueltas') == null) {
            localStorage.setItem('preguntasResueltas', preguntasResueltas);
        }

        preguntasResueltas = localStorage.getItem('preguntasResueltas');

        var preguntaAleatoria = 0;

        var contador = 1;
        var indice = 1;

        $("select[name='ddlPreguntasTriviaEncabezado'] > option").each(function () {
            $(this).remove();
        });

        $("select[name='ddlPreguntasTriviaDetalle'] > option").each(function () {
            $("#btnRespuesta" + indice.toString()).val("");
            $(this).remove();
            indice++;
        });

        indice = 1;

        $.each(JSON.parse(retrievedObject), function (i, theItem) {
            for (var key in theItem) {
                if (theItem[key].temaid.toString() == idModulo && theItem[key].temaid.toString() != "No Aplica" && theItem[key].tipoinformacionid.toString() == "2" && theItem[key].tipotriviaid.toString() == "1") {
                    numeropreguntasDataSet++;
                }
            }

        });

        do {
            preguntaAleatoria = Math.floor(Math.random() * numeropreguntasDataSet) + 1

        } while (preguntasResueltas.indexOf("," + preguntaAleatoria + ",") != -1)

        preguntasResueltas = preguntasResueltas + "," + preguntaAleatoria + ",";
        localStorage.setItem('preguntasResueltas', preguntasResueltas);

        //alert(preguntaAleatoria);

        if (preguntasResueltas)

            $.each(JSON.parse(retrievedObject), function (i, theItem) {
                var combo = document.getElementById("ddlPreguntasTriviaEncabezado");
                var comboRespuestas = document.getElementById("ddlPreguntasTriviaDetalle");

                for (var key in theItem) {
                    var option = document.createElement("option");

                    var optionRespuesta1 = document.createElement("option");
                    var optionRespuesta2 = document.createElement("option");
                    var optionRespuesta3 = document.createElement("option");
                    var optionRespuesta4 = document.createElement("option");

                    if (theItem[key].temaid.toString() == idModulo && theItem[key].temaid.toString() != "No Aplica" && theItem[key].tipoinformacionid.toString() == "2" && theItem[key].tipotriviaid.toString() == "1") {

                        if (contador == preguntaAleatoria) {
                            var rr = theItem[key].textotrivia.toString();

                            var rr1 = theItem[key].respuesta1.toString();
                            var rr2 = theItem[key].respuesta2.toString();
                            var rr3 = theItem[key].respuesta3.toString();
                            var rr4 = theItem[key].respuesta4.toString();

                            try {

                                option.text = rr;
                                option.value = rr;

                                optionRespuesta1.text = rr1;
                                optionRespuesta1.value = rr;

                                optionRespuesta2.text = rr2;
                                optionRespuesta2.value = rr;

                                optionRespuesta3.text = rr3;
                                optionRespuesta3.value = rr;

                                optionRespuesta4.text = rr4;
                                optionRespuesta4.value = rr;

                                var preguntaId = combo.length;

                                if (preguntaId == 0) {
                                    combo.add(option, null);

                                    comboRespuestas.add(optionRespuesta1, null);
                                    comboRespuestas.add(optionRespuesta2, null);
                                    comboRespuestas.add(optionRespuesta3, null);
                                    comboRespuestas.add(optionRespuesta4, null);

                                    respuestaCorrecta = theItem[key].respuestacorrecta.toString();
                                    respuestaCorrecta = respuestaCorrecta.replace(/_/, "");
                                    respuestaCorrecta = respuestaCorrecta.toLowerCase();

                                    mensajeCorrecto = theItem[key].frasertacorrecta.toString();
                                    mensajeError = theItem[key].frasertaincorrecta.toString();

                                    localStorage.setItem('respuestaCorrecta', respuestaCorrecta);
                                    localStorage.setItem('mensajeCorrecto', mensajeCorrecto);
                                    localStorage.setItem('mensajeError', mensajeError);

                                }
                                break;
                            }
                            catch (error) {
                                //alert('error found' + error.toString());
                                combo.add(option); // really old browser
                            }
                        }
                        contador++;
                    }
                }

            });

        var usedNames = {};

        $("select[name='ddlPreguntasTriviaEncabezado'] > option").each(function () {
            if (usedNames[this.text]) {
                $(this).remove();
            } else {
                usedNames[this.text] = this.value;

                var strResultado = this.value

                strResultado = strResultado.replace(/;/g, ",");
                $("#spanEncabezadoPregunta").text(strResultado);
                indice++;
            }
        });
        indice = 1;
        $("select[name='ddlPreguntasTriviaDetalle'] > option").each(function () {

            if (usedNames[this.text]) {
                $(this).remove();
            } else {

                var pregunta = this.value;
                pregunta = pregunta.replace(/;/g, ",")

                usedNames[this.text] = pregunta;

                if (pregunta == $("#spanEncabezadoPregunta").text()) {

                    var strResultado = this.text;
                    strResultado = strResultado.replace(/;/g, ",");
                    $("#btnRespuesta" + indice.toString()).val(strResultado);
                    indice++;
                }
            }
        });

    });

    $('#btnRespuesta1').click(function () {
        verificarRespuestaCorrecta("respuesta1");
    });

    $('#btnRespuesta2').click(function () {
        verificarRespuestaCorrecta("respuesta2");
    });

    $('#btnRespuesta3').click(function () {
        verificarRespuestaCorrecta("respuesta3");
    });

    $('#btnRespuesta4').click(function () {
        verificarRespuestaCorrecta("respuesta4");
    });

    $('#btn5050').click(function () {

        var respuestaCorrecta = localStorage.getItem('respuestaCorrecta');

        var preguntaOcultar1 = 0;
        var preguntaOcultar2 = 0;
        var respuestaOcultar1 = "";
        var respuestaOcultar2 = "";


        do {

            preguntaOcultar1 = Math.floor(Math.random() * 4) + 1;
            preguntaOcultar2 = Math.floor(Math.random() * 4) + 1;

            respuestaOcultar1 = "respuesta" + preguntaOcultar1.toString();
            respuestaOcultar2 = "respuesta" + preguntaOcultar2.toString();

        }
        while (respuestaOcultar1 == respuestaOcultar2 || respuestaOcultar1 == respuestaCorrecta || respuestaOcultar2 == respuestaCorrecta);

        //alert(respuestaOcultar1);
        //alert(respuestaOcultar2);

        $("#btn" + capitaliseFirstLetter(respuestaOcultar1)).val("");
        $("#btn" + capitaliseFirstLetter(respuestaOcultar1)).attr("disabled", "disabled");

        $("#btn" + capitaliseFirstLetter(respuestaOcultar2)).val("");
        $("#btn" + capitaliseFirstLetter(respuestaOcultar2)).attr("disabled", "disabled");

        $("#btn5050").attr("disabled", "disabled");

    });

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function verificarRespuestaCorrecta(strRespuestaSeleccion) {

        var respuestaCorrecta = localStorage.getItem('respuestaCorrecta');
        var mensajeCorrecto = localStorage.getItem('mensajeCorrecto');
        var mensajeError = localStorage.getItem('mensajeError');

        var totalRespuestasCorrectas = localStorage.getItem('totalRespuestasCorrectas');

        if (isNaN(totalRespuestasCorrectas)) {
            totalRespuestasCorrectas = 0;
        }

        if (strRespuestaSeleccion == respuestaCorrecta) {
            totalRespuestasCorrectas++;
            localStorage.setItem('totalRespuestasCorrectas', totalRespuestasCorrectas);

            if (totalRespuestasCorrectas == 5) {
                var speed = 500;
                $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
                    $('#page-7').removeClass('current');
                    $('#page-3').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

                });
            }
            else {

                var strRespuestasFaltantes = "";
                if (5 - totalRespuestasCorrectas == 1) {
                    strRespuestasFaltantes = "Te falta una pregunta para completar este módulo.";
                }
                else {
                    strRespuestasFaltantes = "Te faltan " + (5 - totalRespuestasCorrectas).toString() + " preguntas para completar este módulo.";
                }


                try {
                    AndroidFunctionToast.showToast(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                }
                catch (err) {

                    try {
                        //var iframe = document.createElement("IFRAME");
                        //iframe.setAttribute("src", 'data:text/plain,');
                        //document.documentElement.appendChild(iframe);
                        //window.frames[0].window.alert(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                        //iframe.parentNode.removeChild(iframe);

                        alert(mensajeCorrecto + "\n" + strRespuestasFaltantes);

                    } catch (e) {
                        alert(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                    }

                }


                var speed = 500;
                $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
                    $('#page-7').removeClass('current');
                    $('#page-5').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');
                });
            }
        }
        else {

            try {
                AndroidFunctionToast.showToast(mensajeError);
            }
            catch (err) {
                //var iframe = document.createElement("IFRAME");
                //iframe.setAttribute("src", 'data:text/plain,');
                //document.documentElement.appendChild(iframe);
                //window.frames[0].window.alert(mensajeError);
                //iframe.parentNode.removeChild(iframe);

                alert(mensajeError);

            }

            cargarDetallesConcepto();

            var speed = 500;
            $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
                $('#page-7').removeClass('current');
                $('#page-6').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

            });
        }

        verificarEstadoAvance();
    }

    /*Fin Trivia Preguntas*/

    /*Inicio Trivia Se Atreve*/
    $('#btnAtreves').click(function () {

        var contadorSeAtreve = localStorage.getItem('contadorSeAtreve');

        if (isNaN(contadorSeAtreve))
            contadorSeAtreve = 0;

        if (contadorSeAtreve < 2) {

            jQuery.support.cors = true;

            var speed = 500;
            $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
                $('#page-5').removeClass('current');
                $('#page-8').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

            });

            contadorSeAtreve++;
            localStorage.setItem('contadorSeAtreve', contadorSeAtreve);

            var idModulo = localStorage.getItem('idModulo');
            var retrievedObject = localStorage.getItem('resultado');
            var nombreModulo = $(this).val();
            var respuestaCorrecta = "";
            var mensajeCorrecto = "";
            var mensajeError = "";
            var numeropreguntasDataSet = 0;

            var preguntaAleatoria = 0;

            var contador = 1;
            var indice = 1;
            var tipoMoralejaId = 0;

            $("select[name='ddlPreguntasTriviaEncabezado'] > option").each(function () {
                $(this).remove();
            });

            $("select[name='ddlPreguntasTriviaDetalle'] > option").each(function () {
                $("#btnRespuesta" + indice.toString()).val("");
                $(this).remove();
                indice++;
            });

            indice = 1;

            $.each(JSON.parse(retrievedObject), function (i, theItem) {
                for (var key in theItem) {
                    if (theItem[key].temaid.toString() == idModulo && theItem[key].temaid.toString() != "No Aplica" && theItem[key].tipoinformacionid.toString() == "2" && theItem[key].tipotriviaid.toString() == "2") {
                        numeropreguntasDataSet++;
                    }
                }

            });

            //alert(numeropreguntasDataSet);

            preguntaAleatoria = Math.floor(Math.random() * numeropreguntasDataSet) + 1


            $.each(JSON.parse(retrievedObject), function (i, theItem) {
                var combo = document.getElementById("ddlPreguntasTriviaEncabezado");
                var comboRespuestas = document.getElementById("ddlPreguntasTriviaDetalle");

                for (var key in theItem) {
                    var option = document.createElement("option");

                    var optionRespuesta1 = document.createElement("option");
                    var optionRespuesta2 = document.createElement("option");

                    if (theItem[key].temaid.toString() == idModulo && theItem[key].temaid.toString() != "No Aplica" && theItem[key].tipoinformacionid.toString() == "2" && theItem[key].tipotriviaid.toString() == "2") {

                        if (contador == preguntaAleatoria) {
                            var rr = theItem[key].textotrivia.toString();

                            var rr1 = theItem[key].frasertacorrecta.toString();
                            var rr2 = theItem[key].frasertaincorrecta.toString();
                            tipoMoralejaId = theItem[key].tipomoralejaid.toString();
                            try {

                                option.text = rr;
                                option.value = rr;

                                optionRespuesta1.text = rr1;
                                optionRespuesta1.value = rr;

                                optionRespuesta2.text = rr2;
                                optionRespuesta2.value = rr;

                                var preguntaId = combo.length;

                                if (preguntaId == 0) {
                                    combo.add(option, null);

                                    comboRespuestas.add(optionRespuesta1, null);
                                    comboRespuestas.add(optionRespuesta2, null);

                                }
                                break;
                            }
                            catch (error) {
                                //alert('error found' + error.toString());
                                combo.add(option); // really old browser
                            }
                        }
                        contador++;
                    }
                }

            });

            var usedNames = {};

            $("select[name='ddlPreguntasTriviaEncabezado'] > option").each(function () {
                if (usedNames[this.text]) {
                    $(this).remove();
                } else {
                    usedNames[this.text] = this.value;

                    var strResultado = this.value

                    strResultado = strResultado.replace(/;/g, ",");
                    $("#spanEncabezadoPreguntaAtreves").text(strResultado);
                    indice++;
                }
            });
            indice = 1;
            $("select[name='ddlPreguntasTriviaDetalle'] > option").each(function () {

                if (usedNames[this.text]) {
                    $(this).remove();
                } else {

                    var pregunta = this.value;
                    pregunta = pregunta.replace(/;/g, ",")

                    usedNames[this.text] = pregunta;

                    if (pregunta == $("#spanEncabezadoPreguntaAtreves").text() && this.text != "No Aplica") {

                        var strResultado = this.text;
                        strResultado = strResultado.replace(/;/g, ",");
                        $("#spanEstimuloRecibido").text(strResultado);
                        indice++;
                    }
                }
            });

            var totalRespuestasCorrectas = localStorage.getItem('totalRespuestasCorrectas');

            if (isNaN(totalRespuestasCorrectas)) {
                totalRespuestasCorrectas = 0;
            }

            if (tipoMoralejaId == 1) {
                totalRespuestasCorrectas++;

                localStorage.setItem('totalRespuestasCorrectas', totalRespuestasCorrectas);

                if (totalRespuestasCorrectas == 5) {
                    var speed = 2000;
                    $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
                        $('#page-8').removeClass('current');
                        $('#page-3').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

                    });
                }
                else {
                    var strRespuestasFaltantes = "";
                    var mensajeCorrecto = "Felicitaciones! La suerte está de tu lado, pero recuerda algunas decisiones no se pueden tomar al azar.";

                    if (5 - totalRespuestasCorrectas == 1) {
                        strRespuestasFaltantes = "Te falta una pregunta para completar este módulo.";
                    }
                    else {
                        strRespuestasFaltantes = "Te faltan " + (5 - totalRespuestasCorrectas).toString() + " preguntas para completar este módulo.";
                    }


                    try {
                        AndroidFunctionToast.showToast(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                    }
                    catch (err) {

                        try {
                            //var iframe = document.createElement("IFRAME");
                            //iframe.setAttribute("src", 'data:text/plain,');
                            //document.documentElement.appendChild(iframe);
                            //window.frames[0].window.alert(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                            //iframe.parentNode.removeChild(iframe);

                            alert(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                        } catch (e) {
                            alert(mensajeCorrecto + "\n" + strRespuestasFaltantes);
                        }

                    }
                }
            }
            else {

                var mensajeIncorrecto = "La suerte te ha jugado una mala pasada. Pero no te preocupes, siempre puedes volverlo a intentar.";
                var strRespuestasFaltantes = "";

                if (5 - totalRespuestasCorrectas == 1) {
                    strRespuestasFaltantes = "Te falta una pregunta para completar este módulo.";
                }
                else {
                    strRespuestasFaltantes = "Te faltan " + (5 - totalRespuestasCorrectas).toString() + " preguntas para completar este módulo.";
                }


                try {
                    AndroidFunctionToast.showToast(mensajeIncorrecto + "\n" + strRespuestasFaltantes);
                }
                catch (err) {

                    try {
                        //var iframe = document.createElement("IFRAME");
                        //iframe.setAttribute("src", 'data:text/plain,');
                        //document.documentElement.appendChild(iframe);
                        //window.frames[0].window.alert(mensajeIncorrecto + "\n" + strRespuestasFaltantes);
                        //iframe.parentNode.removeChild(iframe);
                        alert(mensajeIncorrecto + "\n" + strRespuestasFaltantes);
                    } catch (e) {
                        alert(mensajeIncorrecto + "\n" + strRespuestasFaltantes);
                    }

                }
            }

            localStorage.setItem('totalRespuestasCorrectas', totalRespuestasCorrectas);

            verificarEstadoAvance();
        }
        else {

            var mensajeTriviaSeAtreveMaxima = "Puedes atreverte sólo dos veces por cada módulo.";
            try {
                AndroidFunctionToast.showToast(mensajeTriviaSeAtreveMaxima);
            }
            catch (err) {
                alert(mensajeTriviaSeAtreveMaxima);
            }

        }


    });
    /*Fin Trivia Se Atreve*/

    /*Inicio Capacitaciones*/
    $('#btnCapacitacion').click(function () {


        cargarCapacitaciones();
    });

    function cargarCapacitaciones() {



        jQuery.support.cors = true;
        var idModulo = localStorage.getItem('idModulo');
        var retrievedObject = localStorage.getItem('resultado');

        $("select[name='ddlCapacitacionesDummie'] > option").each(function () {
            $(this).remove();
        });

        $.each(JSON.parse(retrievedObject), function (i, theItem) {
            var combo = document.getElementById("ddlCapacitacionesDummie");

            for (var key in theItem) {

                var option1 = document.createElement("option");
                var option2 = document.createElement("option");
                var option3 = document.createElement("option");

                if (theItem[key].tipoinformacionid.toString() == "3") {

                    var rr1 = theItem[key].nombredelevento.toString();
                    var rr2 = theItem[key].lugarevento.toString();
                    var rr3 = theItem[key].fechaevento.toString();

                    try {
                        //alert(key);
                        option1.text = rr1;
                        option1.value = rr1;

                        option2.text = rr2;
                        option2.value = rr2;

                        option3.text = rr3;
                        option3.value = rr3;

                        combo.add(option1, null); // Other browsers
                        combo.add(option2, null); // Other browsers
                        combo.add(option3, null); // Other browsers
                    }
                    catch (error) {
                        alert('error found' + error.toString());
                        combo.add(option); // really old browser
                    }
                }
            }

        });

        var usedNames = {};
        var indice = 0;
        var addrow = 1;

        var table = document.getElementById("tableEventosCapacitaciones");
        var rowCount = table.rows.length;
        var newRow1 = table.insertRow(rowCount);

        if (rowCount == 1) {
            $("select[name='ddlCapacitacionesDummie'] > option").each(function () {

                usedNames[this.text] = this.value;

                var strResultado = this.value
                strResultado = strResultado.replace(/;/g, ",");

                if (addrow == 0) {
                    addrow++;
                    rowCount = table.rows.length;
                    newRow1 = table.insertRow(rowCount);
                }

                if (addrow == 1) {

                    var cell0 = newRow1.insertCell(0);
                    var element0 = document.createElement("span");
                    element0.textContent = strResultado;
                    element0.style.height = "220px";
                    element0.style.padding = "10px";
                    element0.style.fontWeight = "normal";

                    cell0.appendChild(element0);
                }
                if (addrow == 2) {
                    var newRow2 = table.insertRow(rowCount);
                    var cell0 = newRow1.insertCell(0);
                    var element0 = document.createElement("span");
                    element0.textContent = strResultado;
                    element0.style.height = "220px";
                    element0.style.padding = "10px";
                    element0.style.fontWeight = "normal";
                    cell0.appendChild(element0);
                }
                if (addrow == 3) {
                    var newRow3 = table.insertRow(rowCount);
                    var cell0 = newRow1.insertCell(0);
                    var element0 = document.createElement("span");
                    element0.textContent = strResultado;
                    element0.style.height = "220px";
                    element0.style.padding = "10px";
                    element0.style.fontWeight = "normal";
                    cell0.appendChild(element0);
                }

                if (addrow == 3) {
                    addrow = 0;
                }
                else {
                    addrow++;
                }

            });
        }
    }
    /*Fin Capacitaciones*/

});


