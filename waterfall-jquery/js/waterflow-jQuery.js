var waterflow=[];  //array per column height

$(function(){
	waterfall();
	//simulate the data from server
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
			dataImg.forEach(function(ele){
				var oPa = $("<div>").addClass("pin");
				var oBox = $("<div>").addClass("box").appendTo(oPa);	
				var oDiv = $("<img>").attr('src',ele['src']).appendTo(oBox);
				$(eleFragment).append(oPa);
				$("#parent").append($(eleFragment));
			})
			waterfall();
		}
	})
});
// waterfall function ,reflow all the img position
function waterfall(){
	// waterfall layout
	waterflow = [];
	var oParent = $("#parent");
	var oBoxs = $(".pin");
	var pWidth = oParent.width();
	var cWidth = oBoxs.eq(0).outerWidth();
	var oLength = Math.floor(pWidth/cWidth);
	oBoxs.each(function(index,element) {
		// iterator
		if( index < oLength ){
			waterflow.push($(element).outerHeight());
		}else{
			var minHeight = Math.min.apply(null,waterflow);
			var minIndex = waterflow.indexOf(minHeight);
			var offsetW  = minIndex*oBoxs.eq(0).outerWidth();
			$(element).css({'position':"absolute","left":offsetW,"top": waterflow[minIndex]});
			waterflow[minIndex] += $(element).outerHeight();
		}
	});
}
// check is loadable
function checkIsLoadable(){

	var oParent = $("#parent");
	var oBoxs = $(".pin");
	var scrollT = document.body.scrollTop||document.documentElement.scrollTop;
	var offsetTop = scrollT + document.body.clientHeight||document.documentElement.clientHeight;

	var inde = waterflow.indexOf(Math.min.apply(null,waterflow));
	var boxOffset = waterflow[inde]+parseInt(oBoxs.eq(0).outerHeight()/2);
	if(boxOffset < offsetTop){
		return true;
	}
	return false;

}