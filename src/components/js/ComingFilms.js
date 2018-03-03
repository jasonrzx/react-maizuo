import React, { Component } from 'react';
import '../style/List.css';
import {Link} from 'react-router-dom'; 
import { Toast } from 'antd-mobile';
import axios from 'axios';

export default class PlayingFilms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			comingfilms: [],
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
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		clientHeight = parseInt(0.4*clientHeight)
		if(scrollTop%clientHeight===0 || scrollTop%clientHeight===1 || scrollTop%clientHeight===2 ){
			if(this.state.page < this.state.pagecount){
				this.state.page++;
				this.GetFilms();
			}
		}
	}
	GetFilms() {
		axios.get(`/v4/api/film/coming-soon?page=${this.state.page}&count=7`)
		.then((res)=>{
			// console.log(res)
			var Rcomingfilms = this.state.comingfilms.concat(res.data.data.films)
			this.setState({
				pagecount: res.data.data.page.total,
				comingfilms: Rcomingfilms
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
					this.state.comingfilms.map(function(item, index){
						return(
			        		<li key={item.id} className="list-all">
			        			<Link to={"/Detail/"+item.id}>
			        			<div className="list-image"><img src={item.poster.origin} /></div>
			        			<div className="list-right">
			        				<div className="list-rone"><span className="list-name">{item.name}</span><span className="list-num"><i className="icon iconfont iconr">&#xe65e;</i></span></div>
			        				<div className="list-rtwo">{item.intro}</div>
			        				<div className="list-rthree"><span className="list-cinema">3月2日家影院上映</span><span className="list-week">星期五</span></div>
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