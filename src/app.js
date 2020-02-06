var app = new App()
app.router = new Router([
    new Route('/', 'pages/grid.html', true, 'grid'),
    new Route('colors', 'pages/colors.html', false, 'colors'),
    new Route('button', 'pages/button.html', false, 'button'),
    new Route('input', 'pages/input.html', false, 'input'),
    new Route('typography', 'pages/typography.html', false, 'typography'),
])