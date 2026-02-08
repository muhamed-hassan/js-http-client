
/*
 * Designed to be extended (inherited) to hide the low level complexity a bit and generalize the HTTP verbs usage.
 * 
 * # Abstract example: 
 * ChildClientClass extends HttpClient => Where `ChildClient` is replaced with a proper name where it follows SRP and KISS 
 *
 * # Backend service provider base url
 * serviceProviderBaseUrl is injected via app configurations
 * 
 * */
class HttpClient {
    
    doGet(requestUrl, requestHeaders) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", serviceProviderBaseUrl + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send();

        switch (xhttp.status) {
            case 200:
                return xhttp.response;
            case 404:
                throw new Error(JSON.parse(xhttp.response).error);
            case 400:
                throw new Error(xhttp.response);                
            default:
                throw new Error("Error of " + xhttp.statusText);
        }
    
    }
    
    doPost(requestUrl, requestHeaders, requestPayload) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", serviceProviderBaseUrl + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send(requestPayload);

        switch (xhttp.status) {
            case 201:
                break;
            case 400:
                throw new Error(xhttp.response);
            default:
                throw new Error("Error of " + xhttp.statusText);
        }
        
    }
    
    doDelete(requestUrl) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", serviceProviderBaseUrl + requestUrl, false);
        xhttp.send();

        switch (xhttp.status) {
            case 204:
                break;
            case 404:
                throw new Error(JSON.parse(xhttp.response).error);
            default:
                throw new Error("Error of " + xhttp.statusText);
        }

    }
    
    doPut(requestUrl, requestHeaders, requestPayload) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", serviceProviderBaseUrl + requestUrl, false);
        this.fillRequestHeaders(requestHeaders, xhttp);
        xhttp.send(requestPayload);

        switch (xhttp.status) {
            case 204:
                break;
            case 400:
                throw new Error(xhttp.response);
            default:
                throw new Error("Error of " + xhttp.statusText);
        }

    }
    
    /* ****************************************************************************************************************** */
    
    fillRequestHeaders(requestHeaders, xhttp) {
        if (requestHeaders != null) {
            for (var entry of requestHeaders.entries()) {
                xhttp.setRequestHeader(entry[0], entry[1]);
            }
        }
    }

}

