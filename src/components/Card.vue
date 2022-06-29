<template>
  <div class="card mb-3 col-4">
    <div class="row row-cols-2 mx-0 wrapper">
      <div class="col-5 px-0">
        <img
          v-if="movieData.poster_path"
          :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`"
          alt="card-img"
          class="card-img img-fluid"
        />
        <img
          v-else
          src="../assets/back.jpg"
          alt="movie-image"
          class="card-img"
        />
      </div>
      <div class="col-7 content-style">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="listWrapper">
            <h5 class="card-title ml-2">{{ movieData.title }}</h5>
          </div>
          <div class="d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center">
              <i class="fas fa-calendar-alt mx-2 icon"></i>
              <p class="card-text">{{ movieData.release_date }}</p>
            </div>
            <div style="display: inline-block">
              <star-rating
                class="star-style"
                :inline="false"
                :star-size="20"
                :read-only="true"
                :show-rating="false"
                :rating="movieData.vote_average / 2"
                inactive-color="#e1bad9"
                active-color="#cc1166"
              ></star-rating>
            </div>
            <div class="listWrapper mt-2">
              <ul class="list row">
                <li
                  v-for="item in genreList"
                  :key="item.index"
                  class="ml-4 list-item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import StarRating from "vue-star-rating";
export default {
  name: "Card",
  props: ["movieData", "genres"],
  components: {
    StarRating,
  },
  data() {
    return {
      genreList: [],
    };
  },
  computed: {},
  methods: {
    async setGener() {
      setTimeout(() => {
        let ddd = [...this.movieData.genre_ids];
        let eee = [...this.$store.getters.GET_GENRE];
        for (const element of ddd) {
          if (element > 0) {
            for (const value of eee) {
              if (value.id == element) {
                this.genreList.push(value.name);
              }
            }
          }
        }
      }, 100);
    },
  },
  mounted() {
    this.setGener();
  },
};
</script>

<style scoped lang="scss">
.content-style {
  height: 100%;
  background-color: rgb(214, 214, 214);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
ul li {
  display: list-item;
  direction: rtl;
}
.list {
  padding: 0;
  max-width: 100%;
}
.dot {
  font-size: 6px;
}
.wrapper {
  height: 220px;
  border: 1px solid rgb(185, 185, 185);
  border-radius: 10px;
}
.listWrapper {
  text-align: left;
}
.card {
  border: none;
}
.card-text {
  font-weight: 500;
}
.icon {
  font-size: 20px;
}
.list-item {
  font-size: 16px;
}
.card-title {
  font-weight: 600;
  overflow: hiden;
  text-overflow: ellipsis;
}
.card-img {
  width: 100%;
  height: 220px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
}
.card-body {
  padding: 20px 0;
}
ul {
  margin-bottom: 0;
}
.star-style {
  margin-left: 8px !important;
  margin-top: 7px;
}
</style>
