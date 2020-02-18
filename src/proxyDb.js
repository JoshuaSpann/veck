let db = {
 tickets: [
  {
   id: '146ad8f3',
   name: 'Surface Pro [MS202T] Login Error Box',
   completed: false,
   description: 'Regardless of login account, an error message box pops up',
   date_added: '2020-02-17 09:38:00',
   date_completed: null,
   contacts: ['jspann@siue.edu'],
   steps: [{completed:false,name:'Contact ITS'}]
  },
  {
   id: '1634b88f',
   name: 'Noisy Monitor Signal [838801]',
   completed: true,
   description: 'Monitor ECG Leads are noisy-distorted like they are greatly ampliefied or the "patient" is moving around a lot.',
   date_added: '2020-02-17 10:10:10',
   date_completed: '2020-02-17 10:10:10',
   contacts: ['hsenald@siue.edu','jspann@siue.edu'],
   steps: [{completed: true,name:'Check lead connections'},{completed:true,name:'Screw/Tighten lead plates on manikin'}]
  },
 ],
 items: [
 
 ]
}
db.update = function dbUpdate(tableName, row) {
	if (db[tableName] == null || db[tableName] == undefined) return 1
	let oldDbRow = null
	// Match Rows //
	for (rows_i in db[tableName]) {
		let dbrow = db[tableName][rows_i]
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
		api.sendWebRequest('post',{table:tableName,action:'u',row:row})
	}
	return true
}
searchListToDbSet(db)
