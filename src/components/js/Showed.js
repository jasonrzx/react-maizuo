import React, { Component } from 'react';
import '../style/Showed.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { Toast } from 'antd-mobile';

class ShowedUI extends Component {
	render() {
		return (
			<div className="films-main">
				<ul className="films-list">
					{
						this.props.showedfilms.map(function(item, index){
							return (
								<li key={item.id} className="films-wat">
									<Link to={"/Detail/" + item.id}>
										<div className="films-all">
											<img className="films-image" src={item.cover.origin} />
											<div className="films-details">	
												<div className="films-bom">
													<div className="flims-name">{item.name}</div>
													<div className="flims-num"><span className="flims-cinemaCount">{item.cinemaCount}家影院上映</span><span className="flims-watchCount">{item.watchCount}人购票</span></div>	
												</div>
												<div className="flims-grade">{item.grade}</div>
											</div>
										</div>
									</Link>
								</li>
							)
						})
					}
					<Link to={"/List/PlayingFilms"}><div className="films-hitmore">更多热映电影</div></Link>
				</ul>
				<div className="willshow-line"><div className="willshow">即将上映</div></div>
				<ol className="films-list">
					{
						this.props.willshowfilms.map(function(item, index){
							return (
								<li key={item.id} className="films-wat">
									<Link to={"/Detail/" + item.id}>
									<div className="films-all">
										<img className="films-image" src={item.cover.origin} />
										<div className="willfilms-details">
											<div className="willfilms-name">{item.name}</div>
											<div className="willfilms-data">3月2日上映</div>
										</div>
									</div>
									</Link>
								</li>
							)
						})
					}
					<Link to={"/List/ComingFilms"}><div className="films-willmore">更多即将热映电影</div></Link>
				</ol>
			</div>
		)
	}
	componentDidMount() {
		this.props.GetFilms()
		this.props.GetWillFilms()
	}
}
const mapStateToProps = (state, props) => {
	return {
		showedfilms: state.filmsed,
		willshowfilms: state.willfilms
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		GetFilms: function() {
			axios.get("/v4/api/film/now-playing?__t=1518062660575&page=1&count=5")
			.then((res)=>{
				// console.log(res);
				// 把数据发送给store
				dispatch({
					type: "Get_Films_Data",
					payload: res.data.data.films
				})
			})
			Toast.loading('Loading...', 1, () => {
				//console.log('Load complete !!!');
			});
		},
		GetWillFilms: function(){
			axios.get("/v4/api/film/coming-soon?__t=1519792530146&page=1&count=3")
			.then((res)=>{
				console.log(res);
				dispatch({
					type: "Get_WillFilms_Data",
					payload: res.data.data.films
				})
			})
			Toast.loading('Loading...', 1, () => {
				//console.log('Load complete !!!');
			});
		}
	}
}

const Showed = connect(mapStateToProps, mapDispatchToProps)(ShowedUI);

export default Showed;

/*antd-mobile方法
class ShowedUI extends Component {
	render() {
		var a = "noe-playing";
		var b = "coming-soon";
		return (
			
			<div className="films-main">
				<ul className="films-list">
					{
						this.props.showedfilms.map(function(item, index){
							return (
								<li key={item.id} className="films-wat">
									<Link to={"/Detail/" + item.id}>
										<div className="films-all">
											<img className="films-image" src={item.cover.origin} />
											<div className="films-details">	
												<div className="films-bom">
													<div className="flims-name">{item.name}</div>
													<div className="flims-num"><span className="flims-cinemaCount">{item.cinemaCount}家影院上映</span><span className="flims-watchCount">{item.watchCount}人购票</span></div>	
												</div>
												<div className="flims-grade">{item.grade}</div>
											</div>
										</div>
									</Link>
								</li>
							)
						})
					}
					<Link to={"/List/"+a}><div className="films-hitmore">更多热映电影</div></Link>
				</ul>
				<div className="willshow-line"><div className="willshow">即将上映</div></div>
				<ol className="films-list">
					{
						this.props.willshowfilms.map(function(item, index){
							return (
								<li key={item.id} className="films-wat">
									<div className="films-all">
										<img className="films-image" src={item.cover.origin} />
										<div className="willfilms-details">
											<div className="willfilms-name">{item.name}</div>
											<div className="willfilms-data">3月2日上映</div>
										</div>
									</div>
								</li>
							)
						})
					}
					<Link to={"/List/"+b}><div className="films-willmore">更多即将热映电影</div></Link>
				</ol>
			</div>
		)
	}
	componentDidMount() {
		this.props.GetFilms()
		this.props.GetWillFilms()
	}
}
const mapStateToProps = (state, props) => {
	return {
		showedfilms: state.filmsed,
		willshowfilms: state.willfilms
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		GetFilms: function() {
			axios.get("/v4/api/film/now-playing?__t=1518062660575&page=1&count=5")
			.then((res)=>{
				console.log(res);
				// 把数据发送给store
				dispatch({
					type: "Get_Films_Data",
					payload: res.data.data.films
				})
			})
		},
		GetWillFilms: function(){
			axios.get("/v4/api/film/coming-soon?__t=1519792530146&page=1&count=3")
			.then((res)=>{
				console.log(res);
				dispatch({
					type: "Get_WillFilms_Data",
					payload: res.data.data.films
				})
			})
		}
	}
}

const Showed = connect(mapStateToProps, mapDispatchToProps)(ShowedUI);

export default Showed;
*/

/*运用redux之前
export default class Showed extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	ShowedFilms: []
		// }
	}
	componentDidMount() {
		axios.get("/v4/api/film/now-playing?__t=1519694875000&page=1&count=5")
		.then((res)=>{
			console.log(res);
			// this.setState({
			// 	ShowedFilms: res.data.data.films
			// })
			// console.log(this.state.ShowedFilms)
			this.props.store.dispatch({
				type: "Get_Films_Data",
				payload: res.data.data.films
			})
		})
	}
	render() {
		var films = this.props.store.getState().films;
		return (
			<div>
				<ul>
					{
						films.map(function(item, index){
							return (
								<li key={item.id}>
									<h3>{item.name}</h3>
									<img src={item.cover.origin} />
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}
*/