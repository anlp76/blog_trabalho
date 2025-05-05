import axios from 'axios'

const API_URL = 'http://localhost:3000/posts'

export function getAllPosts() {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao buscar posts:', error)
      throw error
    })
}

export function getPostById(id) {
  return axios.get(`${API_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Erro ao buscar post ${id}:`, error)
      throw error
    })
}

export function createPost(formData) {
  console.log(formData)
  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updatePost(id, updatedPost) {
  return axios.put(`${API_URL}/${id}`, updatedPost, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function deletePost(id) {
  return axios.delete(`${API_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Erro ao deletar post ${id}:`, error)
      throw error
    })
}
