import Binder from './binder.js'

export class Directives { }

export class DIf extends Directives {
    update(element, value, scope) {
        if (!scope[element.getAttribute('key')]) {
            scope[element.getAttribute('key')] = {}
            scope[element.getAttribute('key')].parent = element.parentElement
            scope[element.getAttribute('key')].index = Array.from(scope[element.getAttribute('key')].parent.children).indexOf(element)
        }
        let parent = scope[element.getAttribute('key')].parent
        let condition = scope.data[value]
        if (condition == undefined)
            condition == scope.property[value]
        if (condition == undefined)
            condition = scope[value]()
        
        if (condition) {
            let arr = Array.from(parent.children)
            let index = scope[element.getAttribute('key')].index
            arr.splice(index, 0, element);
            parent.innerHTML = ''
            arr.forEach(e => {
                parent.appendChild(e)
            });
        } else {
            element.outerHTML = ''
        }
    }
}

export class DFor extends Directives {
    update(element, value, scope) {
        let parent = element.parentElement
        let index = -1
        if (!parent) {
            let els = scope.querySelectorAll(element.localName)
            for (let i = 0; i < els.length; i++) {
                const el = els[i];
                if (el.getAttribute('key') == element.getAttribute('key')) {
                    parent = el.parentElement
                    index = Array.from(parent.children).indexOf(el)
                    break;
                }
            }
        }
        let itens = value.split('in')
        let [variable, array] = itens
        variable = variable.trim()
        array = array.trim()

        let arr = Array.from(parent.children)
        try {
            element.outerHTML = ''
            index = arr.indexOf(element)
            arr.splice(index, 1)
        } catch {
            console.log();
        } finally {
            if (parent[element.getAttribute('key')])
                arr.splice(index, parent[element.getAttribute('key')]);
            parent[element.getAttribute('key')] = scope.data[array].length
            for (let i = 0; i < scope.data[array].length; i++) {
                let a = scope.data[array][i]
                let newElement = document.createElement(element.localName)
                for (let j = 0; j < element.attributes.length; j++) {
                    const attribute = element.attributes[j];
                    if (!(/^[!].*/.test(attribute.name)))
                        newElement.setAttribute(attribute.name, attribute.value)
                }                    
                newElement.innerHTML = element.innerHTML
                if (!newElement.data)
                    newElement.data = {}
                newElement.data[variable] = a
                newElement.binder = new Binder(newElement)
                arr.splice(index + i, 0, newElement);
            }
            parent.innerHTML = ''
            arr.forEach(e => {
                parent.appendChild(e)
            });
        }
    }
}