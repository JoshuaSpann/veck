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
	}
}

activateNewButtonToggleEvent()
