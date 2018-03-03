import React, { Component } from 'react';
import '../style/Header.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';
import Cinema from './Cinema';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			list: {
				"one":"首页",
				"two":"影片",
				"three":"影院",
				"four":"商城",
				"five":"我的",
				"six":"卖座卡"
			}
	  	}
	}
	
  	componentDidMount() {
  		//百度定位
		var geoc = new window.BMap.Geocoder();
		var geolocation = new window.BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
				geoc.getLocation(r.point, function(rs){
					var addComp = rs.addressComponents;
					var mainmap = addComp.city;
					var mapp = document.getElementsByClassName("header-city")[0];
					// console.log(addComp)
					mapp.innerText = mainmap;
				});   
				
			}
			else {
				alert('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true});
  	}
  	
	onOpenChange = (...args) => {
		//console.log(args);
		this.setState({ open: !this.state.open });
	}
	render() {
	// fix in codepen
		const sidebar = (<List onClick={this.onOpenChange}>
			<Link to={"/"}><List.Item>{this.state.list.one}<i className="icon iconfont iconr">&#xe65e;</i></List.Item></Link>
			<Link to={"/List/PlayingFilms"}><List.Item>{this.state.list.two}<i className="icon iconfont iconr">&#xe65e;</i></List.Item></Link>
			<Link to={"/Cinema"}><List.Item>{this.state.list.three}<i className="icon iconfont iconr">&#xe65e;</i></List.Item></Link>
			<List.Item>{this.state.list.four}<i className="icon iconfont iconr">&#xe65e;</i></List.Item>
			<List.Item>{this.state.list.five}<i className="icon iconfont iconr">&#xe65e;</i></List.Item>
			<List.Item>{this.state.list.six}<i className="icon iconfont iconr">&#xe65e;</i></List.Item>
		</List>);

		return (
			<div>
				<NavBar icon={<i className="icon iconfont"><a className="header-more">&#xe6d1;</a><a className="header-movie">卖座电影</a></i>} onLeftClick={this.onOpenChange} rightContent={[
					<i key="1" className="icon iconfont"><span className="header-site"><a className="header-city"></a><a className="header-next">&#xe65f;</a></span><a className="header-pepo">&#xe618;</a></i>
					]}>
				</NavBar>
					<Drawer
					className="my-drawer"
					style={{  }}
					contentStyle={{ color: '#282828', textAlign: 'center', paddingTop: 50 }}
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={this.onOpenChange}
					>
					<span></span>
				</Drawer>
			</div>
		);
	}
}

	// constructor() {
	// 	super();
	// 	this.state = {
	// 		flagList: false
	// 	}
	// 	this.HavList = this.HavList.bind(this);
	// }
	// HavList() {
	// 	// console.log("2222222222222")
	// 	this.setState({
	// 		flagList: !this.state.flagList
	// 	})
	// 	// console.log("11111111111")
	// }
	// render() {
		// console.log(this.state.flagList)
		// var arr = [
		// 	"首页",
		// 	"影片",
		// 	"影院",
		// 	"商城",
		// 	"我的",
		// 	"卖座卡"
		// ]
		// var headlist = <div className="header-move">
		// 		 	<div className="header-mask">
		// 				<div className="header-aside">
		// 					<ul>
		// 						{
		// 							arr.map(function(item, index){
		// 								return (
		// 									<li key={index}>
		// 										<a>
		// 											<span>{item}</span>
		// 											<span><i className="icon iconfont">&#xe65e;</i></span>
		// 										</a>
		// 									</li>
		// 								)
		// 							})
		// 						}
		// 					</ul>
		// 				</div>
		// 			</div>	
		// 		</div>
	// 	var headlist = <HeadList />
	// 	if(!this.state.flagList){
	// 		headlist = null;
	// 	}
	// 	return (
	// 		<div className="header-all">
	// 			<div className="header-left" onClick={this.HavList}>
	// 				<div className="header-more"><i className="icon iconfont">&#xe6d1;</i></div>
	// 				<div className="header-movie"><a>卖座电影</a></div>
	// 			</div>
	// 			<div className="header-right">
	// 				<div className="header-site">
	// 					<a>北京</a>
	// 					<i className="icon iconfont">&#xe65f;</i>
	// 				</div>
	// 				<div className="header-my"><i className="icon iconfont">&#xe618;</i></div>
	// 			</div>
	// 			<ReactCSSTransitionGroup
	// 				transitionName="headlist"
	// 				transitionEnterTimeout={500}
	// 				transitionLeaveTimeout={500}
	// 			>
	// 			{headlist}
	// 			</ReactCSSTransitionGroup>
	// 		</div>
	// 	)
	// }
// }