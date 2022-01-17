import routes from "../../routes";
import { http } from "../../config";

class Router {
    constructor(app) {
        this.app = app;
    }

    dispatch(request) {
        const { method, url } = request

        const dispatcher = routes.filter((route) => {
            return route.path === url && route.method === method
        }).pop();
        console.log(http.paths.controllers + dispatcher.controller)
        import(http.paths.controllers + dispatcher.controller).then((module) => {
            console.log(module)
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

export default Router