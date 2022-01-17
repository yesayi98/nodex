class Container {
    constructor() {
        this.dependancyContainer = [];
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new Container()
        }

        return this.instance;
    }

    get(key) {
        return this.dependancyContainer.filter((dependency) => {
            return dependency.key === key
        }).pop().instance;
    }

    set(key, instance) {
        this.dependancyContainer.push({key, instance});

        return this;
    }
}

export default Container;