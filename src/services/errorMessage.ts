export type ErrorMessage = {
  title: string;
  message: string;
};

const SIGNIN_FAILED: ErrorMessage = {
  title: "Signin failed",
  message: "Incorrect email or password",
};
const NO_INTERNET: ErrorMessage = {
  title: "No Internet",
  message: "Poor network connection detected. Please check your connectivity",
};

const UNPROCESSABLE_ENTITY: ErrorMessage = {
  title: "Unavailable entity",
  message:
    "Occurs when a request is well-formed, however, due to semantic errors it is unable to be processed",
};
// del
function generateGenericError(errorCode?: string): ErrorMessage {
  return {
    title: `Error ${errorCode}`,
    message: ` 'Something's gone wrong on our side. Please try again in a little bit, or get in touch with tech support if the issue still persists'`,
  };
};

const errorMessage = {
  SIGNIN_FAILED,
  NO_INTERNET,
  UNPROCESSABLE_ENTITY,
  generateGenericError,
};

export default errorMessage;
