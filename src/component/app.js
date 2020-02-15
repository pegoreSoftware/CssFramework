import BaseComponent from '../framework/script/base-component.js'

export default class App extends BaseComponent {
  path = 'component/app.html'
  data = {
      text: 'Hello',
      user: {
        name: {
          firstName: 'Rafael',
          surName: {
            secondyName: 'Silva',
            lastName: 'Pegoretti'
          }
        },
        email: 'rafaelsilvapegoretti@gmail.com'
      }
  }
  mounted() {
    this.data.text = 'Hello World'
  }
  send(e1, e2, e3) {
      alert(`${e1} ${e2} ${e3}`)
  }
  change() {
    let colors = ['blue', 'red', 'yellow']
    let color = colors[Math.round(Math.random() * (2 - 0) + 0)]
    this.data.color = `bg-${color}`
  }
}
