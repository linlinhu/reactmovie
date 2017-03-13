var React = require('react');
var NavLink = require('./NavLink');
var Style=require('../lib/js/liststyle');

var List = React.createClass({
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
		var that=this;
		$.ajax({url:this.props.url}).then(function(res){
			that.setState({
				list:res.subjects
			})
		})
	},
	handlerClick:function(){
		var inputValue=this.refs.inputbox.value;
		this.setState({
			inputValue:inputValue
		})
	},
	render:function(){
		if(this.state.list.length>0){
			var data=this.state.list;
			var len=data.length;
			var result=[];
			if(this.state.inputValue){
				var inputValue=this.state.inputValue;
				console.log(inputValue);
				for(var i= 0 ;i<len;i++){
					if(data[i].title.indexOf(inputValue)!=-1||data[i].year.indexOf(inputValue)!=-1){
						var detailUrl = "/detail/" + data[i].id;
						var actors='';
						for(var j=0;j<data[i].casts.length;j++){
							actors+="  "+data[i].casts[j].name+"  "
						};
						result.push(
							<div className="row" key={i} style={Style.box}>
								<div className="col-lg-3 col-md-3" style={Style.left}>
									<img  src={data[i].images.small} width="30%" style={Style.img}/>
								</div>
								<div className="col-lg-7 col-md-7">
									<h3>电影名称：{data[i].title}</h3>
									<p>豆瓣评分：{data[i].rating.average}</p>
									<p>电影类别：{data[i].genres}</p>
									<p>上映时间：{data[i].year}</p>
									<p>主演：{actors}</p>
								</div>
								  <p>
						          <NavLink to={detailUrl} className="btn btn-default" role="button">
						         	查看详情 &raquo;</NavLink></p>
							</div>
						)

					}else{
						result[0]="没有搜索到结果"
					}
				}
			}else{
				for(var i =0 ;i<len;i++){
					var detailUrl = "/detail/" + data[i].id;
					var actors='';
					for(var j=0;j<data[i].casts.length;j++){
						actors+="  "+data[i].casts[j].name+"  "
					};
					result.push(
						<div className="row" key={i} style={Style.box}>
							<div className="col-lg-3 col-md-3" style={Style.left}>
								<img  src={data[i].images.small} width="30%" style={Style.img}/>
							</div>
							<div className="col-lg-7 col-md-7">
								<h3>电影名称：{data[i].title}</h3>
								<p>豆瓣评分：{data[i].rating.average}</p>
								<p>电影类别：{data[i].genres}</p>
								<p>上映时间：{data[i].year}</p>
								<p>主演：{actors}</p>
							</div>
							  <p>
					          <NavLink to={detailUrl} className="btn btn-default" role="button">
					         	查看详情 &raquo;</NavLink></p>
						</div>
					)
				}

			}
			
		};
		return (
			<div >
				<div id="search" style={Style.searchbox}>
					<input type="text" ref='inputbox' style={Style.input} placeholder="请输入搜索内容"/>
					<input type="submit" ref='button' value="搜索" style={Style.button} onClick={this.handlerClick}/>
				</div>

			   <div  className="container-fluid">
		          {result}
		  		</div>
			</div>
		)
	}
});

module.exports = List;