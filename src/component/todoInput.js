"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by DuanG on 2017/2/16.
 */
var React = require('react');
var mobx_react_1 = require('mobx-react');
require('./css/input.css');
exports.TodoInput = mobx_react_1.observer((function (_super) {
    __extends(TodoInput, _super);
    function TodoInput(props) {
        _super.call(this, props);
        console.log(this.props.Store.getCount);
    }
    TodoInput.prototype.onChange = function (count) {
        this.props.Store.getCount && this.props.Store.getCount(count);
    };
    TodoInput.prototype.handleChange = function (even) {
        var num = parseInt(even.target.value);
        if (isNaN(num)) {
            num = 0;
        }
        this.onChange(num);
    };
    TodoInput.prototype.increment = function () {
        this.onChange(this.props.Store.count + 1);
    };
    TodoInput.prototype.decrement = function () {
        this.onChange(this.props.Store.count - 1);
    };
    TodoInput.prototype.render = function () {
        var count = this.props.Store.count;
        return (React.createElement("div", null, 
            React.createElement("input", {className: "input-value", onChange: this.handleChange.bind(this), value: count}), 
            React.createElement("input", {className: "counter-btn", type: "button", onClick: this.decrement.bind(this), value: "-"}), 
            React.createElement("input", {className: "counter-btn", type: "button", onClick: this.increment.bind(this), value: "+"})));
    };
    return TodoInput;
}(React.Component)));
