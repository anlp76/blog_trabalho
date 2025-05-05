<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Editar postagem</h2>
      <form v-if="postData" @submit.prevent="submitForm">
        <input v-model="postData.title" placeholder="Título" required />
        <textarea v-model="postData.content" placeholder="Conteúdo" required></textarea>

        <file-button @imageSelected="handleImageSelected" />

        <div v-if="currentImageUrl" class="image-preview">
          <strong>Imagem atual:</strong><br />
          <img :src="currentImageUrl" alt="Imagem atual" />
        </div>

        <div v-if="newImagePreview" class="image-preview">
          <strong>Prévia da nova imagem:</strong><br />
          <img :src="newImagePreview" alt="Prévia da nova imagem" />
        </div>

        <div class="actions">
          <Button label="Salvar alterações" type="submit" :customClasses="['btn-primary']" />
          <Button label="Cancelar" type="button" @click="closeModal" :customClasses="['btn-secondary']" />
        </div>
      </form>
      <div v-else>
        <p>Carregando dados do post...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'src/components/Button.vue'
import FileButton from 'src/components/FileButton.vue'
import { getPostById, updatePost } from '../services/postService'

export default {
  name: 'EditPostModal',
  components: { Button, FileButton },
  props: {
    isVisible: Boolean,
    postId: [Number, String]
  },
  data() {
    return {
      postData: null,
      selectedImage: null,
      currentImageUrl: '',
      newImagePreview: ''
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.postId) {
        this.loadPost()
      }
    }
  },
  methods: {
    async loadPost() {
      try {
        const post = await getPostById(this.postId)
        this.postData = {
          title: post.title,
          content: post.content
        }
        this.currentImageUrl = post.image || ''
        this.newImagePreview = ''
        this.selectedImage = null
      } catch (err) {
        console.error('Erro ao carregar post:', err)
      }
    },
    handleImageSelected({ file, previewUrl }) {
      this.selectedImage = file
      this.newImagePreview = previewUrl
    },
    async submitForm() {
      const { title, content } = this.postData
      if (!title || !content) {
        alert('Preencha todos os campos.')
        return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (this.selectedImage) {
        formData.append('image', this.selectedImage)
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }

      try {
        await updatePost(this.postId, formData)
        this.$emit('postUpdated')
        this.closeModal()
      } catch (error) {
        console.error('Erro ao atualizar post:', error)
      }
    },
    closeModal() {
      this.$emit('update:isVisible', false)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input, textarea {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.image-preview img {
  max-width: 200px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>