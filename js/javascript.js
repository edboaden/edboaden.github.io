/* Javascript */

// On Window Load
$(window).on('load', function() {
	show_body();
});

function show_body() {
	$('body').addClass('loaded');
}
