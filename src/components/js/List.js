import React, { Component } from 'react';
// import '../style/List.css';
// import { Tabs, WhiteSpace } from 'antd-mobile';
import { NavLink, Route, Switch} from 'react-router-dom';
// import axios from 'axios';
import '../style/ListNext.css';
import PlayingFilms from './PlayingFilms';
import ComingFilms from './ComingFilms';

export default class List extends Component {
	render() {
		return(
			<div className="list-box">
				<div className="list-list">
				<NavLink activeClassName="aaa" to={"/List/PlayingFilms"}><div>正在热映</div></NavLink>
				<NavLink activeClassName="aaa" to={"/List/ComingFilms"}><div>即将上映</div></NavLink>
				</div>
				<div>
					<Switch>
						<Route path="/List/PlayingFilms" component={PlayingFilms} />
						<Route path="/List/ComingFilms" component={ComingFilms} />
					</Switch>
				</div>
			</div>
		)
	}
}

/*
class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "0",
			playingfilms: [],
			comingfilms: [],
			page: 0,
			num:0
		}

	}
	componentWillMount() {
		this.setState({
			id: this.props.match.params.tid
		})
	}
	componentDidMount() {
		this.gogo(this.state.id);
	}
	gogo(e) {
		var that =this;
		window.onscroll =  function () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var fixtop = parseInt(0.7*document.body.clientHeight);
			// console.log(scrollTop);
			// console.log(fixtop);
			if(scrollTop%fixtop==0 || scrollTop%fixtop==1 || scrollTop%fixtop==2){
				console.log(that.state.id)
				if(that.state.id==0){
					that.state.page++
					that.gogo(1);
				}else if(that.state.id == 1){
					that.state.num++
					that.gogo(0);
				}	
			}
		}
		// console.log(e)
		// console.log(this.state.page)
		// console.log(this.state.num)
		if(e==0){
			axios.get(`/v4/api/film/now-playing?page={this.state.page}&count=7`)
			.then((res)=>{
				// console.log(res)
			var playdata = this.state.playingfilms.concat(res.data.data.films)
				this.setState({
					playingfilms: playdata
				})
				// console.log(this.state.playingfilms)
			})
		}else if(e==1){
			
			axios.get(`/v4/api/film/coming-soon?page={this.state.num}&count=7`)
			.then((res)=>{
				 // console.log(res)
				 var comdata = this.state.comingfilms.concat(res.data.data.films)
				this.setState({
					comingfilms : comdata
				})
				// console.log(this.state.comingfilms)
				// console.log(this.state.num)
			})
		}
	}
	render() {
		// console.log("44444444444")
		if(this.state.id==="noe-playing"){
			this.state.id = 0;
		}else{
			this.state.id = 1;
		}
		var id = Number(this.state.id);
	
		// console.log(this.state.playingfilms)
		const tabs = [
			{ title: '正在热映' },
			{ title: '即将上映' }
		];
		return( 
			  <div className="list-box">
			    <WhiteSpace />
			    <Tabs tabs={tabs} initialPage={id} animated={false} useOnPan={false} swipeable={false} onChange={(tab, index)=>this.gogo(index)}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						<ul className="list-list">
						    {
						    	this.state.playingfilms.map(function(item, index){
						    		return(
						        		<li key={item.id} className="list-all">
						        			<div className="list-image"><img src={item.poster.origin} /></div>
						        			<div className="list-right">
						        				<div className="list-rone"><span className="list-name">{item.name}</span><span className="list-num">{item.grade}<i className="icon iconfont iconr">&#xe65e;</i></span></div>
						        				<div className="list-rtwo">{item.intro}</div>
						        				<div className="list-rthree"><span className="list-cinema">{item.cinemaCount}家影院上映</span><span className="list-watch">{item.watchCount}人购票</span></div>
						        			</div>
						        		</li>
						    		)
						    	})
						    }
						</ul>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f9f9f9' }}>
						<ul className="list-list">
						    {
						    	this.state.comingfilms.map(function(item, index){
						    		return(
						        		<li key={item.id} className="list-all">
						        			<div className="list-image"><img src={item.poster.origin} /></div>
						        			<div className="list-right">
						        				<div className="list-rone"><span className="list-name">{item.name}</span><span className="list-num"><i className="icon iconfont iconr">&#xe65e;</i></span></div>
						        				<div className="list-rtwo">{item.intro}</div>
						        				<div className="list-rthree"><span className="list-cinema">3月2日家影院上映</span><span className="list-week">星期五</span></div>
						        			</div>
						        		</li>
						    		)
						    	})
						    }
						</ul>
					</div>
			    </Tabs>
			    <WhiteSpace />
			  </div>
		)
	}
}

export default List;
*/