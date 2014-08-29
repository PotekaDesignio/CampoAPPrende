$(document).ready(function () {

    $("#txtAhorroRequerido").val(formatCurrency(0));

    cargarAhorrosGuardados();
    $('#btnAgregarMeta').click(function () {

        $('#tablePlanAhorroDatos tbody').append("<tr>" +
                                        "<td class='tdPrimeraCelda'>" +
                                        "<input type='text' name='MetaAhorro' value='Meta' class='info' />" +
                                        "</td>" +
                                        "<td>" +
                                        "<input type='text' name='number1' value='0'  class='priceValor' />" +
                                        "</td>" +
                                        "<td>" +
                                        "<input type='number' name='number2' value='1'  class='priceMes' />" +
                                        "</td>" +
                                        "<td>" +
                                        "<input type='text' name='number3' value='0'  class='priceAhorro' readonly='readonly' />" +
                                        "</td>" +
                                        "<td>" +
                                        "<input type='checkbox' name='chkAlcanzada' value='Alcanzada' class='checkAlcanzada'>" +
                                        "</td>" +
                                        "</tr>");


        UpdateHandlers();
        formatCurrencyTable();

    });


    function UpdateHandlers() {

        $('.priceValor').focus(function () {
            if ($(this).val() == '0' || $(this).val() == '$0.00') {
                $(this).val('');
            }
            $(this).val($(this).val().replace(/[^0-9\.]+/g, ""));
            $(this).select();
        });

        $('.priceMes').focus(function () {
            if ($(this).val() == '1') {
                $(this).val('1');
            }
            $(this).select();
        });
        
        $('.priceValor').blur(function () {
            if ($(this).val() == '') {
                $(this).val('0');
            }
            formatCurrencyTable();
        });

        $('.priceMes').blur(function () {
            if ($(this).val() == '' || $(this).val() == '0') {
                $(this).val('1');
                calculateSum();
            }
        });

        $('.info').focus(function () {
            if ($(this).val() == 'Meta') {
                $(this).val('');
            }
            $(this).select();
        });

        $('.info').blur(function () {
            if ($(this).val() == '') {
                $(this).val('Meta');
            }
        });

        $(".priceValor").each(function () {
            $(this).keyup(function () {
                calculateSum();
            });
        });

        $(".priceMes").each(function () {
            $(this).keyup(function () {
                calculateSum();
            });
        });

        $(".checkAlcanzada").change(function () {
            calculateSum();
            formatCurrencyTable();
        });
    }

    $('#btnReiniciarAhorro').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
    });

    $('#btnGuardarAhorro').click(function () {
        saveProject();
    });

    $('#btnAhorro1').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
        loadProject("Ahorro_1");
    });

    $('#btnAhorro2').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
        loadProject("Ahorro_2");
    });

    $('#btnAhorro3').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
        loadProject("Ahorro_3");
    });

    $('#btnAhorro4').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
        loadProject("Ahorro_4");
    });

    $('#btnAhorro5').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
        loadProject("Ahorro_5");
    });

    $('#btnAhorro6').click(function () {
        reiniciarPlanAhorro("tablePlanAhorroDatos");
        loadProject("Ahorro_6");
    });

    function cargarAhorrosGuardados() {
        for (var i = 1; i <= 6; i++) {
            $("#btnAhorro" + i.toString()).hide();
        }

        for (var i = 1; i <= 6; i++) {
            var presupuestoStorage = localStorage.getItem('Ahorro_' + i.toString());

            if (presupuestoStorage != null) {

                $("#btnAhorro" + i.toString()).show();
            }
        }
    }

    function reiniciarPlanAhorro(strNombreTabla) {
        var myTable = document.getElementById(strNombreTabla);
        var rowCount = myTable.rows.length;

        for (var x = rowCount - 1; x > 0; x--) {
            myTable.deleteRow(x);
        }

        $("#txtAhorroRequerido").val("0");
        $("#txtAhorroRequerido").val(formatCurrency(0));
    }


    function saveProject() {

        var strNombrePlanAhorro = "Ahorro_"
        var strAhorroActual = 0;

        for (var i = 1; i <= 6; i++) {
            var ahorroStorage = localStorage.getItem('Ahorro_' + i.toString());

            if (ahorroStorage == null) {
                strAhorroActual = i;
                break;
            }
        }

        if (strAhorroActual == 0) {

            var mensaje = "CampoAPPrende te permite hacer tu planeación para seis meses. Si quieres volver a empezar, ve a configuración y restaura la aplicación.";

            try {
                AndroidFunctionToast.showToast(mensaje);
                return;
            }
            catch (err) {
                try {

                    var iframe = document.createElement("IFRAME");
                    iframe.setAttribute("src", 'data:text/plain,');
                    document.documentElement.appendChild(iframe);
                    window.frames[0].window.alert(mensaje);
                    iframe.parentNode.removeChild(iframe);

                    calliOSFunction("Narrador activado", ["Ram"], onSuccess,
                                                      function (ret) {
                                                          if (ret)
                                                              document.write("Error executing native function : <br>" + ret.message);
                                                      });
                    return;
                }
                catch (errre) {
                    alert(mensaje);
                    return;
                }
            }
        }

        var textPlanAhorro = obtenerDatosTabla();

        localStorage.setItem(strNombrePlanAhorro + strAhorroActual.toString(), textPlanAhorro);

        var mensaje = "Plan de ahorro guardado correctamente.";

        try {
            AndroidFunctionToast.showToast(mensaje);
        }
        catch (err) {
            try {

                var iframe = document.createElement("IFRAME");
                iframe.setAttribute("src", 'data:text/plain,');
                document.documentElement.appendChild(iframe);
                window.frames[0].window.alert(mensaje);
                iframe.parentNode.removeChild(iframe);
                calliOSFunction("Narrador activado", ["Ram"], onSuccess,
                                                  function (ret) {
                                                      if (ret)
                                                          document.write("Error executing native function : <br>" + ret.message);
                                                  }
                                                  );
            }
            catch (errre) {

                alert(mensaje);

            }
        }

        cargarAhorrosGuardados();
    }

    function loadProject(strNombreplanAhorro) {

        var innerHTMLTablePlanAhorro = localStorage.getItem(strNombreplanAhorro);

        //console.log(innerHTMLTable);
        $('#tablePlanAhorroDatos')[0].innerHTML = innerHTMLTablePlanAhorro;

        UpdateHandlers();
        calculateSum();
    }

    function obtenerDatosTabla() {

        var mytableIngresos = document.getElementById("tablePlanAhorroDatos");
        var myinputs = mytableIngresos.getElementsByTagName('input');

        var valoresLocalStorage = "<thead>" +
                              "<tr>" +
                               "<td class='tableTituloSeccionHeaderPlanAhorro'>" +
                                    "<span>Meta Ahorro</span>" +
                                "</td>" +
                                "<td class='tableTituloSeccionHeaderPlanAhorro'>" +
                                    "<span>¿Cuánto vale?</span>" +
                                "</td>" +
                                "<td class='tableTituloSeccionHeaderPlanAhorro'>" +
                                    "<span>¿En cuanto tiempo? (meses)</span>" +
                                "</td>" +
                                "<td class='tableTituloSeccionHeaderPlanAhorro'>" +
                                    "<span>Ahorro mensual</span>" +
                                "</td>" +
                                "<td class='tableTituloSeccionHeaderPlanAhorro'>" +
                                    "<span>Meta Alcanzada</span>" +
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
                                        "<input name='MetaAhorro' class='info' type='text' value='" + myinputs[i].value + "'></td>";
                        break;
                    case 1:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number1' class='priceValor' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>";
                        break;
                    case 2:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number2' class='priceMes' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>";
                        break;
                    case 3:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='number3' class='priceAhorro' type='text' value='" + myinputs[i].value + "'>" +
                                        "</td>";
                        break;
                    case 4:
                        valoresLocalStorage = valoresLocalStorage + "<td>" +
                                        "<input name='chkAlcanzada' class='checkAlcanzada' type='checkbox' value='" + myinputs[i].value + "'>" +
                                        "</td></tr>";
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

    function calculateSum() {

        var valorAhorroTotalMes = 0;

        var table = $("#tablePlanAhorroDatos tbody");

        table.find('tr').each(function (i) {

            var valorCosa = 0;
            var numeroMeses = 1;
            var ahorroMes = 0;
            var metaAlcanzada = false;

            var $tds = $(this).find('td'),
                                        valorCosa = parseFloat(Number($tds.eq(1).find($('.priceValor')).val().replace(/[^0-9\.]+/g,""))),
                                        numeroMeses = parseFloat($tds.eq(2).find($('.priceMes')).val()),
                                        metaAlcanzada = Boolean($tds.eq(4).find($('.checkAlcanzada')).is(':checked'));

            if (isNaN(numeroMeses))
            {
                numeroMeses = 1;
            }
            ahorroMes = valorCosa / numeroMeses;
            $(this).find('td').eq(3).find($('.priceAhorro')).val(ahorroMes);
            $(this).find('td').eq(3).find($('.priceAhorro')).formatCurrency();

            if (!isNaN(ahorroMes)) {
                if (!metaAlcanzada) {
                    valorAhorroTotalMes += ahorroMes;
                }
            }
            else {
                valorAhorroTotalMes = valorAhorroTotalMes;
            }

        });

        $("#txtAhorroRequerido").val(formatCurrency(valorAhorroTotalMes)); //.toFixed(2));

    }

    function formatCurrencyTable() {

        var table = $("#tablePlanAhorroDatos tbody");
        table.find('tr').each(function (i) {
            $(this).find('td').eq(1).find($('.priceValor')).formatCurrency();
            $(this).find('td').eq(3).find($('.priceAhorro')).formatCurrency();
        });
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