<?php
$lengthYear = $_POST['lengthYear'];
$interestAnnual = $_POST['interestAnnual'];
$initialInvestment = $_POST['initialInvestment'];
$monthlyInvestment = $_POST['monthlyInvestment'];

// echo "Soovid investeerida $lengthYear aastaks, intressiga $interestAnnual % aastas. ";

$lengthMonth = $lengthYear*12;
$interestMonthly = $interestAnnual/12;

// echo "Soovid investeerida $lengthMonth kuuks, intressiga $interestMonthly % kuus.";

$initialInvestmentGrowth = $initialInvestment*pow((1+$interestMonthly/100), $lengthMonth);
$monthlyInvestmentGrowth = $monthlyInvestment*((pow((1+$interestMonthly/100), $lengthMonth)-1)/($interestMonthly/100));
// echo "Alginv kasv $initialInvestmentGrowth ja lisatud raha kasv $monthlyInvestmentGrowth";
$finalInvestment = round(($initialInvestmentGrowth+$monthlyInvestmentGrowth), 2);
// echo "Lõplik investeeringu suurus pärast $lengthYear aastat on $finalInvestment";

$arrayTotalInvestments = array();
for ($i=0; $i < $lengthMonth; $i++) {
  $currentInvestment = round(($initialInvestment*pow((1+$interestMonthly/100), $i))+$monthlyInvestment*((pow((1+$interestMonthly/100), $i)-1)/($interestMonthly/100)), 2);
  $arrayTotalInvestments[$i] = $currentInvestment;
}

$arrayTotalPrincipal = array();
for ($j=0; $j < $lengthMonth ; $j++) {
  $currentPrincipal = ($initialInvestment+($monthlyInvestment*$j));
  $arrayTotalPrincipal[$j] = $currentPrincipal;
}

$arrayTotalInterest = array();
for ($k=0; $k < $lengthMonth ; $k++) {
  $currentInterest = ($arrayTotalInvestments[$k]-$arrayTotalPrincipal[$k]);
  $arrayTotalInterest[$k] = $currentInterest;
}

$result = array(
  "totalInvestments" => $arrayTotalInvestments,
  "totalPrincipal" => $arrayTotalPrincipal,
  "totalInterest" => $arrayTotalInterest,
  "lengthYear" => range(1, $lengthYear),
);

echo json_encode($result);

 ?>
