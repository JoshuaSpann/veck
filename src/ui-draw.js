let ui = {
	buttons:{},
	fields:{}
}

ui.filterHtml = function filterHtml(text) {
	return text.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,'')
}

ui.buttons.delete = function deleteButton() {
	let deleteButton = document.createElement('button')
	//deleteButton.innerHTML = '🗑'
	//deleteButton.innerHTML = 'x'
	deleteButton.classList.add('delete')
	deleteButton.onclick = ()=> {
		//db.delete(tablename, itemid)
	}
	return deleteButton
}

ui.fields.checkbox = function checkboxField(ticketid) {
	let completedBox = document.createElement('input')
	completedBox.type = 'checkbox'
	completedBox.onclick = ()=> {
		db.update(_app.table.active, {id: ticketid, completed: completedBox.checked})
	}
	return completedBox
}

ui.fields.description = function descriptionField(ticketid) {
	let descInput = document.createElement('div')
	descInput.id = 'input-new-record-description'
	descInput.classList.add('ticket-description')
	descInput.contentEditable = true
	descInput.onblur = ()=> {
		eventUpdateDesc(ticketid, descInput.innerHTML)
	}
	return descInput
}
