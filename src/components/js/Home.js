import React, { Component } from 'react';
import Carousel from './Carousel';
import Showed from './Showed';


class Home extends Component {
  	render() {
	    return (
	      	<div className="Home">
	          	<Carousel />
	        	<Showed />
	      	</div>
	    );
  	}
}

export default Home;