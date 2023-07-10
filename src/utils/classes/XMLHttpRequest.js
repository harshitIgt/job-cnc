class XMLHttpRequest {
  constructor() {
    this.response = "";
    this.responseXML = "";
    this.status = 0;
    this.statusText = "";
    this.xhr = "";
  }

  open(method, url, async, user, password) {
    this.xhr.open(method, url, async, user, password);
  }

  abort() {
    this.xhr.abort();
  }

  setRequestHeader(name, value) {
    this.xhr.setRequestHeader(name, value);
  }

  send(data) {
    this.xhr.send(data);
    this.response = this.xhr.responseText;
    this.responseXML = this.xhr.responseXML;
    this.status = this.xhr.status;
    this.statusText = this.xhr.statusText;
  }

  getResponseHeader(name) {
    return this.xhr.getResponseHeader(name);
  }
}

global.XMLHttpRequest = XMLHttpRequest;
module.exports = XMLHttpRequest;
