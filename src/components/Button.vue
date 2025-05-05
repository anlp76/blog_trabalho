<template>
   <div class="button-wrapper">
     <button
       :class="customClasses"
       :aria-label="label"
       :disabled="isDisabled"
       :type="type"
       @click="$emit('click', $event)"
     >
       {{ label }}
     </button>
   </div>
 </template>
 
 <script>
 export default {
   name: "Button",
   props: {
     label: {
       type: String,
       default: 'Click Me!'
     },
     customClasses: {
       type: Array,
       default: () => []
     },
     isDisabled: {
       type: Boolean,
       default: false
     },
     type: {
       type: String,
       default: 'button'
     }
   }
 }
 </script>
