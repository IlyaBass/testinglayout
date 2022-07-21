let game = document.querySelector('.game');
let farmBg = document.querySelector('.farm__bg');
let farmBuilding = document.querySelector('.farm__building');
let gameBgSize = 175;
let farmBgSize = 100;
let farmBuildingSize = 0.5;

if (window.matchMedia("(min-width: 1440px)").matches) {
	farmBuildingSize = 1.1;
}

window.onwheel = function (e) {
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
