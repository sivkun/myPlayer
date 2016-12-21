import React from 'react';
import ReactDOM from 'react-dom';
import ScrollView from './ScrollView';
import Volume from './Volume';
const AudioImg=()=>{
  return(
    <div className='audioPlay-audioImg'>
      <div className='shadeLayer show'>
      </div>
    </div>
    );
}
class AduioController extends React.Component{
  constructor(props){
    super(props);
    this.pPlay=this.pPlay.bind(this);
  }
  // aduioControll=ReactDOM.findDOMNode(this.refs.aduioControll);
  pPlay(){
    this.props.audioPlay();
  }
  pNext(){

  }
  pPrev(){

  }
  render(){
    let playClass='iconfont '+(this.props.mInfo.status=='pause'?'icon-bofang':'icon-pause1');
    return(
      <div ref='aduioControll' className='audioPlay-audioController'>
      <span id='pprev' className='iconfont icon-pprev'></span>
      <span id='play' className={playClass} onClick={this.pPlay}></span>
      <span id='pnext' className='iconfont icon-pnext'></span>
      </div>
    );
  }
}

class AudioPlay extends React.Component{
  constructor(props){
    super(props);
    this.state={
      artist:'许巍',
      song:'世外桃源',
      totalTime:287.5,
      curTime:0,
      url:'../resource/许巍 - 世外桃源.mp3',
      status:'pause',
      dragTime:-1
    };
    this.audioD; //audio对象
    this.intervalId; //定时器id，控制scrollview内容更新
    this.audioPlay=this.audioPlay.bind(this); //控制暂停和播放
    this.setMusicOffset=this.setMusicOffset.bind(this);
    this.curClickHandler=this.curClickHandler.bind(this); //点击播放进度条处理事件
    this.dotDragHandler=this.dotDragHandler.bind(this); //拖动进度条处理事件
  }
  componentDidMount(){
     this.audioD=ReactDOM.findDOMNode(this.refs.audio);
     window.onresize=()=>{
       this.setState({
         curTime:this.state.curTime
       });
     }
  }
  audioPlay(){
    if(this.audioD.paused){
      // console.log('play');
      this.audioD.play();
      this.setState({status:'play'});
      this.setTime();
    }else{
      clearInterval(this.intervalId);
      // console.log('pause')
      this.audioD.pause();
      this.setState({status:'pause'});
    }
  }
  setTime(){
    this.intervalId=setInterval(()=>{
      this.setState({
        curTime:this.audioD.currentTime,
        totalTime:this.audioD.duration
      });
      if(this.audioD.ended){
        this.setState({
          curTime:0,
          status:'pause'
        });
        clearInterval(this.intervalId);
      }
    },1000);
  }
  curClickHandler(curTime){
    this.setMusicOffset(curTime);
    this.audioD.currentTime=curTime;
    if(this.audioD.paused){
      console.log('play');
      this.audioD.play();
      this.setState({status:'play'});
      this.setTime();
    }
  }
  dotDragHandler(isDown,dragTime){
    if(isDown){ //鼠标按下拖动进度条点，设置拖动到的时间点
      this.setState({
        dragTime:dragTime
      });
    }else{   //鼠标抬起设置audio的currentTime
       this.audioD.currentTime=this.state.dragTime;
       this.setState({
        curTime:this.audioD.currentTime,
        dragTime:-1
      });
      if(this.audioD.paused){
        console.log('play');
        this.audioD.play();
        this.setState({status:'play'});
        this.setTime();
     }
    }
  }
  setMusicOffset(curTime){
    this.setState({
      curTime:curTime
    });
  }


  render(){
    // console.log(this.props.position)
    return (
      <div className='audioPlay' >
        <audio ref='audio'  style={{display:'none'}}>
          <source src={this.state.url} />
        </audio>
        <AudioImg/>
        <AduioController audioPlay={this.audioPlay} mInfo={this.state}/>
        <ScrollView
            mInfo={this.state}
            setMusicOffset={this.setMusicOffset}
            position={this.props.position}
            getAppPosition={this.props.getAppPosition}
            dotDragHandler={this.dotDragHandler}
            curClickHandler={this.curClickHandler}
        />
        <div className="audioPlay-right" >
          <span className="iconfont icon-xihuan1 like"></span>
          <span className="iconfont icon-bofangliebiao1 order"></span>
          <Volume/>
        </div>
      </div>
    );
  }
}
export default AudioPlay;
