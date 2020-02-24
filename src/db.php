<?php

// DATABASE FUNCTIONALITY //

function dbAdd($tablename, $rowData) {
 if ($tablename == '' || $rowData == []) return;
 $db = new SQLite3('tickets.db');
 $fields = '';
 $params = '';
 $fieldCount = sizeof($rowData) - 1;
 $i = 0;
 foreach ($rowData as $k=>$v) {
  $type = gettype($v);

  if ($k == 'id' && ($type == 'integer' || $type == 'double')) {
   $res = $db->prepare("select max(id) as max from $tablename")->execute();
   $row = $res->fetchArray();
   $newId = $row['max']++;
   $v = $newId;
  }
  $fields .= $k;
  //$params .= '?';
  $params .= ":$k";
  if ($i < $fieldCount) {
   $fields .= ',';
   $params .= ',';
  }
  $i++;
 }
 $sql = "insert into $tablename ($fields) values($params)";
print_r($sql);
 $query = $db->prepare($sql);
 $i = 0;
 foreach ($rowData as $k=>$v) {
  $query->bindValue(":$k", $v);
  $i++;
 }
 $query->execute();
 $db->close();
}

function dbDelete($tablename, $rowData) {
 $sql = "delete from $tablename where id = :rowid and ticketid = :ticketid";
 $db = new SQLite3('tickets.db');
 $query = $db->prepare($sql);
 $query->bindValue(":rowid", $rowData['id']);
 $query->bindValue(":ticketid", $rowData['ticketid']);
 $query->execute();
 $db->close();
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
 $query = $db->prepare($sqlSelect);
 $results = $query->execute();

 while ($row = $results->fetchArray()) {
  $tableData[] = dbResultsClean($row);
 }

 $db->close();
 return $tableData;
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
 }

 $db = new SQLite3('tickets.db');

 foreach($row as $fieldk => $fieldv) {
  if ($fieldk == 'id') continue;
  $type = gettype($fieldv);

  $fieldv = fieldValueParse($fieldv);
  $type = gettype($fieldv);

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
  $stringValue = '';

  foreach($value as $k => $v) {
   $stringValue.= "$k:$v,";
  }

  $value = $stringValue;
  $type = 'string';
 }

 if ($type == 'boolean') {
  if ($value < 0 || $value > 0) $value = 1;
  else $value = 0;
 }

 if ($type == 'NULL') {
  $value = "null";
 }

 if ($type == 'string') {
 }

 return $value;
}

?>
