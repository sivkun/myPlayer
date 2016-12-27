/***
*Drag.js:拖动绝对定位的HTML元素
*这个模块定义了一个drag()函数，他用于mousedown时间处理程序的调用
*随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
*这些实现能同标准heIE两种事件模型一起工作
*特需要用到本书其他地方介绍的getScrollOffsets()方法
*参数：
*elementToDrag：接收mousedown事件的元素或某些包含元素它必须是绝对定位的元素
*它的style.left和style.top值将随着用户的拖动而改变
*event:mousedown
*
*/
import {getScrollOffsets} from './getScrollOffsets'
export default  function drag(elementToDrag,event,direction,callback,minOffset=-100000,maxOffset=100000){
	//初始鼠标位置，转换为文档坐标
	var scroll=getScrollOffsets();//来自其他工具函数
	var startX=event.clientX+scroll.x;
	var startY=event.clientY+scroll.y;
	//在文档坐标下，带拖动元素的初始位置
	var origX=elementToDrag.offsetLeft;
	var origY=elementToDrag.offsetTop;
	//计算mousedown事件和元素左上角之间的距离
	//我们将它另存为鼠标移动的距离
	var deltaX=startX-origX;
	var deltaY=startY-origY;
	if(document.addEventListener){
		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',upHandler,true);
	}else if(document.attachEvent){
		//在IE事件模型中，捕获事件是通过调用元素上的setCapture()捕获他们
		elementToDrag.setCapture();
		elementToDrag.attachEvent('onmousemove',moveHandler);
		elementToDrag.attachEvent('onmouseup',upHandler);
		//作为mouseup事件开袋鼠标捕获的丢失
		elementToDrag.attachEvent('onlosecapture',upHandler);
	}
	//我们处理了这个事件，不让其他元素看到他
	if(event.stopPropagation)event.stopPropagation();
	else event.cancleBubble=true;
	//现在阻止任何默认操作
	if(event.preventDefault)event.preventDefault();//标准
	else event.returnVale=false;	//IE
	/***
	*当元素被拖动时，这就是捕获mousemove事件的处理程序，他用于移动元素
	*/
	function moveHandler(e){
		if(!e)e=window.event;//IE 事件模型
		var scroll=getScrollOffsets();
    if(direction==='xy'){
      elementToDrag.style.left=(e.clientX+scroll.x-deltaX)+'px';
      elementToDrag.style.top=(e.clientY+scroll.y-deltaY)+'px';
    }else if(direction==='x'){
      var left=e.clientX+scroll.x-deltaX;
      if(left<=minOffset){
        left=minOffset;
      }
      if(left>maxOffset){
        left=maxOffset;
      }
	  	elementToDrag.style.left=left+'px';
      callback(true,left-minOffset);
      // console.log(left);
    }else if(direction==='y'){
      elementToDrag.style.top=(e.clientY+scroll.y-deltaY)+'px';
    }
		//同时不让其他元素看到这个事件
		if(e.stopPropagation)e.stopPropagation();
		else e.cancleBubble=true;
	}
	/****
	*这是捕获拖动结束时发生的做种mouseup事件的处理程序
	*/
	function upHandler(e){
		if(!e)e=window.event;
		//注销捕获事件处理程序
		if(document.removeEventListener){//DOM事件模型
			document.removeEventListener('mouseup',upHandler,true);
			document.removeEventListener('mousemove',moveHandler,true);
		}else if(document.detachEvent){//IE 5+事件模型
			elementToDrag.detachEvent('onlosecapture',upHandler);
			elementToDrag.detachEvent('onmouseup',upHandler);
			elementToDrag.detachEvent('onmousemove',moveHandler);
			elementToDrag.releaseCapture();
		}
		//并且不让事件进一步传播
		if(e.stopPropagation)e.stopPropagation();
		else e.cancleBubble=true;
    callback&&callback(false);
	}
}

