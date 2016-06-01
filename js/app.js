$(document).ready(function(){
  var form = $('#calculations-form');
  form.on( "submit", function(event) {
    //console.log( "<p> was clicked" );
    event.preventDefault();

    var formvalid = true;
    var errorbox = $('#errors');
    // http://stackoverflow.com/questions/16242449/regex-currency-validation
    var currencyRegex = new RegExp("^([1-9]([0-9]*)|0)([\.,][0-9]{1,2})?$");

    errorbox.html("");

    var initialInvestment = $('#initial-investment');
    if (initialInvestment.val().length==0) {
        formvalid = false;
        errorbox.append("<div>Sisesta palun algselt investeeritud summa.</div>");
    }
    else if(!currencyRegex.test(initialInvestment.val())){
      formvalid = false;
      errorbox.append("<div>Algselt investeeritud summa ei ole loetav, palun paranda.</div>");
    }else if(initialInvestment.val() > 2147483647) {
      errorbox.append("<div>Algselt investeeritud summa on liiga suur, palun parandada.</div>");
    }

    var monthlyInvestment = $('#monthly-investment');
    if (monthlyInvestment.val().length==0) {
        formvalid = false;
        errorbox.append("<div>Sisesta palun igakuiselt investeeritud summa.</div>");
    }
    else if(!currencyRegex.test(monthlyInvestment.val())){
      formvalid = false;
      errorbox.append("<div>Igakuiselt investeeritud summa ei ole loetav, palun paranda.</div>");
    }else if(monthlyInvestment.val() > 2147483647) {
      errorbox.append("<div>Igakuiselt investeeritud summa on liiga suur, palun parandada.</div>");
    }

    var lengthYear = $('#length-year');
    if (lengthYear.val().length==0) {
        formvalid = false;
        errorbox.append("<div>Sisesta palun investeeringu kestvus.</div>");
    }
    else if(!currencyRegex.test(lengthYear.val())){
      formvalid = false;
      errorbox.append("<div>Investeeringu pikkus ei ole loetav, palun paranda.</div>");
    }else if(lengthYear.val() > 100) {
      errorbox.append("<div>Investeeringu pikkus on liiga suur (max 100 aastat), palun parandada.</div>");
    }

    var interestAnnual = $('#interest-annual');
    if (interestAnnual.val().length==0) {
        formvalid = false;
        errorbox.append("<div>Sisesta palun aastane intressitootlus.</div>");
    }
    else if(!currencyRegex.test(interestAnnual.val())){
      formvalid = false;
      errorbox.append("<div>Intressitootlus ei ole loetav, palun paranda.</div>");
    }
    else if(interestAnnual.val() > 100) {
      errorbox.append("<div>Intressitootlus on liiga suur (max 100%), palun parandada.</div>");
    }




    if (formvalid) {
      $.post("calculations_test.php", form.serialize())
      .done(function(data){
        var parsedData = $.parseJSON(data);
        console.log(parsedData.totalInvestments);
        drawChart(parsedData);
        drawTable(parsedData);
      });
    }
  });
  function drawChart(parsedData){
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Investeeritud raha kasv tulevikus'
        },
        xAxis: {
            tickmarkPlacement: 'on',
            ceiling: parsedData.lengthYear,
            title: {
                text: 'Investeeritud kuud'
            },
        },
        yAxis: {
            title: {
                text: 'Kogusumma eurodes'
            },
        },
        tooltip: {
            shared: true,
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
          name: 'Inveesteeringu intressikasv',
          data: parsedData.totalInterest
        }, {
            name: 'Ise investeeritud raha',
            data: parsedData.totalPrincipal
        }]
    });
  };
  function drawTable(parsedData){
    var tableBox = $('#table-container');
    var tableRows = [];
    for (var i = 0; i < parsedData.monthlyInterest.length; i++) {
      var month = (i);
      var investedMoney = Math.round(parsedData.totalPrincipal[i]*100)/100;
      var principal = Math.round(parsedData.currentInvestmentValue[i]*100)/100;
      var interest = Math.round(parsedData.monthlyInterest[i]*100)/100;
      var totalInterest = Math.round(parsedData.totalInterest[i]*100)/100;
      var row = [
        "<tr>",
          "<td>",
            month,
          "</td>",
          "<td>",
            investedMoney,
          "</td>",
          "<td>",
            principal,
          "</td>",
          "<td>",
            interest,
          "</td>",
          "<td>",
            totalInterest,
          "</td>",
        "</tr>"
      ];
      tableRows.push(row.join(""))
    }
    var table = [
      "<table>",
        "<thead>",
          "<tr>",
            "<th> Kuu</th>",
            "<th> Oma <br>investeering</th>",
            "<th> Portfelli <br>väärtus</th>",
            "<th> Intressitulu</th>",
            "<th> Kokku <br> intressitulu</th>",
          "</tr>",
        "</thead>",
        "<tbody>",
          tableRows.join(""),
        "</tbody>",
      "</table>"
    ];
    tableBox.html(table.join(""))

  };


});
