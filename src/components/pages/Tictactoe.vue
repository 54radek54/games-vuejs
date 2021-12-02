<template>
  <div class="body">
    <section>
      <h1 class="game-title">Welcome to TicTacToe Game</h1>
      <div class="game-container">
        <div v-on:click="move(0,0,playerMark)" class="box">
          <div v-if="board.charAt(0)==='O'||board.charAt(0)==='X'">{{ board.charAt(0) }}</div>
        </div>
        <div v-on:click="move(0,1,playerMark)" class="box">
          <div v-if="board.charAt(1)==='O'||board.charAt(1)==='X'">{{ board.charAt(1) }}</div>
        </div>
        <div v-on:click="move(0,2,playerMark)" class="box">
          <div v-if="board.charAt(2)==='O'||board.charAt(2)==='X'">{{ board.charAt(2) }}</div>
        </div>
        <div v-on:click="move(1,0,playerMark)" class="box">
          <div v-if="board.charAt(3)==='O'||board.charAt(3)==='X'">{{ board.charAt(3) }}</div>
        </div>
        <div v-on:click="move(1,1,playerMark)" class="box">
          <div v-if="board.charAt(4)==='O'||board.charAt(4)==='X'">{{ board.charAt(4) }}</div>
        </div>
        <div v-on:click="move(1,2,playerMark)" class="box">
          <div v-if="board.charAt(5)==='O'||board.charAt(5)==='X'">{{ board.charAt(5) }}</div>
        </div>
        <div v-on:click="move(2,0,playerMark)" class="box">
          <div v-if="board.charAt(6)==='O'||board.charAt(6)==='X'">{{ board.charAt(6) }}</div>
        </div>
        <div v-on:click="move(2,1,playerMark)" class="box">
          <div v-if="board.charAt(7)==='O'||board.charAt(7)==='X'">{{ board.charAt(7) }}</div>
        </div>
        <div v-on:click="move(2,2,playerMark)" class="box">
          <div v-if="board.charAt(8)==='O'||board.charAt(8)==='X'">{{ board.charAt(8) }}</div>
        </div>
      </div>
      <h2 class="game-status">{{ msg }}</h2>
      <button class="game-restart" v-on:click="start" v-text="'New Game'"></button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Game',
  methods: {
    move: function (moveRow, moveColumn, moveMark) {
      axios.post(`http://localhost:3000/api/move/${moveRow}/${moveColumn}/${moveMark}`).then(this.afterMove).catch(this.afterMove)
    },
    start() {
      axios.get("http://localhost:3000/api/start").then(this.afterMove).catch((error) => {
        console.log("Game cant be started right now", error)
      })
    },
    gameState() {
      axios.get("http://localhost:3000/api/state").then(response => {
        this.msg = response.data;
      })
    },
    getBoard() {
      axios.get("http://localhost:3000/api/board").then(response => {
        this.board = response.data;
      })
    },
    afterMove() {
      this.getBoard()
      this.gameState()
    }
  }, data() {
    return {
      playerMark: "X",
      board: '',
      msg: ""
    }
  }, mounted() {
    //data stays after refresh on board
    fetch("http://localhost:3000/api/state").then((response) => response.text()).then((data) => {
      this.msg = data;
    })

    fetch("http://localhost:3000/api/board").then((response) => response.text()).then((data) => {
      this.board = data;
    })
  }
}
</script>

<style scoped>
body {
  font-family: "Arial", sans-serif;
}

section {
  text-align: center;
}

.game-title {
  font-size: 50px;
  color: #d7a62f;
  margin: 10px auto;
}

.game-container {
  display: grid;
  grid-template-columns: repeat(3, auto);
  width: 306px;
  margin: 10px auto;
  background-color: #11213a;
  color: #04c0b2;
}

.box {
  font-family: "Permanent Marker", cursive;
  width: 100px;
  height: 100px;
  box-shadow: 2px 2px 2px 2px #ecd7ba;
  border: 2px solid #ecd7ba;
  cursor: pointer;
  line-height: 100px;
  font-size: 60px;
}

.game-status {
  font-size: 50px;
  color: #d7a62f;
  margin: 20px auto;
}

.game-restart {
  background-color: #f7e4ac;
  width: 200px;
  height: 50px;
  font-size: 25px;
  color: #5586e2;
  box-shadow: 2px 2px 2px 2px #d86c23;
  border: 2px solid #d86c23;
}
</style>