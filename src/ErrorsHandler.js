class ErrorsHandler {
  showError (error) {
    console.log(error);
  }

  formError (error) {
    error.errors.map((e) => {
      console.log(e);
    });
  }
}
 
export default ErrorsHandler;