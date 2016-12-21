//以一个对象的x和y属性的方式返回滚动条的偏移量
function getScrollOffsets(w){
	w=w||window;

	if(w.pageXOffset!=null) return{ x:w.pageXOffset,y:w.pageXOffset};///*主流浏览器都支持该属性，IE 8+，用上述来获取滚动条偏移*/

	var d=w.document;
	if(document.compatMode=="CSS1Compat")///*IE8之前或更早的版本用此*/
		return {x:d.documentElement.scrollLeft,y:documentElement.scrollTop};
	return{x:d.body.scrollLeft,y:d.body.scrollTop};///*对怪异模式下的浏览器*/
}
//返回视口尺寸
function getViewPortSize(w) {
    var w = w || window;
    if (w.innerWidth != null)
        return { w: w.innerWidth, h: w.innerHeight };
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
    return { w: d.body.clientWidth, h: d.body.clientHeight };
 }
//返回元素文档坐标（有滚动条会出问题）
 function getElementPosition(e) {
    var x = 0, y = 0;
    while (e != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return { x: x, y: y };
  }
export {getScrollOffsets};
