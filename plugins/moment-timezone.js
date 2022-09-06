const moment = require('moment-timezone')
export default (context, inject) => {
  inject('moment_timezone', moment)
}
