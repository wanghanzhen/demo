var $main=$('.main:first');
var $boxs=$('.main>div');
var screenWidth=$(window).width();
var cols=Math.floor(screenWidth/$boxs.eq(0).outerWidth());

function waterfall(){
	var $boxs=$('.main>div');
	var screenWidth=$(window).width();
	var cols=Math.floor(screenWidth/$boxs.eq(0).outerWidth());
	var $boxs=$('.main>div');
	var heightArr=[];
	var minIndex;
	$boxs.each(function(index){
		if(index<cols){
			heightArr[index]=$(this).outerHeight();
		}
		else{
			minIndex=getMinIndex(heightArr);
			$(this).css({
				position: 'absolute',
				top: heightArr[minIndex]+'px',
				left: $boxs.eq(minIndex).offset().left+'px'
			});
			heightArr[minIndex]+=$(this).outerHeight();
		}
	})
}
function checkSrollSlide(){
	var $lastBox=$('.box:last');
	var lastBoxHeight=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var screenHeight=$(window).height();
	console.log(lastBoxHeight<scrollTop+screenHeight)
	return lastBoxHeight<scrollTop+screenHeight;
}

function getMinIndex(arr){
	return arr.indexOf(Math.min.apply(null,arr));
}

function init(){
	waterfall();
	$(window).on('scroll',function(){
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
			$main.html($main.html()+html);
			waterfall();
		}
	})
}
init();