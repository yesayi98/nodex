import routes from "../../routes";

class Router {
    constructor(app) {
        this.app = app;
    }

    dispatch(request) {
        const { method, url } = request

        const dispatcher = routes.filter((route) => {
            return route.path === url && route.method === method
        }).pop();

        import("../Http/Controllers/" + dispatcher.controller).then((module) => {
            const controller = new module.default

            return controller[dispatcher.action]()
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

export default Router