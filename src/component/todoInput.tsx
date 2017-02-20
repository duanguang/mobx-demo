/**
 * Created by DuanG on 2017/2/16.
 */
import * as React from 'react';
import {observer,inject} from 'mobx-react';
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
    store:{
        count:number|any;
        getCount?:(count:number)=>void;
        setVaule?:()=>void;
        total:number;
    }

}

@inject("store")
@observer
export  class TodoInput extends React.Component<Store,void>{
//export const TodoInput  = observer(class TodoInput extends React.Component<Store,void> {

    constructor(props){
        super(props);

    }
    componentWillMount(){
        console.log(this.props.store);
        this.props.store.setVaule();
    }
    onChange(count){
        this.props.store.getCount&&this.props.store.getCount(count);
    }

    handleChange(even){
        let num=parseInt(even.target.value);
        if(isNaN(num)){
            num=0;
        }
        this.onChange(num);
    }

    increment(){
        this.onChange(this.props.store.count+1);
    }

    decrement(){
        this.onChange(this.props.store.count-1);
    }

    componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
    }
    componentWillReceiveProps(nextProps){
        console.log("渲染1");
        console.log(nextProps);
    }

    render() {
        const {count,total}=this.props.store;
        console.log("渲染")
        return(
            <div>
                <h1>test demo{total}</h1>
                <input className="input-value" onChange={this.handleChange.bind(this)} value={count}/>
                <input className="counter-btn" type="button" onClick={this.decrement.bind(this)} value="-"/>
                <input className="counter-btn" type="button" onClick={this.increment.bind(this)} value="+"/>
            </div>
        )
    }
};