<?php
require_once("db.php");
?>
<!DOCTYPE html>
<head>
      <meta charset="utf-8"/>
      <title> Arvuta portfelli tulevikuväärtus </title>
      <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="js/app.js"></script>
      <link rel="stylesheet" type="text/css" href="view.css">
</head>
<body>
  <div id="frontview">
      <div id="questions">
        <form action="calculations_test.php" method="post" id="calculations-form">

          <label>Praegu investeeritud summa</label>
          <input id="initial-investment" type="text" placeholder="Portfelli väärtus" name="initialInvestment">

          <label>Igakuiselt lisatav rahasumma</label>
          <input id="monthly-investment" type="text" placeholder="Igakuiselt lisatav rahasumma" name="monthlyInvestment">

          <label>Mitmeks aastaks soovid raha investeerida?</label>
          <input id="length-year" type="text" placeholder="Investeeringu pikkus aastates" name="lengthYear">

          <label>Aastane keskmine tootlus protsentides</label>
          <input id="interest-annual" type="text" placeholder="Tootlus %" name="interestAnnual">

          <button type="submit">Arvuta!</button>
          <div id="errors"></div>
        </form>
        <div class="panel">
              <div>Ajalooline tootlus:</div>

              <?php
                foreach($results as $res):
                  $updated_at = date('d.m.Y', strtotime($res['updated_at']));
              ?>
                <div><?php echo "{$res['portal']} / {$res['historical_interest']}% / {$updated_at}" ?></div>
              <?php endforeach; ?>
        </div>
      </div>

      <div id="container"></div>
  </div>
<div id="table-container"></div>



</body>
</html>
