<template>
  <div class="body">
    <section>
      <h1 class="game-title">Welcome to Battleships!</h1>
      <h2 class="rules">The object of Battleship is to try and sink all of the other player's before they sink all of
        your
        ships. All of the other player's ships are somewhere on his/her board. You try and hit them by calling out the
        coordinates of one of the squares on the board. The other player also tries to hit your ships by calling out
        coordinates. Each player places the 5 ships somewhere on their board. The ships can only be placed vertically or
        horizontally. Diagonal placement is not allowed. No part of a ship may hang off the edge of the board. Ships may
        not overlap each other. No ships may be placed on another ship.
        <br>The 5 ships are: Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).
      </h2>
      <div class="game-container">
        <!--        placing the ships-->
        <form  name="placeShip" v-show="placement==='placeTheShips'">
          <label>Direction of ship:</label><br>
          <input type="radio" name="direction" id="vertical" @click="direction='vertical'" checked>Vertical (down)<br>
          <input type="radio" name="direction" id="horizontal" @click="direction='horizontal'">Horizontal
          (right)<br><br>

          <label>Type of ship: </label><br>
          <input type="radio" name="shipType" id="carrier"  @click="ship='carrier'" checked>Carrier (Size: 5)<br>
          <input type="radio" name="shipType" id="battleship" @click="ship='battleship'">Battleship (Size: 4)<br>
          <input type="radio" name="shipType" id="cruiser" @click="ship='cruiser'">Cruiser (Size: 3)<br>
          <input type="radio" name="shipType" id="submarine" @click="ship='submarine'">Submarine (Size: 3)<br>
          <input type="radio" name="shipType" id="destroyer" @click="ship='destroyer'">Destroyer (Size: 2)<br>
        </form>

        <!--        user board-->
        <div class="board-container">
          <div v-for="boardColumn in 10" :key="boardColumn">
            <div v-for="boardRow in 10" :key="boardRow">
              <div class="box hit" v-if="userBoard.charAt(((boardColumn-1)+10*(boardRow-1))) ==='x'">X</div>
              <div class="box miss" v-else-if="userBoard.charAt(((boardColumn-1)+10*(boardRow-1))) ==='o'">.</div>
              <div class="box ship" v-else-if="userBoard.charAt(((boardColumn-1)+10*(boardRow-1))) ==='s'"></div>
              <div class="box water" v-else v-on:click="place(boardRow-1,boardColumn-1,direction,ship)"></div>
            </div>
          </div>
        </div>
        <!--        computer board-->
        <div class="board-container">
          <div v-for="boardColumn in 10" :key="boardColumn">
            <div v-for="boardRow in 10" :key="boardRow">
              <div class="box hit" v-if="computerBoard.charAt(((boardColumn-1)+10*(boardRow-1))) ==='x'">X</div>
              <div class="box miss" v-else-if="computerBoard.charAt(((boardColumn-1)+10*(boardRow-1))) ==='o'">.</div>
<!--              <div class="box ship" v-else-if="computerBoard.charAt(((boardColumn-1)+10*(boardRow-1))) ==='s'"></div>-->
              <div class="box water" v-else v-on:click="fire(boardRow-1,boardColumn-1)"></div>
            </div>
          </div>
        </div>

      </div>
      <h2 class="game-status">{{ msg }}</h2>
      <button class="game-button" @click="placement='placeTheShips'" v-on:click="newGame" v-text="'New Game'"></button>
      <button class="game-button" v-show="placement==='placeTheShips'" @click="placement='placed'" v-on:click="random" v-text="'Place Randomly'"></button>
      <button class="game-button" v-show="placement==='placeTheShips'" @click="placement='placed'" v-on:click="random" v-text="'Ships placed'"></button>
      <button class="game-button" v-show="placement==='placed'" @click="placement='gameStarted'" v-on:click="start" v-text="'Start the Game'"></button>

    </section>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: "Battleship", methods: {
    fire: function (moveRow, moveColumn) {
      axios.post(`http://localhost:3000/api/battleship/move/${moveRow}/${moveColumn}`).then(this.afterMove).catch(this.afterMove)
    },
    place: function (placeRow, placeColumn, placeDirection, placeShip) {
      axios.post(`http://localhost:3000/api/battleship/place/${placeRow}/${placeColumn}/${placeDirection}/${placeShip}`).then(this.afterMove).catch(this.afterMove)
    },
    newGame() {
      axios.get("http://localhost:3000/api/battleship/new").then(this.afterMove).catch(this.afterMove).catch((error) => {
        console.log("New game cant be started right now", error)
      })
    },
    start() {
      axios.get("http://localhost:3000/api/battleship/start").then(this.afterMove).catch(this.afterMove).catch((error) => {
        console.log("Game cant be started right now", error)
      })
    },
    gameState() {
      axios.get("http://localhost:3000/api/battleship/state").then(response => {
        this.msg = response.data;
      })
    },
    random() {
      axios.get("http://localhost:3000/api/battleship/random").then(this.afterMove).catch(this.afterMove)
    },
    userBoardAxios() {
      axios.get("http://localhost:3000/api/battleship/userboard").then(response => {
        this.userBoard = response.data;
      })
    },
    computerBoardAxios() {
      axios.get("http://localhost:3000/api/battleship/computerboard").then(response => {
        this.computerBoard = response.data;
      })
    },
    afterMove() {
      this.gameState()
      this.computerBoardAxios()
      this.userBoardAxios()
    }
  }, data() {
    return {
      userBoard: '',
      computerBoard: '',
      msg: "",
      direction: 'vertical',
      ship: 'carrier',
      placement:''
    }
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
  width: 900px;
  margin: 10px auto;
}

.board-container {
  display: grid;
  grid-template-columns: repeat(10, auto);
  width: 336px;
  margin: 10px auto;
  background-color: #33adff;
}

.ship {
  background-color: rgb(153, 77, 0);
}

.water {
  background-color: rgb(0, 204, 255);
}

.hit {
  background-color: rgb(255, 0, 0);
  line-height: 30px;
}

.miss {
  background-color: rgb(128, 128, 128, 0.8);
  line-height: 15px;
}

.box {
  font-family: "Permanent Marker", cursive;
  width: 30px;
  height: 30px;
  box-shadow: 1px 1px 1px 1px #ecd7ba;
  border: 1px solid #ecd7ba;
  cursor: pointer;
  font-size: 20px;
}

.game-status {
  font-size: 50px;
  color: #d7a62f;
  margin: 20px auto;
}

.game-button {
  background-color: #f7e4ac;
  width: 200px;
  height: 50px;
  font-size: 25px;
  color: #5586e2;
  box-shadow: 2px 2px 2px 2px #d86c23;
  border: 2px solid #d86c23;
}

.rules {
  position: relative;
  background-color: whitesmoke;
  display: inline-block;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  opacity: 0.7;
  font-size: .9rem;
  width: 800px;
}

form{
  width: 170px;
  margin: 10px auto;
  background-color: rgb(0, 204, 255);
  border: 3px solid #ecd7ba;
  cursor: pointer;
  font-size: 15px;
  font-family: "Permanent Marker", cursive;
  text-align: left;
}
</style>