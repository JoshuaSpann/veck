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
db.update = function dbUpdate(tableName, row) {
	let tables = db.data
	if (tables[tableName] == null || tables[tableName] == undefined) return 1
	let oldDbRow = null
	// Match Rows //
	for (rows_i in tables[tableName]) {
		let dbrow = tables[tableName][rows_i]
		oldDbRow = dbrow
		if (row.id != dbrow.id) continue
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
		api.sendWebRequest('post',{table:tableName,action:'u',row:row}, db.load())
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
