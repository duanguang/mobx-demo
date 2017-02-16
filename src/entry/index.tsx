/**
 * Created by DuanG on 2017/2/15.
 */
import * as React from "react";
import * as ReactDOM from 'react-dom';
import {TodoView, person} from "../component/Index";
import {TodoInput} from "../component/todoInput";
import store from "../store/todoIndex";

ReactDOM.render(
    <TodoInput Store={store} />,
    document.getElementById('app')
);