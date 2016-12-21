import { Scrollbars } from 'react-custom-scrollbars';
import {React,Component} from 'react';

export default class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
        renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
