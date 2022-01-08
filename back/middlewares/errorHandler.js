exports.ErrorHandler = (err, req, res, next) => {
  console.log("in error handeling");
  for (const error in allErrors){
    if(allErrors[error].message === err) {
      res
        .status(allErrors[error].code)
        .json({ message: allErrors[error].message });
      return;
    }
  }
  res.status(500).send(err.message);
};

const allErrors = 
{ 
  invalidRegistrationParams: {
    message: "Either username or password are invalid",
    code: 401
  },
  missingRegistrationParams: {
    message: "Either username or password are missing",
    code: 400
  },
  incorrectKey: { 
    message: "Incorrect Key",
     code: 401 
  },
  missingKey: { 
    message: "Missing Key",
     code: 400 
  },
  expiredKey: { 
    message: "Expired Key",
     code: 400 
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
