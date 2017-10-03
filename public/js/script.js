$(document).ready(function () {
  console.log('Document ready')

// Canvas Init ========================

  var canvas = $('#canvas')
  canvas[0].width = window.innerWidth
  canvas[0].height = window.innerHeight
  var c = canvas[0].getContext('2d')

// Responsive Canvas Resize ===============

  // $(window).resize(function () {
  //   canvas[0].width = window.innerWidth
  //   canvas[0].height = window.innerHeight
  //   c.clearRect(0, 0, window.innerWidth, window.innerHeight)
  // })

// Canvas Intereactions ====================

  var mouse = {
    x: undefined,
    y: undefined
  }

  $(window).mousemove(function (event) {
    // console.log('X: ' + event.originalEvent.movementX)
    // console.log('Y: ' + event.originalEvent.movementY)
    mouse.x = event.originalEvent.movementX
    mouse.y = event.originalEvent.movementY
    // is this not an integer?
  })

// Star Object ======================

  function Star (x, y, width, height, dx, dy) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.dx = dx
    this.dy = dy

    // draws star ===================

    this.draw = function () {
      c.fillStyle = 'rgba(255, 255, 255, 1)'
      c.fillRect(this.x, this.y, this.width, this.height, this.dx)
    }

    // controls star velocity =================

    this.update = function () {
      // infinitely scrolling stars!
      if (this.x > window.innerWidth) {
        this.x = 0 - Math.random() * window.innerWidth
      } else if (this.x < 0) {
        this.x = window.innerWidth + Math.random() * window.innerWidth
      }

      if (this.y > window.innerHeight) {
        this.y = 0 - Math.random() * window.innerHeight
      } else if (this.y < 0) {
        this.y = window.innerHeight + Math.random() * window.innerHeight
      }

      // Star interactivity
      if (mouse.x == undefined) {
        this.x += this.dx
      } else {
        this.x += this.dx + (mouse.x * 0.15)
      }

      if (mouse.y == undefined) {
        this.y += dy
      } else {
        this.y += this.dy + (mouse.y * 0.15)
      }

      this.draw()
    }
  }

  // Background Stars =======================

  var backStarArray = []

  for (var i = 0; i < 500; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    let dx = 0.2
    let dy = 0
    backStarArray.push(new Star(x, y, 1, 1, dx, dy))
  }

  // Foreground Stars =======================

  var foreStarArray = []

  for (var i = 0; i < 35; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    let dx = 0.4
    let dy = 0
    foreStarArray.push(new Star(x, y, 2, 2, dx, dy))
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
