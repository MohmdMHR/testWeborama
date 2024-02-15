<template>
    <h1>test page</h1>
    <div class="search">
        <input type="text" v-model="userName"/>
        <button @click="fetchUser">Search</button>
    </div>
    <div class="user">
        <h1 class="user-name" v-if="getUser">
            User name: {{ getUser.login }}
        </h1>
        <div class="date">
            Created At: {{ formatDate(getUser.created_at) }}
        </div>
        <img :src="getUser.avatar_url" alt="" class="avatar">
    </div>
    <div class="repos" v-if="getUserRepos">
        <ul v-for="(repo, r) in getUserRepos" :key="r">
            <li> Link: {{ repo.url }} </li>
            <li> Description: {{ repo.description ?? 'no description found' }} </li>
            <li> Created At: {{ formatDate(repo.created_at) }} </li>
            <hr/>
        </ul>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import moment from 'moment'

import { useUserStore } from "../stores/users";
import {storeToRefs} from 'pinia'
const store = useUserStore();

const userName = ref('Weborama')
const {getUser, getUserRepos} = storeToRefs(store)

const fetchUser = async () => {
    await store.fetchUser(userName.value)
    store.fetchUserRepos(userName.value)
    // store.fetchUserIssues(userName.value)
}

const formatDate = (date: string) => {
    return moment(date).format('mm/dd/yyyy')
}
onMounted(() => {
  store.fetchUser(userName.value);
  store.fetchUserRepos(userName.value)
});
</script>