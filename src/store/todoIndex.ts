/**
 * Created by DuanG on 2017/2/16.
 */
import {observable,computed,autorun,action,toJS,intercept,runInAction,untracked,transaction} from 'mobx';
import {fromPromise} from 'mobx-utils';
var mobxUtils=require('mobx-utils');
import {getCustomerInfo} from "../api/todoService";

class Store {

    constructor(){
        this.test();
        this.reset();
        this.total;
        this.listenIntercept();
    }

    @observable count = 0;
    @observable title;
    @observable name;
    @observable users = {}
    @observable userData;

    @observable map=observable.map({ key: "value"});//键值对数据结构
    @observable theme={
        backgroundColor: "#ffffff"
    }

    @observable person={
        firstName: "firstMichel",
        lastName: "lastWeststrate"
    }
    @observable array=[];
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
        this.person.firstName = "firstG.K.";//当直接更改对象属性值时，autorun监听到对象引用地址并没有变化。故不会执行相关事件
        this.person=Object.assign({},this.person);//此方法可以使autorun事件触发；还可使用untracked来监听对象属性值，来触发

       // this.person.lastName = "lastChesterton";
        this.map.set('key','new value');
        console.log(this.map.get('key'));
        console.log(Array.isArray(this.array));//返回false
        console.log(Array.isArray(this.array.slice()));//返回true
        console.log(`tojs:${toJS(this.map)}`);
        this.theme.backgroundColor='#fffff';
        this.tranUpdate();
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
            console.log(
                this.person.lastName,
                ",",
                // this untracked block will return the person's firstName without establishing a dependency
                untracked(() => this.person.firstName)
            );

        });
        autorun(()=>{
            console.log(this.array.length, "array!");
        });
    };
    tranUpdate(){
        /*transaction(() => {
            transaction(() => {
                this.array.push(1);
                this.array.push(2);
            });
            this.array.push(3);
        });*/
        runInAction(()=>{
            this.array.push(1);
            this.array.push(2);
            this.array.push(3);
        })//相当于一个事务，全部操作完成，才更新

    }
    ///监听对象属性，当对象属性值变化之前会被触发的拦截器
    listenIntercept=()=>{
        intercept(this.theme ,'backgroundColor',change => {
            console.log(change.newValue)
            if (!change.newValue) {
                // ignore attempts to unset the background color
                return null;
            }
            if (change.newValue.length === 6) {
                // correct missing '#' prefix
                change.newValue = '#' + change.newValue;
                return change;
            }
            if (change.newValue.length === 7) {
                // this must be a properly formatted color code!
                return change;
            }
            throw new Error("This doesn't like a color at all: " + change.newValue);
        });
    }
    @action query(){
        if(this.isLoading) return;
        this.userData=fromPromise(getCustomerInfo());
    }

    @action async  asyncQuery(){
        if(this.isLoading) return;
        var userData=await fromPromise(getCustomerInfo());
        setTimeout(()=>{
            this.userData=(userData);
        },3000)
        /*runInAction("update state after fetching data", () => {
            this.userData=(userData);

            this.isSaving = true;
        })*/
    }

    @action.bound boundQuery(){
        if(this.isLoading) return;
        this.userData=fromPromise(getCustomerInfo());
    }
}


export default new Store()