import { getPlayAgainButton, getTimerElement } from './selectors.js'

function shuffle(arr) {
  for (let i = arr.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * i)
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  const listColor = []
  const hueColor = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']

  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: 'dard',
      hue: hueColor[i % hueColor.length],
    })
    listColor.push(color)
  }
  const fullListColor = [...listColor, ...listColor]
  shuffle(fullListColor)
  return fullListColor
}
export function showPlayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  if (playAgainButton) playAgainButton.classList.add('show')
}
export function hidePlayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  if (playAgainButton) playAgainButton.classList.remove('show')
}
export function setTimerText(text) {
  const timerElement = getTimerElement()
  if (timerElement) timerElement.textContent = text
}

export function createTimer({ seconds, onChange, onFinish }) {
  let intervalid = null
  function start() {
    clear()
    let currentSecond = seconds
    intervalid = setInterval(() => {
      onChange?.(currentSecond)
      currentSecond--
      if (currentSecond < 0) {
        clear()
        onFinish?.()
      }
    }, 1000)
  }
  function clear() {
    clearInterval(intervalid)
  }
  return {
    start,
    clear,
  }
}
