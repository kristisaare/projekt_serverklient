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
                text: 'Investeeritud aastad'
            },
            // labels: {
              // formatter: function(){
                // return Math.round(this.value/12;
              // }
            // }
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
          name: 'Investeeringu intressikasv',
          data: parsedData.totalInterest
        }, {
            name: 'Ise investeeritud raha',
            data: parsedData.totalPrincipal
        }]
    });
  };


});
