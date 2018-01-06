$(document).ready(function(){
	function callParent(){
			var fheight= document.body.scrollHeight;
			parent.parentFunction(fheight);
	}
	$("#flag_ctrl").click(function(){
		if($('#flag_more').css('display') == 'none'){
			$("#flag_more").css("display", "block");
			this.innerHTML = '收起<i class="up"></i>';
			callParent();
		}
		else{
			$("#flag_more").css("display", "none");
			this.innerHTML = '展开<i class="down"></i>';
			callParent();
		}
	})
})
