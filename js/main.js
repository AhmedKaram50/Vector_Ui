function countriesData (countryBox, regionBox, countryName = "Egypt") {
    fetch("https://cdn.lexmodo.com/1/b7a39ac257a2a4ea1ef4f07bb50937801/json/countries_16hxYjuL12fZ.json").then(result => result.json())
    .then(countries => {
        countries.forEach(country => {
            if (country.countryName == countryName) {
                countryBox.append(`<option selected>${country.countryName}</option>`)
                regionBox.empty()
                country.regions.forEach(region => {
                    regionBox.append(`<option value="${region.name}">${region.name}</option>`)
                })
            } else countryBox.append(`<option>${country.countryName}</option>`)
            
        })
    }).then(() => countryBox.change((e) => countriesData(countryBox, regionBox, e.target.value)))
}