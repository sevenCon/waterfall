var waterflow=[];

$(function(){
	waterfall();
	var dataImg = [ {"src":"img/P_01.jpg"},
					{"src":"img/P_02.jpg"},
					{"src":"img/P_03.jpg"},
					{"src":"img/P_04.jpg"},
					{"src":"img/P_05.jpg"},
					{"src":"img/P_06.jpg"}];

	$(document).on('scroll',function(){
		var eleFragment = document.createDocumentFragment();
		dataImg.forEach(function(ele){
			var oPa = $("<div>").addClass("pin");
			var oBox = $("<div>").addClass("box").appendTo(oPa);	
			var oDiv = $("<img>").attr('src',ele['src']).appendTo(oBox);
			$(eleFragment).append(oPa);
			$("#parent").append($(eleFragment));
		})
		waterfall();
		})

	});

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