import util from './util';

export default class Controller {
    constructor() { }

    async test(ctx) {
        console.log(ctx.request);
        let json_data = ctx.request.body;
        console.log(json_data);

        const query= json_data.request.intent.query;//用户说的话
        console.log(query);
        const requestType=json_data.request.intent.request_type; //Start,Intent,End
        var message;//我应答的话
        if(requestType==="Start"){
            message=util.buildResponseSimple("演出开始了",false);
        }else{
            message=util.buildResponse(["这是一个例子","播放完成后退出"],true);
        }
        console.log(message);
        ctx.body = message;
    }
}
