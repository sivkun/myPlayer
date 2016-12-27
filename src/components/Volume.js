import React from 'react'
import ReactDOM from 'react-dom'
import drag from './Drag'
export default class Volume extends React.Component{
  constructor(props){
    super(props);
    this.vcbarViewD=null;
    this.volume;
    this.volumeClickHandler=this.volumeClickHandler.bind(this);
    this.curDotDragHandler=this.curDotDragHandler.bind(this);
    this.showVolumeHandler=this.showVolumeHandler.bind(this);
  }
  componentDidMount(){
    let vcbarViewD=ReactDOM.findDOMNode(this.refs.vcbarView);
    this.vcbarViewD=vcbarViewD;
    ReactDOM.findDOMNode(this.refs.vcShow).addEventListener('click',(event)=>{
      event.stopPropagation();
      console.log('dddd');
    },false);
    document.body.addEventListener('click',(event)=>{
      let targetClass=event.target.parentNode.className;
      console.log(targetClass)
      let vcShow=ReactDOM.findDOMNode(this.refs.vcShow);
      if(targetClass.indexOf('volume')===-1){ //点击播放列表之外，将播放列表隐藏
         vcShow.className="volume-controll hidden";
      }
    })
  }
  volumeClickHandler(event){  //由有onClick改为onMouseDown触发，
       event.preventDefault();
       event.stopPropagation();
       if(event.target.className!=="curDot"){ //使点击点无反应
        let barbgD=ReactDOM.findDOMNode(this.refs.barbg);
        let v=(event.nativeEvent.offsetX-2)/barbgD.offsetWidth
        this.props.volumeClickHandler(v);
       }
  }
  curDotDragHandler(event){
    let vcbarViewD=ReactDOM.findDOMNode(this.refs.vcbarView);
    let callback=(flag=true,v)=>{
      v=v/vcbarViewD.clientWidth;
      if(flag===true){
      this.props.volumeClickHandler(v);
      }
    }
    drag(event.target,event,'x',callback,-5,vcbarViewD.clientWidth-15);
  }

  showVolumeHandler(){
    let vcShowD=ReactDOM.findDOMNode(this.refs.vcShow);
        if(vcShowD.className==="volume-controll hidden"){
          vcShowD.className="volume-controll"
        }else{
          vcShowD.className='volume-controll hidden'
        }
  }

  render(){
    let volume=this.props.controll.volume,
        curWidth,curDotLeft;
        // console.log(this.vcbarViewD)
     if(this.vcbarViewD===null){
       curWidth="50%";
     }else{
       curWidth=volume*this.vcbarViewD.clientWidth;
       curDotLeft=curWidth-5;
     }
    //  console.log(curWidth,curDotLeft);
    return(
      <div ref='volume' className="volume">
        <div className="volume-controll hidden" ref="vcShow" >
          <div className="vcarrow">
            <em></em>
            <i></i>
          </div>

          <span className='iconfont icon-volume2 vc-icon'></span>

          <div className='vcbarView' ref='vcbarView' onMouseDown={this.volumeClickHandler} >
            <div className='barbg' ref='barbg'>
              <div className='cur' ref='cur' style={{width:curWidth}}>
                <span className="curDot" ref='curDot' style={{left:curDotLeft}} onMouseDown={this.curDotDragHandler}></span>
              </div>
            </div>
          </div>

        </div>

        <span className="iconfont icon-volume2" onClick={this.showVolumeHandler}></span>
      </div>
    )
  }
}

