$(document).ready(function(){
	$('li div.u-cover').mouseover(function(){
		$(this.children[2]).css('display', 'block');
	});
	$('li div.u-cover').mouseout(function(){
		$(this.children[2]).css('display', 'none');
	});
})
