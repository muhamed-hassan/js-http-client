
class HttpClient {
    
    doGet(requestUrl, requestHeaders) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.getUrlProtocol() + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send();
    
        if (xhttp.status != 200) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }
    
        return xhttp.responseText;
    }
    
    doPost(requestUrl, requestHeaders, requestPayload) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.getUrlProtocol() + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send(requestPayload);
    
        if (xhttp.status != 201) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }

        return this.constructHttpStatus(xhttp);
    }
    
    doDelete(requestUrl) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", this.getUrlProtocol() + requestUrl, false);
        xhttp.send();
    
        if (xhttp.status != 204) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }

        return this.constructHttpStatus(xhttp);
    }
    
    doPut(requestUrl, requestHeaders, requestPayload) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", this.getUrlProtocol() + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send(requestPayload);
    
        if (xhttp.status != 204) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }

        return this.constructHttpStatus(xhttp);
    }
    
    /* ****************************************************************************************************************** */
    
    fillRequestHeaders(requestHeaders, xhttp) {
        if (requestHeaders != null) {
            for (var entry of requestHeaders.entries()) {
                xhttp.setRequestHeader(entry[0], entry[1]);
            }
        }
    }

    getUrlProtocol() {
        return "http://";
    }

    constructHttpStatus(xhttp) {
        return xhttp.status + " " + xhttp.statusText;
    }

}

