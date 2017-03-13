var React = require('react');
var NavLink = require('./NavLink');
var IndexLink = require('react-router').IndexLink;

var App = React.createClass({
	render:function(){
		var username=this.props.location.hash;
		username=username.slice(2);
		console.log(username,this.props);
		return (
				 <div className="navbar-wrapper">
      				<div className="container">
						<nav className="navbar navbar-inverse navbar-static-top">
				          <div className="container">
				            <div className="navbar-header">
				              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				                <span className="sr-only">Toggle navigation</span>
				                <span className="icon-bar"></span>
				                <span className="icon-bar"></span>
				                <span className="icon-bar"></span>
				              </button>
				              <a className="navbar-brand" href="#">Project name</a>
				            </div>
				            <div id="navbar" className="navbar-collapse collapse">
				              <ul className="nav navbar-nav">
				                <li><IndexLink to="/">Home</IndexLink></li>
				                <li><NavLink to="/List">List</NavLink></li>
				                <li><NavLink to="/about">About</NavLink></li>
				                <li><NavLink to="/contact">Contact</NavLink></li>
				                <li><NavLink to="/login">登录</NavLink></li>
				                <li><NavLink to="/register">注册</NavLink></li>
				                <li className="dropdown">
				                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
				                  <ul className="dropdown-menu">
				                    <li><a href="#">Action</a></li>
				                    <li><a href="#">Another action</a></li>
				                    <li><a href="#">Something else here</a></li>
				                    <li role="separator" className="divider"></li>
				                    <li className="dropdown-header">Nav header</li>
				                    <li><a href="#">Separated link</a></li>
				                    <li><a href="#">One more separated link</a></li>
				                  </ul>
				                </li>
				              </ul>
				            </div>
				          </div>
				        </nav>

				        {this.props.children}
						
				         <footer>
					        <p className="pull-right"><a href="#">Back to top</a></p>
					        <p>&copy; 2016 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
						 </footer>
					</div>
				</div>
		)
	}
});

module.exports = App;