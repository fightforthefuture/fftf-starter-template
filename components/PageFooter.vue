<i18n src="~/locales/components/PageFooter.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<style lang="scss" scoped>
footer {
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
}

.arrow-up {
  @include arrow-up($body-bg);
}
</style>

<template>
  <footer class="text-center">
    <div class="bg-alt p-4">
      {{ $t('built_by') }}<br>
      <a href="https://www.fightforthefuture.org">
        <img class="fftf-logo"
             src="~assets/images/spacer.png"
             :alt="$t('global.common.logo_alt')">
      </a>
    </div>
    <div class="arrow-up p-4">
      <p>
        {{ $t('for_press') }}<br>
        <small v-html="$t('press_contact_html')"></small>
      </p>
      <p>
        <small v-html="$t('other_contact_html')"></small>
      </p>
    </div>
  </footer>
</template>
