<template>
  <header class="site-header">
    <div class="logo">
      <img src="/vite.svg" alt="Meu Blog" />
      <span class="site-title">Meu Blog</span>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-link" active-class="active-link">Início</router-link>
      <router-link to="/manage" class="nav-link" active-class="active-link">Gerenciar</router-link>
    </nav>
  </header>
</template>
      
<script>
export default {
  name: 'Header'
}
</script>
      
<style scoped>
.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-title {
  font-weight: 600;
  font-size: 1.2rem;
  color: #1f2937;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  position: relative;
  text-decoration: none;
  font-weight: 500;
  color: #374151;
  transition: color 0.3s;
  padding: 6px 4px;
}

.nav-link:hover {
  color: #4f46e5;
}

.active-link {
  color: #4f46e5;
  font-weight: 600;
}

.active-link::after {
  content: '';
  display: block;
  height: 2px;
  background: #4f46e5;
  width: 100%;
  margin-top: 2px;
  border-radius: 2px;
}
</style>
