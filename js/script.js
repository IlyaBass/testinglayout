// панзум

const farm = document.getElementById('farm')

const panzoom = Panzoom(farm, {
	maxScale: 2,
	contain: 'outside',
	cursor: 'default',
	noBind: true
});

panzoom.zoom(1.3, {animate: true})
setTimeout(() => panzoom.pan(0, 0), 50)

farm.addEventListener('wheel', (e) => {
	if (isPopupOpen || isAdditionalPopupOpen) {
		return;
	} else {
		panzoom.zoomWithWheel(e)
	}
})

let isMoved = false

document.addEventListener('pointerdown', (e) => {
	if (isPopupOpen || isAdditionalPopupOpen) {
		return;
	} else {
		panzoom.handleDown(e)
		isMoved = true
	}
})
document.addEventListener('pointermove', (e) => {
	if (isPopupOpen || isAdditionalPopupOpen) {
		return;
	} else {
		panzoom.handleMove(e)
		isMoved = true
	}
})
document.addEventListener('pointerup', (e) => {
	if (isPopupOpen || isAdditionalPopupOpen) {
		return;
	} else {
		panzoom.handleUp(e)
		isMoved = false
	}
})

// модальные окна

let isPopupOpen = false;
let isAdditionalPopupOpen = false;
let popups = [];
let additionalPopups = [];

popupLogic('.farm__house', '.game__profile', false);
popupLogic('.farm__barn', '.barn', true);
popupLogic('.farm__coop', '.birds', true);
popupLogic('.farm__pigsty', '.animal', true);
popupLogic('.farm__greenhouse', '.seeds', false);

additionalPopupLogic('.plashka-slaughter-btn', '.slaughter');
additionalPopupLogic('.animal__under-btn', '.buy');
additionalPopupLogic('.farm__garden-item', '.speed');
additionalPopupLogic('.barn__item', '.info');

function additionalPopupLogic(clickedObject, popup) {
	additionalPopups.push(popup);
	let popupSelector = document.querySelector(popup);
	let clickedObjects = document.querySelectorAll(clickedObject);
	let additionalPopupsHtml = document.querySelectorAll('.additional-plashka');
	for(let i = 0; i<clickedObjects.length; i++) {
		clickedObjects[i].onclick = function() {
			setTimeout(function() {
				if (!isMoved) {
					for(let l = 0; l<additionalPopupsHtml.length; l++) {
						additionalPopupsHtml[l].classList.add('invisible');
					}
					popupSelector.classList.remove('invisible');
					isAdditionalPopupOpen = true;
					slaughterPlashkaValue = 0;
					slaughterPlashkaNumber.innerHTML = slaughterPlashkaValue;
				}
			}, 50)
		}
	}
}

function popupLogic(clickedObject, popup, isTabed) {
	popups.push(popup);
	let popupSelector = document.querySelector(popup);
	let popupSelectorTabs = popupSelector.querySelectorAll('.plashka-tab');
	let plashkaItems = popupSelector.querySelectorAll('.plashka-items');
	document.querySelector(clickedObject).onclick = function() {
		setTimeout(function() {
			if (!isPopupOpen && !isMoved) {
				if (isTabed) {
					for (var i = 0; i < popupSelectorTabs.length; i++) {
						popupSelectorTabs[i].classList.remove('active');
					}
					popupSelectorTabs[0].classList.add('active');
					for(let i = 0; i < plashkaItems.length; i++) {
						if (i == 0) {
							plashkaItems[i].classList.remove('invisible');
						} else {
							plashkaItems[i].classList.add('invisible');
						}
					}
				}
				popupSelector.classList.remove('invisible');
				isPopupOpen = true;
			}
		}, 50)
	}
}

// работа крестиков попапов
let crosses = document.querySelectorAll('.plashka-cross');
let additionalCrosses = document.querySelectorAll('.additional-plashka-cross');

for(let i = 0; i<crosses.length; i++) {
	crosses[i].onclick = function() {
		
		for(let i = 0; i<popups.length; i++) {
			document.querySelector(popups[i]).classList.add('invisible');
		}
		isPopupOpen = false

		for(let k = 0; k<additionalPopups.length; k++) {
			document.querySelector(additionalPopups[k]).classList.add('invisible');
		}
		isAdditionalPopupOpen = false;
		slaughterPlashkaValue = 0;
		slaughterPlashkaNumber.innerHTML = slaughterPlashkaValue;
	}
}

for(let i = 0; i<additionalCrosses.length; i++) {
	additionalCrosses[i].onclick = function() {
		for(let l = 0; l<additionalPopups.length; l++) {
			document.querySelector(additionalPopups[l]).classList.add('invisible');
		}
		isAdditionalPopupOpen = false
		slaughterPlashkaValue = 0;
		slaughterPlashkaNumber.innerHTML = slaughterPlashkaValue;
	}
}

// табы

let plashkasWithTabs = ['.barn', '.birds', '.animal'];

for(let p = 0; p<plashkasWithTabs.length; p++) {
	let tabs = document.querySelector(plashkasWithTabs[p]).querySelectorAll('.plashka-tab');
	for(let i = 0; i<tabs.length; i++) {
		tabs[i].onclick = function() {
			for(let l = 0; l<tabs.length; l++) {
				tabs[l].classList.remove('active');
			}
			this.classList.add('active');

			let plashkaItems = this.parentNode.nextSibling.nextSibling
									.querySelectorAll('.plashka-items');
			for(let k = 0; k<plashkaItems.length; k++) {
				plashkaItems[k].classList.add('invisible')
			}
			if (i < plashkaItems.length) {
				plashkaItems[i].classList.remove('invisible');
			}
		}
	}
}

// плашка отдать на убой

let slaughterMinus = document.querySelector('#slaughter-minus');
let slaughterPlus = document.querySelector('#slaughter-plus');
let slaughterPlashkaNumber = document.querySelector('.slaughter__inner-number');

let slaughterPlashkaValue = 0;
slaughterPlashkaNumber.innerHTML = slaughterPlashkaValue;

slaughterMinus.onclick = function() {
	if (slaughterPlashkaValue > 0) {
		slaughterPlashkaValue -= 1;
		slaughterPlashkaNumber.innerHTML = slaughterPlashkaValue;
	}
}

slaughterPlus.onclick = function() {
	slaughterPlashkaValue += 1;
	slaughterPlashkaNumber.innerHTML = slaughterPlashkaValue;
}

// расстояние подсказок от левого края

let promptsHover = document.querySelectorAll('.prompt-hover');

for(let i = 0; i<promptsHover.length; i++) {
	promptsHover[i].onmouseover = function() {
		this.querySelector('.prompt-text').style.left = this.offsetWidth + 10 + 'px';
	}
}
