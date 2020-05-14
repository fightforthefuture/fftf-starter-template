import Vue from 'vue'

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
export function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset
  const startY = window.scrollY || window.pageYOffset
  const startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  const easeInOutQuart = function (time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
  }

  const timer = window.setInterval(function () {
    const time = new Date().getTime() - startTime
    const newX = easeInOutQuart(time, startX, endX, duration)
    const newY = easeInOutQuart(time, startY, endY, duration)
    if (time >= duration) {
      window.clearInterval(timer)
    }
    window.scrollTo(newX, newY)
  }, 1000 / 60) // 60 fps
}

// Smooth scroll animation to an element by ID
export function smoothScrollToElement(el, duration) {
  duration = typeof duration !== 'undefined' ? duration : 500
  el = typeof el === 'string' ? document.querySelector(el) : el

  if (el) {
    const box = el.getBoundingClientRect()
    smoothScrollTo(box.x, box.y, duration)
  }
}

// Smooth step scroll within an element
// export function smoothScrollWithinElement(el, endY, duration) {
//   const startY = el.scrollTop
//   const change = endY - startY
//   let currentTime = 0
//   const increment = 20
//   duration = typeof duration !== 'undefined' ? duration : 400

//   const easeInOutQuad = function (time, start, change, duration) {
//     time /= duration / 2
//     if (time < 1) return change / 2 * time * time + start
//     time--
//     return -change / 2 * (time * (time - 2) - 1) + start
//   }

//   const smoothStepScroll = function () {
//     currentTime += increment
//     const val = easeInOutQuad(currentTime, startY, change, duration)
//     el.scrollTop = val
//     if (currentTime < duration) {
//       setTimeout(smoothStepScroll, increment)
//     }
//   }
//   smoothStepScroll()
// }

Vue.prototype.$scrollTo = hash => {
  const duration = 500
  smoothScrollToElement(hash, duration)
  setTimeout(() => {
    location.hash = hash
  }, duration)
}
