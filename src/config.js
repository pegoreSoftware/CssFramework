import PopUpInfo from './component/pop-up-info.js'
import MyApp from './app.js'
import MyForm from './component/my-form.js'
import Button from './pages/button.js'
import Colors from './pages/colors.js'
import Grid from './pages/grid.js'
import Input from './pages/input.js'
import Typography from './pages/typography.js'
import Main from './pages/main.js'

customElements.define('main-app', MyApp);
customElements.define('popup-info', PopUpInfo);
customElements.define('my-form', MyForm)
customElements.define('page-button', Button)
customElements.define('page-colors', Colors)
customElements.define('page-grid', Grid)
customElements.define('page-input', Input)
customElements.define('page-typography', Typography)
customElements.define('main-page', Main)

var app = new App()

app.router = new Router([
    new Route('/', 'main-page', true, 'buttons', [
        new Route('', 'popup-info', true, 'popup'),
        new Route('', 'my-form', false, 'form'),
    ]),
    new Route('button', 'page-button', false, 'buttons'),
    new Route('colors', 'page-colors', false, 'colors'),
    new Route('grid', 'page-grid', false, 'grid'),
    new Route('input', 'page-input', false, 'inputs'),
    new Route('typography', 'page-typography', false, 'typography'),
])