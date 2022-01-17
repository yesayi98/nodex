import Container from "./Container";
import Router from "./Router";
import {ClientRequest} from "http";

class App {
    constructor() {
        this.container = Container.getInstance();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new App;
        }

        return this.instance
    }

    prepare(request) {
        this.container.set('router', new Router(this))
        this.container.set('request', request)
        // this.container.set('connection', new Connection())
    }

    start(request) {
        this.prepare(request)

        return this.container.get('router').dispatch(request);
    }
}

export default App