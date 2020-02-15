import BaseComponent from '../framework/script/base-component.js'

export default class PopUpInfo extends BaseComponent {
    path = 'component/pop-up-info.html'
    property = ['title', 'info']
    data = {
        text: 'teste'
    }
    send() {
        this.emit('bla', this.property.info, 1, false)
    }
}
