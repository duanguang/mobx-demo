/**
 * Created by DuanG on 2017/2/15.
 */
import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import {Provider} from 'mobx-react';
import {TodoView, person} from "../component/Index";
import {TodoInput} from "../component/todoInput";
import store from "../store/todoIndex";
/*<TodoInput Store={store} />*/
ReactDOM.render(
    <Provider {...store}>
        <Router history={hashHistory}>
            <Route breadcrumbName="用户管理" path="/" component={TodoInput}>
            </Route>
            <Route path="*" component={TodoInput}/>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
);