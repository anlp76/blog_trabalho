<template>
  <div class="file-upload">
    <input
      type="file"
      accept="image/*"
      @change="handleImageUpload"
      hidden
      ref="fileInput"
    />
    <button type="button" @click="triggerFileInput">Selecionar imagem</button>
    <span v-if="filename">Selecionado: {{ filename }}</span>
  </div>
</template>

<script>
export default {
  emits: ['imageSelected'],
  data() {
    return {
      filename: '',
      selectedImage: null
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const previewUrl = URL.createObjectURL(file)
      this.$emit('imageSelected', { file, previewUrl })
    }
  }
}
</script>
