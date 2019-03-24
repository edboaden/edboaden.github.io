/* Javascript */

// On Window Load
$(window).on('load', function() {
	resize_text()
})

// On Resize
$(window).resize(function() {
	resize_text()
})

function resize_text() {

	var h = $(window).height()
	var w = $(window).width()
	var x = $('h1').width()
	var y = $('h1').height()

	$('h1').css({
		'opacity': 1,
		'transform': 'scale(' + w / x + ', ' + 2.15 * h / y + ')'
	})
}
