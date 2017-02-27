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
var mobx_1 = require("mobx");
var mobx_react_devtools_1 = require('mobx-react-devtools');
/*<TodoInput Store={store} />*/
mobx_1.autorun(function () {
    //console.log(store.isLoading);
});
ReactDOM.render(React.createElement("div", null, React.createElement(mobx_react_1.Provider, {store: todoIndex_1.default}, React.createElement(react_router_1.Router, {history: react_router_1.hashHistory}, React.createElement(react_router_1.Route, {breadcrumbName: "用户管理", path: "/", component: todoInput_1.TodoInput}), React.createElement(react_router_1.Route, {path: "*", component: todoInput_1.TodoInput}))), React.createElement(mobx_react_devtools_1.default, null)), document.getElementById('app'));
