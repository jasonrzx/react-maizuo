import React, { Component } from 'react';
import '../style/List.css';
import {Link} from 'react-router-dom';
import { Toast } from 'antd-mobile';
import $ from 'jquery';
import axios from 'axios';

export default class PlayingFilms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			playingfilms: [],
			pagecount: ''
		}
		this.GetFilms = this.GetFilms.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
		this.GetFilms();
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll() {
		// var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		//var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		// clientHeight = parseInt(0.4*clientHeight)
		var divTop = $(".list-box").height();
		var scrolltop = $(document).scrollTop();
		var clientHeight = $(window).height();
		//console.log($(".list-box").height(), "1111111111", $(document).scrollTop(),"------", $(window).height())

		if( divTop-clientHeight-scrolltop+50<=0){
			var newpage = this.state.page+1;
			if(newpage <= this.state.pagecount){
				this.setState({
					page: newpage
				})
				this.GetFilms()
			}
		}
	}	
	
	GetFilms() {
		axios.get(`/v4/api/film/now-playing?page=${this.state.page}&count=7`)
		.then((res)=>{
			// console.log(res)
			var filmsdata = this.state.playingfilms.concat(res.data.data.films)
			this.setState({
				pagecount: res.data.data.page.total,
				playingfilms: filmsdata
			})
		})

		Toast.loading('Loading...', 1, () => {
			//console.log('Load complete !!!');
		});

	}
	render() {
		return(
			<div>
				{
					this.state.playingfilms.map(function(item, index){
						return(
			        		<li key={index} className="list-all">
				        		<Link to={"/Detail/"+item.id}>
				        			<div className="list-image"><img src={item.poster.origin} /></div>
				        			<div className="list-right">
				        				<div className="list-rone"><span className="list-name">{item.name}</span><span className="list-num">{item.grade}<i className="icon iconfont iconr">&#xe65e;</i></span></div>
				        				<div className="list-rtwo">{item.intro}</div>
				        				<div className="list-rthree"><span className="list-cinema">{item.cinemaCount}家影院上映</span><span className="list-watch">{item.watchCount}人购票</span></div>
				        			</div>
			        			</Link>
			        		</li>
			    		)
					}) 
				}
			</div>
		)
	}
}