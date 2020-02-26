(()=>{

	function activateMenuButtonToggleEvent () {
		let menuButton = document.querySelector('.menu.main')
		let aside = document.querySelector('aside')
		let content = document.querySelector('#content')

		menuButton.onclick = ()=> {
			if (_app.config.showmenu == true) {
				aside.classList.remove('hide')
				content.classList.add('contract')
			} else {
				aside.classList.add('hide')
				content.classList.remove('contract')
			}
			_app.config.showmenu = !_app.config.showmenu
		}
		menuButton.click()
	}

	function setAllYearsToCurrentYear() {
		let yearSelectors = document.querySelectorAll('.current-year')
		for (let yearSelector_i in yearSelectors) {
			if (isNaN(yearSelector_i)) continue
			let yearSelector = yearSelectors[yearSelector_i]
			yearSelector.innerHTML = (new Date()).getFullYear();
		}
	}

	activateMenuButtonToggleEvent()
	setAllYearsToCurrentYear()
})()

function appTitleSet(value=_app.title) {
	let pageDetailElems = document.querySelectorAll('.page-detail')
	for (let e_i in pageDetailElems) {
		if (isNaN(e_i)) continue
		let e = pageDetailElems[e_i]
		e.innerHTML = ''
		if (value.id && value.name) {
			let idSpan = document.createElement('span')
			idSpan.innerText = value.id
			e.appendChild(idSpan)

			e.innerHTML += ' - '

			let nameField = document.createElement('input')
			nameField.value = value.name
			nameField.onblur = ()=> {
				value.name = nameField.value
				db.update('tickets', value)
			}
			e.appendChild(nameField)
		}
		else e.innerText = value
	}
	_app.title = value
}

	appTitleSet()
