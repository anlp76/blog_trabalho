<template>
  <div>
    <div v-if="post" class="post">
      <div class="image">
        <img 
          :src="post.image" 
          :alt="post.title"
          class="thumbnail"
        />
      </div>
      <h1>{{ post.title }}</h1>
      <p class="post-date">{{ formatDate(post.date) }}</p>
      <p>{{ post.content }}</p>

      <div v-if="manage" class="post-actions">
        <button @click="editPost">Editar</button>
        <button @click="removePost">Remover</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById } from '../services/postService'

export default {
  name: 'PostView',
  props: {
    manage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      post: null
    }
  },
  async created() {
    const { id, slug } = this.$route.params

    try {
      const post = await getPostById(id)

      if (post) {
        this.post = post
        document.title = `Meu Blog - ${post.title}`

        if (!slug || slug !== post.slug) {
          this.$router.push({
            name: 'PostPorId',
            params: { id: post.id, slug: post.slug }
          })
        }

      } else {
        this.$router.push({ path: '/error/404' })
      }
    } catch (error) {
      console.error(error)
      this.$router.push({ path: '/error/500' })
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.post {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}

.image img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
  color: #1f2937;
}

.post-date {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

p {
  line-height: 1.7;
  margin-bottom: 1rem;
  color: #374151;
}

.post-actions {
  margin-top: 32px;
  display: flex;
  gap: 12px;
}

button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4338ca;
}

button:active {
  transform: scale(0.98);
}
</style>