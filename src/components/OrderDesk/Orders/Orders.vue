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
              <input type="text" placeholder="Дом" v-model="searchTerm" @input="fetchPremises">
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
        <div class="listItems">
          <div class="nameTable">
            <div class="number">
              <span>№</span>
              <div class="hint">
                <img :src="images['hint']">
              </div>
            </div>
            <div class="created">
              <span>Создана</span>
              <div class="hint">
                <img :src="images['hintblack']">
              </div>
            </div>
            <div class="address">
              <span>Адрес</span>
            </div>
            <div class="applicant">
              <span>Заявитель</span>
            </div>
            <div class="description">
              <span>Описание</span>
            </div>
            <div class="term">
              <span>Срок</span>
            </div>
            <div class="status">
              <span>Статус</span>
              <div class="hint">
                <img :src="images['hintblack']">
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div v-for="appeal in appeals" :key="appeal.id" class="tableListOrders">
            <div class="nameTable">
              <div class="number">
                <div class="hint">
                  <span>{{ appeal.number }}</span>
                </div>
              </div>
              <div class="created">
                <span>{{ formatDate(appeal.created_at) }}</span>
              </div>
              <div class="address">
                <span>    
                  {{ appeal.premise ? appeal.premise.address : 'Адрес не указан' }} 
                  {{ appeal.apartment ? appeal.apartment.label : '' }}
                </span>
              </div>
              <div class="applicant">
                <span>    
                  {{ appeal.applicant.last_name }}
                  {{ appeal.applicant.first_name.charAt(0) }}.
                  <template v-if="appeal.applicant.patronymic_name">
                    {{ appeal.applicant.patronymic_name.charAt(0) }}.
                  </template>
                </span>
              </div>
              <div class="description">
                <span>{{ appeal.description }}</span>
              </div>
              <div class="term">
                <span>{{ formatDateTime(appeal.due_date) }}</span>
              </div>
              <div class="status">
                <span>{{ appeal.status.name }}</span>
              </div>
            </div>
            <div class="separator"></div>
          </div>
        </div>
        <div class="nextListing"></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" src="./style.sass" scoped></style>
<script lang="js" src="./data"></script>