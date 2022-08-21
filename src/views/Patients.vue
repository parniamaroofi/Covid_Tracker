<template>
  <div>
    <div class="card">
      <div class="title">
        <span>All patients</span>
      </div>
      <div class="custom-table">
        <v-data-table :headers="headers" :items="patients" hide-default-footer>
          <template v-slot:[`item.userimage`]="{ item }">
            <div class="d-flex">
              <img :src="item.userimage" class="user-image" />
              <div class="pl-3">
                <p class="mb-0 font-weight-bold">{{ item.username }}</p>
                <span class="last-update">{{ item.lastupdate }}</span>
              </div>
            </div>
          </template>
          <template v-slot:[`item.city`]="{ item }">
            <div>
              <p class="mb-0 font-weight-bold">{{ item.city }}</p>
              <span class="user-bd">{{ item.birthday }}</span>
            </div>
          </template>
          <template v-slot:[`item.regdate`]="{ item }">
            <div>
              <p class="mb-0 font-weight-bold">{{ item.regdate }}</p>
              <span class="reg-time">{{ item.regtime }}</span>
            </div>
          </template>
          <template v-slot:[`item.level`]="{ item }">
            <div>
              <div
                class="badge-box"
                :class="{
                  redcolor: item.level == 'high',
                  yellowcolor: item.level == 'low',
                  greencolor: item.level == 'normal',
                }"
              >
                {{ item.level }}
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patients: [
        {
          userimage: "/no-photo.png",
          username: "Sidney E. Harris",
          lastupdate: "Updated 1 day ago",
          city: "London",
          birthday: "July 19, 1989",
          regdate: "May 26, 2020",
          regtime: "6:30 PM",
          level: "high",
        },

        {
          userimage: "/no-photo.png",
          username: "Juliane Klein",
          lastupdate: "Updated 1 day ago",
          city: "Berlin",
          birthday: "February 5, 1952",
          regdate: "May 26, 2020",
          regtime: "8:00 AM",
          level: "low",
        },

        {
          userimage: "/no-photo.png",
          username: "Sarah Fiedler",
          lastupdate: "Updated 1 day ago",
          city: "New York",
          birthday: "June 3, 1978",
          regdate: "May 26, 2020",
          regtime: "7:30 AM",
          level: "high",
        },

        {
          userimage: "/no-photo.png",
          username: "Hamed Noori",
          lastupdate: "Updated 1 day ago",
          city: "Tehran",
          birthday: "August 10, 1982",
          regdate: "May 25, 2020",
          regtime: "5:00 PM",
          level: "normal",
        },

        {
          userimage: "/no-photo.png",
          username: "Chappell Brasseur",
          lastupdate: "Updated 2 day ago",
          city: "Paris",
          birthday: "April 12, 2000",
          regdate: "May 25, 2020",
          regtime: "4:30 PM",
          level: "high",
        },

        {
          userimage: "/no-photo.png",
          username: "Michael M. Gauna",
          lastupdate: "Updated 3 day ago",
          city: "Los Angeles",
          birthday: "January 26, 1970",
          regdate: "May 25, 2020",
          regtime: "2:00 PM",
          level: "normal",
        },
      ],

      headers: [
        { text: "User Details", value: "userimage", sortable: false },
        { text: "Birth Details", value: "city", sortable: false },
        { text: "Registeration Date", value: "regdate", sortable: false },
        { text: "Infection Level", value: "level", sortable: false },
      ],
    };
  },
};
</script>

<style lang="scss">
.card {
  padding: 10px;
  width: 100%;
  background-color: white;
  border: 1px solid #dfe0eb;
  border-radius: 8px;

  .title {
    padding: 10px 20px 20px;
    font-weight: bold;
    font-size: 19px;
    color: rgb(54, 55, 64);
  }
  .user-image {
    width: 45px;
    height: 45px;
    border-radius: 100%;
  }
  .last-update,
  .user-bd,
  .reg-time {
    font-weight: 400;
    font-size: 0.83rem;
    color: #9b9c9f;
  }
}
.badge-box {
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  border-radius: 15px;
  width: 60px;
  text-align: center;

  padding: 3px 0px;
}
.redcolor {
  background-color: #f12b2c;
}

.yellowcolor {
  background-color: #fec400;
}

.greencolor {
  background-color: #29cc97;
}
</style>
