<template>
  <div class="Orders">
    <div class="windowList">
      <div class="header">
        <span>Список заказов</span>
      </div>
      <div class="blockOrders">
        <div class="create">
          <span>Создать</span>
        </div>
        <div class="filters">
          <div class="serachItem">
            <div class="cellInput">
              <input type="text" placeholder="Поиск (№ заявки, название)">
              <div class="clickSearch">
                <img :src="images['search']">
              </div>
            </div>
            <div class="separator"></div>
          </div>
          <div class="serachItem">
            <div class="cellInput">
              <input 
                type="text" 
                placeholder="Дом"
                v-model="searchTerm"
                @input="fetchPremises">
              <div class="clickSearch" @click="toggleShowList" :class="{ rotated: isListVisible }">
                <img :src="images['downoutline']">
              </div>
            </div>
            <div class="separator"></div>
            <div v-show="isListVisible" class="showListHomes">
              <div v-for="premise in premises" :key="premise.id" class="cellItem">
                <span>{{ premise.address }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listItems"></div>
          
      </div>
    </div>
  </div>
</template>

<style lang="sass" src="./style.sass" scoped></style>
<script lang="js" src="./data"></script>