class App {
    router
    constructor() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById('app').innerHTML = this.responseText;
            }
        };
        xhttp.open('GET', 'app.html', false);
        xhttp.send()
        window.history.replaceState('Object', 'Title', `/#/`);
    }
}