<?php
  function connect_db(){
  global $connection;
  // Test server
  $host="localhost";
  $user="test";
  $pass="t3st3r123";
  $db="test";
  $port="3306";

  // $host="localhost";
  // $user="root";
  // $pass="root";
  // $db="test";
  // $port="8889";
  $connection = mysqli_connect($host, $user, $pass, $db, $port) or die("ei saa ühendust mootoriga- ".mysqli_error());
  mysqli_query($connection, "SET CHARACTER SET UTF8") or die("Ei saanud baasi utf-8-sse - ".mysqli_error($connection));
}

  connect_db();

$query ="SELECT * FROM ksaare_historicalreturns WHERE 1";
$result = mysqli_query($connection, $query) or die("$query - ".mysqli_error($connection));

$results = array();
while ($row = mysqli_fetch_assoc($result)) {
  $results[] = $row;
}

?>
