import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as koaLogger from 'koa-logger';
import * as koaBody from 'koa-body';
import * as koaCors from '@koa/cors';
import router from './router';
import util from './util'
import global from './global';

function main() {
    let args = process.argv.splice(2);
    console.log('start args: ' + args);
    if (args.length === 0) {
        console.log('need a config file name');
        return
    } else {
        let appConfig = util.readConfig(args[0]);
        if (appConfig) {
            global.config = appConfig;
            const app = new Koa();
            app.use(koaLogger());
            app.use(koaBody());
            app.use(koaCors({Origin: '*'}));

            const koaRouter = new KoaRouter();
            router(koaRouter);
            app.use(koaRouter.routes());

            app.listen(global.config.port);

            console.log(`server running on port ${global.config.port}`);
        } else {
            console.log('need a valid config file');
        }
    }
}

main();
