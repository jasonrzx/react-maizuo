import React, { Component } from 'react';
import '../style/Cinema.css';
import { Accordion, List } from 'antd-mobile';
import axios from 'axios';


class Cinema  extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cinemas: [],
			newcountyname: [],
			allcinemas:[]
		}
		this.GetCinema = this.GetCinema.bind(this);
		//根据不同区将电影院分类
		this.SelCinema = this.SelCinema.bind(this);
	}
	componentDidMount() {
		this.GetCinema()
	}
	GetCinema() {
		axios.get(`/v4/api/cinema?__t=1519910643606`)
		.then((res)=>{
			// console.log(res);
			this.setState({
				cinemas: res.data.data.cinemas
			})
			this.SelCinema(this.state.cinemas)
		})
	}
	SelCinema(item) {
		// console.log(item);
		var l = item.length;
		var arr = [];
		var county = [];
		var num = -1;
		for(var i=0; i<l; i++){
			if(arr.indexOf(item[i].district.name)==-1){
				arr.push(item[i].district.name)
				num ++;
				var cc = [];
				for(var j=0; j<l; j++){
					if(arr[num]==item[j].district.name){
						cc.push(item[j])
					}
				}
				county.push(cc);
			}
		}
		this.setState({
			newcountyname: arr,
			allcinemas: county
		})

	}
	render() {
		// console.log(this.state.allcinemas)
		var that = this;
		return(
			<div className="cinema-box">
				<div style={{ marginTop: 50, marginBottom: 0 }}>
					<Accordion accordion openAnimation={{}} className="my-accordion" defaultActiveKey="0">
					{
						this.state.newcountyname.map(function(item, index){
							return(
								<Accordion.Panel header={item} key={index}>
									<List className="my-list">
										{
											that.state.allcinemas[index].map(function(iten, ind){
												return(
													<List.Item key={ind}>
														<div className="cinema-cinema">
															<div className="cinema-one"><span className="cinema-name">{iten.name}</span></div>
															<div className="cinema-two"><span className="cinema-address">{iten.address}</span></div>
															<div className="cinema-three"><span className="cinema-position">距离未知</span></div>
														</div>
														<div><i className="icon iconfont cinema-icon">&#xe65e;</i></div>
													</List.Item>
												)
											})
										}	
									</List>
								</Accordion.Panel>
							)
						})
						
					}
					</Accordion>
				</div>
			</div>
		)
	}
}
export default Cinema;