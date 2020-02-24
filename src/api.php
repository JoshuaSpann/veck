<?php

require_once('db.php');

// API FUNCTIONALITY //

$request = $_SERVER['REQUEST_METHOD'];

if ($request === 'DELETE') {
 $strBody = file_get_contents('php://input');
 $arrBody = json_decode($strBody,true);

 foreach($arrBody as $bodyItemName => $bodyItemValue) {
  if ($bodyItemName === 'table') {
   if ($arrBody['action'] === 'd') dbDelete($arrBody['table'], $arrBody['row']);
  }
 }

}

// PUT & POST //
if ($request === 'PUT' || $request == 'POST') {
 $strBody = file_get_contents('php://input');
 $arrBody = json_decode($strBody,true);

 foreach($arrBody as $bodyItemName => $bodyItemValue) {
  if ($bodyItemName === 'table') {
   if ($arrBody['action'] === 'u') dbUpsert($arrBody['table'], $arrBody['row']);
   if ($arrBody['action'] === 'a') dbAdd($arrBody['table'], $arrBody['row']);
   if ($arrBody['action'] === 'd') dbDelete($arrBody['table'], $arrBody['row']);
  }
 }

}

// GET //
if ($request == 'GET') {
 $tablename = $_GET['t'];
 $tableData = json_encode(dbGet($tablename));
 print_r($tableData);
}

?>
