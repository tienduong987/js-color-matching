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
