(longcat => {
	var cat = document.querySelector(".longcat"),
		catHeight = cat.offsetHeight,
		achievBanner = document.querySelector(".achiev-banner"),
		achievName = document.querySelector(".achiev-name span"),
		achievReq = document.querySelector(".achiev-req"),
		achievEarnClass = "achiev-earned",
		lengthCt = document.querySelector(".count"),
		barrier = document.querySelector('.barrier'),
		numberF = new Intl.NumberFormat("en-US"),
		achievements = [
			{name: "Looooong", pts: 1000},
			{name: "Loooooooooong", pts: 2000},
			{name: "Looooooooooooooong", pts: 5000},
			{name: "Leviacat", pts: 10000},
			{name: "Catzilla", pts: 15000},
			{name: "Pierce the Clouds", pts: 20000},
			{name: "Catch the White Dots", pts: 25000},
			{name: "Catch Poptart Cats", pts: 30000},
			{name: "Felinity and Beyond!", pts: 99999}
		],
		observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0
		},
		observer = new IntersectionObserver((entries,observer) => { 
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// increase cat length
					let catGrowAmount = entry.boundingClientRect.height;
					catHeight += catGrowAmount;
					lengthCt.innerHTML = catHeight;
					cat.style.height = catHeight + "px";
					// check if achievement reached
					for (let a of achievements) {
						if (catHeight >= a.pts && catHeight <= a.pts + catGrowAmount) {
							achievBanner.classList.add(achievEarnClass);
							setTimeout(() => {
								achievBanner.classList.remove(achievEarnClass);
							},4e3);
							achievName.innerHTML = a.name;
							achievReq.innerHTML = "Reached " + numberF.format(a.pts) + "px";
						}
					}
					window.scrollBy({
						top: -catGrowAmount,
						left: 0
					});
				}
			});
		}, observerOptions);
	
	observer.observe(barrier);
	// initial height
	lengthCt.innerHTML = catHeight;
})();