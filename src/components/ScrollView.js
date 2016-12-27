import React from 'react';
import ReactDOM from 'react-dom';
import drag from './Drag';
export default class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.timeFormat=this.timeFormat.bind(this);
    this.barbgDWidth=null;
    this.curClickHandler=this.curClickHandler.bind(this);
    this.dragDot=this.dragDot.bind(this)
  }
  componentDidMount (){
    let barbgD=ReactDOM.findDOMNode(this.refs.barbg);
    this.barbgDWidth=barbgD.offsetWidth;

  }
  componentDidUpdate(){
     this.barbgDWidth=ReactDOM.findDOMNode(this.refs.barbg).offsetWidth;
  }
  timeFormat(t){
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
  curClickHandler(event){
     if(event.target.className==='barbg'||event.target.className==='cur'||event.target.className==='scrollView-barView'){
       let barbgD=ReactDOM.findDOMNode(this.refs.barbg);
      //  let left=this.props.position.left;
       let left=this.props.getAppPosition().left;
       let curDotLeft=event.clientX-barbgD.offsetLeft-left;
       //console.log();
      //  console.log(event.clientX)
      //  console.log(barbgD.offsetLeft);
      //  console.log(barbgD.offsetWidth);
      //  console.log(event);
       event.preventDefault();
       event.stopPropagation();
       //  console.log(this.props.mInfo.totalTime*curDotLeft/event.target.offsetWidth);
       this.props.curClickHandler(this.props.mInfo.totalTime*curDotLeft/barbgD.offsetWidth);
     }
  }

  dragDot(event){
    let barbgD=ReactDOM.findDOMNode(this.refs.barbg);
    let callback = (isDown,params)=>{
      let totalTime=this.props.mInfo.totalTime;
      this.props.dotDragHandler(isDown,totalTime*params/(barbgD.offsetWidth-10));
    }
    drag(event.target,event,'x',callback,-5,barbgD.offsetWidth-15); //[-5,barbgD.offsetWidth-5]是拖动偏移量范围
  }

  render() {
    // console.log(this.props.mInfo)
    let curwidth , curDotleft; //curwidth:当前进度条长度，curDotleft：进度条的点的偏移量。
    let mInfo=this.props.mInfo;
    let curTime=mInfo.curTime;
    if(mInfo.dragTime!==-1){ //拖拽进度点，当前时间显示变化，而audio.currentTime不变。
      curTime=mInfo.dragTime;
    }
    let totalTime=mInfo.totalTime;
    if(this.barbgDWidth!==null){ //在该组件加载后才会初始化barbg
      curwidth=(this.barbgDWidth-10)*curTime/totalTime;
      curDotleft=curwidth-5;
    }else{
      curwidth=0;
      curDotleft='-5px';
    }
    if(curTime===0){
      curwidth=0;
      curDotleft='-5px';
    }
    // console.log(curTime);
    curTime=this.timeFormat(curTime);
    totalTime= this.timeFormat(mInfo.totalTime);

    return(
    <div className='scrollView'>
      <div className='scrollView-top'>
        <span className='songName'>{mInfo.song}</span>
        <span className='singerName'> - {mInfo.artist}</span>
        <span className='time' ref='time'><em id='curTime'>{curTime}</em> / {totalTime}</span>
      </div>
      <div className='scrollView-barView' onClick={this.curClickHandler} >
        <div className='barbg' ref='barbg' >
          <div className='rdy' ></div>
          <div className='cur' ref='cur' style={{width:curwidth}}>
            <span className='' ref='curDot' style={{left:curDotleft}} onMouseDown={this.dragDot}></span>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
