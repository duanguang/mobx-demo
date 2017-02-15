/**
 * Created by DuanG on 2017/2/15.
 */
import * as React from 'react';
/*var observer=require('mobx-react');
var observable=require('mobx');*/


/*@observer
export class TodoListView extends React.Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                <TodoView todo={todo} key={todo.id} />
                    )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}*/

/*export const person = observable({ title: "John",finished:"111" ,id:111})*/
/*export const TodoView = observer(React.createClass({
    displayName: "TodoView",
    render() {
        return <div>{this.props.todo.title}</div>
    }
}));*/
export const TodoView = React.createClass({
 displayName: "TodoView",
 render() {
 return <div>11</div>
 }
 });
/*const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)*/

