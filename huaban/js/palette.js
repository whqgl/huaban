

function palette(cobj,canvas,copy){
	this.o=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style='fill';//stroke||fill
	this.type='rect';
	//line rect circle圆 triangle三角形 pencil铅笔 poly多边形 polystar多角形
	this.lineWidth=1;
	this.strokeStyle='#000000';
	this.fillStyle='#000000';
	this.bnum=5;
	this.jnum=5;
	this.status=[];
}
//初始化  绘制
palette.prototype.drow=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.init();
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
			}
			var mx=e.offsetX;
			var my=e.offsetY;
			that[that.type](dx,dy,mx,my);
			
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
//画线条
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
//画矩形
palette.prototype.rect=function(x1,y1,x2,y2){
	var width=x2-x1;
	var height=y2-y1;
	this.o.beginPath();
	this.o.rect(x1,y1,width,height);
	this.o.closePath();
	this.o[this.style]();
}
//画圆
palette.prototype.circle=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.r=function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
//画三角形
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	// this.o.lineTo(x1-(x2-x1),y2);
	// this.o.lineTo(x1,y1-(y2-y1));
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();
}
//画铅笔
palette.prototype.pencil=function(x1,y1,x2,y2){
	var that=this;
	this.canvas.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.o.beginPath();
		that.init();
		document.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.lineTo(mx,my);
			that.o[that.style]();
			
		}
		document.onmouseup=function(){
			that.o.closePath();
			// that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.init=function(){
	this.o.fillStyle=this.fillStyle;
	this.o.strokeStyle=this.strokeStyle;
	this.o.lineWidth=this.lineWidth;
}
//画多边形
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);
	var n=this.bnum;
	var ang=360/this.bnum;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r);
	}
	this.o.closePath();
	this.o[this.style]();
}
//画多角形
palette.prototype.polystar=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);//大圆半径
	var r1=r*0.3;//小圆半径
	var n=this.jnum*2;
	var ang=360/this.jnum/2;//次数  角度
	this.o.beginPath();
	for(var i=0;i<n;i++){
		if(i%2==0){
			this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r);
		}else if(i%2==1){
			this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r1,y1+Math.sin(ang*Math.PI/180*i)*r1);
		}		
	}
	this.o.closePath();
	this.o[this.style]();
}
//画橡皮擦
palette.prototype.clear=function(){
	var w=30;
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		var a=document.createElement('div');
		a.style.cssText='width:'+w+'px;height:'+w+'px;position:absolute;border:1px solid red;';
		
		document.onmousemove=function(e){			
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.clearRect(mx-w/2,my-w/2,w,w);
			a.style.left=mx-w/2+'px';
			a.style.top=my-w/2+'px';
			that.canvas.appendChild(a);
		}
		document.onmouseup=function(){
			that.canvas.removeChild(a);
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}