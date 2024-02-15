import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('users', {
    state: () => ({
        user: [],
        userRepos: [],
        userIssues: [],
      }),
      getters: {
        getUser: (state) => state.user,
        getUserRepos: (state) => state.userRepos
      },
      actions : {
        async fetchUser(userName: string) {
            try {
                const data = await axios.get(`https://api.github.com/users/${userName}`)
                this.user = data.data
            }
            catch(err){
                console.log(err);
            }
        },
        async fetchUserRepos(userName: string) {
            try {
                const data = await axios.get(`https://api.github.com/users/${userName}/repos`)
                this.userRepos = data.data
            }
            catch(err){
                console.log(err);
            }
        },
        async fetchUserIssues(userName: string) {
            const id = this.user?.id
            try {
                const data = await axios.get(`https://api.github.com/users/${userName}/hovercard?subject_type=issue&subject_id=${id}`)
                this.userIssues = data.data
            }
            catch(err){
                console.log(err);
            }
        }
      }
})
