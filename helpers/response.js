import { getReasonPhrase } from 'http-status-codes'

export const successResponse = (res, data, status = 200) => {
  return res.status(status).json({
    response: {
      status,
      message: getReasonPhrase(status)
    },
    data
  })
}

export const failureResponse = (res, message = null, status = 400) => {
  return res.status(status).json({
    response: {
      status,
      message: getReasonPhrase(status)
    },
    data: {
      message: message || getReasonPhrase(status)
    }
  })
}