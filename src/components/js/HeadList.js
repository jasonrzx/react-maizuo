import React, { Component } from 'react';
import '../style/HeadList.css';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';


class HeadList extends Component {
  state = {
    open: true,
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    // fix in codepen
    const sidebar = (<List>
      {["首页", "影片"].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            // thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          // thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    return (<div>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        Click upper-left corner
      </Drawer>
    </div>);
  }
}

// ReactDOM.render(<App1 />, mountNode);
export default HeadList;

// export default class HeadList extends Component {
// 	render() {
// 		var arr = [
// 			"首页",
// 			"影片",
// 			"影院",
// 			"商城",
// 			"我的",
// 			"卖座卡"
// 		];
		
// 		return(
// 			<div className="header-move">
// 			 	<div className="header-mask">
// 					<div className="header-aside">
// 						<ul>
// 							{
// 								arr.map(function(item, index){
// 									return (
// 										<li key={index}>
// 											<a>
// 												<span>{item}</span>
// 												<span><i className="icon iconfont">&#xe65e;</i></span>
// 											</a>
// 										</li>
// 									)
// 								})
// 							}
// 						</ul>
// 					</div>
// 				</div>	
// 			</div>
// 		)
// 	}
// }