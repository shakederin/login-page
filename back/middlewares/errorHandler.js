exports.ErrorHandler = (err, req, res, next) => {
  for (const error in allErrors){
    if(allErrors[error].message === err.message) {
      res
        .status(allErrors[error].code)
        .json({ message: errorCodes[error].message });
      return;
    }
  }
  res.status(500).send(err.message);
};

const allErrors = 
{ 
  invalidRegistrationParams: {
    message: "Either username or password params are invalid",
    code: 403
  },
  missingRegistrationParams: {
    message: "Either username or password params are missing",
    code: 403
  },
  incorrectKey: { 
    message: "Incorrect Key",
     code: 403 
  },
  badToken: {
     message: "Bad token",
      code: 403 
  },
  dbError: { 
    message: "couldn't add new user",
     code: 500 
  },
  dbError: { 
    message: "couldn't delete user",
     code: 500 
  }
}
