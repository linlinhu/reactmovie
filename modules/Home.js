var React = require('react');
var NavLink = require('./NavLink');
var Style=require('../lib/js/homestyle');

var Home = React.createClass({
	getDefaultProps:function(){
		return {
			url:'http://localhost:3000/db'
		}
	},
	getInitialState:function(){
		return {
			list:[]
		}
	},
	componentWillMount:function(){
		var _this = this;
		$.ajax({url:this.props.url}).then(function(res){
			_this.setState({
				list: res.subjects
			})
		})
	},
	render:function(){
		if(this.state.list.length>0){
			var lst = [];
			var data = this.state.list;
			var listLen = data.length;
			for(var i =0;i<listLen;i++){
				if(i<3){
					console.log(data[i])
					var detailUrl = "/detail/" + data[i].id;
					lst.push(
						<div className="col-lg-4 col-md-4" key={i} style={Style.lunbo}>
				          <img
				          src={data[i].images.medium} 
				          alt="Generic placeholder image" width="70%"/>
				          <h2>{data[i].title}</h2>
				          <p>
				          <NavLink to={detailUrl} className="btn btn-default" role="button">
				         	查看详情 &raquo;</NavLink></p>
				        </div>
					)
				}
			}

		}

		return (
			<div>

				{/*轮播图*/}
				<div id="myCarousel" className="carousel slide" data-ride="carousel">
			      <ol className="carousel-indicators">
			        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
			        <li data-target="#myCarousel" data-slide-to="1"></li>
			        <li data-target="#myCarousel" data-slide-to="2"></li>
			      </ol>
			      <div className="carousel-inner" role="listbox">
			        <div className="item active">
			          <img className="first-slide" src="lib/images/lunbo1.jpg" alt="First slide" style={Style.img}/>
			        </div>
			        <div className="item">
			          <img className="second-slide" src="lib/images/lunbo2.jpg" alt="Second slide" style={Style.img}/>
			        </div>
			        <div className="item">
			          <img className="third-slide" src="lib/images/lunbo3.jpg" alt="Third slide" style={Style.img}/>
			        </div>
			      </div>
			      <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
			        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			        <span className="sr-only">Previous</span>
			      </a>
			      <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
			        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			        <span className="sr-only">Next</span>
			      </a>
			  </div>


			  <div style={Style.classic} className="container">
			  	<div className="row">
			  		<p className="col-lg-11 col-md-11">  经典推荐</p>
			  		<p className="col-lg-1 col-md-1"  style={Style.classic.p}>
			  			<NavLink to="/List">更多 &raquo;</NavLink>
			  		</p>
			  		
			  	</div>
			  </div>


			  <div  className="marketing container">
			      <div className="row">
			      	
			        {lst}
			      </div>
		      </div>

			</div>
		)
	}
});

module.exports = Home;