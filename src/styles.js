(()=>{

	function activateMenuButtonToggleEvent () {
		let menuButton = document.querySelector('.menu.main')
		let aside = document.querySelector('aside')
		let content = document.querySelector('#content')

		menuButton.onclick = ()=> {
			if (aside.classList.contains('hide')) {
				aside.classList.remove('hide')
				content.classList.add('contract')
			} else {
				aside.classList.add('hide')
				content.classList.remove('contract')
			}
		}
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

function appTitleSet(value='Tickets') {
	let pageDetailElems = document.querySelectorAll('.page-detail')
	for (let e_i in pageDetailElems) {
		if (isNaN(e_i)) continue
		let e = pageDetailElems[e_i]
		e.innerText = value
	}
}

	appTitleSet()
