import React from 'react';
import ReactDOM from 'react-dom';
import ScrollView from './ScrollView';
import Volume from './Volume';
import {Music,playList}from './Music';
import {PlayList} from './PlayList'
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
    this.mPlay=this.mPlay.bind(this);
    this.pPrev=this.pPrev.bind(this);
    this.pNext=this.pNext.bind(this);
  }
  // aduioControll=ReactDOM.findDOMNode(this.refs.aduioControll);
  mPlay(){
    this.props.audioPlay();
  }
  pNext(){
    this.props.audioPlayPrevOrNext(1);
  }
  pPrev(){
    this.props.audioPlayPrevOrNext(-1);
  }
  render(){
    let playClass='iconfont play-icon '+(this.props.mInfo.status=='pause'?'icon-bofang':'icon-pause1');
    return(
      <div ref='aduioControll' className='audioPlay-audioController'>
      <span id='pprev' className='iconfont icon-pprev' onClick={this.pPrev}></span>
      <span id='play' className={playClass} onClick={this.mPlay}></span>
      <span id='pnext' className='iconfont icon-pnext' onClick={this.pNext}></span>
      </div>
    );
  }
}

class AudioPlay extends React.Component{
  constructor(props){
    super(props);
    this.state={
      controll:{
        volume:0.5,
        setVolume:function(v){
          this.volume=v;
          return this;
        },
        mIndex:0 ,//控制播放第几首音乐
        setMIndex:function(v){
          this.mIndex=v;
          return this;
        }
      },
      mInfo:new Music({
        artist:'许巍',
        song:'世外桃源',
        totalTime:287.5,
        curTime:0,
        url:'../resource/许巍 - 世外桃源.mp3',
        status:'pause',
        dragTime:-1
      }),
      playList:playList
    };
    this.audioD; //audio对象
    this.intervalId; //定时器id，控制scrollview内容更新
    this.audioPlay=this.audioPlay.bind(this); //控制暂停和播放
    this.setMusicOffset=this.setMusicOffset.bind(this);
    this.curClickHandler=this.curClickHandler.bind(this); //点击播放进度条处理事件
    this.dotDragHandler=this.dotDragHandler.bind(this); //拖动进度条处理事件
    this.volumeClickHandler=this.volumeClickHandler.bind(this); //点击音量控制
    this.playListShowClickHandler=this.playListShowClickHandler.bind(this);//播放列表展示
    this.playListShowBlurHandler=this.playListShowBlurHandler.bind(this);//播放列表展示
    this.playListMusicPlay=this.playListMusicPlay.bind(this);//双击播放列表歌曲播放
    this.audioPlayPrevOrNext=this.audioPlayPrevOrNext.bind(this);
  }
  componentDidMount(){
     this.audioD=new Audio(this.state.mInfo.url);
     window.onresize=()=>{
       this.setState({
         mInfo:this.state.mInfo
         }
       );
     }
     document.body.addEventListener('click',(event)=>{
        let targetClass=event.target.parentNode.className;
        let playListShow=ReactDOM.findDOMNode(this.refs.playListShow);
        if(targetClass.indexOf('playList')===-1){ //点击播放列表之外，将播放列表隐藏
           playListShow.className="playList-show hidden";
        }

     })
  }
  audioPlay(){
    if(this.audioD.paused){
      this.audioD.play();
      this.setState({
        mInfo:this.state.mInfo.setStatus('play')
      });
      this.setTime();
    }else{
      clearInterval(this.intervalId);
      this.audioD.pause();
      this.setState({
        mInfo:this.state.mInfo.setStatus('pause')
      });
    }
  }

  audioPlayPrevOrNext(f){ //f=-1上一首，f=1下一首
    let length=this.state.playList.length;
    let mIndex=(length+this.state.controll.mIndex+f)%length;
    this.setState({
      controll:this.state.controll.setMIndex(mIndex),
      mInfo:new Music(this.state.playList[mIndex])
    },()=>{
      this.audioD.pause();
      this.audioD=new Audio(this.state.mInfo.url);
      clearInterval(this.intervalId);
      this.audioPlay();
    });
  }
  setTime(){
    this.intervalId=setInterval(()=>{
      let audioD=this.audioD;
      this.setState({
        mInfo:this.state.mInfo.setCurTime(audioD.currentTime)
      });
      if(this.audioD.ended){
        this.setState({
           mInfo:this.state.mInfo.setCurTime(0).setStatus('pause')
        });
        clearInterval(this.intervalId);
        this.audioPlayPrevOrNext(1);
      }
    },1000);
  }
  curClickHandler(curTime){
    this.setMusicOffset(curTime);
    this.audioD.currentTime=curTime;
    if(this.audioD.paused){
      console.log('play');
      this.audioD.play();
      this.setState({
        mInfo:this.state.mInfo.setStatus('play')
      });
      this.setTime();
    }
  }
  dotDragHandler(isDown,dragTime){
    if(isDown){ //鼠标按下拖动进度条点，设置拖动到的时间点
      this.setState({
        mInfo:this.state.mInfo.setDragTime(dragTime)
      });
    }else{   //鼠标抬起设置audio的currentTime
       this.audioD.currentTime=this.state.mInfo.dragTime;
       this.setState({
         mInfo:this.state.mInfo.setCurTime(this.audioD.currentTime).setDragTime(-1)
      });
      if(this.audioD.paused){
        console.log('play');
        this.audioD.play();
        this.setState({
          mInfo:this.state.mInfo.setStatus('play')
        });
        this.setTime();
     }
    }
  }
  setMusicOffset(curTime){
    this.setState({
      mInfo:this.state.mInfo.setCurTime(curTime)
    });
  }
/**音量控制start */
volumeClickHandler(v){
  if(v<0.01){
    this.audioD.volume=0;
    this.setState({
       controll:this.state.controll.setVolume(0)
    });
  }else{
    this.audioD.volume=v;
    this.setState({
       controll:this.state.controll.setVolume(v)
    });
  }


  // console.log(v);
}

/**音量控制end */

/**播放列表start */
playListShowClickHandler(event){
  event.stopPropagation();
  let playListShow=ReactDOM.findDOMNode(this.refs.playListShow);
  //  console.log(playListShow.className,'click')
  if(playListShow.className=="playList-show"){
    playListShow.className="playList-show hidden";
  }else{
    playListShow.className="playList-show";
  }
   console.log(playListShow.className,'click')
}
playListShowBlurHandler(event){
  console.log(event.target.className,'blur')
  if(!event.target.className.indexOf('playList')){
    let playListShow=ReactDOM.findDOMNode(this.refs.playListShow);
    playListShow.className="playList-show hidden";
  }
}
playListMusicPlay(key){
  this.setState({
    mInfo:new Music(this.state.playList[key]) ,
    controll:this.state.controll.setMIndex(key)
  },()=>{
    console.log(key,this.state.mInfo);
    this.audioD.pause();
    this.audioD=new Audio(this.state.mInfo.url);
    clearInterval(this.intervalId);
    this.audioPlay();
  });
}

/**播放列表end */
  render(){
    return (
      <div className='audioPlay' >

        <AudioImg/>
        <AduioController audioPlay={this.audioPlay} mInfo={this.state.mInfo} audioPlayPrevOrNext={this.audioPlayPrevOrNext}/>
        <ScrollView
            mInfo={this.state.mInfo}
            setMusicOffset={this.setMusicOffset}
            position={this.props.position}
            getAppPosition={this.props.getAppPosition}
            dotDragHandler={this.dotDragHandler}
            curClickHandler={this.curClickHandler}
        />
        <div className="audioPlay-right" >
          <span className="iconfont icon-xihuan1 like"></span>
          <span className="iconfont icon-bofangliebiao1 order"></span>
          <Volume volumeClickHandler={this.volumeClickHandler} controll={this.state.controll}/>
          <div  className="playList"  onClick={this.playListShowClickHandler}>
              <div className="playList-show hidden"  ref="playListShow"><PlayList playListMusicPlay={this.playListMusicPlay} playList={this.state.playList} controll={this.state.controll}/></div>
              <div className="playList-icon" onClick={this.playListShowClickHandler} >
                 <span className="iconfont icon-bofangliebiao"></span>
                 <span className="number">{this.state.playList.length}</span>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AudioPlay;
