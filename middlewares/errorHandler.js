import httpStatusCodes from "http-status-codes";
const errorHandler = (err, req, res, next) => {
  

  const errorObj = {
    stausCode: err.stausCode || httpStatusCodes.BAD_REQUEST,
    message: err.message || "Something went wrong",
  };

  if (err.name === "ValidationError") {
    errorObj.stausCode = httpStatusCodes.BAD_REQUEST;
    errorObj.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(" ");
  }
  if (err.code && err.code === 11000) {
    errorObj.stausCode = httpStatusCodes.BAD_REQUEST;
    errorObj.message = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(errorObj.stausCode).json({ message: errorObj.message });
};

export default errorHandler;
