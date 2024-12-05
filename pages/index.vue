<template>
  <div class="layout">
    <h1>국민의힘 국회의원 여러분에게 ^응원^의 메시지를 보내보아요</h1>
    <h2>
      국민의힘 의원들에게 우리 같이 윤석열을 탄핵시킬 용기를 불어넣어줘요.<br><br>
      단체문자로 국민의힘 의원 전원에게 전송하는 매크로입니다.<br>
      별도 번호가 아닌 사용하시는 분의 휴대폰 번호로 발송되고 문자 발신료도 일반 문자랑 동일하게 들어가는 점 참고해주세요.
    </h2>
    <textarea v-model="content" placeholder="보낼 내용" />
    <div class="options">
      <div>
        <input type="checkbox" v-model="splitSend" id="splitSend">
        <label for="splitSend">나누어 보내기</label>
      </div>
      <a class="send" :href="smsLink" v-if="!splitSend">보내기</a>
      <div class="split-send" v-else>
        <span>
          <input type="number" v-model="splitCount"> 번에 나누어 보내기 (1회 당 {{ chunkSize }} 인)
        </span>
        <div class="send-links">
          <a class="send" v-for="(link, i) in splitSendLinks" :href="link">{{i + 1}}번째 분할전송 보내기</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup scoped>
  import contacts from "assets/contacts.json"
  const content = ref("")
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
    return createLink(numbersOnly.value, content.value)
  });
  const splitSendLinks = computed(() => {
    return splitNumbers.value.map(numbers => {
      return createLink(numbers, content.value)
    })
  })
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  gap: 1em;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.7;
  }

  textarea {
    flex-grow: 1;
    max-height: 20em;
    font-size: 1rem;
    padding: 1em;
    appearance: none;
    outline: none;
    border: 1px solid black;
    resize: none;
    color: black;
  }

  div.options {
    flex-grow: 0;
    flex-shrink: 0;
    align-self: center;
    align-items: center;
    display: flex;
    flex-direction: column;

    padding: 0.5em 0;

    input[type=number] {
      background: white;
      border: 1px black solid;
      color: black;
      width: 5ex;
      font-size: inherit;
    }

    .split-send {
      display: flex;
      flex-direction: column;
      align-items: center;

      .send-links {
        display: flex;
        /* flex-wrap: wrap; */
        flex-direction: column;

        >* {
          padding: 0.5em;
        }
      }
    }
  }
}
</style>
