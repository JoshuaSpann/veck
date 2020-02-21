let ui = {
	fields:{}
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
