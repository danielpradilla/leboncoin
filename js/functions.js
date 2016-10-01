

mapsLink = function(text,label) {
	return '<a target="_blank" href="http://maps.google.com/?q='+text+' France">'+(label ? label : text)+'</a>';
}

populateCities = function() {
	$('#results .postal-code').each(function(i) {
		var code = $(this).text();
		var url = 'http://api.zippopotam.us/FR/' + code;
		// console.log(url);
		$.getJSON(url,function(json) {
			// console.log(json);
			$.each(json.places, function(i,place){
				$('#panel-'+code+' .city').append((i>0 ? ', ' :'') + mapsLink(place['place name']));
			});
		})
	});
}

linkPlaces = function(){
	$('#results .placement').each(function(i) {
		var name = $(this).text().trim();
		$(this).append(mapsLink(name,'<span class="glyphicon glyphicon-search"></span>'));
	});
}

appendRemovers = function() {
	$('<a href="#" class="glyphicon glyphicon-remove-circle"></a>').insertAfter('#results .lbc .date').click(function(){
		$(this).parents('a').remove();
	});
}

lazyloadImages = function() {
	$('.lazyload').each(function(i, el){
		console.log($(this));
		$(this).append('<img src="'+$(this).data('imgsrc')+'"/>');
	});
}

$( document ).ready(function() {
	$( 'a[href^="http://"]' ).attr( 'target','_blank' );

	populateCities();
	linkPlaces();
	appendRemovers();

	$('#mytab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});

	lazyloadImages();

});