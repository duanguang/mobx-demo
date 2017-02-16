/**
 * Created by DuanG on 2017/2/16.
 */
import {observable} from 'mobx';
class Store {
    @observable count = 0;

    getCount(count){
        this.count=count;
    }
}

export default new Store()