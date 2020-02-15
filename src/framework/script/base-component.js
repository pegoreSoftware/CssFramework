import Binder from '../script/binder.js'
export default class BaseComponent extends HTMLElement {
    constructor() {
        super();
        if (this.created) {
            this.created()
            this.created = undefined
        }
    }
    connectedCallback() {
        let element = this
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let text = this.responseText
                let document = new DOMParser().parseFromString(text, "text/html")
                element.innerHTML = document.querySelector('template').innerHTML
                this.binder = new Binder(element)
                if (element.mounted) {
                    element.mounted()
                    element.mounted = undefined
                }
            }
        };
        xhttp.open('GET', this.path, true);
        xhttp.send();
    }
    emit(eventName, ...args) {
        let event = new CustomEvent(eventName, { detail: args })
        this.dispatchEvent(event)
    }
}
