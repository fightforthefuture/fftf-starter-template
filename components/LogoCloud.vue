<i18n src="~/locales/cms.yml"></i18n>
<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.bg-white {
  height: 5rem;

  img {
    max-width: 80%;
    max-height: 80%;
  }
}
</style>

<template lang="pug">
  ul.row(v-if="$te('cms.supporters')")
    li.col-6.col-sm-3(v-for="logo in $t('cms.supporters')")
      .bg-white.rounded.d-flex.align-items-center.justify-content-center.mb-2
        img(:src="logo.logo" :alt="`${logo.name} logo`")
</template>
