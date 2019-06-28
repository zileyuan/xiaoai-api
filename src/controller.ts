import util from './util';
import axios from "axios";

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
            message=util.buildResponseSimple("客官，需要什么服务",false);
        }else{
            if (query.indexOf('人数') > -1) {
                let res = await axios.get('https://api.jinzhanwangluo.cn/game-egg/egg/state');
                if (res.status === 200) {
                    let amount = res.data.data.roomAmount;
                    if (amount) {
                        message=util.buildResponseSimple("客官，目前没人玩游戏哦",false);
                    } else {
                        message=util.buildResponseSimple(`客官，只有${amount}个人玩游戏哦`,false);
                    }
                } else {
                    message=util.buildResponseSimple("客官，没有查询到游戏人数哦",false);
                }
            } else {
                message = util.buildResponse(["这是一个例子", "播放完成后退出"], false);
            }
        }
        console.log(message);
        ctx.body = message;
    }
}
