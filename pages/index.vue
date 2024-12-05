<template>
  <div class="layout">
    <h1>국민의힘 국회의원 여러분에게 ^응원^의 메시지를 보내보아요</h1>
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
