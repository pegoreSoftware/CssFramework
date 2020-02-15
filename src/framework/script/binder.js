import BaseComponent from './base-component.js'
export default class Binder {
    constructor(scope) {
        this.scope = scope
        if (this.data) {
            this.dataBinder()
            Object.keys(this.scope.data2).forEach(key => {
                this.setValuesAndEvents(key)
            })
        }
        if (this.scope.property) {
            this.scope.property.forEach(p => {
                this.setPropertyBinder(this.scope, p)
                this.setPropertyValues(p)
            });
        }
        var observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                    this.setPropertyValues(mutation.attributeName)
                }
            });
        });

        observer.observe(this.scope, {
            attributes: true
        });
        this.eventBinder()
    }
    dataBinder() {
        Object.keys(this.scope.data).forEach(d => {
            this.setDataBinder(this.scope, d)
        })
        this.scope.data2 = this.scope.data
        this.setProxy('data', 'data2')

    }
    setProxy(key, key2) {
        let path = eval(`this.scope.${key}`)
        let path2 = eval(`this.scope.${key2}`)
        if (typeof path == 'object') {
            eval(`this.scope.${key} = new Proxy(path2, {
                set: (target, key3, value) => {
                    let key4 = key == 'data'? key.replace('data', '').concat(key3): key.replace('data.', '').concat('.').concat(key3)
                    this.setDataValues(key4, value)
                    target[key3] = value
                    return true
                }
            })`)
            Object.keys(path).forEach(k => {
                this.setProxy(`${key}.${k}`, `${key2}.${k}`)
            });
        }
    }
    setDataBinder(element, key) {
        let _in = element.querySelectorAll(`${element.localName} > [data-in="${key}"]`)
        let _out = element.querySelectorAll(`${element.localName} > [data-out="${key}"]`)
        let path = `this.scope.data.${key}`
        if (eval(`typeof ${path} == 'object'`)) {
            eval(`Object.keys(${path})`).forEach(k => {
                this.setDataBinder(element, `${key}.${k}`)
            });
        }
        if (!this[key])
            this[key] = {}
        if (!this[key]._out)
            this[key]._out = []
        if (!this[key]._in)
            this[key]._in = []

        this[key]._out = this[key]._out.concat(Array.from(_out))
        this[key]._in = this[key]._in.concat(Array.from(_in))

        for (let i = 0; i < element.children.length; i++) {
            let child = element.children[i]
            for (let i = 0; i < child.attributes.length; i++) {
                const attribute = child.attributes[i];
                if (/^[$].*/.test(attribute.name)) {
                    let attributeName = attribute.name.replace('$', '')
                    if (attribute.value == key) {
                        if (!this[key])
                            this[key] = {}
                        if (!this[key].elements)
                            this[key].elements = []

                        this[key].elements.push({
                            element: child,
                            attribute: attributeName
                        })
                    }
                }
            }
            if (child.children.length > 0 && child && !(child instanceof BaseComponent)) {
                this.setDataBinder(child, key)
            }
        }
    }
    setDataValues(key, value) {
        if (this[key].elements) {
            this[key].elements.forEach(e => {
                e.element.setAttribute(e.attribute, value)
            })
        }
        this[key]._in.forEach(i => {
            i.value = value
        })
        this[key]._out.forEach(o => {
            o.innerHTML = value
        })
    }
    setValuesAndEvents(key) {
        let path = `this.scope.data2.${key}`
        this.setDataValues(key, eval(path))
        if (typeof eval(path) == 'object') {
            Object.keys(eval(path)).forEach(k => {
                this.setValuesAndEvents(`${key}.${k}`)
            });
        }
        this[key]._in.forEach(i => {
            i.addEventListener('input', e => {
                eval(`${path.replace('data2', 'data')} = e.target.value`)
            })
        });
    }
    setPropertyBinder(element, key) {
        let _out = this.scope.querySelectorAll(`${element.localName} > [data-out="${key}"]`)
        if (!this[key])
            this[key] = {}
        if (!this[key]._out)
            this[key]._out = []
        if (!this[key]._in)
            this[key]._in = []
        this[key]._out = this[key]._out.concat(Array.from(_out))
        for (let i = 0; i < element.children.length; i++) {
            let child = element.children[i]
            for (let i = 0; i < child.attributes.length; i++) {
                const attribute = child.attributes[i];
                if (/^[$].*/.test(attribute.name)) {
                    let attributeName = attribute.name.replace('$', '')
                    if (attribute.value == key) {
                        if (!this[key])
                            this[key] = {}
                        if (!this[key].elements)
                            this[key].elements = []

                        this[key].elements.push({
                            element: child,
                            attribute: attributeName
                        })
                    }
                }
            }
            if (child.children.length > 0 && child && !(child instanceof BaseComponent)) {
                this.setPropertyBinder(child, key)
            }
        }
    }
    setPropertyValues(key) {
        if (Array.isArray(this.scope.property))
            this.scope.property = {}

        if (this.scope.hasAttribute(key)) {
            if (this[key].elements) {
                this[key].elements.forEach(e => {
                    e.element.setAttribute(e.attribute, this.scope.getAttribute(key))
                })
            }
            this.scope.property[key] = this.scope.getAttribute(key)
            this[key]._out.forEach(o => {
                o.innerHTML = this.scope.getAttribute(key)
            })
        }
    }
    eventBinder() {
        this.setEvents(this.scope)
    }
    setEvents(element) {
        for (let index = 0; index < element.children.length; index++) {
            const child = element.children[index];
            for (let i = 0; i < child.attributes.length; i++) {
                const attribute = child.attributes[i];
                if (/^@.*/.test(attribute.name)) {
                    child.addEventListener(attribute.name.replace('@', ''), (e) => {
                        if (e.detail.length > 0)
                            this.scope[attribute.value](...e.detail)
                        else
                            this.scope[attribute.value]()
                    })
                }
            }
            if (child.children.length > 0 && !(child instanceof BaseComponent)) {
                this.setEvents(child)
            }
        }
    }
}