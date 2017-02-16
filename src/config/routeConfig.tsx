/**
 * Created by DuanG on 2017/2/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute} from 'react-router';
import {TodoListView,person} from "../component/Index";

export const routes=(
    <TodoListView person={person}></TodoListView>
)