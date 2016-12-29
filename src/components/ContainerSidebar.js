import React from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router';
//import {CustomScrollbars} from './CustomScrollbars';
import {Scrollbars} from 'react-custom-scrollbars';
import {eleTraversal} from './utils'
const Icon = ({iconName})=>{
  let className='iconfont '+iconName;
  return(
    <i className={className}></i>
  );
}
const SidebarLink =(props)=>{
  return (
    <Link {...props} className='sidebar-link' activeClassName='sidebar-link__active'/>
  );
}

const SidebarItem=({children,path,iconName})=>{
  return (
    <div>
      <SidebarLink to={path}><Icon iconName={iconName} /><span>{children}</span></SidebarLink>
    </div>
  );
}

const SidebarHeader=(props)=>{
  const sidbarMinorMax=()=>{
    // document.querySelectorAll(".sidebar*")
    props.sidbarMinorMax();
  }
  return (
    <div className='sidebar-header' onClick={sidbarMinorMax}>
      <Icon iconName='icon-sangang'/>
    </div>
  );
}
const SidebarBase=()=>{
 return(
    <div className='sidebar-base'>
      <SidebarItem path='/'  iconName='icon-sousuo'>搜索</SidebarItem>
      <SidebarItem path='/findMusic'   iconName='icon-yinle'>发现音乐</SidebarItem>
      <SidebarItem path='/mv'  iconName='icon-mv1'>MV</SidebarItem>
      <SidebarItem path='/friends'  iconName='icon-pengyou'>朋友</SidebarItem>
  </div>
 );
}
const SidebarMyMusic=()=>{
  return(
    <div className='sidebar-myMusic'>
      <div className='sidebar-myMusic-title'>我的音乐</div>
      <SidebarItem path='/'  iconName='icon-bendiyinle'>本地音乐</SidebarItem>
      <SidebarItem path='/findMusic'   iconName='icon-icon'>下载管理</SidebarItem>
      <SidebarItem path='/mv'  iconName='icon-zuijin'>最近播放</SidebarItem>
      <SidebarItem path='/friends'  iconName='icon-5'>我音乐云盘</SidebarItem>
      <SidebarItem path='/friends'  iconName='icon-wodeshoucang'>我的收藏</SidebarItem>
  </div>
  )
}
const SidebarPlaylist=()=>{
  return(
      <div className='sidebar-playlist'>
      <div className='sidebar-palylist-title'>我的音乐<i className='iconfont icon-zengjia'></i></div>
      <SidebarItem path='/'  iconName='icon-bendiyinle'>本地音乐</SidebarItem>
      <SidebarItem path='/findMusic'   iconName='icon-icon'>下载管理</SidebarItem>
      <SidebarItem path='/mv'  iconName='icon-zuijin'>最近播放</SidebarItem>
      <SidebarItem path='/friends'  iconName='icon-5'>我音乐云盘</SidebarItem>
      <SidebarItem path='/friends'  iconName='icon-wodeshoucang'>我的收藏</SidebarItem>
  </div>
  );
}

const SidebarUser=()=>{
  return(
    <div className='sidebarUser'>
      <span className='iconfont icon-u_icon sidebarUser-avator'></span>
      <span className='sidebarUser-name'>Sivkun</span>
      <span className='iconfont icon-youjian sidebarUser-email'></span>
      <span className='iconfont icon-shezhi sidebarUser-setting'></span>
    </div>
  );
}

class ContainerSideBar extends React.Component{
  constructor(props){
    super(props);
    this.sidbarMinorMax=this.sidbarMinorMax.bind(this);
  }
  componentDidMount(){
    let resizeListener=()=>{
      let ww=window.innerWidth;
      let sidebarO=ReactDOM.findDOMNode(this.refs.sidebar);
      if(ww<801&&sidebarO.className!='sidebarMin clearfix'){
        let eles=eleTraversal(sidebarO);
        eles.forEach((item,index)=>{
          item.className=item.className.replace(/(sidebar)([^M])/g,(m,p1,p2)=>{
             return 'sidebarMin'+p2;
          });
        });
          sidebarO.className='sidebarMin clearfix';
       }else if(ww>=801&&sidebarO.className!='sidebar clearfix'){
         let eles=eleTraversal(sidebarO);
         eles.forEach((item,index)=>{
           item.className=item.className.replace(/sidebarMin/g,'sidebar');
         });
         sidebarO.className='sidebar clearfix';
       }
    };
    resizeListener();//当刚加载时候，根据窗体大小响应式变化。
    window.addEventListener('resize',resizeListener);
  }
  sidbarMinorMax(){
    let sidebarO=ReactDOM.findDOMNode(this.refs.sidebar);
    if(sidebarO.className=='sidebar clearfix'){
     let eles=eleTraversal(sidebarO);
     eles.forEach((item,index)=>{
       item.className=item.className.replace(/sidebar/g,'sidebarMin');
     });
      sidebarO.className='sidebarMin clearfix'
    }else{
        let eles=eleTraversal(sidebarO);
        eles.forEach((item,index)=>{
          item.className=item.className.replace(/sidebarMin/g,'sidebar');
        });
          sidebarO.className='sidebar clearfix'
    }
  }

  render(){
    return(
      <div ref="sidebar" className='sidebar clearfix'>
        <SidebarHeader sidbarMinorMax={this.sidbarMinorMax}/>
          <Scrollbars
           className="sidebar-scrollbar"
           style={{ width: '18.2rem', height: 500}}
           autoHide
           autoHideTimeout={2000}
           autoHideDuration={500}
           renderThumbHorizontal={props => <div {...props} className='thumb-horizontal'/>}
           renderThumbVertical={props => <div {...props} className='thumb-vertical'/> }
           >
            <SidebarBase/>
            <SidebarMyMusic/>
            <SidebarPlaylist/>
          </Scrollbars>
          <SidebarUser/>
       </div>
    )
  }
}
ContainerSideBar.defaultProps = {

};
export default  ContainerSideBar;


