/**
 * Created by DuanG on 2017/2/15.
 */
import * as React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';



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

export const person = observable({ title: "John",finished:"111" ,id:111})
export const TodoView = observer(React.createClass({
    displayName: "TodoView",
    render() {
         console.log(this.props)
        return <div>{this.props.person.title}</div>
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

