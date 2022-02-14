export function getColorElementList() {
  return document.querySelectorAll('#colorList > li')
}
export function getActiveElementList() {
  return document.querySelectorAll('#colorList > li:not(.active)')
}
export function getColorListElement() {
  return document.querySelector('#colorList')
}
export function getTimerElement() {
  return document.querySelector('.game .game__timer')
}

export function getPlayAgainButton() {
  return document.querySelector('.game .game__button')
}

export function getColorBackground() {
  return document.querySelector('.color-background')
}
