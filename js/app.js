$(document).ready(function(){
  var form = $('#calculations-form');
  form.on( "submit", function(event) {
    //console.log( "<p> was clicked" );
    event.preventDefault();

//Siia tuleb validation


    $.post("calculations_test.php", form.serialize())
    .done(function(data){
      var parsedData = $.parseJSON(data);
      console.log(parsedData.totalInvestments);
      drawChart(parsedData);
      drawTable(parsedData);
    });
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
            "<th> Oma investeering</th>",
            "<th> Portfelli väärtus</th>",
            "<th> Intressitulu</th>",
            "<th> Kokku intressitulu</th>",
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
