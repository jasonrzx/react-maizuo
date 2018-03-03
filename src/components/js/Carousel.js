import React, { Component } from 'react';
import '../style/Carousel.css';
import { Toast, Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import axios from 'axios';

class Carouse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filmdata: [],
			imgHeight: 180,
			slideIndex: 0,
		}
		this.GetCarousel = this.GetCarousel.bind(this);
	}
	componentDidMount() {
		this.GetCarousel();
	}
	GetCarousel() {
		axios.get("/v4/api/billboard/home?__t=1519640798261")
		.then((res)=>{
			// console.log(res);
			this.setState({
				filmdata: res.data.data.billboards || []
			})
			// console.log(this.state.filmdata);

		})
		Toast.loading('Loading...', 1, () => {
			//console.log('Load complete !!!');
		});
	}
	render() {
		return (
			<WingBlank>
				<Carousel
				infinite={true}
				autoplay={true}
				dots={false}
				selectedIndex={3}
				>
				{
					this.state.filmdata.map(val=>(
						<a
							key={val}
							href="#"
							style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
						>
						<img
							src={val.imageUrl}
							alt=""
							style={{ width: '100%', verticalAlign: 'top', display:"inline-block"}}
							onLoad={() => {
								// fire window resize event to change height
								window.dispatchEvent(new Event('resize'));
								this.setState({ imgHeight: 'auto' });
							}}
						/>
						</a>
					))
				}
				</Carousel>
			</WingBlank>
		);
	}
}
export default Carouse;
