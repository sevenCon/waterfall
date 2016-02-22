var waterCol=[];
window.onload= function(){
	waterFlow();
	var dataInt={'data':[{'src':'img/P_01.jpg'},{'src':'img/P_02.jpg'},{'src':'img/P_03.jpg'},{'src':'img/P_04.jpg'}]};
	var oParent = getEleByClass('parent')[0];
	document.onscroll=function(){
		if(isLoadedAvail()){
			var dFragment = document.createDocumentFragment();
			for(var i=0;i<dataInt.data.length;i++){
				var pin = document.createElement('div');
				pin.className = "pin";
				var box = document.createElement('div');
				box.className = "box";
				var img = document.createElement('img');
				img.src=dataInt.data[i].src;
				box.appendChild(img);
				pin.appendChild(box);
				dFragment.appendChild(pin);
			}
			oParent.appendChild(dFragment);
			waterFlow();	
		}
	}
}

function waterFlow(){
	var oBox = getEleByClass('pin');				//child boxs 
	var oParent = getEleByClass('parent')[0];     //parent box 
	waterCol=[];
	var parentWidth =  oParent.offsetWidth;		// 		parent box width
	var boxWidth = oBox[0].offsetWidth;			//box width
	var cols = Math.floor(parentWidth/boxWidth);   //box columns
	console.log(cols);
	console.log(oBox.length);
	for(var i =0,l=cols; i<oBox.length;i++){
		if( i<l ){
			waterCol.push(oBox[i].offsetHeight+oBox[i].offsetTop);	
		}else{
			var minIndex = waterCol.indexOf(Math.min.apply(null,waterCol));
			var posLeft = minIndex*oBox[0].offsetWidth+'px';   
			console.log("min:"+minIndex);
			var posTop = waterCol[minIndex]+'px';
			oBox[i].style.cssText="position:absolute;left:"+posLeft+";top:"+posTop;
			waterCol[minIndex]+=oBox[i].offsetHeight;
		}
	}
}

// 获取clsName的节点
function getEleByClass(clsName,parent){
	var oDom = parent ? document.getElementById(parent).getElementsByTagName('*'):document.getElementsByTagName('*');
	var classTag = [];
	for( var  i=0; i<oDom.length;i++){
		if(oDom[i].className == clsName){
			classTag.push(oDom[i]);
		}
	}
	return classTag;
}
// 判断是否加载新照片
function isLoadedAvail(){
	var oBox = getEleByClass('pin');
	var oParent = getEleByClass('parent')[0];
	var scrollTop = document.body.scrollTop ||document.documentElement.scrollTop;
	var winHeight = document.documentElement.clientHeight;
	var winCliHei = winHeight+scrollTop;
	var containHei = Math.floor(oBox[oBox.length-1].offsetHeight/2)+Math.min.apply(null,waterCol);
	return winCliHei>containHei?true:false;
}


