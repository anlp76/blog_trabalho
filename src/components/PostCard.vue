<template>
  <div class="post-card mb-6 p-4 border rounded-lg shadow hover:shadow-lg transition">
    <img
      v-if="post.image"
      :src="post.image"
      alt="Thumbnail"
      class="thumbnail-image"
    />
    <div class="post-card__inner">
      <h2 class="text-xl font-semibold text-blue-600 hover:underline">
        {{ post.title }}
      </h2>

      <p class="text-sm text-gray-500 mt-1">{{ formatDate(post.date) }}</p>
      <p class="text-gray-700 mt-2">{{ post.description }}</p>

      <div v-if="manage" class="card-actions mt-4">
        <Button
          @click.stop="viewPost(post)"
          :label="'Visualizar'"
          :customClasses="['view']"
        />
        <Button
          @click.stop="$emit('edit', post.id)"
          label="Editar"
          :customClasses="['edit']"
        />
        <Button
          @click.stop="togglePostSelection(post.id)"
          :label="selectedPosts.includes(post.id) ? 'Desmarcar' : 'Remover'"
          :customClasses="['remove']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'src/components/Button.vue'

export default {
  name: 'PostCard',
  components: {
    Button
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    selectedPosts: {
      type: Array,
      default: () => []
    },
    manage: {
      type: Boolean,
      default: false
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
    },
    viewPost(post) {
      this.$router.push({ name: 'PostPorId', params: { id: post.id, slug: post.slug } })
    },
    editPost(post) {
      this.$emit('editPost', post)
    },
    togglePostSelection(postId) {
      this.$emit('togglePostSelection', postId)
    }
  }
}
</script>

<style scoped>
.post-card {
  margin-bottom: 30px;
  box-shadow: 2px 2px 2px rgba(0,0,0,.3);
  border-radius: 8px;
}

.post-card__inner {
  padding: 15px;
}

.post-title {
  text-decoration: none;
}

.thumbnail-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}

h2 {
  color: #111827;
  font-size: 1.2rem;
  font-weight: 600;
}

a h2 {
  margin-top: 8px;
  line-height: 1.2;
  color: #111827;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: color 0.2s ease;
}

h2 a:hover {
  color: #4f46e5;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}
</style>