class Route {
    url
    component
    default
    name
    children

    constructor(url, component, defaultRoute, name, children) {
        try {
            if(!component) {
                throw 'error: component params are mandatories';
            }
            this.url = url;
            this.component = component;
            this.default = defaultRoute;
            this.name = name
            this.children = children
        } catch (e) {
            console.error(e);
        }
    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.url; 
    }
}