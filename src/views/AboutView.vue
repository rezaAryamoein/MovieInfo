<template>
  <div class="main">
    <div class="mx-5">
      <div
        class="
          wrapper
          d-flex
          align-items-center
          justify-content-start
          px-5
          my-3
        "
      >
        <div>
          <button
            @click="back"
            type="button"
            class="btn btn-primary btn-search"
          >
            Back
          </button>
        </div>
        <div class="ml-5">
          <p class="mb-2 text-title-style">{{ detailData.title }}</p>
          <p class="mb-0 text-content-style">{{ detailData.tagline }}</p>
        </div>
      </div>
    </div>

    <div class="row justify-content-between detail mx-5">
      <div class="col-4 text-left p-0">
        <img
        v-if="poster_path !=null "
          :src="`https://image.tmdb.org/t/p/w500/${poster_path}`"
          alt="movie-image"
          class="movie-image"
        />
        <img
        v-else
          src="../assets/back.jpg"
          alt="movie-image"
          class="movie-image"
        />
      </div>
      <div class="col-8 px-4 mt-4">
        <div class="row justify-content-between">
          <p class="sub-title">Budget</p>
          <p class="sub-detail">{{ formatPrice(detailData.budget) }}</p>
        </div>
        <div class="row justify-content-between">
          <p class="sub-title">Revenue</p>
          <p class="sub-detail">{{ formatPrice(detailData.revenue) }}</p>
        </div>
        <div class="row justify-content-between">
          <p class="sub-title">Release Date</p>
          <p class="sub-detail">{{ detailData.release_date }}</p>
        </div>
        <div class="row justify-content-between">
          <p class="sub-title">Runtime</p>
          <p class="sub-detail">{{ detailData.runtime }}</p>
        </div>
        <div class="row justify-content-between">
          <p class="sub-title">Score</p>
          <p class="sub-detail">
            {{ detailData.vote_average }} ({{ detailData.vote_count }} votes)
          </p>
        </div>
        <div class="row justify-content-between">
          <p class="sub-title">Genres</p>
          <div class="row">
            <p
              class="sub-detail-genre mr-2"
              v-for="(item, index) in detailDataGenre"
              :key="item.name"
            >
              {{ item.name }}
              <span v-if="index < detailDataGenre.length - 1">,</span>
            </p>
          </div>
        
        </div>
              <div class="row justify-content-between align-items-center mb-3">
                 <p class="sub-title mb-0">Rating</p>
              <star-rating
              class="star-style"
                :inline="false"
                :star-size="20"
                :read-only="true"
                :show-rating="false"
                :rating="detailData.vote_average / 2"
                inactive-color="#e1bad9"
                active-color="#cc1166"
              ></star-rating>
            </div>
        <div class="row justify-content-between">
          <p class="sub-title">Homepage Link</p>
          <p class="sub-detail-link"><a :href="homePageLink" target="_blank">Link</a></p>
        </div>
      </div>
    </div>
    <div class="mx-5 mt-5 sumary">
      <p>
        {{ detailData.overview }}
      </p>
    </div>
    <div class="text-left mx-5 mt-5">
      <p v-if="casts.length > 0" class="titr">Credit:</p>
      <span class="actors mr-1" v-for="(item, index) in casts" :key="item">
        {{ item }} <span v-if="index < casts.length - 1">,</span>
      </span>
      <span v-if="casts.length > 0" class="actors"> and {{ otherCastCount }} more. </span>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import StarRating from "vue-star-rating";

export default {
  name: "HomeView",
  components: {
    Card,
    StarRating
  },
  data() {
    return {
      detailData: {},
      homePageLink: null,
      poster_path: null,
      cast: [],
      casts: [],
      otherCastCount: 0,
    };
  },
  methods: {
    getDetail() {
      let id = this.$route?.params?.id;
      const baseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=f62f750b70a8ef11dad44670cfb6aa57`;
      this.axios
        .get(baseUrl + "&language=en-US&append_to_response=budget")
        .then((response) => {
          this.detailData = response.data;
          this.detailDataGenre = response.data.genres;
          this.homePageLink = response.data.homepage;
          this.poster_path = response.data.poster_path;
        });
    },
    getCredit() {
      let id = this.$route?.params?.id;
      const baseUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f62f750b70a8ef11dad44670cfb6aa57`;
      this.axios.get(baseUrl + "&language=en-US").then((response) => {
        this.cast = response.data.cast;
        this.castList();
      });
    },
    castList() {
      this.cast.forEach((element, index) => {
        if (index <= 9) {
          this.casts.push(element.name);
        }
      });
      this.otherCastCount = this.cast.length - 10;
    },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    back() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getDetail();
    this.getCredit();
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
.text-title-style {
  font-weight: 800;
  text-align: left;
  font-size: 19px;
}
.text-content-style {
  text-align: left;
  font-size: 18px;
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
.movie-image {
  background-color: gray;
  width: 80%;
  max-height: 450px;
  border-radius: 10px;
}
.detail {
  height: 45vh;
  margin-top: 80px;
}
.sumary {
  text-align: justify;
  text-justify: inter-word;
  font-size: 18px;
}
.titr {
  font-size: 16px;
  font-weight: 800;
}
.actors {
  font-size: 14px;
}
.sub-title {
  font-size: 16px;
  font-weight: 700;
}
.sub-detail {
  font-size: 16px;
}

.sub-detail-link {
  font-size: 16px;
  font-weight: 700;
}
.sub-detail-genre {
  font-size: 16px;
}
.main {
  margin: 0 7rem;
}
</style>

