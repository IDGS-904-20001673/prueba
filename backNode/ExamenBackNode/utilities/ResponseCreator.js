class ResponseCreator {
    constructor(success, data, err) {
      this.success = success;
      this.message = success ? 'SUCCESSFUL OPERATION' : err;
      this.data = data;
    }
  }
  
  module.exports = ResponseCreator;