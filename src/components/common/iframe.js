import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Iframe extends PureComponent {

	componentDidMount() {

	}
	componentWillUnmount() {
	}
	
	render() {
		let frameUrl=null;
		const {contentMinHeight:height,title} = this.props;
        //const title=this.props.title;
		const pathname = this.props.location.pathname;
		switch(pathname){
			case "/page1":
				// frameUrl="http://www.baidu.com";
				break;
			case "/page2":
				frameUrl="http://www.baidu.com";
				break;
			case "/page3":
				frameUrl="http://www.baidu.com";
				//frameUrl="http://demo201.test.com:8089/leapid-admin/view/login.html";
				break;
			case "/page4":
				frameUrl="https://www.cnblogs.com/wangfupeng1988/";
				break;
		}
		
		return (
			<div> 
				{/* <div className="head">{title}</div> */}
				<div>
					<iframe id='iframe1'  width='100%'   style={{height:height-60}} src={frameUrl} frameBorder="0"></iframe>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	contentMinHeight:state.contentMinHeight,
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Iframe);
