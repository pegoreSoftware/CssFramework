import BaseComponent from '../framework/script/base-component.js'

export default class Main extends BaseComponent {
  path = 'pages/main.html'
  data = {
    condition: true,
    texts: ['hello', 'olá', 'Oi']
  }
  toggle() {
    this.data.condition = !this.data.condition
  }
  change() {
    let number = Math.round(Math.random())
    if (number == 1)
      this.data.texts.push('Mais um valor')
    else
      this.data.texts.splice(0, 1)
  }
}