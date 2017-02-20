"use strict";
/**
 * Created by DuanG on 2017/2/15.
 */
var React = require("react");
var ReactDOM = require('react-dom');
var react_router_1 = require('react-router');
var mobx_react_1 = require('mobx-react');
var todoInput_1 = require("../component/todoInput");
var todoIndex_1 = require("../store/todoIndex");
/*<TodoInput Store={store} />*/
ReactDOM.render(React.createElement(mobx_react_1.Provider, React.__spread({}, todoIndex_1.default), React.createElement(react_router_1.Router, {history: react_router_1.hashHistory}, React.createElement(react_router_1.Route, {breadcrumbName: "用户管理", path: "/", component: todoInput_1.TodoInput}), React.createElement(react_router_1.Route, {path: "*", component: todoInput_1.TodoInput}))), document.getElementById('app'));
