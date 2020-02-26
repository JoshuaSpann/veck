(()=> {

function searchEvent() {
	let searchText = document.querySelector('input[type="search"]').value
	let container = document.querySelector('aside')
	let fields = container.querySelectorAll('li')
	for (let fields_i in fields) {
		if (isNaN(fields_i) || fields_i <=0) continue
		let field = fields[fields_i]
		if (!field.innerText.toLowerCase().includes(searchText.toLowerCase())) {
			field.classList.add('hidden')
		} else {
			field.classList.remove('hidden')
		}
	}
}

function addSearchFunctionality() {
	let searchBox = document.querySelector('input[type="search"]')
	//let searchButton = document.querySelector('.searchButton')
	let searchClearButton = document.querySelector('.searchClearButton')
	//searchButton.onclick = searchEvent
	searchBox.oninput = searchEvent
	searchClearButton.onclick = ()=> { searchBox.value = ''; searchEvent(); appTitleSet() }
}

function setSearchLinkClickEvents() {
	let searchList = document.querySelector('ul.search')
	let searchListItems = searchList.querySelectorAll('li')
	for (list_i in searchListItems) {
		if (isNaN(list_i) || list_i == 0) continue
		let li = searchListItems[list_i]
		li.onclick = ()=> {
			appTitleSet(li.innerText)
		}
	}
}

addSearchFunctionality()
setSearchLinkClickEvents()
})()
function searchListToDbSet(db) {
	let searchList = document.querySelector('ul.search')
	let searchListItems = searchList.querySelectorAll('li')
	for (list_i in searchListItems) {
		if (isNaN(list_i) || list_i == 0) continue
		searchList.removeChild(searchListItems[list_i])
	}
	for (tickets_i in db.data.tickets) {
		let ticket = db.data.tickets[tickets_i]
		if (ticket.completed == null) {
			ticket.completed = false
		}
		let completedBox = ui.fields.completed(ticket.id)
		completedBox.checked = ticket.completed
		let delBtn = ui.buttons.delete()
		delBtn.onclick = ()=> {
			db.delete('steps', {ticketid: ticket.id})
			db.delete('tickets', {id: ticket.id})
		}
		let li = document.createElement('li')
		
		li.innerText = `#${ticket.id} - ${ticket.name}`
		li.appendChild(completedBox)
		li.appendChild(delBtn)
		li.onclick = ()=> {
			appTitleSet(li.innerText)
			appTitleSet(ticket)
			_app.config.action = 'edit'
			document.querySelector('.action.new').innerText = 'X'
			ticketLoadToContainer(ticket)
		}
		if (ticket.completed) {
			li.classList.add('completed')
		} else {
			li.classList.remove('completed')
		}
		if (ticket.description == null) ticket.description = ''
		li.setAttribute('title', ticket.description.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,''))
		searchList.appendChild(li)
	}
}

function ticketLoadToContainer(ticket) {
	let contentDiv = document.querySelector('#content')

	let descriptionDiv = ui.fields.description(ticket.id)
	descriptionDiv.innerHTML = ticket.description
/*
	//TODO - Search all hashtags and link to search text on ctrl-click
	let textId = document.createElement('a')
	textId.innerText = `#${ticket.id}`
	textId.onclick = ()=> {
		let searchBox = document.querySelector('input[type="search"]')
		searchBox.value = textId.innerText
	}
*/
	let stepsDiv = document.createElement('div')
	let steps = db.data.steps
	for (steps_i in steps) {
		let step = steps[steps_i]
		if (step.ticketid != ticket.id) continue
		let stepId = `${ticket.id}_steps_${steps_i}`

		// COMPLETED CHECKBOX //
		let completedBox = document.createElement('input')
		completedBox.type='checkbox'
		completedBox.id = stepId
		completedBox.checked = step.completed

		// Click updates DB and applies completed styling //
		completedBox.onclick = ()=> {
			step.completed = completedBox.checked
			db.update('steps', step)
		}

		// LABEL FOR CHECKBOX //
		let completedBoxLabel = document.createElement('label')
		completedBoxLabel.for = stepId
		completedBoxLabel.innerHTML = step.name
		completedBoxLabel.contentEditable = true
		completedBoxLabel.onblur = ()=> {
			step.name = completedBoxLabel.innerText
			if (step.name != '')
				db.update('steps', step)
			if (step.name == '') {
				db.delete('steps', {id: step.id})
				completedBoxLabel.parentNode.remove(completedBoxLabel.parentNode)
			}
		}

		//  <LI> ELEMENT TO CONTAIN STEP //
		let stepLi = document.createElement('li')
		stepLi.appendChild(completedBox)
		stepLi.appendChild(completedBoxLabel)
		stepLi.classList.add('ticket-step')
		stepsDiv.appendChild(stepLi)
	}

	// NEW STEP //
	let newStepLi = document.createElement('li')
	newStepLi.innerHTML = '<b>+</b>'
		//TODO-THIS IS IN API PHP HANDLED BY DB AUTO REMOVE FIELD
	let nextIndexId = db.data.steps[db.data.steps.length-1].id+2
	let newStepCheckbox = ui.fields.step()
	let newStepCheckboxId = ticket.id+'_'+nextIndexId
	newStepCheckbox.id = newStepCheckboxId
	let newStepLabel = ui.fields.stepname(nextIndexId)
	newStepLabel.for = newStepCheckboxId
	newStepLabel.onblur = ()=> {
		let newStepRecord = {
			id: nextIndexId,
			ticketid: ticket.id,
			name: newStepLabel.value
		}
		if (newStepLabel.value == '') return
		db.add('steps', newStepRecord)
		ticketLoadToContainer(ticket)
	}
	newStepCheckbox.onclick = ()=> {
		let newStepRecord = {
			id: db.data.steps.length,
			ticketid: ticket.id,
			name: newStepLabel.value
		}
		db.add('steps', newStepRecord )
	}
	newStepLi.appendChild(newStepCheckbox)
	newStepLi.appendChild(newStepLabel)
	stepsDiv.appendChild(newStepLi)

	contentDiv.innerHTML = ''
	contentDiv.appendChild(descriptionDiv)
	contentDiv.appendChild(stepsDiv)
}
