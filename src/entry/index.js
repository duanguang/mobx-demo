"use strict";
/**
 * Created by DuanG on 2017/2/15.
 */
var React = require("react");
var ReactDOM = require('react-dom');
var todoInput_1 = require("../component/todoInput");
var todoIndex_1 = require("../store/todoIndex");
ReactDOM.render(React.createElement(todoInput_1.TodoInput, {Store: todoIndex_1.default}), document.getElementById('app'));
