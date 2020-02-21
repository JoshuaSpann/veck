function activateNewButtonToggleEvent () {
	let newButton = document.querySelector('.action.new')
	let content = document.querySelector('#content')

	newButton.onclick = ()=> {
		content.innerHTML = ''
		if (_app.config.action == null) {
			newButton.innerText = 'X'
			_app.config.action = 'add'
		}
		else {
			newButton.innerText = '+'
			_app.config.action =null
		}
		changeTitleBar()
	}
}

function changeTitleBar() {
	let titleBarHeader = document.querySelector('header .page-detail')
	if (_app.config.action == 'add') {
		addNewRecordEvent(titleBarHeader)
	}
	else {
		titleBarHeader.innerHTML = _app.title
		_app.config.action = null
	}
}

function addNewRecordEvent(targetElement) {
	let randomId = generateId()
	let table = _app.table.active
	let contentDiv = document.querySelector('#content')
	let nameInput = document.createElement('input')

	nameInput.id = 'input-new-record-name'
	nameInput.onblur = ()=> {
		let now = new Date()
		let timestamp = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
		if (nameInput.value == '') return
		let row = {
			id: randomId,
			name: nameInput.value,
			//description: descInput.value,
			date_added: timestamp,
			date_modified: timestamp
		}
console.log(row)
		db.add(table, row)
		document.querySelector('.action.new').click()
	}

	targetElement.innerHTML = `${randomId} - `
	targetElement.appendChild(nameInput)
	nameInput.focus()

	let descInput = ui.fields.description(randomId)
	//contentDiv.innerHTML = ''
	//contentDiv.appendChild(descInput)
}

function eventUpdateDesc(ticketid, descvalue) {
	let row = {
		id: ticketid,
		description: descvalue
	}
	db.update(_app.table.active, row)
}

function generateId() {
	return 'xxxxxxxx'.replace(/x/g, (ch)=> {
		let r = Math.random() * 16 | 0
		let v = ch == 'x' ? r : (r * 0x3 | 0x8)
		return v.toString(16)
	})
}

activateNewButtonToggleEvent()
