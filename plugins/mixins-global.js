import Vue from 'vue'
import _ from 'lodash'
import $ from 'jquery'
import utility from '../mixins/utility'

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin(utility)
}

window.jQuery = window.$ = $

Object.defineProperty(Vue.prototype, '$', { value: $ })
Object.defineProperty(Vue.prototype, '$_', { value: _ })
Object.defineProperty(Vue.prototype, 'localStorage', {
  value: window.localStorage,
})

function getElementY(query) {
  return window.pageYOffset + query.getBoundingClientRect().top
}

function doScrolling(element, duration) {
  const startingY = window.pageYOffset
  const elementY = getElementY(element)
  // If element is close to page's bottom then window will scroll only to some position above the element.
  const targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY
  const diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  const easing = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  let start

  if (!diff) return

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

Object.defineProperty(Vue.prototype, 'doScrolling', {
  value: doScrolling,
})
