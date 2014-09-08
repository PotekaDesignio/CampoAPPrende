$(document).ready(function () {

    $("#semana1").val(formatCurrency(0));
    $("#semana2").val(formatCurrency(0));
    $("#semana3").val(formatCurrency(0));
    $("#semana4").val(formatCurrency(0));


    cargarPresupuestosGuardados();
    $('#btnAgregarIngreso').click(function () {

        var ContadorIngresosActuales = localStorage.getItem('ContadorIngresosActuales');

        if (ContadorIngresosActuales == null) {
            ContadorIngresosActuales = 1;
        }

        $('#tableCalculadoraPresupuestoIngresos tbody').append("<tr>" +
                                                                                                       "<td class='tdPrimeraCelda'>" +
                                                                                                       "<input type='text' name='FirstName' value='Nombre' class='info' onclick='this.setSelectionRange(0, 9999);' />" +
                                                                                                       "</td>" +
                                                                                                       "<td>" +
                                                                                                       "<input type='text' name='number' value='0'  class='price' onclick='this.setSelectionRange(0, 9999);' />" +
                                                                                                       "</td>" +
                                                                                                       "<td>" +
                                                                                                       "<input type='text' name='number' value='0'  class='price' onclick='this.setSelectionRange(0, 9999);' />" +
                                                                                                       "</td>" +
                                                                                                       "<td>" +
                                                                                                       "<input type='text' name='number' value='0'  class='price' onclick='this.setSelectionRange(0, 9999);' />" +
                                                                                                       "</td>" +
                                                                                                       "<td>" +
                                                                                                       "<input type='text' name='number' value='0'  class='price' onclick='this.setSelectionRange(0, 9999);' />" +
                                                                                                       "</td>" +
                                                                                                       "</tr>");


        UpdateHandlers();
        formatCurrencyTable();
        localStorage.setItem('ContadorIngresosActuales', ContadorIngresosActuales + 4);

    });


    $('#btnAgregarGasto').click(function () {

        var ContadorGastosActuales = localStorage.getItem('ContadorGastosActuales');

        if (ContadorGastosActuales == null) {
            ContadorGastosActuales = 1;
        }

        $('#tableCalculadoraPresupuestoGastos tbody').append("<tr>" +
                                                                                                   "<td class='tdPrimeraCelda'>" +
                                                                                                   "<input type='text' name='FirstName' value='Nombre' class='info' onclick='this.select();' />" +
                                                                                                   "</td>" +
                                                                                                   "<td>" +
                                                                                                   "<input type='text' name='number' value='0'  class='price' onclick='this.select();' />" +
                                                                                                   "</td>" +
                                                                                                   "<td>" +
                                                                                                   "<input type='text' name='number' value='0'  class='price' onclick='this.select();' />" +
                                                                                                   "</td>" +
                                                                                                   "<td>" +
                                                                                                   "<input type='text' name='number' value='0'  class='price' onclick='this.select();' />" +
                                                                                                   "</td>" +
                                                                                                   "<td>" +
                                                                                                   "<input type='text' name='number' value='0'  class='price' onclick='this.select();' />" +
                                                                                                   "</td>" +
                                                                                                   "</tr>");

        UpdateHandlers();
        formatCurrencyTable();
        localStorage.setItem('ContadorGastosActuales', ContadorGastosActuales + 4);



    });

    function UpdateHandlers() {

        $('.price').focus(function () {
            if ($(this).val() == '0' || $(this).val() == '$0.00') {
                $(this).val('');
            }
            $(this).val($(this).val().replace(/[^0-9\.]+/g, ""));
        });

        $('.price').keyup(function () {
            $(this).val($(this).val().replace(/[^0-9\.]+/g, ""));
        });

        $('.price').blur(function () {
            if ($(this).val() == '') {
                $(this).val('0');
            }
            formatCurrencyTable();

        });

        $('.info').focus(function () {
            if ($(this).val() == 'Nombre') {
                $(this).val('');
            }
        });

        $('.info').keyup(function () {
            $(this).val($(this).val().replace(/[^a-z]/g, ""));
        });

        $('.info').blur(function () {
            if ($(this).val() == '') {
                $(this).val('Nombre');
            }
        });

        $(".price").each(function () {
            $(this).keyup(function () {
                calculateSum();
            });
        });
    }

    function calculateSum() {

        var totalSemana1 = 0;
        var totalSemana2 = 0;
        var totalSemana3 = 0;
        var totalSemana4 = 0;

        var table = $("#tableCalculadoraPresupuestoIngresos tbody");

        table.find('tr').each(function (i) {

            var semana1 = 0;
            var semana2 = 0;
            var semana3 = 0;
            var semana4 = 0;

            var $tds = $(this).find('td'),
                                        semana1 = parseFloat(Number($tds.eq(1).find($('.price')).val().replace(/[^0-9\.]+/g, ""))),
                                        semana2 = parseFloat(Number($tds.eq(2).find($('.price')).val().replace(/[^0-9\.]+/g, ""))),
                                        semana3 = parseFloat(Number($tds.eq(3).find($('.price')).val().replace(/[^0-9\.]+/g, ""))),
                                        semana4 = parseFloat(Number($tds.eq(4).find($('.price')).val().replace(/[^0-9\.]+/g, "")));


            if (!isNaN(semana1) && !isNaN(semana2) && !isNaN(semana3) && !isNaN(semana4)) {
                totalSemana1 += semana1;
                totalSemana2 += semana2;
                totalSemana3 += semana3;
                totalSemana4 += semana4;
            }
            else {
                totalSemana1 = totalSemana1;
                totalSemana2 = totalSemana2;
                totalSemana3 = totalSemana3;
                totalSemana4 = totalSemana4;
            }

        });

        calculateMinus(totalSemana1, totalSemana2, totalSemana3, totalSemana4);

    }

    function calculateMinus(totalSemana1, totalSemana2, totalSemana3, totalSemana4) {

        var table = $("#tableCalculadoraPresupuestoGastos tbody");

        table.find('tr').each(function (i) {

            var semana1 = 0;
            var semana2 = 0;
            var semana3 = 0;
            var semana4 = 0;

            var $tds = $(this).find('td'),
                                        semana1 = parseFloat(Number($tds.eq(1).find($('.price')).val().replace(/[^0-9\.]+/g, ""))) * -1,
                                        semana2 = parseFloat(Number($tds.eq(2).find($('.price')).val().replace(/[^0-9\.]+/g, ""))) * -1,
                                        semana3 = parseFloat(Number($tds.eq(3).find($('.price')).val().replace(/[^0-9\.]+/g, ""))) * -1,
                                        semana4 = parseFloat(Number($tds.eq(4).find($('.price')).val().replace(/[^0-9\.]+/g, ""))) * -1;

            if (!isNaN(semana1) && !isNaN(semana2) && !isNaN(semana3) && !isNaN(semana4)) {
                totalSemana1 += semana1;
                totalSemana2 += semana2;
                totalSemana3 += semana3;
                totalSemana4 += semana4;
            }
            else {
                totalSemana1 = totalSemana1;
                totalSemana2 = totalSemana2;
                totalSemana3 = totalSemana3;
                totalSemana4 = totalSemana4;
            }


        });

        $("#semana1").val(formatCurrency(totalSemana1));
        $("#semana2").val(formatCurrency(totalSemana2));
        $("#semana3").val(formatCurrency(totalSemana3));
        $("#semana4").val(formatCurrency(totalSemana4));

    }

    function formatCurrencyTable() {

        var table = $("#tableCalculadoraPresupuestoIngresos tbody");
        table.find('tr').each(function (i) {
            $(this).find('td').eq(1).find($('.price')).formatCurrency();
            $(this).find('td').eq(2).find($('.price')).formatCurrency();
            $(this).find('td').eq(3).find($('.price')).formatCurrency();
            $(this).find('td').eq(4).find($('.price')).formatCurrency();
        });

        table = $("#tableCalculadoraPresupuestoGastos tbody");
        table.find('tr').each(function (i) {
            $(this).find('td').eq(1).find($('.price')).formatCurrency();
            $(this).find('td').eq(2).find($('.price')).formatCurrency();
            $(this).find('td').eq(3).find($('.price')).formatCurrency();
            $(this).find('td').eq(4).find($('.price')).formatCurrency();
        });

    }

    $('#btnReiniciar').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        $("#divCuadroCalculadoraPresupuestoDerechaID").scrollTop(0);

    });

    $('#btnAgregarPeriodo').click(function () {
        saveProject();
    });

    $('#btnPres1').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        loadProject("Presupuesto_1", "PresupuestoGasto_1");
    });

    $('#btnPres2').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        loadProject("Presupuesto_2", "PresupuestoGasto_2");
    });

    $('#btnPres3').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        loadProject("Presupuesto_3", "PresupuestoGasto_1");
    });

    $('#btnPres4').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        loadProject("Presupuesto_4", "PresupuestoGasto_1");
    });

    $('#btnPres5').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        loadProject("Presupuesto_5", "PresupuestoGasto_1");
    });

    $('#btnPres6').click(function () {
        reiniciarCalculadora("tableCalculadoraPresupuestoIngresos");
        reiniciarCalculadora("tableCalculadoraPresupuestoGastos");
        loadProject("Presupuesto_6", "PresupuestoGasto_1");
    });

    function reiniciarCalculadora(strNombreTabla) {
        var myTable = document.getElementById(strNombreTabla);
        var rowCount = myTable.rows.length;
        for (var x = rowCount - 1; x > 0; x--) {
            myTable.deleteRow(x);
        }

        $("#semana1").val("0");
        $("#semana2").val("0");
        $("#semana3").val("0");
        $("#semana4").val("0");

        $("#semana1").val(formatCurrency(0));
        $("#semana2").val(formatCurrency(0));
        $("#semana3").val(formatCurrency(0));
        $("#semana4").val(formatCurrency(0));

    }


    function saveProject() {

        var strNombrePresupuestoIngreso = "Presupuesto_"
        var strNombrePresupuestoGasto = "PresupuestoGasto_"
        var strPresupuestosActual = 0;

        for (var i = 1; i <= 6; i++) {
            var option1 = document.createElement("option");
            var presupuestoStorage = localStorage.getItem('Presupuesto_' + i.toString());

            if (presupuestoStorage == null) {
                strPresupuestosActual = i;
                break;
            }
        }

        if (strPresupuestosActual == 0) {

            var mensaje = "CampoAPPrende te permite hacer tu planeación para seis meses. Si quieres volver a empezar, ve a configuración y restaura la aplicación.";

            try {
                AndroidFunctionToast.showToast(mensaje);
                return;
            }
            catch (err) {
                try {

                    //                    var iframe = document.createElement("IFRAME");
                    //                    iframe.setAttribute("src", 'data:text/plain,');
                    //                    document.documentElement.appendChild(iframe);
                    //                    window.frames[0].window.alert(mensaje);
                    //                    iframe.parentNode.removeChild(iframe);

                    //                    calliOSFunction("Narrador activado", ["Ram"], onSuccess,
                    //                                  function (ret) {
                    //                                      if (ret)
                    //                                          document.write("Error executing native function : <br>" + ret.message);
                    //                                  });
                    return;
                }
                catch (errre) {
                    alert(mensaje);
                    return;
                }
            }
        }

        var textIngresos = obtenerDatosTabla("tableCalculadoraPresupuestoIngresos", "Ingresos");
        var textGastos = obtenerDatosTabla("tableCalculadoraPresupuestoGastos", "Gastos");

        localStorage.setItem(strNombrePresupuestoIngreso + strPresupuestosActual.toString(), textIngresos);
        localStorage.setItem(strNombrePresupuestoGasto + strPresupuestosActual.toString(), textGastos);

        var mensaje = "Presupuesto guardado correctamente.";

        try {
            AndroidFunctionToast.showToast(mensaje);
        }
        catch (err) {
            try {

                //                var iframe = document.createElement("IFRAME");
                //                iframe.setAttribute("src", 'data:text/plain,');
                //                document.documentElement.appendChild(iframe);
                //                window.frames[0].window.alert(mensaje);
                //                iframe.parentNode.removeChild(iframe);
                //                calliOSFunction("Narrador activado", ["Ram"], onSuccess,
                //                                  function (ret) {
                //                                      if (ret)
                //                                          document.write("Error executing native function : <br>" + ret.message);
                //                                  }
                //                                  );
            }
            catch (errre) {

                alert(mensaje);

            }
        }
        cargarPresupuestosGuardados();
    }

    function obtenerDatosTabla(strNombreTabla, strTituloCampo) {

        var mytableIngresos = document.getElementById(strNombreTabla);
        var myinputs = mytableIngresos.getElementsByTagName('input');

        var valoresLocalStorage = "<thead>" +
                                   "<tr>" +
                                        "<td class='tableTituloSeccion tdPrimeraCelda'>" +
                                             strTituloCampo +
                                        "</td>" +
                                        "<td>" +
                                        "</td>" +
                                        "<td>" +
                                        "</td>" +
                                        "<td>" +
                                        "</td>" +
                                        "<td>" +
                                        "</td>" +
                                   "</tr>" +
                              "</thead>" +
                              "<tbody>";

        var ii = 0;
        for (var i = 0; i < myinputs.length; i++) {

            if (ii < 5) {

                switch (ii) {
                    case 0:
                        valoresLocalStorage = valoresLocalStorage + "<tr>" +
                                        "<td class='tdPrimeraCelda'>" +
                                        "<input name='FirstName' class='info' type='text' value='" + myinputs[i].value + "'></td>";
                        break;
                    case 1:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number' class='price' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>";
                        break;
                    case 2:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number' class='price' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>";
                        break;
                    case 3:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number' class='price' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>";
                        break;
                    case 4:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number' class='price' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>" +
                                        "</tr>";
                        break;
                }
                ii++;
            }
            else {
                ii = 0;
                i--;
            }

        }

        valoresLocalStorage = valoresLocalStorage + "</tbody>";

        return valoresLocalStorage;
    }


    function loadProject(strNombrePeriodoIngreso, strNombrePeriodoGasto) {

        var innerHTMLTableIngreso = localStorage.getItem(strNombrePeriodoIngreso);
        var innerHTMLTableGasto = localStorage.getItem(strNombrePeriodoGasto);
        //console.log(innerHTMLTable);
        $('#tableCalculadoraPresupuestoIngresos')[0].innerHTML = innerHTMLTableIngreso;
        $('#tableCalculadoraPresupuestoGastos')[0].innerHTML = innerHTMLTableGasto;

        UpdateHandlers();
        calculateSum();
    }

    function deleteProject() {
        var selected = $('#selectSave')[0].selectedIndex
        var pname = $('#selectSave')[0].options[selected].value

        $('#selectSave')[0].remove(selected);
        localStorage.removeItem(pname);

        //console.log(pname);
        loadSaveStates();
    }

    function cargarPresupuestosGuardados() {
        for (var i = 1; i <= 6; i++) {
            $("#btnPres" + i.toString()).hide();
        }

        for (var i = 1; i <= 6; i++) {
            var presupuestoStorage = localStorage.getItem('Presupuesto_' + i.toString());

            if (presupuestoStorage != null) {

                $("#btnPres" + i.toString()).show();
            }
        }
    }

    function formatCurrency(num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + '$' + num + '.' + cents);
    }

});