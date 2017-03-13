var React = require('react');

var Register = React.createClass({
	getDefaultProps:function(){
		return {
			url:"http://localhost:3002/users"
		}

	},
	getInitialState:function(){
		return{
			username:'',
			password:''
		}
	},
	handlerSubmit:function(e){
		var username=this.refs.username.value,
			password=this.refs.password.value,
			that=this;
		$.ajax({url:that.props.url}).then(function(res){
			var len=res.length;
			if(len>0){
				for(var i=0;i<len;i++){
					if(username==res[i].username){
						alert('用户名已存在')
					}else{
						$.ajax({
							type:"POST",
							url:that.props.url,
							 data: {
							    "username": username,
							    "password":password
						    }
						});
						location.href='#/login';
						return;
					}
				}
			}
		})
	},
	render:function(){
		return (
			<div>
				<form onSubmit={this.handlerSubmit}>
					用户名：<input type="text" placeholder="请输入用户名" ref='username'/>
					<br/>
					密  码：<input type="password" placeholder="请输入密码" ref='password'/>
					<br/>
					<input type="submit" value="注册" ref='submit'/>
				</form>
			</div>
		)
	}
});

module.exports = Register;