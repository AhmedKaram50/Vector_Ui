export function countriesData (countries, countryBox, regionBox, countryName = "Egypt", callBack) {
    regionBox.empty()
    countryBox.empty()
    countries.forEach(country => {
        if (country.countryName == countryName) {
            countryBox.append(`<option selected>${country.countryName}</option>`)
            country.regions.forEach(region => {
                regionBox.append(`<option value="${region.name}">${region.name}</option>`)
            })
        } else countryBox.append(`<option>${country.countryName}</option>`)
    })
   
    const handleRec = (e) => {
        countriesData (countries, countryBox, regionBox, e.target.value, callBack)
        countryBox[0].removeEventListener('change', handleRec)
		if (callBack) callBack(e)
    }
    countryBox[0].addEventListener('change', handleRec)
}


export function showMessage (message, isFail = false) {
	if (isFail) {
	   const allertBody = `
			<div class="alert-message fail">
					<i class="fas fa-exclamation"></i> 
				    <p>${message}</p>
			</div>
		`
		document.body.insertAdjacentHTML("afterbegin", allertBody)
		window.scroll({top: 100, behavior: 'smooth'})
	} else {
		const allertBody = `
			<div class="alert-message success">
					<i class="fas fa-check"></i> 
				    <p>${message}</p>
			</div>
		`
		document.body.insertAdjacentHTML("afterbegin", allertBody)
		window.scroll({top: 100, behavior: 'smooth'})
	}
}