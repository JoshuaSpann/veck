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
	for (tickets_i in db.tickets) {
		let ticket = db.tickets[tickets_i]
		console.log(ticket)
		let li = document.createElement('li')
		li.innerText = `#${ticket.id} - ${ticket.name}`
		li.onclick = ()=> {
			appTitleSet(li.innerText)
			ticketLoadToContainer(ticket)
		}
		searchList.appendChild(li)
	}
}
function ticketLoadToContainer(ticket) {
	let contentDiv = document.querySelector('#content')

	let descriptionDiv = document.createElement('div')
	descriptionDiv.innerHTML = ticket.description
	descriptionDiv.contentEditable = true
	descriptionDiv.classList.add('ticket-description')

	let stepsDiv = document.createElement('div')

	for (steps_i in ticket.steps) {
		let step = ticket.steps[steps_i]
		let stepId = `${ticket.id}_steps_${steps_i}`

		// COMPLETED CHECKBOX //
		let completedBox = document.createElement('input')
		completedBox.type='checkbox'
		completedBox.id = stepId
		completedBox.checked = step.completed

		// Click updates DB and applies completed styling //
		completedBox.onclick = ()=> {
			ticket.steps[steps_i].completed = completedBox.checked
			db.update('tickets', ticket)
		}

		// LABEL FOR CHECKBOX //
		let completedBoxLabel = document.createElement('label')
		completedBoxLabel.for = stepId
		completedBoxLabel.innerHTML = step.name
		completedBoxLabel.contentEditable = true
		completedBoxLabel.onblur = ()=> {
			ticket.steps[steps_i].name = completedBoxLabel.innerText
			db.update('tickets', ticket)
		}

		//  <LI> ELEMENT TO CONTAIN STEP //
		let stepLi = document.createElement('li')
		stepLi.appendChild(completedBox)
		stepLi.appendChild(completedBoxLabel)
		stepLi.classList.add('ticket-step')
		stepsDiv.appendChild(stepLi)
	}

	contentDiv.innerHTML = ''
	contentDiv.appendChild(descriptionDiv)
	contentDiv.appendChild(stepsDiv)
}
