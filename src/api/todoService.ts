/**
 * Created by duanguang on 2017/2/21.
 */
import * as http from 'utils/request';
import {CustomerResult} from "../model/CustomerResult";

export function getCustomerInfo(){
    /*return http.get('/Pharmacist/GetCustomerInfo').then((result)=>{
        return new CustomerResult(result);
    })*/
    return http.get('/Pharmacist/GetCustomerInfo');
}