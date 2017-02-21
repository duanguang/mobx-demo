/**
 * Created by duanguang on 2017/2/21.
 */
export class CustomerResult{
    trueName:string;
    mobile:string;
    constructor(fromService:any={}){
        this.mobile=fromService.Mobile;
        this.trueName=fromService.TrueName;
    }
}