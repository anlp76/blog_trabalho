<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Criar nova postagem</h2>
      <form @submit.prevent="submitForm">
        <input v-model="newPost.title" placeholder="Título" required />
        <file-button @imageSelected="handleImageSelected" />
        <textarea v-model="newPost.content" placeholder="Conteúdo" required></textarea>

        <div class="actions">
          <Button label="Criar postagem" type="submit" :customClasses="['btn-primary']" />
          <Button label="Cancelar" type="button" @click="closeModal" :customClasses="['btn-secondary']" />
        </div>
      </form>

      <div v-if="imagePreview" class="image-preview">
        <strong>Prévia da imagem:</strong><br />
        <img :src="imagePreview" alt="Pré-visualização" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'src/components/Button.vue'
import FileButton from 'src/components/FileButton.vue'
import { createPost } from '../services/postService'

export default {
  name: 'CreatePostModal',
  components: { Button, FileButton },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newPost: {
        title: '',
        content: ''
      },
      selectedImage: null,
      imagePreview: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false)
    },
    handleImageSelected({ file, previewUrl }) {
      this.selectedImage = file
      this.imagePreview = previewUrl
    },
    resetForm() {
      this.newPost = {
        title: '',
        content: ''
      }
      this.selectedImage = null
      this.imagePreview = ''
    },
    async submitForm() {
      const { title, content } = this.newPost

      if (!title || !content || !this.selectedImage) {
        alert('Preencha todos os campos, incluindo a imagem.')
        return
      }

      const slug = title.toLowerCase().replace(/\s+/g, '-')
      const formData = new FormData()
      formData.append('title', title)
      formData.append('slug', slug)
      formData.append('content', content)
      formData.append('image', this.selectedImage)

      try {
        await createPost(formData)
        this.$emit('postCreated')
        this.closeModal()
        this.resetForm()
      } catch (error) {
        console.error('Erro ao criar post:', error)
      }
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

.image-preview {
  margin-top: 1rem;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  margin-top: 0.5rem;
}
</style>
