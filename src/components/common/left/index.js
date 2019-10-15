import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { axiosBi } from 'src/server/common.js'

import './style.less'
/**
 * 2019/7/30
 */
class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.getBi = this.getBi.bind(this);
    }

    componentWillMount() {
        // this.getBi();
    }
    componentDidMount() {

    }
    /**
     * 获取bi配置
     */
    getBi() {
        axiosBi();
    }

    /**
     * 获取当前所处菜单项
     */
    getCurrentMenu() {
        let router = ["/page1", "/page2", "/page3", "/page4"];
        let pathname = this.props.location.pathname;
        let current = router.indexOf(pathname);
        return current == -1 ? 0 : current;
    }
    render() {
        let current = this.getCurrentMenu();
        return (<div className="left-menu">
            <ul className="item-wrap">
                <li key="1" className={'item user ' + 'shrink ' + (current == 0 ? ' current' : '')}>
                    <Link to='/page1' title="menu1">

                    </Link>
                </li>
                <li key="2" className={'item user ' + 'shrink ' + (current == 1 ? ' current' : '')}>
                    <Link to='/page2' title="menu1">

                    </Link>
                </li>
                <li key="3" className={'item user ' + 'shrink ' + (current == 2 ? ' current' : '')}>
                    <Link to='/page3' title="menu1">

                    </Link>
                </li>
                <li key="4" className={'item user ' + 'shrink ' + (current == 3 ? ' current' : '')}>
                    <Link to='/page4' title="menu1">

                    </Link>
                </li>
            </ul>
        </div>);
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
    }
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)