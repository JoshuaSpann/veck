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
			db.update('steps', step)
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
