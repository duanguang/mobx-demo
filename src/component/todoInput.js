"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by DuanG on 2017/2/16.
 */
var React = require('react');
var mobx_react_1 = require('mobx-react');
require('./css/input.css');
var TodoInput = (function (_super) {
    __extends(TodoInput, _super);
    //export const TodoInput  = observer(class TodoInput extends React.Component<Store,void> {
    function TodoInput(props) {
        _super.call(this, props);
    }
    TodoInput.prototype.componentWillMount = function () {
        //console.log(this.props.store);
        //console.log(this.props.store.isLoading)
        //  this.props.store.setVaule();
    };
    TodoInput.prototype.componentDidMount = function () {
        if (!this.props.store.isLoaded) {
            this.props.store.query();
        }
    };
    TodoInput.prototype.onChange = function (count) {
        this.props.store.getCount && this.props.store.getCount(count);
    };
    TodoInput.prototype.handleChange = function (even) {
        var num = parseInt(even.target.value);
        if (isNaN(num)) {
            num = 0;
        }
        this.onChange(num);
    };
    TodoInput.prototype.increment = function () {
        this.onChange(this.props.store.count + 1);
    };
    TodoInput.prototype.decrement = function () {
        this.onChange(this.props.store.count - 1);
    };
    TodoInput.prototype.componentWillReact = function () {
        console.log("I will re-render, since the todo has changed!");
    };
    /*componentDidUpdate(prevProps,prevState){
        console.log('TodoItem Update....');
    }*/
    TodoInput.prototype.render = function () {
        var count = this.props.store.count;
        console.log('渲染render');
        console.log(this.props.store.uesrs);
        console.log(this.props.store.count);
        return (React.createElement("div", null, React.createElement("h1", null, "test demo"), React.createElement("input", {className: "input-value", onChange: this.handleChange.bind(this), value: count}), React.createElement("input", {className: "counter-btn", type: "button", onClick: this.decrement.bind(this), value: "-"}), React.createElement("input", {className: "counter-btn", type: "button", onClick: this.increment.bind(this), value: "+"})));
    };
    TodoInput = __decorate([
        mobx_react_1.inject("store"),
        mobx_react_1.observer
    ], TodoInput);
    return TodoInput;
}(React.Component));
exports.TodoInput = TodoInput;
;
