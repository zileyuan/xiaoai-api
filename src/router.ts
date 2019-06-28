import Controller from './controller';

const controller = new Controller();

export default function defaultRouter(router) {
    router.use('/test', controller.test);
}
