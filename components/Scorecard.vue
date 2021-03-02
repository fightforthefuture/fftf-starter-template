<i18n src="~/locales/components/Scorecard.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>
<style lang="scss" scoped>
.targets-list {
  text-align:left;

  h3 {
    margin: 0;
    font-weight: bold;

    @include media-breakpoint-only('xs') {
      font-size: 1.3rem;
    }
  }

  .target {
    @if $enable-rounded {
      border-radius: $border-radius
    }
    background-color: gray('200');
    display: none;
    margin-bottom: $spacer;

    &.show_first {
      display:flex;
    }
    &:not(.show_first) {
      animation: fade-in 1s;
      animation-fill-mode: forwards;
    }

    .contact {
      // align-items: center;
      // display: flex;
    }

    .status {
      align-items: center;
      @if $enable-rounded {
        border-radius: 0 $border-radius $border-radius 0;
      }
      background-color: $warn-color;
      color: $white;
      display: flex;
      font-size: 1.3rem;
      padding-left:2vw;

      @include media-breakpoint-up('md') {
        font-size: 1.5rem;
        width: 200px;
      }

      &:before {
        content: "";
        background-image: url("~assets/images/camera.svg");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: .4em;
        padding: 0.66em;
      }

    }

    &.pledged .status {
      background-color: $link-color;

      > div:before {
        background-image: url("~assets/images/heart.svg");
        margin-right: .6em;
        padding: .5em;
      }
    }
  }

  &.show_all {
    .target {
      display: flex;
    }
    .btn-show {
      display: none;
    }
  }

}
.twitter-btn,
.email-btn {
  background-color: gray(300);
  color: $twitter-color;
  font-size: 14px;
  padding-right: 30px;
  position:relative;

  &:after {
    content: "";
    background-image: url("~assets/images/twitter-logo.svg");
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 100%;
    padding: 12px;
    position: absolute;
    top:3px;
    right: 8px;
  }
}
.email-btn {
  color: $white;
  &:after {
    background-image: url("~assets/images/email-icon.png");
    padding: 9px;
    top: 6px;
  }
}
</style>

<template>
  <b-container class="targets-list" :class="getShowClass">
    <b-row v-for="(target, index) in targets"
         class="target"
         :key="`target-${index}`"
         :class="getClasses(target)">
      <b-col>
        <b-row class="py-2 pl-2 py-sm-3 pl-sm-3">
          <b-col>
            <h3>{{ target.name }}</h3>
            <small>{{ target.location }}</small>
          </b-col>
          <b-col sm="4" class="contact" v-if="!target.not_using">

            <share-button
              network="twitter"
              class="twitter-btn btn-block"
              size="sm"
              :is-button="false"
              :text="tweetText(target)"
              :url="$t('global.sharing.url')"
              @click.native="$trackClick('logo_tweet_button', target.twitter.toLowerCase())">
                {{ $t('tweet_at') }}
            </share-button>
            <share-button
              network="email"
              class="email-btn btn-block"
              size="sm"
              :is-button="false"
              :url="mailToUrl(target.mailto)"
              @click.native="$trackClick('mailto_button', target.mailto.toLowerCase())">
                {{ $t('mailto.cta') }}
            </share-button>

          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6" sm="4" class="status">
        <div v-html="usingText(target)" />
      </b-col>
    </b-row>
    <b-row class="row">
      <b-button @click.prevent="showAll()" variant="primary" class="btn-block">{{ $t('show_all') }}</b-button>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import ShareButton from '~/components/ShareButton'

export default {
  components: {
    ShareButton
  },

  data() {
    return {
      showingAll: false,
      targets: []
    }
  },

  computed: {
    getShowClass() {
      return this.showingAll ? 'show_all' : ''
    }
  },

  created() {
    this.fetchTargets()
  },

  methods: {
    usingText(target) {
      if (target.using) {
        return this.$t('using')
      } else if (target.not_using) {
        return this.$t('not_using')
      } else if (target.will_use) {
        return this.$t('will_use')
      } else {
        return this.$t('might')
      }
    },

    getClasses(target) {
      const classes = []
      if (target.not_using) {
        classes.push('pledged')
      }
      if (target.show_first) {
        classes.push('show_first')
      }

      return classes.join(' ')
    },

    showAll() {
      this.showingAll = true
    },

    async fetchTargets() {
      const { data } = await axios.get('https://data.fightforthefuture.org/banfacialrecognition/campus.json')
      this.targets = data
    },

    tweetText(target) {
      const tweet = target.not_using ? this.$t('global.scorecard.tweet.text_good') : this.$t('global.scorecard.tweet.text_bad')
      return tweet.replace('__HANDLE__', target.twitter)
    },

    mailToUrl(to) {
      var bcc = this.$t('global.scorecard.mailto.cc');
      var subject = this.$t('global.scorecard.mailto.subject');
      var body = encodeURI(this.$t('global.scorecard.mailto.body').replace(/&/g, 'and'));

      return `mailto:${to}?bcc=${bcc}&subject=${subject}&body=${body}`;
    }
  }
}
</script>
