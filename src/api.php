<?php

$request = $_SERVER['REQUEST_METHOD'];

//print_r(phpinfo());
if ($request === 'PUT' || $request == 'POST') {
//print_r($_SERVER);
 $strBody = file_get_contents('php://input');
 $arrBody = json_decode($strBody,true);

 foreach($arrBody as $bodyItemName => $bodyItemValue) {
  if ($bodyItemName === 'table') {
   if ($arrBody['action'] === 'u') dbUpsert($arrBody['table'], $arrBody['row']);
  }
 }
}

function dbUpsert($tablename, $row) {
 $rowid = $row['id'];
 $sqlUpdate = '';

 foreach($row as $fieldk => $fieldv) {
  $type = gettype($fieldv);

  $fieldv = fieldValueParse($fieldv);
  $type = gettype($fieldv);

  // TODO - Proper String quote handling! //
  //$fieldv = str_replace('```','\`',$fieldv);
  //$fieldv = str_replace('``','"',$fieldv);
  //$fieldv = str_replace('`','\'',$fieldv);

  $strQuotes = '';
  if ($type == 'string') $strQuotes = "'";
  $sqlUpdate .= "update $tablename set $fieldk = $strQuotes$fieldv$strQuotes where id = '$rowid';";
 }
print_r($sqlUpdate);
try {
 $db = new SQLite3('tickets.db');
 $db->exec($sqlUpdate);
 $db->close();
} catch (Exception $e) {
echo($e);
}
}

function fieldValueParse($value) {
 $type = gettype($value);

 if ($type == 'array') {
/*
  $newvalue = '';
  foreach($value as $k => $v) {
   //$value[$k] = fieldValueParse($v);
   $newvalue.= json_encode($v).',';
  }
  $value = $newvalue;
*/
  $type = 'string';
  $json = json_encode($value);
  $json = str_replace("'","\\\\'",$json);
  $value = "'$json'";
 }

 if ($type == 'boolean') {
  if ($value < 0 || $value > 0) $value = 1;
  else $value = 0;
 }

 if ($type == 'NULL') {
  $value = "null";
 }

 if ($type == 'string') {
  //$value = str_replace('`','```',$value);
  //$value = str_replace('"','``',$value);
  $value = str_replace("'",'`',$value);
 }

 return $value;
}

?>
