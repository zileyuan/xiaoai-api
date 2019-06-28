import * as path from 'path';
import * as fs from 'fs';
import * as crypto from "crypto";

const responseTemplate = {
    "version": "1.0", // (string required)
    "session_attributes": { // (jsobject optional) 持久化的内容可以放这
    },
    "response": { // (jsobject required)
        "open_mic": true, // (Boolean optional)，指示客户端是否需要关闭mic
        "to_speak": { // (jsobject required)
            "type": 0, // (int required) TTS: 0, 1: Audio, 2: ssml
            "text": "即将播放消息" // (string required)
        },
        "directives": [ //例如播放音频
            {
                "type": "tts",  // (string required) audio, tts
                "tts_item": { // (object required)
                    "type": "text", // (string required), tts type
                    "text": "正在播放消息" // (string optional), tts text
                }
            }
        ]
    },
    "is_session_end": true // (boolean required)e
};

function buildResponseSimple(message,is_session_end=true,session_attributes={}){
    const response = Object.assign({},responseTemplate);
    response.is_session_end=is_session_end;
    response.session_attributes=session_attributes;
    response.response.to_speak.text=message;
    delete response.response.directives;
    return response;
}

function buildResponse(messages,is_session_end=true,session_attributes={}){
    const response = Object.assign({},responseTemplate);
    response.is_session_end=is_session_end;
    response.session_attributes=session_attributes;
    const directives=messages.map(message=>({
        "type": "tts",  // (string required) audio, tts
        "tts_item": { // (object required)
            "type": "text", // (string required), tts type
            "text": message // (string optional), tts text
        }
    }));
    response.response.directives=directives;
    return response;
}

function readConfig(filename) {
    let file = path.join(__dirname, 'config/'+filename);
    let result = JSON.parse(fs.readFileSync(file).toString());
    return result;
}

function randomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function genMD5(value) {
    let md5 = crypto.createHash('md5');
    let result = md5.update(value).digest('hex');
    return result;
}



export default { readConfig, randomInt, genMD5, buildResponseSimple, buildResponse }
