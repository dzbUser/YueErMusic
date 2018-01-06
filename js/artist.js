$(document).ready(function(){
	$('tr').mouseover(function(){
		var w3 = this.children[2];
		$(w3.children[0]).css("display", "none");
		$(w3.children[1]).css("display", "block");
	})
	$('tr').mouseout(function(){
		var w3 = this.children[2];
		$(w3.children[0]).css("display", "block");
		$(w3.children[1]).css("display", "none");
	})
})
