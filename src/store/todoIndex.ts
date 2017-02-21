/**
 * Created by DuanG on 2017/2/16.
 */
import {observable,computed,autorun,action} from 'mobx';
import {fromPromise} from 'mobx-utils';
var mobxUtils=require('mobx-utils');
import {getCustomerInfo} from "../api/todoService";

class Store {

    constructor(){
        this.test();
        this.reset();
        this.total;
    }

    @observable count = 0;
    @observable title;
    @observable name;
    @observable users = {}
    @observable userData;

    @computed get isLoading(){
        const userData=this.userData;
        console.log('==isLoading==')
        return !!userData&&userData.state==mobxUtils.PENDING;
    }
    @computed get isLoaded(){
        const userData=this.userData;
        console.log('==isLoaded==')
        return userData&&userData.state==mobxUtils.FULFILLED;
    }
    reset = ()=> {
        //this.users = Object.assign( { 'ASDFPOIU98': { id: 'ASDFPOIU98', name: '张小龙' } }, this.users);autorun触发二次
        //this.users['ASDFPOIU98'] = { id: 'ASDFPOIU98', name: '张小龙' }//autorun触发一次
        //未触发的原因是，观察的数据虽然是users对象，但其实是他们的指针指向，
        // 而以上修改数据的方式，并未改变users的指针，故不会触发set方法，也就不会触发数据更新检测。
    }

    getCount(count){
        this.count=count;
    }
    setVaule(){
        this.name='111';
        this.title='渲染';
    }
    @computed get total() {
        return this.count;
    }
    @computed get uesrs(){
        const {isLoaded, userData}= this;
        console.log(userData)
        if (isLoaded) {
            return userData.value;
        }
        return {};
    }
    test = ()=> {
        autorun(()=> {
           // console.log(this.users)
        })
    }
    @action query(){
        if(this.isLoading) return;
        this.userData=fromPromise(getCustomerInfo());
    }
}


export default new Store()