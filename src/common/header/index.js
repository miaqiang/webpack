import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import Bootstrap from 'Bootstrap'
//import Cookies from '../common/Cookies'
//import '../common/jquery.cookie'
import PropTypes from 'prop-types';
import axios from 'axios';
import './style.less'
import { axiosAppentry, axiosCurrentuser, axiosLogout } from '../../api/index'
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
			// showNav: [
			// 		{
			// 			"cnName": "总览",
			// 			"enName": "Overview",
			// 			"key": "ovEntry",
			// 			"url": "http://vm41.leap.com:8089/leapid-admin/view/pm/index.html#/overview"
			// 		},
			// 		{
			// 			"cnName": "查询分析器",
			// 			"enName": "SQL Editor",
			// 			"key": "sqlEntry",
			// 			"url": "http://localhost:9796"
			// 		},
			// 		{
			// 			"cnName": "任务调度",
			// 			"enName": "Task Scheduler",
			// 			"key": "procEntry",
			// 			"url": "http://vm91.leap.com:9999"
			// 		},
			// 		{
			// 			"cnName": "数据集成",
			// 			"enName": "DataHub",
			// 			"key": "dhubEntry",
			// 			"url": "http://vm31.leap.com:4018/"
			// 		},
			// 		{
			// 			"cnName": "元数据管理",
			// 			"enName": "Metadata",
			// 			"key": "mdataEntry",
			// 			"url": "http://vm31.leap.com:8110"
			// 		},
			// 		{
			// 			"cnName": "数据洞察",
			// 			"enName": "Data Insight",
			// 			"key": "datainsightEntry",
			// 			"url": "http://vm61.leap.com:8070/datainsight"
			// 		},
			// 		{
			// 			"cnName": "数据服务",
			// 			"enName": "Dataservice",
			// 			"key": "dataEntry",
			// 			"url": "http://dataservice.test.com:8081/web"
			// 		},
			// 		{
			// 			"cnName": "自动化机器学习平台",
			// 			"enName": "HyperMiner",
			// 			"key": "aiEntry",
			// 			"url": "http://10.176.120.149:8080"
			// 		},
			// 		{
			// 			"cnName": "Unknown",
			// 			"enName": "Unknown",
			// 			"key": "sdcEntry",
			// 			"url": "http://vm61.leap.com:18630"
			// 		},
			// 		{
			// 			"cnName": "用户管理",
			// 			"enName": "Useradmin",
			// 			"key": "leapidEntry",
			// 			"url": "http://vm41.leap.com:8089/leapid-admin/view/pm/index.html"
			// 		}
			// 	],
			showNav: [],//导航栏数据

			leapidEntryShow: {
				cnName: "",
				enName: "",
			}
		}
		this.setNavUrl = this.setNavUrl.bind(this);
		this.logout = this.logout.bind(this);
		this.getUrl = this.getUrl.bind(this);
		this.getCurrent = this.getCurrent.bind(this);
	}
	componentWillMount() {
		/* this.getUrl(); */
		/*this.getCurrent(); */
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
	 * 获取所有应用得入口地址(导航栏地址)
	 */
	getUrl() {
		var showNav = [], leapidEntryShow;
		axiosAppentry()
			.then((response) => {
				if (response.code == 0) {
					showNav = response.msg;
					showNav.forEach((item, index) => {
						if (item.key == "leapidEntry") {
							leapidEntryShow = item;
						}
					})
					this.setState({
						leapidEntryShow,
						showNav
					})

				} else {
					1

				}

			})

		return showNav;
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
		return (<div className="header">
			<a className="logo shrink"></a>

			<nav className="leftNav">
				<ul>
					<li key={0}>
						<a href="http://www.baidu.com" >微服务API</a>
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
	return {};
}

let mapDispatchToProps = (dispatch, ownProps) => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)