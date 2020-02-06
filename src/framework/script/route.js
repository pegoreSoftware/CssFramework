class Route {
    url
    path
    default
    name
    children

    constructor(url, path, defaultRoute, name, children) {
        try {
            if(!path) {
                throw 'error: htmlName params are mandatories';
            }
            this.url = url;
            this.path = path;
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