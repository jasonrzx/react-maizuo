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