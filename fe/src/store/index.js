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
        .post(`http://localhost:3000/api/users`, state.user)
        .then((response) => {
          //console.log(response.data);
          commit("setUsers", [
            ...state.users,
            {
              id: response.data._id,
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
      console.log(user);
      axios
        .delete(`http://localhost:3000/api/users/${user._id}`, {
          id: user._id,
        })
        .then(() => {
          commit(
            "setUsers",
            state.users.filter((u) => u._id !== user._id)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateUser({ commit, state }, user) {
      console.log(user);
      axios
        .put(`http://localhost:3000/api/users/${user._id}`, {
          id: user._id,
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
              if (u._id === user._id) {
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
