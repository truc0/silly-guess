const { v4: uuidv4 } = require('uuid')

const Games = {}

const all = () => {
  return Games
}

const query = (id) => {
  return Games[id] ?? null
}

const create = ({ max } = {}) => {
  const id = uuidv4()
  const maxium = max ?? 100
  const game = { 
    answer: Math.floor(Math.random() * maxium), 
    guess_cnt: 0,
    status: "unsolved"
  }
  Games[id] = game
  console.log(`[GAME] created, answer: ${game.answer}, id: ${id}`)
  return id
}

module.exports = {
  query,
  create,
  all
}
