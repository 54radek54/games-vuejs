<template>
  <div>
    <nav id="main-menu">
      <ul class="nav-bar">
        <li class="nav-button-home">
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="nav-button-tictactoe">
          <router-link :to="{ name: 'tictactoe' }">Tictactoe</router-link>
        </li>
        <li class="nav-button-battleship">
          <router-link :to="{ name: 'battleship' }">Battleship</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
body {
  font-family: sans-serif;
}

#main-menu .nav-bar {
  list-style: none;
  margin-top: 40px;
}

#main-menu .nav-bar li {
  display: inline;
  padding: 0 10px;
}

#main-menu .nav-bar li a {
  text-decoration: none;
  padding-left: 25px;
  text-transform: uppercase;
  color: #333;
  text-shadow: 1px 1px 1px #ccc;
}
</style>