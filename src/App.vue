<template>
  <UserList />
  <AddUserModal v-if="!!store.state.isAddModal" />
  <UpdateUserModal />
</template>

<script setup>
import UserList from "@/components/UserList.vue";
import AddUserModal from "@/components/AddUserModal.vue";
import UpdateUserModal from "@/components/UpdateUserModal.vue";
import {useStore} from "vuex";
const store = useStore();
</script>
