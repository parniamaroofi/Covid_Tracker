<template>
  <div>
    <div class="header">
      <div class="d-flex">
        <div class="profile-image">
          <img :src="userProfile" />
        </div>
        <div class="userName pa-5">
          <b>{{ userName }}</b>
        </div>
        <v-divider vertical class="mt-1 mb-2 mx-3"></v-divider>
        <div class="alert">
          <v-icon class="alert-icon mx-5">$Alert</v-icon>
          <div class="alert-number">{{ notifNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userProfile: "/user.jpg",
      userName: "Parnia Maroofi",
      notifNumber: 4,
    };
  },
};
</script>

<style lang="scss">
.header {
  direction: rtl;
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100vw - 290px);
  padding: 20px;
  .profile-image {
    width: 53px;
    height: 53px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50px;
    }
  }
  .userName {
    transform: translateY(-4px);
    b {
      font-size: 0.95rem;
    }
  }

  .alert {
    position: relative;
    &-icon {
      margin-top: 20px;
    }
    &-number {
      position: absolute;
      top: 9px;
      right: 11px;
      min-width: 19px;
      height: 19px;
      border-radius: 50%;
      color: #faebd7;
      font-size: 12px;
      display: flex;
      align-content: center;
      justify-content: center;
      background-color: #f44336;
    }
  }
}
</style>
