/**
 * Created by DuanG on 2017/2/16.
 */
import {observable} from 'mobx';
class Store {
    @observable count = 0;
    @observable title;
    @observable name;
    getCount(count){
        this.count=count;
    }
    setVaule(){
        this.name='111';
        this.title='渲染';
    }
}

export default new Store()