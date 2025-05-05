<template>
  <div>
    <h1>Postagens do Blog:</h1>

    <PostCard 
      v-if="posts && posts.length"
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />

    <div v-else>
      <p>Nenhuma postagem encontrada. Crie uma abaixo</p>
      <router-link to="/manage" class="nav-link">Gerenciar</router-link>
    </div>
  </div>
</template>

<script>
import PostCard from 'src/components/PostCard.vue'
import { getAllPosts } from 'src/services/postService.js'

export default {
  name: 'BlogList',
  components: {
    PostCard
  },
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      this.posts = await getAllPosts()
    } catch (error) {
      console.error('Erro ao carregar postagens:', error)
    }
  }
}
</script>

<style scoped>
.post-actions {
  margin-top: 16px;
}
button {
  margin-right: 8px;
}
</style>
