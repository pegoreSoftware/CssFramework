import PopUpInfo from './component/pop-up-info.js'
import MyApp from './component/app.js'
import MyForm from './component/my-form.js'

var app = new App()
app.router = new Router([
    new Route('/', 'pages/grid.html', true, 'grid'),
    new Route('colors', 'pages/colors.html', false, 'colors'),
    new Route('button', 'pages/button.html', false, 'button'),
    new Route('input', 'pages/input.html', false, 'input'),
    new Route('typography', 'pages/typography.html', false, 'typography'),
    new Route('app', 'pages/components.html', false, 'app'),
])

customElements.define('my-app', MyApp);
customElements.define('popup-info', PopUpInfo);
customElements.define('my-form', MyForm)
