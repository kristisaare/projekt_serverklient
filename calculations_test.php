<?php
$lengthYear = 10; //tuleb formist//
$interestAnnual = 10; //tuleb formist//
$initialInvestment = 1000; //tuleb formist//
$monthlyInvestment = 100; //tuleb formist//

echo "Soovid investeerida $lengthYear aastaks, intressiga $interestAnnual % aastas. ";

$lengthMonth = $lengthYear*12;
$interestMonthly = $interestAnnual/12;

echo "Soovid investeerida $lengthMonth kuuks, intressiga $interestMonthly % kuus.";

$initialInvestmentGrowth = $initialInvestment*pow((1+$interestMonthly/100), $lengthMonth);
$monthlyInvestmentGrowth = $monthlyInvestment*((pow((1+$interestMonthly/100), $lengthMonth)-1)/($interestMonthly/100));
echo "Alginv kasv $initialInvestmentGrowth ja lisatud raha kasv $monthlyInvestmentGrowth";
$finalInvestment = ($initialInvestmentGrowth+$monthlyInvestmentGrowth);
echo "Lõplik investeeringu suurus pärast $lengthYear aastat on $finalInvestment";


 ?>
