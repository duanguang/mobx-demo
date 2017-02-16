"use strict";
/**
 * Created by DuanG on 2017/2/15.
 */
var React = require('react');
var mobx_react_1 = require('mobx-react');
var mobx_1 = require('mobx');
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
exports.person = mobx_1.observable({ title: "John", finished: "111", id: 111 });
exports.TodoView = mobx_react_1.observer(React.createClass({
    displayName: "TodoView",
    render: function () {
        console.log(this.props);
        return React.createElement("div", null, this.props.person.title);
    }
}));
/*const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)*/
