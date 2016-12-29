require('normalize.css/normalize.css');
require('styles/App.scss');
require('../fonts/icons/iconfont.css');
import React from 'react';
import ReactDOM from 'react-dom';
import ContainerSidebar from './ContainerSidebar';
import drag from './Drag';
// import {getData} from './server';
// var ttt;
// getData()
// .then(function(data){
//   console.log(data);
//   ttt=data;
// })
// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      position:{
        left:0,
        top:0
      }
    };
    this.dragApp=this.dragApp.bind(this);
    this.updatePosition=this.updatePosition.bind(this);
    this.getAppPosition=this.getAppPosition.bind(this)
  }
  componentDidMount(){
    // ReactDOM.findDOMNode(this.refs.app).onclick=()=>{
    //   console.log('app')
    // }
    // document.body.addEventListener('click',(event)=>{
    //   console.log('body')
    // })
    // ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
    //   console.log('app')
    // }, false);
  }
  dragApp(event){
    // console.log(event.target.parentNode);
    drag(event.target.parentNode,event,'xy'); //拖拽是异步执行
    // console.log(event.target.parentNode);
    setTimeout(this.updatePosition,1000); //在获取app的left和top的时候，要在drag完成后。
  }
  updatePosition(){
    let appD=ReactDOM.findDOMNode(this.refs.app);
    let left=appD.style.left,
      top=appD.style.top;
      // console.log(left,top)
      left=left.substring(left,left.length-2);
      top=top.substring(top,top.length-2);
    this.setState({
      position:{
        left:left,
        top:top
      }
    });
  }

  getAppPosition(){
    let appD=ReactDOM.findDOMNode(this.refs.app);
    let left=appD.style.left,
    top=appD.style.top;
    console.log(left,top)
    left=left.substring(left,left.length-2);
    top=top.substring(top,top.length-2);
    return {
       left:left,
       top:top
    }
  }

  render() {
    return (
      <div className='app clearfix' ref="app" >


        <div className='top clearfix' onMouseDown={(event)=>this.dragApp(event)}>
          <div className='top-left'>
            <span className=''></span>
            <span className=''>我的音乐</span>
          </div>
          <div className='top-right'>
            <ul>
              <li className='iconfont icon-min-lighter'></li>
              <li className='iconfont icon-max-lighter'></li>
              <li className='iconfont icon-close-lighter'></li>
            </ul>
          </div>
        </div>


        <div className='container clearfix'>
          <div >
             {/*this.props.sidebar||<Sidebar/>*/}
             <ContainerSidebar/>
          </div>
          <div className='container-content'>
             {this.props.content}
          </div>
        </div>
        <div >
          {this.props.audioPlay&& React.cloneElement(this.props.audioPlay, {position:this.state.position,getAppPosition:this.getAppPosition})}
        </div>


      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
