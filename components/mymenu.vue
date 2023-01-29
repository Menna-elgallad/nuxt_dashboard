<template>
    <div id="allTheNav">
    <nav id="navigator" class="navbar" :class="{navbaropen: opened}">
      <span class="open-slide">
        <a href="#" @click="opened = !opened">
          <div>
            <i class="pi pi-align-left"></i>
          </div>
        </a>
      </span>
    
    </nav>
  <div id="side-menu" class="side-nav" :class="{sidenavopen: opened}">
    <nuxt-link href="/">Dashboard</nuxt-link>
    <nuxt-link href="/users">Users</nuxt-link>

  </div>
    </div> 
</template>

<script setup>

const opened = ref(true) ; 
</script>

<style>
body{
  font-family: "Arial", Serif;
  background-color: #f5f5f5;
  overflow-x: hidden;
}

.navbar{
 
  overflow: hidden;
  height: 63px;
}

.navbaropen{

  overflow: hidden;
  height: 63px;
  margin-left: 250px;
}

.navbar a{
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar ul{
  margin: 8px 0 0 0;
  list-style: none;
}

.navbar a:hover{
  background-color: #ddd;
  color: #000;
}

.side-nav{
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.sidenavopen{
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  opacity: 0.9;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.3s;
}

.side-nav a{
  padding: 10px 10px 10px 30px;
  text-decoration: none;
  font-size: 22px;
  color: #ccc;
  display: block;
  transition: 0.3s;
}

.side-nav a:hover{
  color: #fff;
}

.side-nav .btn-close{
  position: absolute;
  top: 0;
  right: 22px;
  font-size: 36px;
  margin-left: 50px;
}

#main{
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
}

.mainopen{
  transition: margin-left 0.3s;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  margin-left: 250px;
}

nav{
  transition: margin-left 0.3s;
}

i{
    font-size: 20px;
    color: black;
}

</style>
