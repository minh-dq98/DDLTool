import { localize } from 'vee-validate'

export default function ({ app }) {
  localize(app.i18n.locale)
  app.$moment.locale(app.i18n.locale)
}
