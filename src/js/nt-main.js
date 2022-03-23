function countriesData (url, countryBox, regionBox, countryName = "Egypt", callBack) {
    fetch(url).then(result => result.json())
    .then(countries => {
        countries.forEach(country => {
            if (country.countryName == countryName) {
                countryBox.append(`<option selected>${country.countryName}</option>`)
                regionBox.empty()
                country.regions.forEach(region => {
                    regionBox.append(`<option value="${region.name}">${region.name}</option>`)
                })
            } else countryBox.append(`<option>${country.countryName}</option>`)
            return countries
        })
    }).then(() => callBack())
}