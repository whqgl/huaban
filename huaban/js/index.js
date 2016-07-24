$(function(){
	var add=$('.add');
	var parent=$('.palette-box');
	var divs=$('.left>div');
	// console.log(divs);
	var canvas=null;
	// var parent=null;
	var copy=null;
	add.click(function(){
		var w=prompt('width',900);
		var h=prompt('height',600);
		//创建画布
		canvas=$('<canvas>').attr({width:w,height:h});
		copy=$('<div>').css({width:w,height:h,position:'absolute',left:120,top:0,zIndex:999});
		parent.css({width:w,height:h}).append(canvas).append(copy);
		pat();
	})

	var cexiao=$('.cexiao');
	cexiao.click(function(){
		if(pat.status.length>1){
			pat.status.pop();//最后一个删掉
			pat.o.putImageData(pat.status[pat.status.length-1,0,0,0,0,pat.width,pat.height]);//把最后一个填进去  
		}else if(pat.status.length==1){
			pat.status.pop();
			pat.o.clearRect(0,0,pat.width,pat.height);
		}else{
			alert('不能再撤销了');
		}
	})
	var color=$('#color');
	// console.log(color)
	color.change(function(){
		alert(1)
		pat.fillStyle=this.value;
		// pat.strokeStyle=this.value;
		return false;//阻止默认行为
	})

	function pat(){
		var cobj=canvas[0].getContext('2d');
		var pat=new palette(cobj,canvas[0],copy[0]);
		console.log(pat.drow());
		divs.click(function(){
			var attr=$(this).attr('role');
			console.log(attr)
			if(attr!=undefined){
				if(attr=='pencil'){
					pat.pencil();
					pat.type=attr;					
				}else if(attr=='poly'){
					pat.type=attr;
					pat.bnum=prompt('边数',5)||5;
					pat.drow();
				}else if(attr=='fill'||attr=='stroke'){
					pat.type=attr;
				}else{
					pat.type=attr;
					pat.drow();
					
				}
			}			
		})
		
	}




})