$(document).ready(function () {

    $('#btnIniciar').click(function () {

        if (localStorage.getItem('resultado') != null) {
            var speed = 500;
            $('.page.current').animate({ opacity: 0, margintop: 800 }, speed, function () {
                $('#page-1').removeClass('current');
                $('#page-2').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

            });
        }
        else {

            var testVal = "Estamos descargando la información. Vuelve a intentarlo en unos segundos.";
            try {
                AndroidFunctionToast.showToast(testVal); AndroidFunctionToast
            }
            catch (err) {
                //alert(testVal);
            }

        }


    });

    $('#btnFacebook').click(function () {

        var testVal = "FACEBOOK_LOGIN_Cuéntale a todo el mundo que gracias a la educación financiera estás logrando tus metas. @CampoAPPrende te acompaña.";
        try {
            AndroidFunctionToast.showToast(testVal); AndroidFunctionToast
        }
        catch (err) {
            function onSuccess(ret) {
                if (ret) {
                    document.write(ret.result);
                }
            }

            calliOSFunction("FACEBOOK", ["Ram"], onSuccess,
                                                              function (ret) {
                                                                  alert("teta");
                                                                  if (ret)
                                                                      document.write("Error executing native function : <br>" + ret.message);
                                                              }
                                                              );
        }




    });
    $('#btnTwitter').click(function () {

        var testVal = "TWITTER_LOGIN_Cuéntale a todo el mundo que gracias a la educación financiera estás logrando tus metas. #CampoAPPrende te acompaña.";
        try {
            AndroidFunctionToast.showToast(testVal); AndroidFunctionToast
        }
        catch (err) {

            function onSuccess(ret) {
                if (ret) {
                    document.write(ret.result);
                }
            }

            calliOSFunction("TWITTER_LOGIN", ["Ram"], onSuccess,
                                                             function (ret) {

                                                                 if (ret)
                                                                     document.write("Error executing native function : <br>" + ret.message);
                                                             }
                                                             );
        }

    });

    $('#btnHome').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-2').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal); AndroidFunctionToast
        }
        catch (err) {
            //alert(testVal);
        }

    });

    $('#btnHome1').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }


    });

    $('#btnHome2').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-5').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }

    });

    $('#btnHome3').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-4').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }

    });

    $('#btnHome4').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-6').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }

    });

    $('#btnHome5').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-7').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }

    });

    $('#btnHome6').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-8').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        var testVal = "No te preocupes. Guardaremos tu progreso para cuando regreses.";
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }

    });


    $('#btnIniciarJuego').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-2').removeClass('current');
            $('#page-3').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = "Iniciar Juego.";
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }

            }
        }

    });

    $('#btnChanchoIniciarJuego').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-2').removeClass('current');
            $('#page-3').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = "Iniciar Juego.";
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });


    $('#btnOpcion1').click(function () {

        localStorage.setItem('idModulo', 1);
        localStorage.setItem('totalRespuestasCorrectas', 0);
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["contadorSeAtreve"];

        var strMensaje = "Responde correctamente 5 preguntas para completar éste módulo.";

        try {
            AndroidFunctionToast.showToast(strMensaje);
        }
        catch (err) {
            //alert(strMensaje);
        }

        var speed = 500;


        $('#lblTituloGeneralModulo').text($('#lblOpcion1').text());
        $('#lblSubtituloSeccionConoceMas').text($('#lblOpcion1').text());
        $('#lblSubtituloGeneralTrivia').text($('#lblOpcion1').text());

        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = $('#lblOpcion1').text();
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });

    $('#btnOpcion2').click(function () {

        localStorage.setItem('idModulo', 2);
        localStorage.setItem('totalRespuestasCorrectas', 0);
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["contadorSeAtreve"];

        var strMensaje = "Responde correctamente 5 preguntas para completar éste módulo.";

        try {
            AndroidFunctionToast.showToast(strMensaje);
        }
        catch (err) {
            //alert(strMensaje);
        }

        var speed = 500;

        $('#lblTituloGeneralModulo').text($('#lblOpcion2').text());
        $('#lblSubtituloSeccionConoceMas').text($('#lblOpcion2').text());
        $('#lblSubtituloGeneralTrivia').text($('#lblOpcion2').text());

        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = $('#lblOpcion2').text();
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });

    $('#btnOpcion3').click(function () {

        localStorage.setItem('idModulo', 3);
        localStorage.setItem('totalRespuestasCorrectas', 0);
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["contadorSeAtreve"];

        var strMensaje = "Responde correctamente 5 preguntas para completar éste módulo.";

        try {
            AndroidFunctionToast.showToast(strMensaje);
        }
        catch (err) {
            //alert(strMensaje);
        }

        var speed = 500;

        $('#lblTituloGeneralModulo').text($('#lblOpcion3').text());
        $('#lblSubtituloSeccionConoceMas').text($('#lblOpcion3').text());
        $('#lblSubtituloGeneralTrivia').text($('#lblOpcion3').text());

        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = $('#lblOpcion3').text();
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });

    $('#btnOpcion4').click(function () {

        localStorage.setItem('idModulo', 4);
        localStorage.setItem('totalRespuestasCorrectas', 0);
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["contadorSeAtreve"];

        var strMensaje = "Responde correctamente 5 preguntas para completar éste módulo.";

        try {
            AndroidFunctionToast.showToast(strMensaje);
        }
        catch (err) {
            //alert(strMensaje);
        }

        var speed = 500;

        $('#lblTituloGeneralModulo').text($('#lblOpcion4').text());
        $('#lblSubtituloSeccionConoceMas').text($('#lblOpcion4').text());
        $('#lblSubtituloGeneralTrivia').text($('#lblOpcion4').text());

        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = $('#lblOpcion4').text();
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });

    $('#btnOpcion5').click(function () {

        localStorage.setItem('idModulo', 5);
        localStorage.setItem('totalRespuestasCorrectas', 0);
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["contadorSeAtreve"];

        var strMensaje = "Responde correctamente 5 preguntas para completar éste módulo.";

        try {
            AndroidFunctionToast.showToast(strMensaje);
        }
        catch (err) {
            //alert(strMensaje);
        }

        var speed = 500;

        $('#lblTituloGeneralModulo').text($('#lblOpcion5').text());
        $('#lblSubtituloSeccionConoceMas').text($('#lblOpcion5').text());
        $('#lblSubtituloGeneralTrivia').text($('#lblOpcion5').text());

        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = $('#lblOpcion5').text();
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });

    $('#btnOpcion6').click(function () {

        localStorage.setItem('idModulo', 6);
        localStorage.setItem('totalRespuestasCorrectas', 0);
        delete window.localStorage["preguntasResueltas"];
        delete window.localStorage["contadorSeAtreve"];

        var strMensaje = "Responde correctamente 5 preguntas para completar éste módulo.";

        try {
            AndroidFunctionToast.showToast(strMensaje);
        }
        catch (err) {
            //alert(strMensaje);
        }

        var speed = 500;

        $('#lblTituloGeneralModulo').text($('#lblOpcion6').text());
        $('#lblSubtituloSeccionConoceMas').text($('#lblOpcion6').text());
        $('#lblSubtituloGeneralTrivia').text($('#lblOpcion6').text());

        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-3').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });

        if (localStorage.getItem('narrador') == "true") {

            var testVal = $('#lblOpcion6').text();
            try {
                AndroidFunctionTalk.speakText(testVal);
            }
            catch (err) {
                try {
                    var audio = new Audio();
                    audio.src = 'http://www.translate.google.com/translate_tts?tl=es&q=' + testVal;
                    audio.defaultPlaybackRate = 1.5;
                    audio.play();

                } catch (e) {

                }
            }
        }

    });

    $('#btnMasInfo').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-4').removeClass('current');
            $('#page-6').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnTrivia').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-4').removeClass('current');
            $('#page-5').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVerdad').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-5').removeClass('current');
            $('#page-7').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnAtreves').click(function () {

        //var contadorSeAtreve = localStorage.getItem('contadorSeAtreve');

        //if (isNaN(contadorSeAtreve))
        //    contadorSeAtreve = 0;

        //if (contadorSeAtreve < 2) {

        //}
        //else {

        //    var mensajeTriviaSeAtreveMaxima = "Puedes atreverte sólo dos veces por cada módulo.";
        //    try {
        //        AndroidFunctionToast.showToast(mensajeTriviaSeAtreveMaxima);
        //    }
        //    catch (err) {
        //        //alert(mensajeTriviaSeAtreveMaxima);
        //    }

        //}
    });

    $('#btnVolver').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-4').removeClass('current');
            $('#page-3').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver2').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-5').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver3').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-6').removeClass('current');
            $('#page-4').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver4').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-7').removeClass('current');
            $('#page-5').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver5').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-8').removeClass('current');
            $('#page-5').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver6').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-9').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver7').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-10').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver8').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-11').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });
    $('#btnVolver9').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-12').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnVolver10').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-13').removeClass('current');
            $('#page-1').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnAyuda').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-1').removeClass('current');
            $('#page-9').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
        $("#divTextoAyudaID").scrollTop(0);
    });

    $('#btnAcercaDe').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-1').removeClass('current');
            $('#page-12').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
        $("#divTextoAcercaDeID").scrollTop(0);
    });

    $('#btnContacto').click(function () {

        var mensajeMensajeContacto = "Te invitamos a acceder a más información relacionada con finanzas personales en nuestras páginas web:\nwww.bancoagrario.gov.co y www.fiduagraria.gov.co.\n\nAsí mismo cualquier duda o inquietud favor remitirla al correo: \nservicio.cliente@bancoagrario.gov.co";
        try {
            AndroidFunctionToast.showToast(mensajeMensajeContacto);
        }
        catch (err) {
            alert(mensajeMensajeContacto);
        }
    });

    $('#btnMisFinanzas').click(function () {
        var speed = 100;

        if ($('#divContenidoConfiguracion').hasClass('abierto')) {
            $('#divPruebaOcultar').animate({ opacity: 1 }, speed);
            $('#divContenidoConfiguracion').animate({ opacity: 0 }, speed).removeClass('abierto');
            $('#divMisFinanzas').animate({ height: "100%" }, speed, function () { });
        }

        if ($('#divContenidoFinanzas').hasClass('abierto')) {
            $('#divPruebaOcultar').animate({ opacity: 1 }, speed);
            $('#divContenidoFinanzas').animate({ opacity: 0 }, speed).removeClass('abierto');
            $('#divMisFinanzas').animate({ height: "100%" }, speed, function () { });

        }
        else {
            $('#divPruebaOcultar').animate({ opacity: 0 }, speed);
            $('#divMisFinanzas').animate({ height: "300%" }, speed, function () {
                $('#divContenidoFinanzas').animate({ opacity: 1 }, speed).addClass('abierto');

            });
        }
    });

    $('#btnCalculoPresupuesto').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-1').removeClass('current');
            $('#page-11').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
        $('divCuadroCalculadoraPresupuestoDerechaID').scrollTop(0);
    });
    $('#btnPlanAhorro').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-1').removeClass('current');
            $('#page-13').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
        $("#divCuadroPlanAhorroDerechaID").scrollTop(0);
    });

    $('#btnCapacitacion').click(function () {
        var speed = 500;
        $('.page.current').animate({ opacity: 0, margintop: 0 }, speed, function () {
            $('#page-1').removeClass('current');
            $('#page-10').css('marginTop', 0).animate({ opacity: 1, marginTop: 0 }).addClass('current');

        });
    });

    $('#btnConfiguracion').click(function () {
        var speed = 100;

        if ($('#divContenidoFinanzas').hasClass('abierto')) {
            $('#divPruebaOcultar').animate({ opacity: 1 }, speed);
            $('#divContenidoFinanzas').animate({ opacity: 0 }, speed).removeClass('abierto');
            $('#divMisFinanzas').animate({ height: "100%" }, speed, function () { });

        }

        if ($('#divContenidoConfiguracion').hasClass('abierto')) {
            $('#divPruebaOcultar').animate({ opacity: 1 }, speed);
            $('#divContenidoConfiguracion').animate({ opacity: 0 }, speed).removeClass('abierto');
            $('#divMisFinanzas').animate({ height: "100%" }, speed, function () { });
        }
        else {
            $('#divPruebaOcultar').animate({ opacity: 0 }, speed);
            $('#divMisFinanzas').animate({ height: "300%" }, speed, function () {
                $('#divContenidoConfiguracion').animate({ opacity: 1 }, speed).addClass('abierto');
            });
        }
    });

    $('#btnLlamada').click(function () {


        var testVal = "Te has comunicado con el callcenter de tu entidad bancaria y te ha dicho que la respuesta correcta es la " + localStorage.getItem('respuestaCorrecta');
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {
            //alert(testVal);
        }

        $("#btnLlamada").attr("disabled", "disabled");

    });
    $('#btnPreguntaRedes').click(function () {


        var testVal = "Has consultado en las redes sociales con el hastag #CampoAPPrende y te han dicho que la respuesta correcta es la " + localStorage.getItem('respuestaCorrecta');
        try {
            AndroidFunctionToast.showToast(testVal);
        }
        catch (err) {

        }

        $("#btnPreguntaRedes").attr("disabled", "disabled");

    });
});


