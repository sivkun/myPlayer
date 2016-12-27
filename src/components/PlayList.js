import React from 'react'
import ReactDOM from 'react-dom'
import Scrollbars from 'react-custom-scrollbars'
import {timeFormat} from './utils'
class PlayListItem extends React.Component{
  constructor(props){
    super(props);
    this.itemMouseDownHandler=this.itemMouseDownHandler.bind(this);
    this.itemMouseUpHandler=this.itemMouseUpHandler.bind(this);
  }
  itemMouseDownHandler(){
     let playListItem=ReactDOM.findDOMNode(this.refs.playListItem);
     playListItem.className='playListItem zoomf';
  }
  itemMouseUpHandler(){
      let playListItem=ReactDOM.findDOMNode(this.refs.playListItem);
      playListItem.style.transition='all .25s ease-in';
      playListItem.className='playListItem';
      setTimeout(()=>playListItem.style.transition='',300);

  }
  itemDbClickHandler(key){
    // console.log(key)
    this.props.playListMusicPlay(key);

  }
  render(){
    let item=this.props.item,
        isPlay=this.props.isPlay,
        styleO,styleStatus;
    if(isPlay){
      styleStatus={color:'#BC2F2E',visibility:'visible',opacity:'1' };
      styleO={color:'#BC2F2E'}
    }
    return(
      <div tabIndex='0' onDoubleClick={this.itemDbClickHandler.bind(this,this.props.index)} className='playListItem' ref='playListItem' style={styleO} onMouseDown={this.itemMouseDownHandler} onMouseUp={this.itemMouseUpHandler}>
        <span   style={styleStatus} className='iconfont icon-right status'></span>
        <div    style={styleO} className='songCon'>{item.song}</div>
        <span   style={styleO} className='artist'>{item.artist}</span>
        <span   style={styleO} className='time'>{item.totalTime}</span>
        <span  tabIndex='1' style={styleO} className='iconfont icon-icon1 delete'></span>
      </div>
    );
  }
}
class PlayList extends React.Component{
  componentDidMount(){
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
        console.log('playlist');
        event.stopPropagation();
      }, false);
  }
  render(){
   let playList=this.props.playList;
   let mIndex=this.props.controll.mIndex;
   let playListItemArr=playList.map((item,index)=>{
     let isPlay=false;
     if(mIndex===index){
       isPlay=true;
     }
     return <PlayListItem key={index} index={index} item={{song:item.song,artist:item.artist,totalTime:timeFormat(item.totalTime)}} isPlay={isPlay} playListMusicPlay={this.props.playListMusicPlay}/>
   });

   return(
     <div className='list'>
        <div className='list-top'>
         <span className='musicList' onClick={(event)=>{event.stopPropagation();event.nativeEvent.stopImmediatePropagation();}}>播放列表</span>
         <span className='collection'><i className='iconfont icon-shoucang'></i>收藏全部</span>
         <span className='clearAll'><i className='iconfont icon-qingkong'></i>清空</span>
         <span className='iconfont icon-icon1 ltclose'></span>
       </div>
       <Scrollbars
           style={{ width: '50.3rem', height: '45.6rem'}}
           autoHide
           autoHideTimeout={2000}
           autoHideDuration={500}
           renderThumbHorizontal={props => <div {...props} className='thumb-horizontal'/>}
           renderThumbVertical={props => <div {...props} className='thumb-vertical'/> }
           >
           <div className='list-container'>
          {playListItemArr}
           </div>
      </Scrollbars>
    </div>

   )
  }
}
export {PlayList}
