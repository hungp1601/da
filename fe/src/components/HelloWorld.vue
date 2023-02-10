<template>
  <div>
    {{ greeting }}
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
          <th><input type="text" v-model="name" /></th>
          <th><input type="email" v-model="email" /></th>
          <th><input type="tel" v-model="number" /></th>
          <th><input type="text" v-model="gender" /></th>
          <th><input type="text" v-model="birthday" /></th>
          <th><input type="text" v-model="hometown" /></th>

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
import axios from 'axios'
export default {
  data() {
    return {
      id: "",
      name: "",
      email: "",
      number: "",
      gender: "",
      hometown: "",
      birthday: "",
      users: [],
      greeting: ""
    };
  },
  methods: {

    async submitForm() {
      try {

        const response = await axios.post(`http://localhost:3000/api/users`, {
          name: this.name,
          email: this.email,
          birthday: this.birthday,
          hometown: this.hometown,
          gender: this.gender,
          number: this.number,
        })
        this.users.push({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          number: response.data.number,
          gender: response.data.gender,
          birthday: response.data.birthday,
          hometown: response.data.hometown,
        });
        this.id = "";
        this.name = "";
        this.email = "";
        this.number = "";
        this.gender = "";
        this.hometown = "";
        this.birthday = "";
      }
      catch (err) {
        alert("Error: " + err);
      }


    },
    async getUsers() {
      try {
        const response = await axios.get(`http://localhost:3000/api/users`)
          .catch(err => { console.log(err) });
        this.users = response.data.rows;

      }
      catch (err) {
        alert("Error: " + err);
      }

    },
    async deleteUser(user) {
      await axios.delete(`http://localhost:3000/api/users/${user.id}`, {
        id: user.id
      })
        .catch(err => { alert(err) });
      console.log(this.users);
      this.users.filter(u => u.id !== user.id);
    }

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
