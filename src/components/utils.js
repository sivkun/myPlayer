function timeFormat(t){
    t=parseInt(t);
    let fTime;
     if(t<60){
        if(t<10){
          fTime='00:0'+t;
        }else{
          fTime='00:'+t;
        }
      }else if(t>=60&&t<3600){
        let m=parseInt(t/60);
        let s=t%60;
        if(m<10){
          if(s<10){
            fTime='0'+m+':0'+s;
          }else{
            fTime='0'+m+':'+s;
          }
        }else{
          if(s<10){
            fTime=m+':0'+s;
          }else{
            fTime=m+':'+s;
          }
        }
      }
      return fTime;
  }
const  eleTraversal=(ele)=>{
  let colection=[];
  colection.push(ele);
  let children=ele.children;
  Array.prototype.forEach.call(children,(item,index)=>{
    colection=colection.concat(eleTraversal(item));
    })
  return colection;
}
  export {timeFormat,eleTraversal}
