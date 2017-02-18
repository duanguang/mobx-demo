/**
 * Created by DuanG on 2017/2/16.
 */
import * as React from 'react';
import {observer} from 'mobx-react';
import './css/input.css';

/*export const TodoInput = observer(React.createClass({
    displayName: "TodoInput",
    render() {
        console.log(this.props)
        return(
            <div>
                <input className="input-value" value=''/>
            </div>
        )
    }
}));*/

interface Store{
    Store:{
        count:number;
        getCount?:(count:number)=>void;
        setVaule?:()=>void;
    }

}
export const TodoInput  = observer(class TodoInput extends React.Component<Store> {
    constructor(props){
        super(props);
        this.props.Store.setVaule();
    }

    onChange(count){
        this.props.Store.getCount&&this.props.Store.getCount(count);
    }

    handleChange(even){
        let num=parseInt(even.target.value);
        if(isNaN(num)){
            num=0;
        }
        this.onChange(num);
    }

    increment(){
        this.onChange(this.props.Store.count+1);
    }

    decrement(){
        this.onChange(this.props.Store.count-1);
    }

    render() {
        const {count}=this.props.Store;
        console.log("渲染")
        return(
            <div>
                <h1>累加器</h1>
                <input className="input-value" onChange={this.handleChange.bind(this)} value={count}/>
                <input className="counter-btn" type="button" onClick={this.decrement.bind(this)} value="-"/>
                <input className="counter-btn" type="button" onClick={this.increment.bind(this)} value="+"/>
            </div>
        )
    }
})