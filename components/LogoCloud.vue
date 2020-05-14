<i18n src="~/locales/components/LogoCloud.yml"></i18n>

<template>
  <div class="row">
    <div v-for="(logo, index) in $t('logos')"
        :key="`logo-${index}`"
        class="col-6 col-sm-4 p-2 text-center">

      <img :src="logo.image_url" :alt="logo.name">

      <p v-if="logo.type === 'person'">
        {{ logo.name }}
      </p>
    </div>
  </div>
</template>
