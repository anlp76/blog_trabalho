<template>
  <div>
    <h1>Gerenciar postagens</h1>

    <div class="actions">
      <Button
        :label="`Remover selecionados (${selectedPosts.length})`"
        :isDisabled="selectedPosts.length === 0"
        @click="deleteSelectedPosts"
        :customClasses="['remove-btn']"
      />
      <Button
        label="Criar nova postagem"
        @click="openCreatePostModal"
        :customClasses="['create-btn']"
      />
      <CreatePostModal
        :isVisible="isCreatePostModalVisible"
        @update:isVisible="isCreatePostModalVisible = $event"
        @postCreated="handlePostCreated"
      />
      <EditPostModal
        :isVisible="isEditPostModalVisible"
        :postId="editingPostId"
        @update:isVisible="isEditPostModalVisible = $event"
        @postUpdated="handlePostUpdated"
      />
    </div>

    <div v-if="posts && posts.length" v-for="post in posts" :key="post.id" class="post-item">
      <PostCard 
        :post="post" 
        :manage="true"
        :selectedPosts="selectedPosts" 
        @togglePostSelection="togglePostSelection"
        @edit="openEditPostModal"
      />
    </div>
    
    <div v-else>
      <p>Nenhuma postagem encontrada. Crie uma abaixo!</p>
    </div>
  </div>
</template>

<script>
import PostCard from 'src/components/PostCard.vue'
import Button from 'src/components/Button.vue'
import { getAllPosts, deletePost } from '../services/postService'
import CreatePostModal from 'src/components/CreatePostModal.vue'
import EditPostModal from 'src/components/EditPostModal.vue'

export default {
  name: 'Manage',
  components: {
    PostCard,
    Button,
    CreatePostModal,
    EditPostModal
  },
  data() {
    return {
      posts: [],
      selectedPosts: [],
      isCreatePostModalVisible: false,
      isEditPostModalVisible: false,
      editingPostId: null
    }
  },
  async created() {
    await this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        this.posts = await getAllPosts()
      } catch (error) {
        console.error('Erro ao carregar posts:', error)
      }
    },
    openEditPostModal(postId) {
      this.editingPostId = postId
      this.isEditPostModalVisible = true
    },
    handlePostUpdated() {
      this.isEditPostModalVisible = false
      this.editingPostId = null
      this.fetchPosts()
    },
    openCreatePostModal() {
      this.isCreatePostModalVisible = true
    },
    handlePostCreated() {
      this.isCreatePostModalVisible = false
      this.fetchPosts()
    },
    togglePostSelection(postId) {
      const index = this.selectedPosts.indexOf(postId)
      if (index === -1) {
        this.selectedPosts.push(postId)
      } else {
        this.selectedPosts.splice(index, 1)
      }
    },
    async deleteSelectedPosts() {
      if (!confirm('Tem certeza que deseja remover os posts selecionados?')) return

      try {
        for (const id of this.selectedPosts) {
          await deletePost(id)
        }
        this.selectedPosts = []
        await this.fetchPosts()
      } catch (error) {
        console.error('Erro ao deletar posts:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

.poster {
  margin-top: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

input, textarea {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}

button {
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 1rem;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border-color: #d32f2f;
}

.remove-btn:hover {
  background-color: #d32f2f;
  border-color: #c62828;
}

.create-btn {
  background-color: #4f46e5;
  color: white;
  border-color: #4338ca;
}

.create-btn:hover {
  background-color: #4338ca;
  border-color: #3b28b8;
}
</style>
