<template>
  <tr>
    <td><input type="text" v-model="user.name" /></td>
    <td><input type="email" v-model="user.email" /></td>
    <td><input type="tel" v-model="user.number" /></td>
    <td><input type="text" v-model="user.gender" /></td>
    <td><input type="text" v-model="user.birthday" /></td>
    <td><input type="text" v-model="user.hometown" /></td>
    <td><button @click="updateUser(user)">save</button></td>
    <td><button @click="deleteUser(user)">X</button></td>
  </tr>
</template>
<script>
export default {
  props: {
    user: Object,
    updateUser: Function,
    deleteUser: Function,
  }
}
</script>