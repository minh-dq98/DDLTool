export default function ({ app, $axios, route, redirect, store }) {
  $axios.setHeader('x-api-key', process.env.API_KEY)
  let text = ''
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      case 400:
        break
      case 404:
        break
      case 401:
        if (window.location.href.includes('login')) break
        else redirect(`/`)
        break
      case 412:
        break
      case 500:
        text = app.i18n.t('actions.errors.500')
        app.$toast.error(text)
        break
    }
    return null
  })
}
