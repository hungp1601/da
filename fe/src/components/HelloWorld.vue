<template>
  <div>
    <form @submit.prevent="submitForm">
      <table>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>number</th>
          <th>gender</th>
          <th>birthday</th>
          <th>hometown</th>

        </tr>

        <tr>
          <th><input type="text" v-model="user.name" /></th>
          <th><input type="email" v-model="user.email" /></th>
          <th><input type="tel" v-model="user.number" /></th>
          <th><input type="text" v-model="user.gender" /></th>
          <th><input type="text" v-model="user.birthday" /></th>
          <th><input type="text" v-model="user.hometown" /></th>
        </tr>

      </table>

      <br>
      <button type="submit">Submit</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        <th><input type="text" v-model="user.name" /></th>
        <th><input type="email" v-model="user.email" /></th>
        <th><input type="tel" v-model="user.number" /></th>
        <th><input type="text" v-model="user.gender" /></th>
        <th><input type="text" v-model="user.birthday" /></th>
        <th><input type="text" v-model="user.hometown" /></th>
        <td><button @click="updateUser(user)">save</button></td>
        <td><button @click="deleteUser(user)">X</button></td>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(["users"]),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions([
      'getUsers',
      'submitForm',
      'deleteUser',
      'updateUser'
    ]),
  },
  created() {
    this.getUsers();
  }

};
</script>


<style scoped lang="scss">
table {
  margin: 0 auto;
}

th {
  width: 100px
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
