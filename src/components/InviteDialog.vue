<template>
  <q-dialog
    v-model="isShowDialog"
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card
      ref="card"
      style="max-width: 550px; height: auto"
      class="relative-position q-pb-md"
    >
      <q-card-section class="text-h6 text-bold text-center">
        快速邀請朋友加入遊戲
      </q-card-section>
      <q-card-section
        class="flex flex-center q-pt-none"
      >
        <q-img
          style="max-width: 300px"
          width="100%"
          :src="qrCodeUrl"
        />
      </q-card-section>
      <q-card-actions
        align="center"
        class="q-px-lg"
      >
        <q-btn
          label="邀請連結"
          color="primary"
          class="full-width"
          :outline="!isCopied"
          @click="handleCopyLinkClick"
        />
      </q-card-actions>
      <q-btn
        v-close-popup
        icon="close"
        round
        push
        color="black"
        text-color="white"
        padding="4px"
        class="q-ma-md absolute-top-right"
        size="md"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import QRCode from 'qrcode';
import { copyToClipboard } from 'quasar';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'InviteDialog',
  data() {
    return {
      qrCodeUrl: '',
      isCopied: false,
    };
  },
  computed: {
    ...mapState('game', ['roomId', 'isShowInviteDialog']),

    isShowDialog: {
      get() {
        return this.isShowInviteDialog;
      },
      set(val) {
        this.setIsShowInviteDialog(val);
      },
    },
    link() {
      return `${process.env.AVALON_CLIENT_URL}/${this.roomId}`;
    },
  },
  async updated() {
    await this.setQrCodeUrl();
  },
  async mounted() {
    await this.setQrCodeUrl();
  },
  methods: {
    ...mapMutations('game', ['setIsShowInviteDialog']),

    showDialog() {
      this.setIsShowInviteDialog(true);
    },

    async setQrCodeUrl() {
      const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 1,
        margin: 1,
      };
      this.qrCodeUrl = await QRCode.toDataURL(this.link, opts);
    },
    handleCopyLinkClick() {
      copyToClipboard(this.link)
        .then(() => {
          this.isCopied = true;
        })
        .catch(() => {
          this.$q.notify({
            message: '複製失敗',
          });
        });
    },
  },
};
</script>
