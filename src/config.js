import { App } from './framework/script/app.js'
import { Route } from './framework/script/route.js'
import { Router } from './framework/script/router.js'
import MyApp from './app.js'

import PopUpInfo from './component/pop-up-info.js'

import MyForm from './component/my-form.js'
import Button from './pages/button.js'
import Colors from './pages/colors.js'
import Grid from './pages/grid.js'
import Input from './pages/input.js'
import Typography from './pages/typography.js'
import Main from './pages/main.js'

var app = new App('main-app', MyApp)

App.registerComponent('popup-info', PopUpInfo);
App.registerComponent('my-form', MyForm)
App.registerComponent('page-button', Button)
App.registerComponent('page-colors', Colors)
App.registerComponent('page-grid', Grid)
App.registerComponent('page-input', Input)
App.registerComponent('page-typography', Typography)
App.registerComponent('main-page', Main)


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