let lbc = {}

lbc.resultsId = "results";
lbc.formId = "search_form"; 
lbc.categoryId = "category_id";
lbc.rangesRoomsId = "ranges_rooms";

lbc.categories = {"_emploi_":"71","offres_d_emploi":"33","_vehicules_":"1","voitures":"2","motos":"3","caravaning":"4","utilitaires":"5","equipement_auto":"6","equipement_moto":"44","equipement_caravaning":"50","nautisme":"7","equipement_nautisme":"51","_immobilier_":"8","ventes_immobilieres":"9","locations":"10","colocations":"11","bureaux_commerces":"13","_vacances_":"66","locations_gites":"12","chambres_d_hotes":"67","campings":"68","hotels":"69","hebergements_insolites":"70","_multimedia_":"14","informatique":"15","consoles_jeux_video":"43","image_son":"16","telephonie":"17","_loisirs_":"24","dvd_films":"25","cd_musique":"26","livres":"27","animaux":"28","velos":"55","sports_hobbies":"29","instruments_de_musique":"30","collection":"40","jeux_jouets":"41","vins_gastronomie":"48","_materiel_professionnel_":"56","materiel_agricole":"57","transport_manutention":"58","btp_chantier_gros_oeuvre":"59","outillage_materiaux_2nd_oeuvre":"60","equipements_industriels":"32","restauration_hotellerie":"61","fournitures_de_bureau":"62","commerces_marches":"63","materiel_medical":"64","_services_":"31","prestations_de_services":"34","billetterie":"35","evenements":"49","cours_particuliers":"36","covoiturage":"65","_maison_":"18","ameublement":"19","electromenager":"20","arts_de_la_table":"45","decoration":"39","linge_de_maison":"46","bricolage":"21","jardinage":"52","vetements":"22","chaussures":"53","accessoires_bagagerie":"47","montres_bijoux":"42","equipement_bebe":"23","vetements_bebe":"54","__":"37","autres":"38"};
lbc.immocategories = [8,9,10,11,13];

lbc.url = "https://api.leboncoin.fr/finder/search";
lbc.configUrl = "config.json";




lbc.get = function(url){
	return fetch(url, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, same-origin, *omit
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"api_key": "ba0c2dad52b3ec"
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer" // no-referrer, *client
	})
	.then(response => response.json())
	.catch(error => console.error(`Fetch Error =\n`, error));
}

lbc.post = function(url = '', data = {}){
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "api_key": "ba0c2dad52b3ec"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
}


lbc.getObjectValueFromPath = function(object, path) {
	return path.split('.').reduce((o,i)=>o[i], object)
}

lbc.getFormFields = function(form) {
	//returns all the form elements which have a name
	return Array.from(form.elements).filter(e => e.getAttribute("name")).reduce((acc, el) => {acc.push(el.name); return acc},[]);
}

lbc.getFormEl = function(formId) {
	return document.querySelector(`#${formId}`);
}

lbc.getFormDataObj = function(formEl) {
	return new FormData(formEl);
}

lbc.getSearchBody = function(formEl) {
	const formData = lbc.getFormDataObj(formEl);
	const zipcodes = formData.get("location.city_zipcodes").split(',').reduce((acc, zipcode)=>{
		acc.push({"zipcode": zipcode});
		return acc;
	},[]);

	const rtn = {
	    "filters": {
	        "category": {
	            "id": formData.get("category.id")
	        },
	        "enums": {
	            "ad_type": [
	                "offer"
	            ]
	        },
	        "keywords": {
	            "text": formData.get("keywords.text")
	        },
	        "location": {
	            "city_zipcodes": zipcodes
	        },
	        "ranges": {
	            "price": {
	                "min": +formData.get("ranges.price.min"),
	                "max": +formData.get("ranges.price.max")
	            }
	        }
	    },
	    "limit": 10000,
	    "limit_alu": 3
	};

	if (lbc.immocategories.indexOf(+formData.get("category.id"))>-1) {
		rtn.filters.ranges.rooms ={
	                "min": +formData.get("ranges.rooms.min"),
	                "max": +formData.get("ranges.rooms.max")
	            }
	}

	return rtn;
}

lbc.fillSelect = function(elementId, options){
	let categoriesEl = document.querySelector(`#${elementId}`);
	Object.keys(options).forEach(key=>{
		let opt = document.createElement('option');
		opt.value = options[key]
		opt.innerHTML = key;
		categoriesEl.appendChild(opt);
	});
}

lbc.getCityTitle = function(city){
	let rtn = `
					<div class="bg-light sticky-top border-top">
						<h3 class="sticky-top"><a href="https://maps.google.com/?q=${city}" target="_blank">${city}</a></h3>
					</div>
				`;
	return rtn;
}

lbc.getAdCard = function(data, i, ads){
	let rtn = '';
	if (i % 3 == 0) {
		if (i > 0) {
			rtn += "</div>";
		}
		rtn += '<div class="card-group mb-5">';
	}
	rtn += `
	<div class="card">
	  <img class="card-img-top" src="${data.images.small_url}" alt="Card image cap">
	  <div class="card-body">
	    <h5 class="card-title"><a href="${data.url}" class="" target="_blank">${data.subject}</a></h5>
    	<div class="row">
		    <div class="col">
		    	<p class="card-text">${Number(data.price[0]).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
		    </div>
		    <div class="col">
			    <p class="card-text"><small><a href="https://maps.google.com/?q=${data.location.city_label}" target="_blank">${data.location.city_label}</a></small></p>
			</div>
		</div>
	    <p class="card-text"><small>${data.body}</small></p>
	  </div>
	</div>
	`;
	if (i === ads.length-1) {
		rtn += "</div>";
	}
	return rtn;
}

lbc.getCities = function(ads){
	let cities = ads.reduce((acc, ad)=>{
		acc.push(ad.location.city_label)
		return acc;
	},[]).sort();
	let rtn = [... new Set(cities)]
	return rtn;
}

lbc.fillResults = function(payload){
	let el = document.querySelector(`#${lbc.resultsId}`);
	let adHTML = '';
	const ads = payload.ads;
	const cities = lbc.getCities(ads);
	//loop through a sorted list of cities
	cities.forEach(city=>{
		adHTML += lbc.getCityTitle(city);
		ads.filter(ad => ad.location.city_label === city)
			.sort((a,b) => ((a.price[0] > b.price[0]) ? 1 : ((b.price[0] > a.price[0]) ? -1 : 0) ) )
			.forEach((ad, i, ads)=>{
				adHTML += lbc.getAdCard(ad, i, ads);
			})
	})
	el.innerHTML=adHTML;
}

lbc.setFormDefaults = function(){
	lbc.get(lbc.configUrl)
	.then(lbc.fillForm)
}

lbc.fillForm = function(data) {
	const formEl = lbc.getFormEl(lbc.formId);
	const fields = lbc.getFormFields(formEl);
	fields.forEach(field=>{
		formEl[field].value = lbc.getObjectValueFromPath(data, field) ;
	});
}

lbc.initForm = function(){
	lbc.getFormEl(lbc.formId).addEventListener("submit", function(evt){
		evt.preventDefault();
		let el = document.querySelector(`#${lbc.resultsId}`);
		el.innerHTML='loading...';
		const body = lbc.getSearchBody(evt.target);
		lbc.post(lbc.url, body)
		.then(lbc.fillResults);

	});
}

lbc.initCategorySelect = function(){
	lbc.fillSelect(lbc.categoryId, lbc.categories);
	const selectEl = document.querySelector(`#${lbc.categoryId}`);
	selectEl.addEventListener("change", function(evt){
		if (lbc.immocategories.indexOf(+evt.target.value)>-1) {
			document.querySelector(`#${lbc.rangesRoomsId}`).style.display="";
		} else {
			document.querySelector(`#${lbc.rangesRoomsId}`).style.display="none";
		}
	})
}

lbc.init = function(){
	lbc.initCategorySelect();
	lbc.setFormDefaults();
	// lbc.post(lbc.url, {"filters":{"category":{"id":"10"},"enums":{"ad_type":["offer"]},"keywords":{"text":"a"},"location":{"city_zipcodes":[{"zipcode":"01170"}, {"zipcode":"01220"}]},"ranges":{"price":{"min":500,"max":2000}}},"limit":10000,"limit_alu":3})
	// .then(lbc.fillResults);
	lbc.initForm();

}

