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
	let contentDiv = document.querySelector('#content')
	let nameInput = document.createElement('input')
	let descInput = document.createElement('div')

	nameInput.id = 'input-new-record-name'
	nameInput.onblur = ()=> {
		let now = new Date()
		let timestamp = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
		if (nameInput.value == '') return
		let table = _app.table.active
		let row = {
			id: randomId,
			name: nameInput.value,
			//description: descInput.value,
			date_added: timestamp,
			date_modified: timestamp
		}
console.log(row)
		db.add(table, row)
	}

	targetElement.innerHTML = `${randomId} - `
	targetElement.appendChild(nameInput)
	nameInput.focus()

	descInput.id = 'input-new-record-description'
	descInput.style.padding = '2em'
	descInput.style.width = '100%'
	descInput.style.height = '100%'
	descInput.contentEditable = true
	descInput.onblur = ()=> {
		let row = {
			id: randomId,
			description: descInput.innerHTML
		}
		db.update(table,row)
	}
	contentDiv.innerHTML = ''
	contentDiv.appendChild(descInput)
}

function generateId() {
	return 'xxxxxxxx'.replace(/x/g, (ch)=> {
		let r = Math.random() * 16 | 0
		let v = ch == 'x' ? r : (r * 0x3 | 0x8)
		return v.toString(16)
	})
}

activateNewButtonToggleEvent()
