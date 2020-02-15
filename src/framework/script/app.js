class App {
    router
    constructor() {
        let element = document.createElement('main-app')
        document.getElementById('app').outerHTML = element.outerHTML;
        window.history.replaceState('Object', 'Title', `/#/`);
    }
}