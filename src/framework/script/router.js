class Router {
    routes
    count = 0
    path = []

    constructor(routes) {
        try {
            if (!routes) {
                throw 'error: routes param is mandatory';
            }
            this.routes = routes;
            this.init();
        } catch (e) {
            console.error(e);
        }
    }
    init() {
        var r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    }
    hasChanged(scope, r) {
        if (window.location.hash.length > 0) {
            route = this.getRoute(r, window.location.hash.replace('#', ''), '')
            scope.setHtml(route, scope, route.url)
            scope.count = 0
            scope.path = []
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.default) {
                    scope.goToRoute(route.url);
                }
            }
        }
    }

    goToRoute(path) {
        this.path = []
        let r = this.routes;
        (function (scope, routes) {
            let url = path;
            if (window.location.hash.replace('#', '') !== (url == '/' ? '' : url)) {
                if (url.name)
                    url = scope.getRouteUrlByName(url.name, routes).join('/')
                let route = scope.getRoute(routes, url, '')
                scope.setHtml(route, scope, url)
                if (route.url != window.location.hash.substr(1) && '' != window.location.hash.substr(1)) {
                    window.history.pushState('Object', 'Title', '#'.concat(scope.path.join('/')));
                }
                scope.count = 0
                scope.path = []
            }
        })(this, r);
    }
    setHtml(route, scope, url) {
        let element = document.createElement(route.component)
        document.getElementsByClassName('route-container')[scope.count].innerHTML = element.outerHTML;
        scope.count++
        scope.path.push(route.url !== '/' ? route.url : '')
        if (route.children && route.children.length > 0) {
            scope.setHtml(scope.getRoute(route.children, url, scope.path.join('/')), scope, url)
        }
    }
    getRoute(routes, url, path) {
        let routePath = path && path !== '/'
        let route = routes.filter(r => {
            if (!routePath)
                path = r.url
            if (url === path)
                return r
            if (url.includes(path) && r.url !== '/' && r.url !== '') {
                return r
            }
        });
        if (route.length > 0)
            return route[0]
        return routes.filter(r => r.url == '')[0]
    }
    getRouteUrlByName(name, routes) {
        let url = []
        if (routes) {
            let route = routes.filter(r => r.name == name)
            if (route.length <= 0) {
                for (let i = 0; i < routes.length; i++) {
                    let route = routes[i]
                    let path = this.getRouteUrlByName(name, route.children)
                    if (path.length > 0) {
                        url = path
                        path.push(route.url)
                        break
                    }
                }
            }
            if (route[0]) {
                url.push(route[0].url)
            }
            return url
        }
        return []
    }
}