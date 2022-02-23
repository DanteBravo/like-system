<template>
  <div>
    <div v-if="posts" v-for="(post) in this.posts">
      <p>
        {{ post.post }}
      </p>
      <img :id="`image-${post.id}`" :src="selectImage(post.user_id, post.id)" @click="like(post.id)">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Likes",
  data() {
    return {
      posts: null,
      likes: null,
      status: null,
    }
  },
  mounted: function () {
    this.getAllPost();
  },
  methods: {
    getAllPost() {
      axios.get('/get-post').then(response => {
        this.posts = response.data;
      })
    },
    like(id) {
      if (document.getElementById(`image-${id}`).src === `${window.location.origin}/imgs/heart-red.svg`) {
        axios.post('/delete-like', {
          postId: id
        }).then(response => {
          document.getElementById(`image-${id}`).src="/imgs/heart.svg";
        });
      } else {
        axios.post('/set-like', {
          postId: id
        }).then(response => {
          document.getElementById(`image-${id}`).src="/imgs/heart-red.svg";
        });
      }
    },
    selectImage(userId, postId) {
      if (userId !== 0 && userId !== null) {
        return "/imgs/heart-red.svg";
      } else {
        return "/imgs/heart.svg";
      }
    }
  },
}
</script>

<style scoped>

</style>