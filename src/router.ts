import Controller from './controller';

const controller = new Controller();

export default function defaultRouter(router) {
    router.all('/test', controller.test);
}
