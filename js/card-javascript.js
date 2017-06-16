/* Javascript */

var rotate = 20
var pageX = $(document).width()
var pageY = $(document).height()
var mouseY = 0
var mouseX = 0

$(document).mousemove(function( event ) {
	mouseX = event.pageY
	mouseY = event.pageX
	rotateY = - (pageY / 2 - mouseY ) / pageY * rotate
	rotateX = (pageX / 2 - mouseX ) / pageX * rotate
	height = $('section').outerHeight()
	width = $('section').outerWidth()

	$('section').css({
		'margin-top': (pageY - height) / 2,
		'margin-left': (pageX - width) / 2,
		'opacity': 1,
		'-webkit-transform': 'perspective(1200px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)',
		'transform': 'perspective(1200px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
	})
})
