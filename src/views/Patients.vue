<template>
  <div class="patients">
    <!-- Main card -->
    <div class="card">
      <!-- Card title -->
      <div class="title">
        <span>All patients</span>
      </div>
      <!-- Patients table -->
      <div class="custom-table">
        <v-data-table :headers="headers" :items="patients" hide-default-footer>
          <!-- User detailes column -->
          <template v-slot:[`item.userimage`]="{ item }">
            <div class="d-flex">
              <!-- User image -->
              <img :src="item.userimage" class="user-image" />
              <!-- Username and lastupdate -->
              <div class="pl-3">
                <p class="font-weight-bold mb-0">{{ item.username }}</p>
                <span class="last-update">{{ item.lastupdate }}</span>
              </div>
            </div>
          </template>
          <!-- Birth detailes column -->
          <template v-slot:[`item.city`]="{ item }">
            <div>
              <!-- User city -->
              <p class="mb-0 font-weight-bold">{{ item.city }}</p>
              <!-- User birthday -->
              <span class="user-bd">{{
                dateFormatConverter(item.birthday)
              }}</span>
            </div>
          </template>
          <!-- Registeration date column -->
          <template v-slot:[`item.date`]="{ item }">
            <div>
              <p class="mb-0 font-weight-bold">
                {{ dateFormatConverter(item.date) }}
              </p>
              <span class="reg-time">{{ timeFormatConverter(item.time) }}</span>
            </div>
          </template>
          <!-- Infection level column -->
          <template v-slot:[`item.level`]="{ item }">
            <div>
              <div
                class="badge-box"
                :class="{
                  redcolor: item.level == 'High',
                  yellowcolor: item.level == 'Low',
                  greencolor: item.level == 'Normal',
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
import moment from "moment-jalaali";
export default {
  data() {
    return {
      moment: moment,
      patients: [
        {
          userimage: "/no-photo.png",
          username: "Sidney E. Harris",
          lastupdate: "Updated 1 day ago",
          city: "London",
          birthday: "1989-07-19",
          date: "2020-05-26",
          time: "18:30",
          level: "High",
        },

        {
          userimage: "/no-photo.png",
          username: "Juliane Klein",
          lastupdate: "Updated 1 day ago",
          city: "Berlin",
          birthday: "1952-02-5",
          date: "2020-05-26",
          time: "08:00",
          level: "Low",
        },

        {
          userimage: "/no-photo.png",
          username: "Sarah Fiedler",
          lastupdate: "Updated 1 day ago",
          city: "New York",
          birthday: "1978-06-03",
          date: "2020-05-26",
          time: "07:30",
          level: "High",
        },

        {
          userimage: "/no-photo.png",
          username: "Hamed Noori",
          lastupdate: "Updated 1 day ago",
          city: "Tehran",
          birthday: "1982-08-10",
          date: "2020-05-25",
          time: "17:00",
          level: "Normal",
        },

        {
          userimage: "/no-photo.png",
          username: "Chappell Brasseur",
          lastupdate: "Updated 2 day ago",
          city: "Paris",
          birthday: "2000-04-12",
          date: "2020-05-25",
          time: "16:30",
          level: "High",
        },

        {
          userimage: "/no-photo.png",
          username: "Michael M. Gauna",
          lastupdate: "Updated 3 day ago",
          city: "Los Angeles",
          birthday: "1970-01-26",
          date: "2020-05-25",
          time: "14:00",
          level: "High",
        },
        {
          userimage: "/no-photo.png",
          username: "Sarah bolten",
          lastupdate: "Updated 8 day ago",
          city: "Paris",
          birthday: "1988-05-25",
          date: "2020-05-18",
          time: "08:35",
          level: "Normal",
        },
      ],

      headers: [
        { text: "User Details", value: "userimage", sortable: false },
        { text: "Birth Details", value: "city", sortable: false },
        { text: "Registeration Date", value: "date", sortable: false },
        { text: "Infection Level", value: "level", sortable: false },
      ],

      levels: ["All", "High", "Normal", "Low"],
      monthsName: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  methods: {
    dateFormatConverter(date) {
      let year = date.split("-")[0];
      let month = date.split("-")[1];
      let day = date.split("-")[2];
      let monthName;
      monthName = this.monthsName[Number(month) - 1];
      return monthName + " " + day + ", " + year;
    },
    timeFormatConverter(time) {
      let hour = time.split(":")[0];
      let min = time.split(":")[1];
      if (Number(hour) > 0 && Number(hour) <= 12) {
        return hour + ":" + min + " AM";
      } else {
        let formattedHour = Number(hour) - 12;
        if (formattedHour > 0 && formattedHour < 10) {
          formattedHour = "0" + formattedHour;
        }
        return formattedHour + ":" + min + " PM";
      }
    },
  },
};
</script>
