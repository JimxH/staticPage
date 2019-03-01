//顶部下拉搜索框
$('.search-span').on('click',function(){
	$('#top-slide').fadeToggle(500);
});
$('#top-slide span').click(function(){
	$('#top-slide').slideToggle(500);
});
//预约试驾
$('#test-drive').click(function(){
	testfn();
});
function testfn(){
	$('#test').fadeToggle(800);
	$('#test-drive :only-child').toggleClass('top-hover');
}
//提交试驾信息
$('#test-btn').click(function(){
//   对象集合中 加了中括号 就会转成 dom 对象不能用val();
//	$uname2=$('#test-form input')[0].value;
	
	var uname=$('#test-name').val();
	var gender=$('#test-form :checked').val();
	var uphone=$('#testphone').val();
	var umsg=$('#test-msg').val();
	
	
	var uday=new Date();
	uday=uday.toLocaleString();

	var reg=/^1[358]\d{9}$/;
	var bol=reg.test(uphone);

	if( uname && uphone && bol){
		var data={uname:uname,gender:gender,phone:uphone,msg:umsg,uday:uday};
		console.log(data);
		
		$.post('audi-user.php',data,function(txt){
			console.log(txt);
			if(txt=='success'){
				testfn();
				alert('提交成功！稍后将有专人与你联系...');
				
			}
			
		});

	}else{
		alert('输入有误！');
	}

});
/*****定制奥迪********/
$('#your_audi').click(function(){
	$('#sel_div').slideToggle(300);
});
$('#sel_div .ts').click(function(){
	$('#your_audi span').html(this.innerHTML);
	$('.tts').removeClass('tts');
	$(this).addClass('tts');
	
	var iname=this.innerHTML;
	
	$('#inner_img').fadeToggle(500,function(){
		inner_img.src='img/'+iname+'.png';
		$('#inner_img').fadeToggle(500);
	});

});

/**************车型展示*****************/
$('#showcar').click(function(){
	showfn();
});
function showfn(){
	$('#showD').fadeToggle(800);
	$('#showcar :only-child').toggleClass('top-hover');
}

$(function(){
	var $left = $('#left');
	var $right = $('#right');
	var $li = $('#showP li');
	var index = 0;
	
	$li.append('<span></span>');
	$('#showP li span').eq(0).css('display' , 'none');
				
	var arrW=[],arrH=[],arrL=[],arrT=[],arrZ=[],arrS=[],arrO=[];
	var nowTime = 0;
	$right.click(function(){
		if ( new Date() - nowTime > 500 ){
			nowTime = new Date();
			index ++;
			index %= $li.length;
			fn( $(this).index() );
		}
				
	});

	$left.click(function(){
		if ( new Date() - nowTime > 500 ){
			nowTime = new Date();
			index --;
			if(index<0)index=$li.length-1;
			fn( $(this).index() );
		}
	});

				
	function fn( x ){
		$li.each(function(i){
			arrW[i] = $(this).css('width');
			arrH[i] = $(this).css('height');
			arrL[i] = $(this).css('left');
			arrT[i] = $(this).css('top');
			arrZ[i] = $(this).css('zIndex');
			arrS[i] = $(this).find('span').css('display');
			arrO[i] = $(this).css('opacity');
		});
		$li.each(function(i){
			if ( x ){
				var a = i-1;
				if(a<0)a=$li.length-1;
			}
			else{
				var a = i+1;
				if(a==$li.length)a=0;
			}
			
			$(this).find('span').css('display' , arrS[a]);
			$(this).css('zIndex' , arrZ[a]).animate({
				width : arrW[a],
				height : arrH[a],
				left : arrL[a],
				top : arrT[a],
				opacity : arrO[a]
			},500);
		});
	}
});

$('#close').click(function(){
	showfn();
});

			