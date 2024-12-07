<template>

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

<style lang="scss">
.send-modal {
    position: fixed;
    display: flex;
    z-index: 1;

}
</style>
