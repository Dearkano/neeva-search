import * as api from "../services/index";

export default {
  namespace: "data",

  state: {
    searchTerm: "",
    content: [],
    isFirst: true,
    filter: "All",
    stars: localStorage.getItem("stars")
      ? JSON.parse(localStorage.getItem("stars"))
      : [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *search({ payload }, { select, put }) {
      // eslint-disable-line
      payload.isFirst = false;
      yield put({ type: "save", payload });
      const searchTerm = payload.searchTerm;
      const history = localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history"))
        : [];
      if (history.includes(searchTerm)) {
        history.splice(history.indexOf(searchTerm), 1);
      }
      history.unshift(searchTerm);
      if (history.length > 10) history.pop();
      localStorage.setItem("history", JSON.stringify(history));
      const res = yield api.query(searchTerm);
      const stars = yield select((state) => state.data.stars);
      res.data.data.forEach((item) => {
        item.isStar = false;
        for (const star of stars) {
          if (star.key === item.key) {
            item.isStar = true;
            break;
          }
        }
      });
      yield put({ type: "save", payload: { content: res.data.data } });
    },
    *setFilter({ payload }, { put }) {
      yield put({ type: "save", payload });
    },
    *addStar({ payload }, { put, select }) {
      const stars = yield select((state) => state.data.stars);
      payload.item.isStar = true;
      stars.push(payload.item);
      console.log(stars);
      localStorage.setItem("stars", JSON.stringify(stars));
      yield put({ type: "save", payload: { stars } });
    },
    *deleteStar({ payload }, { select, put }) {
      const stars = yield select((state) => state.data.stars);
      payload.item.isStar = false;
      for (let i = 0; i < stars.length; i++) {
        if (stars[i].key === payload.item.key) {
          stars.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("stars", JSON.stringify(stars));
      yield put({ type: "save", payload: { stars } });
    },
    *showStars({}, { put }) {
      const stars = localStorage.getItem("stars")
        ? JSON.parse(localStorage.getItem("stars"))
        : [];
      yield put({ type: "save", payload: { content: stars, stars } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
