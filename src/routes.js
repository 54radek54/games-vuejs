import Home from './components/pages/Home'
import Tictactoe from './components/pages/Tictactoe'
import Battleship from './components/pages/Battleship'

export default [
  { name: 'home', path: '/', component: Home },
  { name: 'tictactoe', path: '/tictactoe', component: Tictactoe},
  { name: 'battleship', path: '/battleship', component: Battleship }
]

