var main=document.getElementsByClassName('main')[0];
var boxs=document.getElementsByClassName('box');
var screenWidth=document.body.clientWidth||document.documentElement.clientWidth;
var cols=Math.floor(screenWidth/boxs[0].offsetWidth);//列数

function waterfall(){
	var heightArr=[];  //保存第一行图片的高度

	//第cols+1张图加在第一行高度最小的图片，然后更新数组，依次列推
	for(var i=0;i<boxs.length;i++){
		if(i<cols){
			heightArr[i]=boxs[i].offsetHeight;
		}
		else{
			var index=getMinIndex(heightArr);
			boxs[i].style.position='absolute';
			boxs[i].style.top=heightArr[index]+'px';
			boxs[i].style.left=boxs[index].offsetLeft+'px';
			heightArr[index]+=boxs[i].offsetHeight;
		}
	}
}

//获取数组最小值索引
function getMinIndex(arr){
	return arr.indexOf(Math.min.apply(null,arr));
}

//判断是否符合加载数据块
function checkSrollSlide(){
	var lastBox=boxs[boxs.length-1];
	var lastBoxHeight=lastBox.offsetTop+Math.floor(lastBox.offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var screenHeight=document.body.clientHeight||document.documentElement.clientHeight;
	console.log(lastBoxHeight<scrollTop+screenHeight)
	return lastBoxHeight<scrollTop+screenHeight;
}

function init(){
	waterfall();
	window.onscroll=function(){
		//模拟传入json
		var dataint={
			data:[
				{'src':'0.jpg'},
				{'src':'1.jpg'},
				{'src':'2.jpg'},
				{'src':'3.jpg'}
			]
		}
		data1=dataint.data;
		var html='';
		if(checkSrollSlide()){
			for(var i=0;i<data1.length;i++){
				html+='<div class="box"><div class="pic"><img src="images/'+data1[i].src+'"></div></div>'
			}

			main.innerHTML+=html;
			waterfall();
		}
	}
}

init();