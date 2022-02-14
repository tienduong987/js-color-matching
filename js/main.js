import { GAME_STATUS, GAME_TIME, PAIRS_COUNT } from './constants.js'
import {
  getRandomColorPairs,
  showPlayAgainButton,
  setTimerText,
  hidePlayAgainButton,
  createTimer,
} from './utils.js'
import {
  getColorElementList,
  getColorListElement,
  getActiveElementList,
  getPlayAgainButton,
  getColorBackground,
} from './selectors.js'

// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING
let timer = createTimer({
  seconds: GAME_TIME,
  onChange: handleTimeChange,
  onFinish: handleTimerFinish,
})
function handleTimeChange(second) {
  const fullSecond = `0${second}`.slice(-2)
  setTimerText(fullSecond)
}
function handleTimerFinish() {
  gameStatus = GAME_STATUS.FINISHED
  setTimerText('GAME OVER')
  showPlayAgainButton()
}

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click
function initColors() {
  const colorList = getRandomColorPairs(PAIRS_COUNT)
  const liList = getColorElementList()
  liList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]
    const overlayElement = liElement.querySelector('.overlay')
    if (overlayElement) overlayElement.style.backgroundColor = colorList[index]
  })
}
function handleColor(liElement) {
  const shouldBlockClick = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus)
  const isClicked = liElement.classList.contains('active')
  if (!liElement || isClicked || shouldBlockClick) return
  liElement.classList.add('active')
  selections.push(liElement)
  if (selections.length < 2) return
  //check match
  const firstColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color
  const isMatch = firstColor === secondColor
  if (isMatch) {
    const changeBack = getColorBackground()
    changeBack.style.backgroundColor = liElement.dataset.color
    const isWin = getActiveElementList().length === 0
    if (isWin) {
      setTimerText('YOU WIN!')
      showPlayAgainButton()
      timer.clear()
      gameStatus = GAME_STATUS.FINISHED
    }
    selections = []
    return
  }

  gameStatus = GAME_STATUS.BLOCKING
  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')
    selections = []
    if (gameStatus !== GAME_STATUS.FINISHED) {
      gameStatus = GAME_STATUS.PLAYING
    }
  }, 500)
}

function activeListElement() {
  const ulElement = getColorListElement()
  if (!ulElement) return
  ulElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    handleColor(event.target)
  })
}
function resetGame() {
  gameStatus = GAME_STATUS.PLAYING
  selections = []
  const colorElementList = getColorElementList()
  for (const colorElement of colorElementList) {
    colorElement.classList.remove('active')
  }
  hidePlayAgainButton()
  setTimerText('')
  initColors()
  startTimer()
}
function attachEventForPlayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  if (!playAgainButton) return
  playAgainButton.addEventListener('click', resetGame)
}
function startTimer() {
  timer.start()
}
;(() => {
  initColors()
  activeListElement()
  attachEventForPlayAgainButton()
  startTimer()
})()
