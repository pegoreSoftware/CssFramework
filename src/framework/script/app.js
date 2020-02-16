import { DIf, DFor } from './directives.js'

export class App {
    router
    constructor(componentName, componentApp) {
        App.registerDirective('if', DIf)
        App.registerDirective('for', DFor)
        App.registerComponent(componentName, componentApp)
        let element = document.createElement(componentName)
        document.getElementById('app').outerHTML = element.outerHTML;
        window.history.replaceState('Object', 'Title', `/#/`);
    }
    static registerComponent(name, component) {
        customElements.define(name, component);
    }
    static registerDirective(name, directive) {
        if (!window.directives)
            window.directives = []
        window.directives.push({name, directive: new directive()})
    }
}