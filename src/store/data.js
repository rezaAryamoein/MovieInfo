const data = {
    state: {
        genre: [],
      },
      getters: {
        GET_GENRE(state) {
          return state.genre;
        },
      },
      mutations: {
        SET_GENRE(state, payload) {
          state.genre = [...payload];
        },
      },
      actions: {},
  };
  
  export default data;