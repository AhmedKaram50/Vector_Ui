import {countriesData2, toFormData, convertToDom, mergeFormData} from './nt-main.js';
import {$2, VectorElementCollection} from './helpers.js';
import {showMessage} from './messages.js';
import {VectorMVVM} from './vector/vector-mvvm.js';

class Cart {
	constructor () {
	}

	deleteProduct (e) {
		let clickedDelete = e.target.getAttribute("id").split("_")[1]
		console.log(clickedDelete)
		const data = new URLSearchParams();
		for (const pair of new FormData(document.getElementById("cartForm"))) {
			if (pair[0] == `CartAdd[${clickedDelete}].CartAddVariantAddQty`) {
				data.append(pair[0], 0);
			}
			data.append(pair[0], pair[1]);
		}
		fetch("/cart?dom=true", {
			method: "POST",
			body: data,
		})
		.then(() => {
			trigger();
			if (window.location.href[window.location.href.length - 1] == '/') window.location.href = window.location.href.substr(0, window.location.href.length - 1)
			else window.location.reload()
		})
	}
}
const cart = new Cart()
new VectorMVVM(cart)

// Constants
const country = document.querySelector("#quoteMethod select[name='Shipping.Country']")
const province = document.querySelector("#quoteMethod select[name='Shipping.Province']")
const city = document.querySelector("#quoteMethod input[name='Shipping.City']")
const zipCode = document.querySelector("#quoteMethod input[name='Shipping.PostalCode']")

const proceedToCheckout = document.getElementById("proceed-to-checkout");
// Constants

function handleCountries (country = "United States", province = "Alabama", city = "", zip = "") {
	const countriesSelectBox = document.getElementById("Shipping.Country");
	const regionSelectBox = document.getElementById("regions-select");
	const cityBox = document.getElementById("city");
	const zipBox = document.getElementById("zip");
	fetch("https://cdn.lexmodo.com/1/b7a39ac257a2a4ea1ef4f07bb50937801/json/countries_NVnnuqcTJ.json").then(result => result.json())
	.then(countries => {
		 countriesData2(countries, $2(countriesSelectBox), $2(regionSelectBox), country, (e) => refreshTheCalculationFee())
	}).then(() => refreshTheCalculationFee())

	if (city != "") cityBox.value = city
	if (zip != "") zipBox.value = zip
	
}




const cartDev = document.querySelector("section.cart");
const quantityInputs = document.querySelectorAll(".cart-body input[type=number]")
let arryStatus = [];
/*************cart limit***************/
function cartLimit() {
	//cart 
	arrayData = [];
	for (const key in object) {
		if(key != "authenticity_token"){
			let indexx = key.split("")[8]
			arrayIndex.add(indexx)
		}
	}
	let arrayindex_2 = [...arrayIndex];
	document.getElementById("loading_limit").classList.remove("d-none")

	arrayindex_2.forEach(el => {
		let quantityValue = "";
		quantityValue = document.getElementsByName(`CartAdd[${[el]}].CartAddVariantAddQty`)[0].value;
		let objectDataLimit = {
			product_id : object[`CartAdd[${el}].CartAddProductID`],
			quantity : quantityValue,
			variant_id : object[`CartAdd[${el}].CartAddVariantID`],
			customer_id: customerId,
			store_id: storeId
		};
		arrayData.push(objectDataLimit)

	});
	
	fetch("https://cartlimit.numinix.com/api/CheckCartLimitForAll", {
		   headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
	    },
	    method: "POST",
	    body: JSON.stringify(arrayData)
	}).then(data => {
		return data.json()
	}).then(data => {
			document.querySelectorAll(".loadingx").forEach(el => {
			el.classList.add("d-none")
		})
		arryStatus = []
		if(data.message != "Customer Id is Null"){
			data.forEach(product => {
				arryStatus.push(product.Allow_to_add)
				if(product.Allow_to_add === false){
					document.getElementById(`${product.product_id}`).classList.remove("d-none")
				}
			})
		}
		
	}).then(() => {
		//document.getElementById("ratesHolder").classList.remove("anim2", "loading");
		// arryStatus.forEach(elBoo => {
		// 	console.log(elBoo)
		// 	if(elBoo === false){
		// 		document.getElementById("invoice-footer").classList.add("d-none")
		// 	}else{
		// 		document.getElementById("invoice-footer").classList.remove("d-none")
		// 	}
		// })
		let checker = arr => arr.every(v => v === true)
		if(checker(arryStatus) === true){
			document.getElementById("invoice-footer").classList.remove("disabled");
			let invoice = document.querySelectorAll(".invoice-footer button");
			invoice.forEach(el => {
				el.disabled = false;
				
			})
		}else{
			document.getElementById("invoice-footer").classList.add("disabled");
			let invoice = document.querySelectorAll(".invoice-footer button");
			invoice.forEach(el => {
				el.disabled = true
				
			})
			
		}
		// document.getElementById("ratesHolder").classList.remove("anim2", "loading");
	})
	
}

function trigger () {
	///cheack for cart limit
	
	const cartDev = document.querySelector("section.cart");
	const quantityInputs = document.querySelectorAll(".cart-body input[type=number]")


	
	// Refresh Cart data on Input QTY Change
	quantityInputs.forEach(inpt => {
		inpt.addEventListener("change", () => {
			refreshTheCalculationFee()
			refreshCartInfo(() => trigger())
		})
	})
}
trigger();
let Allow_to_add_cartLimit = true;
// Here is When You Click On Proceed To Checkout Button
// Createing Post Order Functin That Send the shipping form data
function postOrder(callBack) {
	fetch("/order", {
		method: "POST",
		body: toFormData("quoteMethod")
	}).then(() => callBack())
}
proceedToCheckout.addEventListener("click", (e) => {
	e.preventDefault()
	if (isLoaded) {
		// Set Location Info In Local Storage
		const locationData = {
			country: country.value,
			province: province.value,
			city: city.value,
			zipCode: zipCode.value,
			shipping: document.querySelector("input[name='ShippingQuoteRateId[0]']:checked").getAttribute("id")
		}
		localStorage.setItem('orderData', JSON.stringify(locationData))
		
		if ($2(document.querySelector("input[name='ShippingQuoteRateId[0]']:checked")).attr("data-store") != "true") {
			$2(".loading-full").removeClass("d-none")
			postOrder(() => customerId && addresses.length ? window.location.replace("/order") : window.location.replace("/shipping"))
		} else {
			const alert = `<section id="confirmation" class="my-alert visible"><div class="icon"></div><div class="alert-body"><h2 style="margin-top: 0;">Warning</h2><p>Are you sure you wanna pickup in Las Vegas Pop Up?</p></div><div class="actions-holder"><button style="width: 50%;" class="secondary-btn cancel">CANCEL</button><div style="width: 50%;" class="col-md-6"><button id="delete" class="main-btn">CONTINUE</button></div></div></section>`
			$2(document.body).append(alert)
			$2("#confirmation").popUp(400)
			$2("#delete").click(() => {
				$2(".loading-full").removeClass("d-none")
				postOrder(() => customerId && addresses.length ? window.location.replace("/order") : window.location.replace("/shipping"))
				$2("#confirmation").popOut(200)
			})
			$2("#confirmation .cancel").click(() => $2("#confirmation").popOut(200))
		} 
		
		
		
	} else showMessage("Please Select The Shipping Method", true)

})



const countriesSelectBox = document.getElementById("Shipping.Country");
const regionSelectBox = document.getElementById("regions-select");


let index

$2(".chose-address span").click(() => {
	$2(".popup-list").popUp(300)
	$2(".popup-list ul li").click((e) => {
		if (e.target.matches(".popup-list li")) index = $2(e.target).attr("id").split("_")[1]
		else if (e.target.matches(".popup-list li span")) index = $2(e.target.parentElement).attr("id").split("_")[1]
		$2(".popup-list").popOut(300)
		
		const Fdata = new URLSearchParams();
		const defaultAddress = addresses[index]
		
		Fdata.append("Shipping.Country", defaultAddress.country)
		Fdata.append("Shipping.Province", defaultAddress.province)
		Fdata.append("Shipping.City", defaultAddress.city)
		Fdata.append("Shipping.PostalCode", defaultAddress.zip)
		Fdata.append("Shipping.Address1", defaultAddress.address1)
		Fdata.append("Shipping.Address2", defaultAddress.address2)
		Fdata.append("Shipping.PhoneNumber", defaultAddress.phoneNumber)
		
		refreshTheCalculationFee(Fdata)

		handleCountries(Fdata.get("Shipping.Country"), Fdata.get("Shipping.Province"), Fdata.get("Shipping.City"), Fdata.get("Shipping.PostalCode"))

		$2(".chose-address h3")[0].innerHTML = ""
		$2(".chose-address h3").append(`Ship to : ${defaultAddress.country}, ${defaultAddress.province}, ${defaultAddress.city}`)
		
	})
})

// Close Popup list
// $2(document.body).click((e) => {
// 	if ($2(".popup-list").getCssProperty("transform") == "matrix(1, 0, 0, 1, 0, 0)" && !e.target.matches(".popup-list")) {
// 		$2(".popup-list").popOut(100)
// 	}
// })

// This (GET) Request Because We Want The Authintication_Token from shipping Page
let isLoaded = false;
const Fdata = new URLSearchParams();
const Ndata = new URLSearchParams();
const dFormData = Fdata
let defaultAddress
if (addresses.length) {
	defaultAddress = addresses.filter(ad => ad.isDefault)[0]
	Fdata.append("Shipping.Country", defaultAddress.country)
	Fdata.append("Shipping.Province", defaultAddress.province)
	Fdata.append("Shipping.City", defaultAddress.city)
	Fdata.append("Shipping.PostalCode", defaultAddress.zip)
	Fdata.append("Shipping.Address1", defaultAddress.address1)
	Fdata.append("Shipping.Address2", defaultAddress.address2)
	Fdata.append("Shipping.PhoneNumber", defaultAddress.phoneNumber)
	handleCountries(Fdata.get("Shipping.Country"), Fdata.get("Shipping.Province"), Fdata.get("Shipping.City"), Fdata.get("Shipping.PostalCode"))
} else {
	handleCountries("United States")
}


function refreshTheCalculationFee(Fdata = dFormData) {
	document.getElementById("ratesHolder").classList.add("anim2", "loading")
	
	fetch("/shipping")
	.then((result) => result.text())
	.then((data) => {
		// const Fdata = new URLSearchParams();
		const parser = new DOMParser();
		const xmlDom = parser.parseFromString(data, "text/html");
		const shippingForm = xmlDom.getElementById("shippingForm");
		const shippingFormData = new FormData(shippingForm);
		const authinticityToken =  shippingForm.querySelector("input[name='authenticity_token']").value

		// for (let pair of shippingFormData) {
		// 	if (pair[0] != "Shipping.Country" 
		// 		&& pair[0] != "Shipping.Province" 
		// 		&& pair[0] != "Shipping.City" 
		// 		&& pair[0] != "Shipping.PostalCode"){ 
		// 		Fdata.append(pair[0], pair[1]);
		// 	}
		// 	console.log(pair[0])
		// }

		
		// Send Cart Country and zip code data with static way
		const country = document.querySelector("#quoteMethod select[name='Shipping.Country']")
		const province = document.querySelector("#quoteMethod select[name='Shipping.Province']")
		const city = document.querySelector("#quoteMethod input[name='Shipping.City']").value || "Omaha"
		const zipCode = document.querySelector("#quoteMethod input[name='Shipping.PostalCode']").value || 68104

		
        /*============================================= Here ================================================================*/
		let sendFormData
		if (defaultAddress) {
			Fdata.append("authenticity_token", authinticityToken)
			Fdata.append("Shipping.FirstName", defaultAddress.firstName)
			Fdata.append("Shipping.LastName", defaultAddress.lastName)
			sendFormData = Fdata
		} else {
			Ndata.append("authenticity_token", authinticityToken)
			Ndata.append("Shipping.FirstName", "Ahmed")
			Ndata.append("Shipping.LastName", "Karam")
			Ndata.append("Shipping.Country", document.querySelector("#quoteMethod select[name='Shipping.Country']").value)
			Ndata.append("Shipping.Province", document.querySelector("#quoteMethod select[name='Shipping.Province']").value)
			Ndata.append("Shipping.City", document.querySelector("#quoteMethod input[name='Shipping.City']").value || "Alabama")
			Ndata.append("Shipping.PostalCode", document.querySelector("#quoteMethod input[name='Shipping.PostalCode']").value || 5513)

			Ndata.append("Shipping.Address1", "2440 Enterprise Dr.")
			Ndata.append("Shipping.Address2", "2440 Enterprise Dr.")
			Ndata.append("Shipping.PhoneNumber", "01251357485")
			
			sendFormData = Ndata

			
		}

		
		fetch("/shipping/", {
			method: "POST",
			body: sendFormData,
		})
			.then((result) => result.text())
			.then((xml) => {
				Ndata.delete("authenticity_token")
				Ndata.delete("Shipping.FirstName")
				Ndata.delete("Shipping.LastName")
				Ndata.delete("Shipping.Country")
				Ndata.delete("Shipping.Province")
				Ndata.delete("Shipping.City")
				Ndata.delete("Shipping.PostalCode")
	
				Ndata.delete("Shipping.Address1")
				Ndata.delete("Shipping.Address2")
				Ndata.delete("Shipping.PhoneNumber")
				for(let pair of Ndata.entries()) {
					console.log(pair)
				}
				
				const parser = new DOMParser();
				const xmlDom = parser.parseFromString(xml, "text/html");
				const orderForm = xmlDom.getElementById("orderForm");
				const ratesholderElement = document.querySelector(
					".rates .rate-holder"
				);
				if (orderForm) {
					ratesholderElement.innerHTML = ""
					const rates = xmlDom.querySelectorAll(".accordion_toggle");
					rates.forEach((rate) => {
						rate.classList.remove('d-none')
						ratesholderElement.appendChild(rate);
					});
				}

				const accordionToggle = Array.from(
					document.getElementsByClassName("accordion_toggle_title")
				);
				accordionToggle.forEach((elmnt) => {
					elmnt.addEventListener("click", function (e) {
						elmnt.classList.toggle("active");
					});
				});

				const error = xmlDom.querySelector(".alert-message")
				if (error) {
					if (document.querySelector(".alert-message")) {
						document.querySelectorAll(".alert-message").forEach(err => err.style.display = "none")
					}
					document.querySelector("body").appendChild(error)
				}
				document.querySelectorAll(".input-wrapper input[type=radio]").forEach(radio => {
					radio.addEventListener("change", () => {
						isLoaded = true
					})
				})

				document.getElementById("ratesHolder").classList.remove("anim2", "loading")
				
				
			})
	});
}



city.addEventListener("change", () => {
	refreshTheCalculationFee()
})
zipCode.addEventListener("change", () => {
	refreshTheCalculationFee() // 
})
// refresh the data on select change
regionSelectBox.addEventListener("change", () => {
	refreshTheCalculationFee()
})

// Refresh The Cart Body & Invoice Subtotal
function refreshCartInfo(callBack) {
	const data = new URLSearchParams();
	for (const pair of new FormData(document.getElementById("cartForm"))) {
		data.append(pair[0], pair[1]);
	}
	fetch("/cart?dom=true", {
		method: "POST",
		body: data,
	})
	.then((result) => result.text())
	.then((data) => {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(data, "text/html");
		const cartBody = document.querySelector(".cart-body")
		const totalPrice = document.getElementById("total_price")
		$2(".navbar-dark .icon small")[0].innerHTML = ""
		$2(".navbar-dark .icon small").append(xmlDoc.getElementById("getQty").innerHTML)
		cartBody.innerHTML = ""
		totalPrice.innerHTML = xmlDoc.getElementById("total_price").innerHTML
		cartBody.appendChild(xmlDoc.querySelector("#cartForm"))
	})
	.then(() => callBack())
}



function chngeDataWhenIncAndDec() {
	const dec = document.querySelectorAll(".decrease");
	const inc = document.querySelectorAll(".increase");
	cartLimit();

	const handlePlusEvent = (e) => {
			// e.target.removeEventListener('click', handlePlusEvent)
			e.target.previousElementSibling.children.qty.value = parseInt(e.target.previousElementSibling.children.qty.value) + 1
			refreshTheCalculationFee()
			refreshCartInfo(() => {
				trigger();
				chngeDataWhenIncAndDec();
			})
		}
	
	inc.forEach(el => {
		el.addEventListener("click", handlePlusEvent)
	})
	dec.forEach(el => {
		el.addEventListener("click", (e) => {
			const qty = e.target.parentElement.children[4].children[0]
			if (qty.value > 1) {
				qty.value = parseInt(qty.value) - 1
				refreshTheCalculationFee()
					refreshCartInfo(() => {
					trigger();
					chngeDataWhenIncAndDec();
				})
			}
		})
	})
}
chngeDataWhenIncAndDec()

// convert object to form data
function getFormData(object) {
	const formData = new FormData();
	Object.keys(object).forEach(key => formData.append(key, object[key]));
	return formData;
}

$2(".invoice-footer .paypal").click(async (e) => {
	e.preventDefault()
	let cityAndZipEmpty = city.value == "" && zipCode.value == "" ? true : false
	if (cityAndZipEmpty) {
		showMessage("Please Fill The City And Zip Code", true)
	} else {
		if (customerId && addresses.length && document.querySelector("input[name='ShippingQuoteRateId[0]']:checked")) { // If User Logged In And Have one Address at least
			if ($2(document.querySelector("input[name='ShippingQuoteRateId[0]']:checked")).attr("data-store") != "true") {
				const res = await fetch("/order", {
				method: "POST",
				body: toFormData("quoteMethod")
			});
			const data3 = await res.text()
			const parser = new DOMParser();
			const dom = parser.parseFromString(data3, "text/html");
			
			const authinticityToken = dom.querySelector("input[name='authenticity_token']").value
			const checkOutData = {
				"authenticity_token": authinticityToken,
				"Billing.Address1": "2440 Enterprise Dr.",
				"street2": "",
				"PaymentId": 3,
				"Field[cc_number]": "",
				"Field[expiry_month]": "",
				"Field[expiry_year]": "",
				"Field[cvv_code]": "",
				"termsAndConditions": "on",
				"order_comments" : "",
				"follow_redirect": true
			}
		
			const defaultAddress = addresses.filter(ad => ad.isDefault)[0]
		
			if (index != undefined) {
				checkOutData['Billing.FirstName'] = addresses[index].firstName
				checkOutData['Billing.LasttName'] = addresses[index].lastName
				checkOutData['Email'] = addresses[index].email
				checkOutData['Billing.Country'] = addresses[index].country
				checkOutData['Billing.Province'] = addresses[index].province
				checkOutData['Billing.City'] = addresses[index].city
				checkOutData['Billing.PostalCode'] = addresses[index].zip
				checkOutData['Billing.PhoneNumber'] = addresses[index].phoneNumber
			} else {
				checkOutData['Billing.FirstName'] = defaultAddress.firstName
				checkOutData['Billing.LasttName'] = defaultAddress.lastName
				checkOutData['Email'] = defaultAddress.email
				checkOutData['Billing.Country'] = defaultAddress.country
				checkOutData['Billing.Province'] = defaultAddress.province
				checkOutData['Billing.City'] = defaultAddress.city
				checkOutData['Billing.PostalCode'] = defaultAddress.zip
				checkOutData['Billing.PhoneNumber'] = defaultAddress.phoneNumber
			}
		
		
			const checkFormData = getFormData(checkOutData)
			// Post Checkout
			const res2 = await fetch("/checkout", {
				method: "POST",
				redirect: 'manual',
				headers: {
					"Access-Control-Expose-Headers": "Location",
					mode: 'no-cors'	,
				},
				body: checkFormData
			})
			const redirectURl = await res2.text()
			window.location.replace(redirectURl)
			} else {
				const alert = `<section id="confirmation" class="my-alert visible"><div class="icon"></div><div class="alert-body"><h2 style="margin-top: 0;">Warning</h2><p> Are you sure you wanna pickup in Las Vegas Pop Up?</p></div><div class="actions-holder"><button style="width: 50%;" class="secondary-btn cancel">CANCEL</button><div style="width: 50%;" class="col-md-6"><button id="delete" class="main-btn">CONTINUE</button></div></div></section>`
				$2(document.body).append(alert)
				$2("#confirmation").popUp(400)
				$2("#delete").click(async () => {
					const res = await fetch("/order", {
						method: "POST",
						body: toFormData("quoteMethod")
					});
					const data3 = await res.text()
					const parser = new DOMParser();
					const dom = parser.parseFromString(data3, "text/html");
					
					const authinticityToken = dom.querySelector("input[name='authenticity_token']").value
					const checkOutData = {
						"authenticity_token": authinticityToken,
						"Billing.Address1": "2440 Enterprise Dr.",
						"street2": "",
						"PaymentId": 3,
						"Field[cc_number]": "",
						"Field[expiry_month]": "",
						"Field[expiry_year]": "",
						"Field[cvv_code]": "",
						"termsAndConditions": "on",
						"order_comments" : "",
						"follow_redirect": true
					}
				
					const defaultAddress = addresses.filter(ad => ad.isDefault)[0]
				
					if (index != undefined) {
						checkOutData['Billing.FirstName'] = addresses[index].firstName
						checkOutData['Billing.LasttName'] = addresses[index].lastName
						checkOutData['Email'] = addresses[index].email
						checkOutData['Billing.Country'] = addresses[index].country
						checkOutData['Billing.Province'] = addresses[index].province
						checkOutData['Billing.City'] = addresses[index].city
						checkOutData['Billing.PostalCode'] = addresses[index].zip
						checkOutData['Billing.PhoneNumber'] = addresses[index].phoneNumber
					} else {
						checkOutData['Billing.FirstName'] = defaultAddress.firstName
						checkOutData['Billing.LasttName'] = defaultAddress.lastName
						checkOutData['Email'] = defaultAddress.email
						checkOutData['Billing.Country'] = defaultAddress.country
						checkOutData['Billing.Province'] = defaultAddress.province
						checkOutData['Billing.City'] = defaultAddress.city
						checkOutData['Billing.PostalCode'] = defaultAddress.zip
						checkOutData['Billing.PhoneNumber'] = defaultAddress.phoneNumber
					}
				
				
					const checkFormData = getFormData(checkOutData)
					// Post Checkout
					const res2 = await fetch("/checkout", {
						method: "POST",
						redirect: 'manual',
						headers: {
							"Access-Control-Expose-Headers": "Location",
							mode: 'no-cors'	,
						},
						body: checkFormData
					})
					const redirectURl = await res2.text()
					window.location.replace(redirectURl)
				})
				$2("#confirmation .cancel").click(() => $2("#confirmation").popOut(200))
			} 
			
		} else if (document.querySelector("input[name='ShippingQuoteRateId[0]']:checked")) { // If User Is Not Logged in Or logged in but have no addresses

			if ($2(document.querySelector("input[name='ShippingQuoteRateId[0]']:checked")).attr("data-store") != "true") {
				
				$2(".popup-list").popUp(400)
			$2("#billingForm button").click(async (e) => {
				e.preventDefault()
				$2(".loading-full").removeClass("d-none")
				const billingForm = toFormData("billingForm")
	
				let allow = true
				let email_allow = false
				for (pair of billingForm.entries()) {
					if (pair[1] == "" && pair[0] != "street2") {
						allow = false
					}else if (pair[0] == "Email" && (pair[1].includes("@") && pair[1].includes(".com"))){
						email_allow = true
					}
				}
				
				if (allow && email_allow) {
					const res = await fetch("/order", {
						method: "POST",
						body: toFormData("quoteMethod")
					});
					const data3 = await res.text()
					const dom = convertToDom(data3)
					
					const authinticityToken = dom.querySelector("input[name='authenticity_token']").value
					const checkOutData = {
						"authenticity_token": authinticityToken,
						"Billing.Country": country.value,
						"Billing.Province": province.value,
						"Billing.City": city.value,
						"Billing.PostalCode": zipCode.value,
						"PaymentId": 3,
						"Field[cc_number]": "",
						"Field[expiry_month]": "",
						"Field[expiry_year]": "",
						"Field[cvv_code]": "",
						"termsAndConditions": "on",
						"order_comments" : "",
						"follow_redirect": "",
						"follow_redirect": true
					}
					
		
					// Post Checkout
					const res2 = await fetch("/checkout", {
						method: "POST",
						redirect: 'manual',
						headers: {
							"Access-Control-Expose-Headers": "Location",
							mode: 'no-cors'	,
						},
						body: mergeFormData(getFormData(checkOutData), billingForm)
					})
					const redirectURl = await res2.text()
	
					if (res2.status == 400){
						showMessage('Failed to process the request. Please try again later', true)
						$2(".loading-full").addClass("d-none")
					} else window.location.replace(redirectURl)
					
					
				} else if (!allow) {
					$2(".loading-full").addClass("d-none")
					document.querySelectorAll(".alert-message").forEach(el => el.remove())
				   const allertBody = `
						<div class="alert-message fail fixed" style="top:63px; position:fixed;">
							<i class="fas fa-exclamation"></i> 
							<p>Some Thing Missing Please Fill All Fields</p>
						</div>
					`
					document.body.insertAdjacentHTML("afterbegin", allertBody)
	
				} else if (!email_allow) {
					$2(".loading-full").addClass("d-none")
					document.querySelectorAll(".alert-message").forEach(el => el.remove())
				   const allertBody = `
						<div class="alert-message fail fixed" style="top:63px; position:fixed;">
							<i class="fas fa-exclamation"></i> 
							<p>Email is not valid</p>
						</div>
					`
					document.body.insertAdjacentHTML("afterbegin", allertBody)
				} else {
				}
	
				
			})
			$2("#billingForm a").click(e => {
				e.preventDefault();
				$2(".popup-list").popOut(200)
			})
				
			} else {
				const alert = `<section id="confirmation" class="my-alert visible"><div class="icon"></div><div class="alert-body"><h2 style="margin-top: 0;">Warning</h2><p> Are you sure you wanna pickup in Las Vegas Pop Up?</p></div><div class="actions-holder"><button style="width: 50%;" class="secondary-btn cancel">CANCEL</button><div style="width: 50%;" class="col-md-6"><button id="delete" class="main-btn">CONTINUE</button></div></div></section>`
				$2(document.body).append(alert)
				$2("#confirmation").popUp(400)
				$2("#delete").click(() => {
					$2(".popup-list").popUp(400)
			$2("#billingForm button").click(async (e) => {
				e.preventDefault()
				$2(".loading-full").removeClass("d-none")
				const billingForm = toFormData("billingForm")
	
				let allow = true
				let email_allow = false
				for (pair of billingForm.entries()) {
					if (pair[1] == "" && pair[0] != "street2") {
						allow = false
					}else if (pair[0] == "Email" && (pair[1].includes("@") && pair[1].includes(".com"))){
						email_allow = true
					}
				}
				
				if (allow && email_allow) {
					const res = await fetch("/order", {
						method: "POST",
						body: toFormData("quoteMethod")
					});
					const data3 = await res.text()
					const dom = convertToDom(data3)
					
					const authinticityToken = dom.querySelector("input[name='authenticity_token']").value
					const checkOutData = {
						"authenticity_token": authinticityToken,
						"Billing.Country": country.value,
						"Billing.Province": province.value,
						"Billing.City": city.value,
						"Billing.PostalCode": zipCode.value,
						"PaymentId": 3,
						"Field[cc_number]": "",
						"Field[expiry_month]": "",
						"Field[expiry_year]": "",
						"Field[cvv_code]": "",
						"termsAndConditions": "on",
						"order_comments" : "",
						"follow_redirect": "",
						"follow_redirect": true
					}
					
		
					// Post Checkout
					const res2 = await fetch("/checkout", {
						method: "POST",
						redirect: 'manual',
						headers: {
							"Access-Control-Expose-Headers": "Location",
							mode: 'no-cors'	,
						},
						body: mergeFormData(getFormData(checkOutData), billingForm)
					})
					const redirectURl = await res2.text()
	
					if (res2.status == 400){
						showMessage('Failed to process the request. Please try again later', true)
						$2(".loading-full").addClass("d-none")
					} else window.location.replace(redirectURl)
					
					
				} else if (!allow) {
					$2(".loading-full").addClass("d-none")
					document.querySelectorAll(".alert-message").forEach(el => el.remove())
				   const allertBody = `
						<div class="alert-message fail fixed" style="top:63px; position:fixed;">
							<i class="fas fa-exclamation"></i> 
							<p>Some Thing Missing Please Fill All Fields</p>
						</div>
					`
					document.body.insertAdjacentHTML("afterbegin", allertBody)
	
				} else if (!email_allow) {
					$2(".loading-full").addClass("d-none")
					document.querySelectorAll(".alert-message").forEach(el => el.remove())
				   const allertBody = `
						<div class="alert-message fail fixed" style="top:63px; position:fixed;">
							<i class="fas fa-exclamation"></i> 
							<p>Email is not valid</p>
						</div>
					`
					document.body.insertAdjacentHTML("afterbegin", allertBody)
				} else {
				}
	
				
			})
			$2("#billingForm a").click(e => {
				e.preventDefault();
				$2(".popup-list").popOut(200)
																																})
					$2("#confirmation").popOut(200)
				})
				$2("#confirmation .cancel").click(() => $2("#confirmation").popOut(200))
			} 	
		
			
		} else {
			const shippingErr = `
					<div class="alert-message fail">
						<i clsass="fas fa-exclamation"></i> 
						  <p>Please Select The Shipping Method</p>
					</div>
				`
			alerte = document.querySelectorAll(".alert-message")
			if (alerte.length) {
				alerte.forEach(lrt => lrt.remove())
				document.querySelector("body").insertAdjacentHTML("afterbegin", shippingErr)
				window.scroll({top: 100, behavior: 'smooth'})
			} else {
				document.querySelector("body").insertAdjacentHTML("afterbegin", shippingErr)
				window.scroll({top: 100, behavior: 'smooth'})
			}
		}
		
	}

	
})



// Reload Cart Page Every 5 minutes
const fiveMinutes = 300000
const refreshOn = setTimeout(function () {
	window.location.reload()
}, fiveMinutes)