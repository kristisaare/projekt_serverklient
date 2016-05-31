$(document).ready(function(){
  var form = $('#calculations-form');
  form.on( "submit", function(event) {
    console.log( "<p> was clicked" );
    event.preventDefault();
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
      var month = (i+1);
      var principal = parsedData.currentInvestmentValue[i];
      var interest = parsedData.monthlyInterest[i];
      var row = [
        "<tr>",
          "<td>",
            month,
          "</td>",
          "<td>",
            principal,
          "</td>",
          "<td>",
            interest,
          "</td>",
        "</tr>"
      ];
      tableRows.push(row.join(""))
    }
    var table = [
      "<table>",
        "<thead>",
          "<tr>",
            "<th> month</th>",
            "<th> principal</th>",
            "<th> interest</th>",
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
