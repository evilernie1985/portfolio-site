$(document).ready(function () {
  console.log('Document ready')

  var canvas = $('#canvas')
  canvas[0].width = window.innerWidth
  canvas[0].height = window.innerHeight
  var c = canvas[0].getContext('2d')

// Star Object ======================

  function Star (x, y, width, height, dx) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.dx = dx

    // draws star ===================

    this.draw = function () {
      c.fillStyle = 'rgba(255, 255, 255, 1)'
      c.fillRect(this.x, this.y, this.width, this.height, this.dx)
    }

    // controls star velocity =================

    this.update = function () {
      // infinitely scrolling stars!
      if (this.x > window.innerWidth) {
        this.x = 0
      }
      this.x += this.dx
      this.draw()
    }
  }

  // Background Stars =======================

  var backStarArray = []

  for (var i = 0; i < 500; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    let dx = 0.2
    backStarArray.push(new Star(x, y, 1, 1, dx))
  }

  // Foreground Stars =======================

  var foreStarArray = []

  for (var i = 0; i < 35; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    let dx = 0.4
    foreStarArray.push(new Star(x, y, 2, 2, dx))
  }

// Animate =======================

  function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (var i = 0; i < backStarArray.length; i++) {
      backStarArray[i].update()
    }
    for (var i = 0; i < foreStarArray.length; i++) {
      foreStarArray[i].update()
    }
  }

  animate()

})
