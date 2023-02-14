import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {
      id: "",
      name: "",
      email: "",
      number: "",
      gender: "",
      hometown: "",
      birthday: "",
    },

    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    submitForm({ commit, state }) {
      axios
        .post(`http://localhost:3000/api/users`, {
          name: state.user.name,
          email: state.user.email,
          number: state.user.number,
          gender: state.user.gender,
          birthday: state.user.birthday,
          hometown: state.user.hometown,
        })
        .then((response) => {
          commit("setUsers", [
            ...state.users,
            {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              number: response.data.number,
              gender: response.data.gender,
              birthday: response.data.birthday,
              hometown: response.data.hometown,
            },
          ]);
          state.user = {};
        })
        .catch((error) => {
          alert(error);
        });
    },
    getUsers({ commit }) {
      axios
        .get(`http://localhost:3000/api/users`)
        .then((response) => {
          commit("setUsers", response.data.rows);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteUser({ commit, state }, user) {
      axios
        .delete(`http://localhost:3000/api/users/${user.id}`, {
          id: user.id,
        })
        .then(() => {
          commit(
            "setUsers",
            state.users.filter((u) => u.id !== user.id)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateUser({ commit, state }, user) {
      console.log(user);
      axios
        .put(`http://localhost:3000/api/users/${user.id}`, {
          id: user.id,
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          hometown: user.hometown,
          gender: user.gender,
          number: user.number,
        })
        .then(() => {
          commit(
            "setUsers",
            state.users.map((u) => {
              if (u.id === user.id) {
                return user;
              }
              return u;
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  getters: {
    users: (state) => state.users,
  },
});
