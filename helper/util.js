import moment from 'moment'

export const leftFillNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, 0)
}

export const convertSecondToHHMM = (second) => {
  if (!second) return second
  const num = parseInt(second)
  const hh = Math.floor(num / 3600)
  const mm = Math.floor((num - hh * 3600) / 60)
  return leftFillNum(hh, 2) + ':' + leftFillNum(mm, 2)
}

export const formatToHHMM = (strValue) => {
  return strValue ? moment(strValue).format('YYYY-MM-DD HH:mm') : ''
}

export const formatToYYYYMMDD = (strValue) => {
  return strValue ? moment(strValue).format('YYYY-MM-DD') : ''
}

export const formatToHHMMSS = (strValue) => {
  return strValue ? moment(strValue).format('YYYY-MM-DD HH:mm:ss') : ''
}

export const convertFromFormat = (date, format) => {
  return date ? moment(date).format(format) : date
}

export const convertMToKM = (met) => {
  if (!met) return met
  const num = parseInt(met)
  const km = num / 1000
  return km
}

export const sortAsc = (array) => {
  return array.sort(function (a, b) {
    return a.id - b.id
  })
}

export const readErrors = (errors) => {
  let message = ''
  if (errors && errors.status === 422) {
    const data = errors.data || ''
    data &&
      Object.keys(data).forEach((e) => {
        if (e === 'status_code') return
        if (e === 'errors' && typeof data[e] === 'object') {
          Object.keys(data[e]).forEach((v) => {
            if (Array.isArray(data[e][v])) {
              if (message.length) message += '\n'
              message += data[e][v].join('\n')
            }
          })
        }
      })
  }
  return message
}

export const readErrorsArray = (errors) => {
  const message = []
  if (errors && (errors.status === 422 || errors.status === 404)) {
    const data = errors.data || ''
    data &&
      Object.keys(data).forEach((e) => {
        if (e === 'status_code') return
        if (e === 'errors' && typeof data[e] === 'object') {
          Object.keys(data[e]).forEach((v) => {
            if (Array.isArray(data[e][v])) {
              message.push(data[e][v].toString())
            } else if (typeof data[e][v] === 'string') {
              message.push(data[e][v])
            }
          })
        }
      })
  }
  return message
}

export const toqueryString = (obj) => {
  const str = []
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }
  return str.join('&')
}
