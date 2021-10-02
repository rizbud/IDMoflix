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

export const failureResponse = (res, status = 400, message = null) => {
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

export const listResponse = (res, data, pagination) => {
  res.set({
    'Page': pagination?.page || 1,
    'Total-Page': pagination?.totalPage || 1
  })
  return successResponse(res, data)
}