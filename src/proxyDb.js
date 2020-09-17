let db = {}
db.data = {
 tickets: [
  {
   id: 'no connection',
   name: 'No Connection to Server',
   completed: false,
   description: 'No Connection to Server',
   date_added:null,
   date_completed: null
  }
 ],
 items: [
 
 ]
}
db.add = function dbAdd(tableName, row) {
	let tables = db.data
	if (tables[tableName] == null || tables[tableName] == undefined) return 'NO SUCH TABLE'
	if (row.id == null || row.id == undefined || row.id == '') return 'BAD ID'
	db.data[tableName].push(row)
	let apiObject = {table:tableName,action:'a',row:row}
	api.sendWebRequest('post', apiObject, db.load)
}


db.delete = function dbDelete(tablename, row) {
	let tables = db.data
	if (tables[tablename] == null || tables[tablename] == undefined) return 'NO SUCH TABLE'
	for (row_i in tables[tablename]) {
		if (isNaN(row_i)) continue
		for (field_i in tables[tablename][row_i]) {
			if (row[field_i]) {
				db.data[tablename].splice(row_i, 1)
			}
		}
	}
	let apiObject = {table: tablename, action:'d', row: row}
	api.sendWebRequest('delete', apiObject, db.load)
}


db.update = function dbUpdate(tableName, row) {
	let tables = db.data
	if (tables[tableName] == null || tables[tableName] == undefined) return 1
	let oldDbRow = null
	// Match Rows //
	for (rows_i in tables[tableName]) {
		if (isNaN(rows_i)) continue
		let dbrow = tables[tableName][rows_i]
		if (dbrow == undefined) continue
		oldDbRow = dbrow
		if (row.id != dbrow.id) continue
		row.date_modified = new Date()
/*
		// Match Fields //
		for (dbfield_i in dbrow) {
			let dbfield = dbrow[dbfield_i]
			let field = row[dbfield_i]
console.log(dbfield_i, dbfield,field)
			if (dbfield == field) {console.log(field+' fieldsSame,skip'); continue}
			if (dbfield != field) {console.log(field+' fieldsDiff')}
		
		}
*/
		dbrow = row
		db.data[tableName] = row
		api.sendWebRequest('post',{table:tableName,action:'u',row:row}, db.load)
	}
	return true
}


db.load = function dbLoad() {
	let ndb = {}
	let cb = (res, target)=> {
		console.log(res.toString())
		ndb[target] = JSON.parse(res.toString())
		db.data = ndb
		searchListToDbSet(db)
	}
	api.webRequestGet('tickets', cb)
	api.webRequestGet('steps', cb)
	api.webRequestGet('contacts', cb)
}



searchListToDbSet(db)
db.load()
