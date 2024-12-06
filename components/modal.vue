<template>
    <div class="modal">
      <div>
        <u-checkbox v-model="splitSend" id="splitSend" label="나누어 보내기" />
      </div>
      <!-- <a class="send" :href="smsLink" v-if="!splitSend">보내기</a> -->
      <u-button v-if="!splitSend" color="black">보내기</u-button>
      <div class="split-send" v-else>
        <u-form-group label="분할 전송 횟수">
          <u-input type="number" v-model="splitCount" />
        </u-form-group>
        <!-- <span class="split-count"> -->
        <!--   <u-input type="number" v-model="splitCount"> -->
        <!--     <template #trailing> -->
        <!--     번 -->
        <!--     </template> -->
        <!--   </u-input> -->
        <!--   에 나누어 보내기 (1회 당 {{ chunkSize }} 인) -->
        <!-- </span> -->
        <div class="send-links">
          <a class="send" v-for="(link, i) in splitSendLinks" :href="link">{{i + 1}}번째 분할전송 보내기</a>
        </div>
      </div>
    </div>
</template>

<script setup>
  import contacts from "assets/contacts.json"

const props = defineProps(['content'])

  const splitSend = ref(false)
  const splitCount = ref(2)

  const numbersOnly = computed(() => {
    return contacts.map(i => i.number).join(",")
  })

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  const chunkSize = computed(() => {
    const splits = Math.max(splitCount.value, 1)
    const chunkSize = Math.ceil(contacts.length / splits)

    return chunkSize
  })

  const splitNumbers = computed(() => {
    return [...chunks(contacts.map(i => i.number), chunkSize.value)].map(i => i.join(","))
  })

  function getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }

  function createLink(numbers, body) {
    if (getMobileOperatingSystem() == "iOS") {
      return `sms:/open?addresses=${numbers}&body=${body}`
    } else {
      return `sms:${numbers}?body=${body}`
    }
  }

  const smsLink = computed(() => {
    return createLink(numbersOnly.value, props.content)
  });
  const splitSendLinks = computed(() => {
    return splitNumbers.value.map(numbers => {
      return createLink(numbers, props.content)
    })
  })
</script>
