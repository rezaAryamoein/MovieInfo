<template>
  <div class="main">
    <div class="mx-5">
      <div
        class="
          wrapper
          d-flex
          align-items-center
          justify-content-around
          px-5
          my-3
        "
      >
        <div class="d-flex justify-content-between w-100">
          <div class="d-flex justify-content-around align-items-center">
            <p class="mb-0 mr-2 text-style">search by release date :</p>
            <!-- <div class="">
              <input
                type="text"v
                class="form-control search-input ml-5"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              /> -->
            <date-picker
              v-model:value="customDate"
              type="date"
              range
              format="YYYY-MM-DD"
              clearable
              value-type="YYYY-MM-DD"
            ></date-picker>
          </div>
        </div>
        <div>
          <button
            @click="search"
            type="button"
            class="btn btn-primary btn-search"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="content-view px-5">
      <div class="cardView row py-3 mx-0">
        <Card
          v-for="item in movieList"
          :key="item.id"
          @click="showDetail(item)"
          :movieData="item"
          style="cursor: pointer"
        />
      </div>
      <div>
        <div class="mt-3">
          <button @click="back" class="btn-pervious">
            <p class="btn-text">Pervious Page</p>
          </button>
          <button @click="next" class="btn-next">
            <p class="btn-text">Next Page</p>
          </button>
        </div>
        <div>
          <p class="result-text">
            Showing result <span>{{ from }}</span> - <span>{{ to }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /srcd
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card";
import { mapMutations, mapActions, mapGetters } from "vuex";

import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Card,
    DatePicker,
  },
  data() {
    return {
      page: 1,
      movieList: [],
      genres: [],
      customDate: [],
    };
  },
  computed: {
    from: function () {
      return this.page == 1
        ? 1
        : this.page == 2
        ? this.page * 10 + 1
        : this.page * 20 - 20 + 1;
    },
    to: function () {
      return this.page * 20;
    },
  },
  methods: {
    ...mapMutations(["SET_GENRE"]),
    getList() {
      const baseUrl =
        "https://api.themoviedb.org/3/discover/movie?api_key=f62f750b70a8ef11dad44670cfb6aa57";
      this.axios
        .get(baseUrl + "&page=" + this.page + "&with_genres")
        .then((response) => {
          this.movieList = response.data.results;
        });
    },
    search() {
      if(this.customDate.length > 0){
      const baseUrl =
        "https://api.themoviedb.org/3/discover/movie?api_key=f62f750b70a8ef11dad44670cfb6aa57";
      this.axios
        .get(
          baseUrl +
            "&page=" +
            this.page +
            `&sort_by=primary_release_date.asc&primary_release_date.gte=${this.customDate[0]}&primary_release_date.lte=${this.customDate[1]}`
        )
        .then((response) => {
          this.movieList = response.data.results;
          this.customDate = [];
        });
      }else{
        this.getList()
      }
    },
    getGener() {
      const baseUrl =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=f62f750b70a8ef11dad44670cfb6aa57";
      this.axios.get(baseUrl + "&language=en-US").then((response) => {
        let genre = response.data.genres;
        this.SET_GENRE(genre);
      });
    },
    back() {
      if (this.page >= 2) {
        this.page -= 1;
        this.getList();
      }
    },
    next() {
      this.page += 1;
      this.getList();
    },
    showDetail(item) {
      this.$router.push({
        path: `/about/${item.id}`,
      });
    },
  },
  created() {
    this.getList();
    this.getGener();
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 10vh;
  width: 100%;
  background-color: rgb(212, 212, 212);
  border-radius: 10px;
}
.btn-search {
  width: 100px;
  border-radius: 20px;
}
.text-style {
  font-weight: 600;
}
.btn-pervious {
  border: none;
  background: none;
  border-right: 2px solid gray;
  padding-right: 20px;
}
.btn-next {
  border: none;
  background: none;
  padding-left: 20px;
}
.btn-text {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.result-text {
  font-size: 20px;
  font-weight: 600;
  color: gray;
  margin-top: 20px;
}
.content-view {
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cardView {
  overflow-y: auto;
}
.main {
  margin: 0 7rem;
}
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgb(192, 192, 192); 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray; 
}
</style>
