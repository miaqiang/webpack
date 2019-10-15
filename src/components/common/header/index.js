import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './style.less'
import { axiosAppentry, axiosCurrentuser, axiosLogout } from 'src/server/common'
//import x from '../../api';
// import {i18nJson} from "./i18n";
/**
 * 2019/7/30 
		*/
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "leap_test",//当前登录人

			showNav: [],//导航栏数据

			leapidEntryShow: {
				cnName: "",
				enName: "",
			}
		}
		this.setNavUrl = this.setNavUrl.bind(this);
		this.logout = this.logout.bind(this);
		// this.getUrl = this.getUrl.bind(this);
		this.getCurrent = this.getCurrent.bind(this);
	}
	componentWillMount() {
		/* this.getUrl(); */
		this.getCurrent();
	}
	componentDidMount() {

	}

	/**
	 * 获取当前用户
	 */
	getCurrent() {
		axiosCurrentuser()
			.then((response) => {
				if (response.code == 0) {
					this.setState({
						username: data.msg
					})
					console.log('current data', data);
				} else {

				}

			})
	}

	/**
	 * 退出
	 */
	logout() {
		axiosLogout()
			.then(() => {
				if (response.code == 0) {
					console.log('logout data', data);
				} else {

				}
			})


	}
	/**
* 组合导航栏<li></li>
* 
*/
	setNavUrl() {
		let { showNav } = this.state;
		let liHtml = [];
		let showNavSplice = showNav.concat();
		for (var i = 0; i < showNavSplice.length; i++) {
			if (showNavSplice[i].key == "leapidEntry") {
				showNavSplice.splice(i, 1);
			}
		}
		showNavSplice.forEach(function (item, index, arr) {
			if (index != showNavSplice.length - 1) {
				liHtml.push(
					<li key={item.key}>
						<a href={item.url} className={item.key == "biEntry" ? "current" : ""}>{item["cnName"]}</a>
						<span className="separate-short"></span>
					</li>)
			} else {
				liHtml.push(<li key={item.key}><a href={item.url} className={item.key == "biEntry" ? "current" : ""}>{item["cnName"]}</a></li>)
			}
		})
		return liHtml;
	}

	render() {

		let url = this.setNavUrl();
		let { username, leapidEntryShow } = this.state;
		console.log('this.props.contentMinHeight', this.props.contentMinHeight);
		return (<div className="header">
			<a className="logo shrink"></a>

			<nav className="leftNav">
				<ul>
					<li key={0}>
						<a href="http://www.baidu.com" >header</a>
						<span className="separate-short"></span>
					</li>
					{url}
				</ul>
			</nav>
			<nav style={{ "float": "right" }}>
				<ul>
					<li className="current">
						<a style={{ "padding": "0 10px" }} href={leapidEntryShow.url}>{leapidEntryShow["cnName"]}</a>
					</li>
					<li>
						<div className="login-out">
							<div className="logout-box">
								<span className="triangle"></span>
								<p className="name">{username}</p>
								<div className="logout" onClick={this.logout}><a href="#" >退出</a></div>
							</div>
						</div>
					</li>
				</ul>
			</nav>

		</div>);  // 24:退出,478:权限管理
	}
}


let mapStateToProps = (state, ownProps) => {
	return {
		contentMinHeight: state.contentMinHeight
	};
}

let mapDispatchToProps = (dispatch, ownProps) => {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)