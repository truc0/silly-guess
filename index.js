const express = require('express')

const { query, create, all } = require('./models')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

const getCount = games => {
  return Object.keys(games).length
}

app.get('/', (req, res) => {
  res.send({ count: getCount(all()) })
})

app.post('/', (req, res) => {
  const id = create({ max: req.body.max })
  res.send({ id })
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  const game = query(id)
  if (game === null) {
    res.status(404)
    res.send({ status: 404, message: 'Not Found' })
    return
  }
  res.send({ guess_cnt: game.guess_cnt, status: game.status })
})

app.post('/:id/guess', (req, res) => {
  const id = req.params.id
  const game = query(id)

  if (game === null) {
    res.status(404)
    res.send({ status: 404, message: 'Not Found' })
    return
  }

  if (req.body.guess === undefined || req.body.guess === null) {
    res.status(400)
    res.send({ status: 400, message: `'guess' should be provided` })
    return
  }

  const guess = parseInt(req.body.guess)
  if (isNaN(guess)) {
    res.status(400)
    res.send({ status: 400, message: `'guess' should be a number` })
    return
  }

  console.log(`[GAME] new guess, id: ${id}, guess: ${guess}, answer: ${game.answer}`)

  if (game.status === 'solved') {
    res.status(400)
    res.send({ message: "This game is solved" })
  }

  game.guess_cnt++ 
  if (guess === game.answer) {
    game.status = "solved" 
    res.send({ message: "bingo", code: 0 })
  } else if (guess > game.answer) {
    res.send({ message: "too large", code: 2 })
  } else if (guess < game.answer) {
    res.send({ message: "too small", code: 1 })
  } else {
    res.status(500)
    res.send({ message: "Unknown error", code: -1 })
  }
})

app.listen(PORT, () => {
  console.log(`Guess API backend is running at http://localhost:${PORT}`)
})
