import React, { Component } from 'react';
import '../style/Detail.css';
import axios from "axios";

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filmsdetail: null
		}
	}
	componentDidMount() {
		var id = this.props.match.params.fid;
		axios.get(`/v4/api/film/${id}?__t=1519743299565`)
		.then((res)=>{
			// console.log(res);
			this.setState({
				filmsdetail: res.data.data.film
			})                                                                                                                                                                                                                                
		})
	}
	render() {
		var div
		if(this.state.filmsdetail==null){
			div = null;
		}else{
			div = <div>
				<div className="detail-all">
					<div><img className="detail-image" src={this.state.filmsdetail.cover.origin}/></div>
					<div>
						<div className="detail-introduce"><span>影片简介</span></div>
						<div className="detail-movieinformation"><span className="detail-twoword">导<span>演</span></span><span className="detail-colon">:</span><span>{this.state.filmsdetail.director}</span></div>
						<div className="detail-movieinformation">
							<span className="detail-twoword">主<span>演</span></span>
							<span className="detail-colon">:</span>
							<span>
							{
							this.state.filmsdetail.actors.map(function(item, index){
								return (
									<span key={index} className="detail-actorname">{item.name}<span className="detail-dashed">|</span></span>
								)
							})
							
							}
							</span>
						</div>
						<div className="detail-movieinformation"><span>地区语言</span><span className="detail-colon">:</span><span>{this.state.filmsdetail.nation}</span><span>({this.state.filmsdetail.language})</span></div>
						<div className="detail-movieinformation"><span className="detail-twoword">类<span>型</span></span><span className="detail-colon">:</span><span>{this.state.filmsdetail.category}</span></div>
						<div className="detail-movieinformation"><span>上映时间</span><span className="detail-colon">:</span><span>2月16日上映</span></div>
						<div className="detail-information"><span>{this.state.filmsdetail.synopsis}</span></div>
					</div>
					<div className="detail-immediately"><button>立即购票</button></div>
				</div>
			</div>
		}
		return(
			<div>
				{div}
			</div>
		)
	}
}