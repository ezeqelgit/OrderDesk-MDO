<template>
  <div class="Authorization">
    <div class="block">
      <div class="title">
        <span>Авторизация</span>
      </div>
      <div class="setParameters">
        <div class="userNumber">
          <div class="selectionParameters">
            <span>Логин или Телефон</span>
          </div>
          <div class="inputParameters">
            <img :src="images['login']">
            <input 
              type="text" 
              placeholder="+7"
              v-model="rawNumber"
              maxlength="18">
          </div>
          <div class="separator"></div>
          <div class="verification" v-if="showError">
            <span>{{ errorMessage }}</span>
          </div>
        </div>
        <div class="userPassword">
          <div class="inputParameters">
            <div class="wrapperInput">
              <img :src="images['password']">
              <input
                placeholder="Пароль"
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="password">
              <div class="visiblePassword" @click="togglePasswordVisibility">
                <img :src="isPasswordVisible ? images['visible'] : images['notvisible']" />
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="verification" v-if="showError">
            <span>{{ errorMessage }}</span>
          </div>
        </div>
      </div>
      <div class="aproveUser" @click="submitForm">
        <span>Вход</span>
      </div>
    </div>
  </div>
</template>

<style lang="sass" src="./style.sass" scoped></style>
<script lang="js" src="./data"></script>