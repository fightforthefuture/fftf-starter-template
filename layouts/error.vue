<i18n src="~/locales/layouts/error.yml"></i18n>

<template>
  <div class="jumbotron jumbotron-fluid text-center">
    <h1 class="display-4">
      <span v-if="error.statusCode === 404">{{ $t('404_title') }}</span>
      <span v-else>{{ error.statusCode }} - {{ error.message }}</span>
    </h1>
    <p class="lead">
      <nuxt-link :to="localePath('index')">{{ $t('return_home') }}</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
