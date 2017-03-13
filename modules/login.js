var React = require('react');

var Login = React.createClass({
	getDefaultProps:function(){
		return {
			url:'http://localhost:3002/users'
		}
	},
	getInitialState:function(){
		return {
			list:[],
			username:'',
			password:''
		}
	},
	componentWillMount:function(){
		var url=this.props.url;
		var that=this;
		$.ajax({url:url}).then(function(res){
			that.setState({
				list:res
			});
		})

	},
	contextTypes:{
		router:React.PropTypes.object
	},
	handlerSubmit:function(e){
		e.preventDefault();
		var list=this.state.list,
			len=list.length,
			username=this.refs.username.value,
			password=this.refs.password.value;
			var temp=-1;

		for(var i=0;i<len;i++){
			if(username==list[i].username&&password==list[i].password){
				temp=1;
				console.log('登录成功');
				this.setState({
					username:username,
					password:password
				});
				const path=`#/${username}`;
				this.context.router.push(path);
				return;
			}
		};
		if(temp==-1){
			console.log('用户名或密码错误');
			this.refs.password.value=''
		}

	},
	render:function(){
		return (
			<div>
				<form onSubmit={this.handlerSubmit}>
					用户名：<input type="text" placeholder="请输入用户名" ref='username'/>
					<br/>
					密  码：<input type="password" placeholder="请输入密码" ref='password'/>
					<br/>
					<input type="submit" value="登录" ref='submit'/>
				</form>
			</div>
		)
	}
});

module.exports = Login;