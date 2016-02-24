var waterfall = [];
$(function(){
	var dataImg = [ {"src":"img/P_01.jpg"},
					{"src":"img/P_02.jpg"},
					{"src":"img/P_03.jpg"},
					{"src":"img/P_04.jpg"},
					{"src":"img/P_05.jpg"},
					{"src":"img/P_06.jpg"}];
	// onscroll to load the new img 
	$(document).on('scroll',function(){
		if(checkIsLoadable()){
			var eleFragment = document.createDocumentFragment();
			//loop to traverse all the imgs
			dataImg.forEach(function(ele){
				var oPa = $("<div>").addClass("pin");
				var oBox = $("<div>").addClass("box").appendTo(oPa);	
				var oDiv = $("<img>").attr('src',ele['src']).appendTo(oBox);
				$(eleFragment).append(oPa);
				$("#parent").append($(eleFragment));
			})

		}
	})
});
// check is loadable
function checkIsLoadable(){
	var oParent = $("#parent");
	var oBoxs = $(".pin");
	var scrollT = $(document).scrollTop();
	var offsetTop = scrollT + document.documentElement.clientHeight|| document.body.clientHeight;
	var minHeight =$("#parent").height()-200;
	if(minHeight < offsetTop){
		return true;
	}
	return false;

}