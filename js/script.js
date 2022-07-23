// приближение и отдаление
let game = document.querySelector('.game');
let farmBg = document.querySelector('.farm__bg');
let farmBuilding = document.querySelector('.farm__building');
let gameBgSize = 175;
let farmBgSize = 100;
let farmBuildingSize = 0.5;

if (window.matchMedia("(min-width: 1440px)").matches) {
	farmBuildingSize = 1.1;
	farmBuilding.style.transform = 'translate(-50%, -50%) scale(' + farmBuildingSize + ')';
}

window.onwheel = function (e) {
	if (isPopupOpen) {
		return;
	}
	if (e.deltaY < 0) {
		if (farmBgSize <= 155) {
			if (window.matchMedia("(min-width: 1440px)").matches) {
				farmBuildingSize += 0.08;
			} else {
				farmBuildingSize += 0.04;
			}
			gameBgSize += 8;
			farmBgSize += 8;
			farmBuilding.style.transform = 'translate(-50%, -50%) scale(' + farmBuildingSize + ')';
			game.style.backgroundSize = gameBgSize + '%';
			farmBg.style.backgroundSize = farmBgSize + '%';
		}
	} else {
		if (farmBgSize >= 50) {
			if (window.matchMedia("(min-width: 1440px)").matches) {
				farmBuildingSize -= 0.08;
			} else {
				farmBuildingSize -= 0.04;
			}
			gameBgSize -= 8;
			farmBgSize -= 8;
			farmBuilding.style.transform = 'translate(-50%, -50%) scale(' + farmBuildingSize + ')';
			game.style.backgroundSize = gameBgSize + '%';
			farmBg.style.backgroundSize = farmBgSize + '%';
		}
	}
}

// модальные окна

let isPopupOpen = false;
let popups = [];

popupLogic('.farm__house', '.game__profile', false);
popupLogic('.farm__barn', '.barn', true);
popupLogic('.farm__coop', '.birds', true);
popupLogic('.farm__pigsty', '.animal', true);
popupLogic('.farm__greenhouse', '.seeds', false);

function popupLogic(clickedObject, popup, isTabed) {
	popups.push(popup);
	let popupSelector = document.querySelector(popup);
	let popupSelectorTabs = popupSelector.querySelectorAll('.plashka-tab');
	let plashkaItems = popupSelector.querySelectorAll('.plashka-items');
	document.querySelector(clickedObject).onclick = function() {
		if (!isPopupOpen) {
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
	}
}

// работа крестиков попапов
let crosses = document.querySelectorAll('.plashka-cross');

for(let i = 0; i<crosses.length; i++) {
	crosses[i].onclick = function() {
		for(let i = 0; i<popups.length; i++) {
			document.querySelector(popups[i]).classList.add('invisible');
		}
		isPopupOpen = false
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
