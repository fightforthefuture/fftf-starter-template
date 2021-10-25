<i18n src="~/locales/components/PageFooter.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<style lang="scss" scoped>
img {
  max-width: 300px;
}

.press {
  @include font-size(14px);
  font-family: $headings-font-family;
  line-height: 1.14;
}

.social {
  a {
    @include border-radius(100px);
    align-content: center;
    align-items: center;
    background-color: $white;
    display: flex;
    height: 53px;
    justify-content: center;
    text-align: center;
    width: 53px;

    img {
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <footer class="d-md-flex flex-md-row align-items-center bg-dark-grey text-light">
    <div class="col-md-4 p-3 p-md-5 text-center">
      <a class="d-block" href="https://www.fightforthefuture.org">
        <img src="~assets/images/fftf-logo-light.svg"
          :alt="$t('global.common.logo_alt')">
      </a>
    </div>
    <div class="col-md-4 p-3 p-md-5 bg-darker-grey press text-center text-md-left">
      <p>
        <uppercase class="d-block">{{ $t('for_press') }}</uppercase>
        <uppercase>
          <a class="text-primary" href="tel://5084745248">(508) 474-5248</a> or
          <a class="text-primary" href="mailto:press@fightforthefuture.org">press@fightforthefuture.org</a>
        </uppercase>
      </p>
      <p class="mb-0">
        <uppercase class="d-block">All other inquiries, contact:</uppercase>
        <uppercase>
          <a class="text-primary" href="mailto:team@fightforthefuture.org">
          team@fightforthefuture.org</a>
        </uppercase>
      </p>
    </div>
    <div class="col-md-4 bg-darker-grey d-flex align-self-stretch justify-content-center justify-content-md-left">
      <div class="p-3 p-md-5 align-self-center social d-flex flex-row">
        <a class="mr-3" href="https://twitter.com/fightfortheftr" target="_blank">
          <img src="~assets/images/icon-twitter.svg"
               alt="Twitter Logo" />
        </a>
        <a href="https://www.instagram.com/fightfortheftr/" target="_blank">
          <img src="~assets/images/icon-instagram.svg"
               alt="Instagram Logo" />
        </a>
      </div>
    </div>
  </footer>
</template>
