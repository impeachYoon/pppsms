<template>
  <div class="layout">
    <h1>국민의힘 국회의원 여러분에게 ^응원^의 메시지를 보내보아요</h1>
    <h2>
      국민의힘 의원들에게 우리 같이 윤석열을 탄핵시킬 용기를 불어넣어줘요.<br><br>
      단체문자로 국민의힘 의원 전원에게 전송하는 매크로입니다.<br>
      별도 번호가 아닌 사용하시는 분의 휴대폰 번호로 발송되고 문자 발신료도 일반 문자랑 동일하게 들어가는 점 참고해주세요.<br><br>
      원 아이디어 및 연락처 데이터는 <a href="https://nodong.org/demand">민주노총 윤석열 탄핵촉구 문자행동</a>에서 가져왔으며, 조금 더 쓰기 쉽게 개량한 버전입니다.
    </h2>
    <u-textarea
      v-model="content"
      color="white"
      variant="outline"
      placeholder="보낼 내용"
      rows="5"
      size="m"
    />
      <u-button color="black" @click="isSendModalOpened = true">
        보내기
      </u-button>

      <u-modal v-model="isSendModalOpened">
        <div class="send-modal">
          <u-form-group label="받을 사람"> 
            <u-select-menu
              searchable
              multiple
              :options="contacts"
              v-model="selectedContacts"
            >
              <template #label>
                <span v-if="selectedContacts.length > 1" class="truncate">{{ selectedContacts.map(i => i.name).join(", ") }}</span>
              </template>
              <template #option="{ option: contact }">
                {{ contact.name }}
                <u-badge color="green" v-if="contact.hasAgreedToImpeachYoon">탄핵 찬성 의견 발표</u-badge>
              </template>
            </u-select-menu>
          </u-form-group>
          <div class="contact-select-options">
            <u-button @click="selectedContacts = contacts" size="xs" color="green">
              전체 선택
            </u-button>

            <u-button @click="selectedContacts = []" size="xs" color="red">
              전체 선택 해제
            </u-button>
            <u-button @click="selectedContacts = onlySympathizers" size="xs" color="black">
              탄핵 동의 의견을 밝히지 않은 사람만 선택
            </u-button>

            <u-button @click="selectedContacts = onlySaneOnes" size="xs" color="black">
              탄핵 동의 의견을 밝힌 사람만 선택
            </u-button>
          </div>

          <div class="split-toggle horizontal-label">
            <u-toggle v-model="splitSend" />
            <span>나누어 보내기</span>
          </div>
          <u-button v-if="!splitSend" color="black" :to="smsLink">
            <span v-if="selectedContacts.length == 108">전원에게 한번에 보내기</span>
            <span v-else>{{ selectedContacts.length }}명에게 한번에 보내기</span>
          </u-button>
          <div class="split-send" v-else>
            <u-form-group label="분할 전송 횟수" :help="`1회 전송 당 ${chunkSize}명 씩 전송됩니다.`">
              <u-input type="number" v-model="splitCount" min="1" max="108" />
            </u-form-group>
            <div class="send-links">
              <u-button class="split-send-confirm" :color="hasClicked(i) ? 'gray' : 'black'" v-for="(link, i) in splitSendLinks" :to="link" @click="splitClicked(i)">{{ i + 1 }}번째 분할전송 보내기</u-button>
            </div>
          </div>
        </div>
      </u-modal>
  </div>
</template>

<script setup scoped>
  import contacts from "assets/contacts.json"

  const selectedContacts = ref(contacts)

  const content = ref("")
  const splitSend = ref(false)
  const splitCount = ref(2)

  const isSendModalOpened = ref(false)

  const clickedButtonIndices = ref([])

  watch(splitCount, () => {
    clickedButtonIndices.value = []
  })

  watch(selectedContacts, () => {
    clickedButtonIndices.value = []
  })

  watch(content, () => {
    clickedButtonIndices.value = []
  })

  function splitClicked(index) {
    clickedButtonIndices.value.push(index)
  }

  function hasClicked(index) {
    return clickedButtonIndices.value.find(i => i == index) != undefined
  }

  const numbersOnly = computed(() => {
    return selectedContacts.value.map(i => i.number).join(",")
  })

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  const chunkSize = computed(() => {
    const splits = Math.max(splitCount.value, 1)
    const chunkSize = Math.ceil(selectedContacts.value.length / splits)

    return chunkSize
  })

  const splitNumbers = computed(() => {
    return [...chunks(selectedContacts.value.map(i => i.number), chunkSize.value)].map(i => i.join(","))
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

  const onlySympathizers = computed(() => {
    return contacts.filter(i => !(i?.hasAgreedToImpeachYoon))
  })

  const onlySaneOnes = computed(() => {
    return contacts.filter(i => (i?.hasAgreedToImpeachYoon))
  })

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

<style lang="scss" scoped>
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



  :global(.send-modal) {
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
  }
  :global(.split-send) {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  :global(.send-links) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1ex;
  }

  :global(.contact-select-options) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1ex;
  }

  :global(.horizontal-label) {
    display: flex;
    gap: 1ex;
  }
}
</style>
