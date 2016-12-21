import React from 'react';
import {Link} from 'react-router';
//import {CustomScrollbars} from './CustomScrollbars';
import {Scrollbars} from 'react-custom-scrollbars';

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
      <SidebarLink to={path}><Icon iconName={iconName} />{children}</SidebarLink>
    </div>
  );
}

const SidebarHeader=()=>{
  return (
    <div className='sidebar-header'>
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
  }
  render(){
    return(
      <div className='sidebar clearfix'>
        <SidebarHeader/>
          <Scrollbars
           style={{ width: '20.2rem', height: 500}}
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


