<i18n src="~/locales/components/PageFooter.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<template>
  <footer class="page-footer text-center p-5">
    <p>
      {{ $t('built_by') }}<br>
      <a href="https://www.fightforthefuture.org">
        <img src="~assets/images/fftf-logo-dark.svg"
             :alt="$t('global.common.logo_alt')">
      </a>
    </p>
    <p>
      {{ $t('for_press') }}<br>
      <small v-html="$t('press_contact_html')"></small>
    </p>
    <p>
      <small v-html="$t('other_contact_html')"></small>
    </p>
  </footer>
</template>
