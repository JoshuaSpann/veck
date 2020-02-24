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

ui.fields.completed = function completedField(ticketid) {
	let completedBox = ui.fields.checkbox()
	completedBox.onclick = ()=>{
		//if (completedBox.classList.contains('completed'))
		db.update(_app.table.active, {id: ticketid, completed: completedBox.checked})
	}
	return completedBox
}
ui.fields.step = function stepsField(stepid) {
	let table = 'steps'
	let step = ui.fields.checkbox()
	step.onclick = ()=>{
		db.update('steps', {id: stepid, completed: step.checked})
	}
	return step
}
ui.fields.stepname = function stepnameField() {
	let nameField = document.createElement('input')
	nameField.width = '10em'
	return nameField

	let completedBoxLabel = document.createElement('label')
	//completedBoxLabel.for = stepId
	//completedBoxLabel.innerHTML = step.name
	completedBoxLabel.contentEditable = true
	completedBoxLabel.style.width = '100%'
	return completedBoxLabel
}
ui.fields.checkbox = function checkBoxField(callback) {
	let checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	if (callback) checkbox.onclick = callback
	return checkbox
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
