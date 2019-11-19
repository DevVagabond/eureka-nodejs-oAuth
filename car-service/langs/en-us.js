'use strict'

var module, exports;

module.exports.errors = {
  INTERNAL_ERROR: {
    message: "Internal Server Error",
    code: 500
  },
  NO_API_FOUND: {
    message: "This Api Is Not Implemented Till Now",
    code: 404
  },
  RESOURCE_NOT_FOUND: {
    message: "Oops! Something went wrong.Try again…",
    code: 404
  },
  NO_DATA_FOUND: {
    message: "No Data Found!!",
    code: 401
  },
  NO_CAR_FOUND: {
    message: "No car found!!",
    code: 401
  },
  ACC_DENIED: {
    message: "Access denied",
    code: 403
  },
  PASSWORD_MISMATCH: {
    message: "Password is incorrect",
    code: 401
  },
  USER_NOT_FOUND: {
    message: "Requested user not found",
    code: 401
  },
  CUSTOM_MESSAGE: {
    message: "Please include a message for this response",
    code: 404
  },
  DATABASE_ERROR: {
    message: "We have found some database errors in servers",
    code: 500
  },
  INVALID_EMAIL: {
    message: "Oops! We need a valid email address",
    code: 401
  },
  INVALID_MOBILE: {
    message: "Please enter a valid mobile number",
    code: 401
  },
  UNAUTHORIZED_TOKEN: {
    message: "Unauthorized",
    code: 403
  },
  UNAUTHORIZED_API_KEY: {
    message: "Unauthorized API key",
    code: 403
  },
  BAD_REQ: {
    message: "BAD_REQ",
    code: 401
  },
  TX_FAILED: {
    message: "Transaction failed. Please try again",
    code: 401
  },
  UNAUTH_DATA: {
    message: "Unauthorized data",
    code: 401
  },
  TIME_EXISTS: {
    message: "Schedule for this car already exists. Please edit timeline to modify or add new dates",
    code: 401
  },
  CAR_EXISTS: {
    message: "Duplicate car number",
    code: 401
  }
}

module.exports.success = {
  SUCCESS: {
    message: "success",
    code: 200
  },
  SUCCESS_UPD: {
    message: "update successful",
    code: 200
  }
}
