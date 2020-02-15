export default class AJAXRequest {
    baseURL
    headers
    constructor(baseURL, headers = undefined) {
        this.baseURL = baseURL
        this.headers = headers
    }

    async get(endpoint, params = undefined, headers = this.headers) {
        return this.request('GET', endpoint, null, headers, params)
    }

    async post(endpoint, body, headers = this.headers, params = undefined) {
        return this.request('POST', endpoint, body, headers, params)
    }

    async put(endpoint, body, headers = this.headers, params = undefined) {
        return this.request('PUT', endpoint, body, headers, params)
    }

    async delete(endpoint, headers = this.headers, params = undefined) {
        return this.request('DELETE', endpoint, null, headers, params)
    }

    request(method, endpoint, body, headers, params) {
        return new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (/2../.test(this.status.toString())) {
                        let result
                        try {
                            result = JSON.parse(this.responseText)
                        } catch (error) {
                            result = this.responseText
                        }
                        resolve(result)
                    } else {
                        reject(this.status)
                    }
                }
                let s = ''
                if (params != undefined) {
                    s = '?'
                    let a = []
                    Object.keys(params).forEach(p => {
                        a.push(`${p}=${params[p]}`)
                    })
                    s = s.concat(a.join('&'))

                }
                xhttp.open(method, `${this.baseURL}${endpoint}${s}`, true);
                if (headers != undefined) {
                    Object.keys(headers).forEach(h => {
                        xhttp.setRequestHeader(h, headers[h])
                    })
                }
                let send = body != null ? new Blob([JSON.stringify(body)], { type: 'application/json' }) : body
                xhttp.send(send);
            }
        })
    }

}