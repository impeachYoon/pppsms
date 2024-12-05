<template>
  <div class="layout">
    <h1>국민의힘 국회의원 여러분에게 ^응원^의 메시지를 보내보아요</h1>
    <h2>
      국민의힘 의원들에게 우리 같이 윤석열을 탄핵시킬 용기를 불어넣어줘요.<br><br>
      단체문자로 국민의힘 의원 전원에게 전송하는 매크로입니다.<br>
      별도 번호가 아닌 사용하시는 분의 휴대폰 번호로 발송되고 문자 발신료도 일반 문자랑 동일하게 들어가는 점 참고해주세요.
    </h2>
    <textarea v-model="content" placeholder="보낼 내용" />
    <a class="send" :href="smsLink">한번에 보내기</a>
  </div>
</template>

<script setup scoped>
  import contacts from "assets/contacts.json"
  const content = ref("")

  const numbersOnly = computed(() => {
    return contacts.map(i => i.number).join(",")
  })

  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

  const smsLink = computed(() => {
  if (getMobileOperatingSystem() == "iOS") {
    return `sms:/open?addresses=${numbersOnly.value}&body=${content.value}`
  } else {
    return `sms:${numbersOnly.value}?body=${content.value}`
  }
  });
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

  a.send {
    flex-grow: 0;
    flex-shrink: 0;
    align-self: center;
  }
}
</style>
