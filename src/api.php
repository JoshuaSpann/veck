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

if ($request == 'GET') {
 $tablename = $_GET['t'];
 $tableData = dbGet($tablename);
 print_r($tableData);
}
function dbGet($tablename='*', $filterparams='') {
 if ($tablename == '*') {
  $tableDataJSON = '';
  $arrTableNames = dbTableNamesGet();
  foreach($arrTableNames as $curTable) {
   $curTableData = $db->query("select * from $curTable");
   $tableDataJSON .= json_encode($curTableData);
  }
 }

 $sqlSelect = "select * from $tablename";

 $db = new SQLite3('tickets.db');
/*
 // TODO - Is this better/more performant here for app needs?
 $query = $db->prepare($sqlSelect);
 //USE $query->bindValue(':id',$id);
 $results = $query->execute();
*/
 $results = $db->query($sqlSelect);//->fetchArray();
 while ($row = $results->fetchArray()) {
  $tableData[] = dbResultsClean($row);
 }
 $db->close();
 $tableDataJSON = json_encode($tableData);
 return $tableDataJSON;
}

function dbResultsClean($tableData) {
 $newTableData = [];
 foreach ($tableData as $k => $v) {
  if (gettype($k) == 'integer') continue;
  $newTableData[$k] = $v;
 }
 return $newTableData;
}

function dbTableNamesGet() {

}

function dbUpsert($tablename, $row) {
 $rowid = $row['id'];
 $sqlUpdate = '';

 foreach($row as $fieldk => $fieldv) {
  if ($fieldk == 'id') continue;
  $type = gettype($fieldv);

  $fieldv = fieldValueParse($fieldv);
  $type = gettype($fieldv);

/*
  // TODO - Proper String quote handling! //
  //$fieldv = str_replace('```','\`',$fieldv);
  //$fieldv = str_replace('``','"',$fieldv);
  //$fieldv = str_replace('`','\'',$fieldv);

  $strQuotes = '';
  if ($type == 'string') $strQuotes = "'";
  $sqlUpdate .= "update $tablename set $fieldk = $strQuotes$fieldv$strQuotes where id = '$rowid';";
*/
 }
//print_r($sqlUpdate);

/*
//PREV
try {
 $db = new SQLite3('tickets.db');
 $db->exec($sqlUpdate);
 $db->close();
} catch (Exception $e) {
echo($e);
}
*/

 $db = new SQLite3('tickets.db');

 foreach($row as $fieldk => $fieldv) {
  if ($fieldk == 'id') continue;
  $type = gettype($fieldv);

  $fieldv = fieldValueParse($fieldv);
  $type = gettype($fieldv);

  // TODO? if (substr($rowid, strlen($rowid)-1) == 's') $fieldv = json_encode($fieldv);
  $sql = "update $tablename set $fieldk = :fieldval where id = :id";
  $query = $db->prepare($sql);
  $query->bindValue(':id',$rowid);
  $query->bindValue(':fieldval',$fieldv);
  $results = $query->execute();
 }
 $db->close();

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
/*
//PREV
  $json = str_replace("'","\\\\'",$json);
  $value = "'$json'";
*/
  $value = $json;
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
