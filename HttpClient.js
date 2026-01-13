
/*
 * Designed to be extended (inherited) to hide the low level complexity a bit and generalize the HTTP verbs usage.
 * 
 * Abstract Example: 
 * - ChildClientClass extends HttpClient => Where `ChildClient` is replaced with a proper name where it follows SRP and KISS 
 * 
 * */
class HttpClient {

    constructor(providerBaseUrl) {
        this.providerBaseUrl = providerBaseUrl;
    }
    
    doGet(requestUrl, requestHeaders) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.providerBaseUrl + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send();
    
        if (xhttp.status != 200) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }
    
        return xhttp.responseText;
    }
    
    doPost(requestUrl, requestHeaders, requestPayload) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.providerBaseUrl + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send(requestPayload);
    
        if (xhttp.status != 201) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }

        return this.constructHttpStatus(xhttp);
    }
    
    doDelete(requestUrl) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", this.providerBaseUrl + requestUrl, false);
        xhttp.send();
    
        if (xhttp.status != 204) {
            throw new Error("ERROR with: " + this.constructHttpStatus(xhttp));
        }

        return this.constructHttpStatus(xhttp);
    }
    
    doPut(requestUrl, requestHeaders, requestPayload) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", this.providerBaseUrl + requestUrl, false);
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

    constructHttpStatus(xhttp) {
        return xhttp.status + " " + xhttp.statusText;
    }

}

