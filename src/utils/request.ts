/**
 * Created by duanguang on 2017/2/21.
 */
import * as request from 'superagent';

const DefaultOption={
    processData:false,
    dataType:'json',
    contentType: 'application/json'
}

export interface IRequestOption {

}

export function post(url:string, data?:Object, option?:IRequestOption):Promise<any> {
    const req = request.post(url) .send(data);
    return doRequest(req, option);
}


export function get(url:string, data?:Object, option?:IRequestOption):Promise<any> {
    const req = request.get(url).query(data);
    return doRequest(req, option);
}

function doRequest(req, option?:IRequestOption):Promise<any> {
    option = Object.assign({}, DefaultOption, option);
    return new Promise((resolve, reject) => {
        req.set(option).end(function (err, res) {
            if(!err){
                err = checkBusinessError(res.body);
            }

            if (err) {
                reject(err);
                return;
            }
            resolve(res.body);
        });
    });
}

function checkBusinessError(body):Error {
    if (body && body.IsSuccess == false) {
        return new Error(body.Message || "业务操作异常");
    }
    return null;
}