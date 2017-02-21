var express = require('express')
var router  = express.Router()
var find = require('lodash/find')

let width
let height

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#DFFF00",
    name: "Random Snake",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
  }


  width = req.body.width
  height = req.body.height

  return res.json(data)
})

function canMove(board, x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return false
  return board[x][y] === ' '
}

// Handle POST request to '/move'
router.post('/move', function (req, res) {

  const { snakes } = req.body

  const board = []
  for (let i = 0; i < width; i++) {
    board[i] = []
    for (let j = 0; j < height; j++) {
      board[i][j] = ' '
    }
  }

  snakes.forEach(snake => {
    snake.coords.forEach(coord => board[coord[0]][coord[1]] = 's')
  })

  const me = find(snakes, { id: req.body.you })

  const head = me.coords[0]

  const move = Math.floor(4 * Math.random())

  var data = {
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  if (move === 0 && canMove(board, head[0], head[1]-1)) data.move = 'up'
  if (move === 1 && canMove(board, head[0], head[1]+1)) data.move = 'down'
  if (move === 2 && canMove(board, head[0]-1, head[1])) data.move = 'left'
  if (move === 3 && canMove(board, head[0]+1, head[1])) data.move = 'right'

  if (!data.move) {
    if (canMove(board, head[0], head[1]-1)) data.move = 'up'
    if (canMove(board, head[0], head[1]+1)) data.move = 'down'
    if (canMove(board, head[0]-1, head[1])) data.move = 'left'
    if (canMove(board, head[0]+1, head[1])) data.move = 'right'
  }

  if (!data.move) {
    // you ded.
    data.move = 'up'
  }

  return res.json(data)
})

module.exports = router
