var React = require('react');
var Style=require('../lib/js/detailstyle');

var Detail = React.createClass({
	getDefaultProps:function(){
		return {
		 url:"http://localhost:3000/db"
		}
	},
	getInitialState:function(){
		return {
			list:[],
			comments:[],
			textareaValue:'',
			time:''
		}
	},
	componentWillMount:function(){
		var that=this;
		$.ajax({url:this.props.url}).then(function(res){
			that.setState({
				list:res.subjects
			})
		});
		var id=this.props.params.id;
		$.ajax({url:'http://localhost:3001/'+id}).then(function(res){
			that.setState({
				comments:res
			});
		});
	},
	handlerClick:function(){
		var textareaValue=this.refs.textareaValue.value;
		var time=new Date();
		var id=this.props.params.id;
		console.log(id);
		time=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
		console.log(time);
		this.setState({
			textareaValue:textareaValue,
			time:time
		}),
		console.log('http://localhost:3001/'+id);
		$.ajax({
		    type: 'POST',
		    url: 'http://localhost:3001/'+id,
		    data: {
			    "username": "11@11.com",
			    "time": time,
			    "comment": textareaValue
		    }
		 });
		var that=this;
		$.ajax({url:'http://localhost:3001/'+id}).then(function(res){
			that.setState({
				comments:res
			});
		});
		var comments=that.state.comments;
		var commentsLen=comments.length;
		var commentBox=[];
		for(var n=commentsLen-1;n>-1;n--){
			commentBox.push(
				<div style={Style.commentBox} key={n}>
          			<div className="col-md-3" style={Style.commentImg}>
          				<img src="lib/images/photo.jpg"/>
          			</div>
          			<div className="col-md-9">
          				<p>11@11.com</p>
          				<p>{comments[n].time}</p>
          				<p>{comments[n].comment}</p>
          			</div>
      			</div>

			)
		};


		$.ajax({url:'http://localhost:3001/db'}).then(function(res){
			
		});
		
	},
	render:function(){
		var id=this.props.params.id;
		console.log(id);
		var data=this.state.list;
		var len=data.length;
		var result=[];
		var right=[];
		var commentBox=[];
		var comments=this.state.comments;
		console.log(comments);
		for(var i=0; i<len;i++){
			if(data[i].id==id){
				var movie=data[i];
				var actors='';
				for(var j=0;j<data[i].casts.length;j++){
					actors+="  "+data[i].casts[j].name+"  ";
					right.push(
						<p key={j} style={Style.rightBox}>
							<img src={data[i].casts[j].avatars.medium} style={Style.rightImg}/>
						</p>

					)
				};
				result.push(
					<div className="row" key={i} style={Style.box}>
						<div className="col-lg-4 col-md-4" style={Style.left}>
							<img  src={data[i].images.small}  style={Style.img}/>
						</div>
						<div className="col-lg-5 col-md-5" style={Style.center}>
							<h3 ref="name" className={data[i].title}>电影名称：{data[i].title}</h3>
							<p>豆瓣评分：{data[i].rating.average}</p>
							<p>电影类别：{data[i].genres}</p>
							<p>上映时间：{data[i].year}</p>
							<p>主演：{actors}</p>
							<p>{data[i].title}剧情介绍：</p>
							<div style={Style.center.context}>
							　20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼 Morgan Freeman 饰），请求对方帮自己搞来小锤子。以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。而关于其罪行的真相，似乎更使这一切朝前推进了一步…… 
							</div>
						</div>
						<div className="col-lg-3 col-md-3">
							<img  src='lib/images/show1.jpg'  style={Style.right}/>
						</div>
					</div>
				);
				console.log('条件判断1',comments);
				var commentsLen=comments.length;
				if(commentsLen>0){
					for(var n=commentsLen-1;n>-1;n--){
						commentBox.push(
							<div style={Style.commentBox} key={n}>
			          			<div className="col-md-3" style={Style.commentImg}>
			          				<img src="lib/images/photo.jpg"/>
			          			</div>
			          			<div className="col-md-9">
			          				<p>11@11.com</p>
			          				<p>{comments[n].time}</p>
			          				<p>{comments[n].comment}</p>
			          			</div>
		          			</div>

						)
					}
				}else{
					commentBox.push(<div key='0'>暂无评论</div>)
				}
				
			};
		};
		
		


		return (
			 <div  className="container-fluid">
	          {result}

	          <div className="row">
	          	<div className="col-lg-8 col-md-8">
	          		<div style={Style.commentHeader}>电影评价</div>
	          		<textarea ref='textareaValue' style={Style.textarea} ></textarea>
	          		<br/>
	          		<input type="button" onClick={this.handlerClick} value="提交" style={Style.button}/>

	          		<div>
		          		{commentBox}
	          		</div>
	          	</div>

	          	<div className="col-lg-4 col-md-4">
	          		{right}
	          	</div>
	          </div>
	  		</div>
		)
	}
});

module.exports = Detail;