import BaseComponent from '../framework/script/base-component.js'

export default class MyForm extends BaseComponent {
    path = 'component/my-form.html'
    property = ['info']
    data = {
        name: '',
        email: '',
        password: ''
    }
    send() {
        let obj = {
            name: this.data.name,
            email: this.data.email,
            password: this.data.password
        }
        this.emit('send', obj)
    }

}