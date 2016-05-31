<?php
$lengthYear = floatval($_POST['lengthYear']);
$interestAnnual = floatval($_POST['interestAnnual']);
$initialInvestment = floatval($_POST['initialInvestment']);
$monthlyInvestment = floatval($_POST['monthlyInvestment']);

// echo "Soovid investeerida $lengthYear aastaks, intressiga $interestAnnual % aastas. ";

$lengthMonth = $lengthYear*12;
$interestMonthly = $interestAnnual/12;

// echo "Soovid investeerida $lengthMonth kuuks, intressiga $interestMonthly % kuus.";

$initialInvestmentGrowth = $initialInvestment*pow((1+$interestMonthly/100), $lengthMonth); //Põhiosakasvu liitintressi kasv
$monthlyInvestmentGrowth = $monthlyInvestment*((pow((1+$interestMonthly/100), $lengthMonth)-1)/($interestMonthly/100)); //Igakuise lisatud raha liitintressiline kasv
// echo "Alginv kasv $initialInvestmentGrowth ja lisatud raha kasv $monthlyInvestmentGrowth";
$finalInvestment = round(($initialInvestmentGrowth+$monthlyInvestmentGrowth), 2); //Ümardus kaks kohta pärast koma
// echo "Lõplik investeeringu suurus pärast $lengthYear aastat on $finalInvestment";

$arrayTotalInvestments = array();
for ($i=0; $i <= $lengthMonth; $i++) {
  $currentInvestment = round(($initialInvestment*pow((1+$interestMonthly/100), $i))+$monthlyInvestment*((pow((1+$interestMonthly/100), $i)-1)/($interestMonthly/100)), 2);
  $arrayTotalInvestments[$i] = $currentInvestment;
}

$arrayTotalPrincipal = array();
for ($j=0; $j <= $lengthMonth ; $j++) {
  $currentPrincipal = ($initialInvestment+($monthlyInvestment*$j));
  $arrayTotalPrincipal[$j] = $currentPrincipal;
}

$arrayTotalInterest = array();
for ($k=0; $k <= $lengthMonth ; $k++) {
  $currentInterest = ($arrayTotalInvestments[$k]-$arrayTotalPrincipal[$k]);
  $arrayTotalInterest[$k] = $currentInterest;
}

$arrayInterestEarnedPerMonth = array();
for ($l=0; $l <= $lengthMonth; $l++) {
  if ($l==0) {
    $previousMonthInterest = 0;
  } else {
    $previousMonthInterest = $arrayTotalInterest[($l-1)];
  }
  $currentMonthInterest = ($arrayTotalInterest[$l]-$previousMonthInterest);
  $arrayInterestEarnedPerMonth[$l]= $currentMonthInterest;
}

$arrayCurrentInvestmentValue = array();
for ($n=0; $n <= $lengthMonth ; $n++) {
  if ($n==0) {
    $previousMonthInterest = 0;
  } else {
    $previousMonthInterest = $arrayTotalInvestments[($n-1)];
  }
  $currentInvestmentValue = ($arrayTotalInvestments[$n]-$previousMonthInterest[$n]);
  $arrayCurrentInvestmentValue[$n] = $currentInvestmentValue;
}

$result = array(
  "totalInvestments" => $arrayTotalInvestments,
  "totalPrincipal" => $arrayTotalPrincipal,
  "totalInterest" => $arrayTotalInterest,
  "monthlyInterest" => $arrayInterestEarnedPerMonth,
  "currentInvestmentValue" => $arrayCurrentInvestmentValue,
  "lengthYear" => range(1, $lengthYear),
);

echo json_encode($result);

 ?>
