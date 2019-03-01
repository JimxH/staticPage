/*封装$*/
//window.$=HTMLElement.prototype.$=function(selector){
//    var elems=(this==window?document:this)
//        .querySelectorAll(selector);
//    return elems.length==0?null:elems.length==1?elems[0]:elems;
//}
/*广告图片数组*/
var imgs=[
	{"i":0,"img":"img/heading1.jpg"},
    {"i":1,"img":"img/heading2.jpg"},
    {"i":2,"img":"img/heading3.jpg"},
    {"i":3,"img":"img/heading4.jpg"},
    {"i":4,"img":"img/heading5.jpg"},
];

//广告轮播
var slider={

	LIWIDTH:0,
	DURATION:1000,
	DISTANCE:0,
	STEPS:200,
	interval:0,
	step:0,
	moved:0,
	timer:null,
	WAIT:3000,
	canAuto:true,
//1	
	init:function(){
		this.LIWIDTH=parseFloat(getComputedStyle(Running).width);
		this.updateView();

		var me=this;
		this.interval=this.DURATION/this.STEPS;
		runNum.addEventListener("click",function(e){
			var target=e.target;
			if(target.nodeName=="LI"&&target.className!="runnum"){
				var curnum=runNum.getElementsByClassName("runnum");
				var n=target.innerHTML-curnum[0].innerHTML;
				me.move(n);
				
			}	
		});
		Running.addEventListener("mouseover",function(){
			me.canAuto=false;
		});
		Running.addEventListener("mouseout",function(){
			me.canAuto=true;
		});
		this.autoMove();
	},
//自动轮播
	autoMove:function(){
		var me=this;
		this.timer=setTimeout(function(){
			if(me.canAuto){
				me.move(1);
			}else{
				me.autoMove();	
			}
		},this.WAIT);
	},
//启动轮播
	move:function(n){
		if(this.timer!=null){
			clearInterval(this.timer);
			this.timer=null;
			runImg.style.left="";
		}
		this.DISTANCE=this.LIWIDTH*n;
		this.step=this.DISTANCE/this.STEPS;	
		if(n<0){
			imgs=(imgs.splice(/*imgs.length-(-n)*/n,-n)).concat(imgs);//n为负数，
			runImg.style.left=this.DISTANCE+"px";
			this.updateView();
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},

	moveStep:function(n){
		var left=parseFloat(getComputedStyle(runImg).left);
		runImg.style.left=left-this.step+"px";
		//console.log(this.step);
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		}else{
			if(n>0){
			imgs=imgs.concat(imgs.splice(0,n));
			this.updateView();
			}
			runImg.style.left="";
			this.timer=null;
			this.moved=0;
			
			this.autoMove();
		}
	},
//更新页面
	updateView:function(){
		runImg.style.width=this.LIWIDTH*imgs.length+"px";
		for(var i=0,lis="",idxs="";i<imgs.length;i++){
			lis+="<li><img src="+imgs[i].img+"></li>";
			idxs+="<li>"+(i+1)+"</li>";
		}
		runImg.innerHTML=lis;
		runNum.innerHTML=idxs;
		var curLi=runNum.getElementsByTagName("li");
		curLi[imgs[0].i].className="runnum";
	},
}
window.addEventListener("load",function(){slider.init()});
