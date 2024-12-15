<template>
  <div class="layout">
    <h1>감사합니다.</h1>
    <h2>
    12월 14일 오후 5시 경 <대통령(윤석열) 탄핵소추안> 이 재석의원 300인 중 204인의 찬성으로 가결되어 통과되었습니다.
    광장에서도, 이 웹사이트를 포함한 다른 곳에서도 시민사회의 뜻을 공고히 한 모든 여러분들에게 감사의 말씀을 드립니다.<br><br>
    여전히 우리는 윤석열의 파면을 위해서 목소리를 내야 할 뿐 아니라 노동자, 장애인, 여성, 성소수자, 이민자 등등
    우리 사회에서 소외되고 있는 모든 이들이 함께 공존하고 동료시민으로서 함께 행복할 수 있는 사회를 만들기 위해 노력해야 합니다.<br><br>
    이 웹사이트는 어디까지나 당장의 윤석열 탄핵소추안 가결을 위한 국민들의 목소리를 알리기 위한 목적이었음을 감안하고,
    특히 국민의힘 내부에서도 탄핵 찬성 의견을 공개적으로 밝히진 않았지만 양심에 따른 선택을 한 5인의 익명의 의원이 존재함을 감안해 우선 기능을 정지하지만,
    이 웹사이트를 통해서, 또 광장에서, 권력의 폭력이 없는 삶을 한 목소리로 염원했던 모든 분들께 감사의 말씀과 동시에 앞으로도 함께 나아가자는 부탁을 드립니다.<br><br>
    개별 의원에 대해 국민으로서 더 건의하고, 목소리를 내고자 하는 의향이 있으신 분들께서는 이 웹사이트의 원조 격인 <a href="https://nodong.org/demand" target="_blank">민주노총 문자행동</a> 웹사이트를 이용해주시면 아마 일개 개인인 제가 업데이트하는 것 보다는 훨씬 정확한 연락처 정보를 받을 수 있으실 거라 생각합니다.<br><br>
    12월 3일부터 지금까지, 모두들 수고하셨습니다. 다시 한 번 감사합니다 <span style="opacity: 1;">💕</span>
    </h2>
    <!--
    <h2 v-if="platform == 'unknown'">
      휴대전화 등 SMS 전송이 가능한 환경에서 접속해주세요.
    </h2>
    <u-textarea
      v-model="content"
      color="white"
      variant="outline"
      placeholder="보낼 내용"
      :rows="5"
    />
      <u-form-group label="스팸 피하기">
    <div class="buttons">
      <u-button color="gray" @click="convertContent">
        글씨 변환
      </u-button>
      <u-button color="gray" @click="romanizeContent">
        영어로 변환
      </u-button>
      <u-button color="gray" @click="disassembleContent">
        자모 분해
      </u-button>
    </div>
      </u-form-group>
    <u-button color="black" @click="isSendModalOpened = true">
      보내기
    </u-button>

      <u-modal v-model="isSendModalOpened">
        <div class="send-modal">
          <u-form-group label="받을 사람"> 
            <u-select-menu
              searchable
              :search-attributes="['name']"
              multiple
              :options="contacts"
              v-model="selectedContacts"
            >
              <template #label>
                <span v-if="selectedContacts.length >= 1" class="truncate">{{ selectedContacts.map(i => i.name).join(", ") }}</span>
                <span v-else>선택된 사람 없음</span>
              </template>
              <template #option="{ option: contact }">
                {{ contact.name }}
                <u-badge v-for="tag in contact.tags" :color="getTagType(tag).color">{{ getTagType(tag).title }}</u-badge>
              </template>
            </u-select-menu>
          </u-form-group>

          <u-form-group  label="필터">
          <div class="contact-select-options">
            <u-button v-for="type in tagTypes" @click="toggleFilter(type.tag)" :color="filterColor(type.tag)" variant="outline">
              <span v-if="filterValue(type.tag) == 'off'">{{ type.buttonText.neutral }}</span>
              <span v-else-if="filterValue(type.tag) == 'inverse'">{{ type.buttonText.negative }}</span>
              <span v-else-if="filterValue(type.tag) == 'on'">{{ type.buttonText.positive }}</span>
            </u-button>
          </div>
          </u-form-group>

          <div class="split-toggle horizontal-label">
            <u-toggle v-model="splitSend" />
            <span>나누어 보내기</span>
          </div>
          <u-button class="send-confirm" v-if="!splitSend" color="black" :to="smsLink">
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
      -->
  </div>
</template>

<script setup scoped>
  import contacts from "assets/contacts2.json"
  import zalgo from "to-zalgo"
  import { romanize, disassemble } from 'es-hangul';

  const selectedContacts = ref(contacts)

  const colorMode = useColorMode()
  colorMode.preference = "dark"

  const content = ref("")
  const splitSend = ref(false)
  const splitCount = ref(2)

  const isSendModalOpened = ref(false)

  const clickedButtonIndices = ref([])

  onMounted(() => {
    console.log("🐣 궁금하시다면 여전히 소스 코드는 GitHub 저장소에 공개되어있습니다. 별 거는 없구 Nuxt 3 기반의 간단한 SPA입니다.")
    console.log("http://github.com/impeachYoon/pppsms")
    console.log("개발자 도구까지 열어볼 정도로 관심 가져주셔서 감사합니다 😊")
  })

  const tagTypes = [
    {
      tag: "for_impeachment",
      title: "탄핵 찬성 / 조건부 찬성",
      buttonText: {
        neutral: "탄핵 찬성 여부",
        negative: "탄핵 반대 / 의견 표출 없음",
        positive: "탄핵 찬성 / 조건부 찬성"
      },
      color: 'green'
    },
    {
      tag: "voted1",
      title: "12/7 탄핵안 표결 참여",
      buttonText: {
        neutral: "12/7 탄핵안 표결",
        negative: "12/7 탄핵안 표결 불참",
        positive: "12/7 탄핵안 표결 참여"
      },
      color: 'blue'
    },
    {
      tag: "martial_law",
      title: "계엄령 해제 참여",
      buttonText: {
        neutral: "계염령 해제",
        negative: "계엄령 해제 불참",
        positive: "계엄형 해제 참여"
      },
      color: 'red'
    },
    {
      tag: "sp_vote",
      title: "상설특검 찬성",
      buttonText: {
        neutral: "상설특검 표결",
        negative: "상설특검 반대 표결 / 기권",
        positive: "상설특검 찬성 표결"
      },
      color: 'purple'
    }
  ]

  function getTagType(tag) {
    return tagTypes.find(i => i.tag == tag)
  }

  function hasTag(currentTag, currentContact) {
    return arrayContains(currentContact.tags ?? [], currentTag.tag)
  }

  watch(splitCount, () => {
    clickedButtonIndices.value = []
  })

  watch(selectedContacts, () => {
    clickedButtonIndices.value = []
  })

  watch(content, () => {
    clickedButtonIndices.value = []
  })

  function convertContent() {
    content.value = convert(content.value)
  }

  function romanizeContent() {
    content.value = romanize(content.value)
  }

  function disassembleContent() {
    content.value = disassemble(content.value)
  }

  function convert(original) {
    let text = original

    const letters = [
      "가","나","다","라","마","바","사","아","자","차","카","타","파","하",
      "우","주"
    ]
    const replacements = [
      "㉮","㉯","㉰","㉱","㉲","㉳","㉴","㉵","㉶","㉷","㉸","㉹","㉺","㉻",
      "㉾","㈜"
    ]
    for (let idx = 0; idx < letters.length; idx++) {
      text = text.replaceAll(letters[idx], replacements[idx])
    }

    return zalgo(text)
  }

  function filterValue(tag) {
    const filter = filterFind(tag)
    if (filter == undefined) return 'off'
    if (filter.inverse) return 'inverse'
    else return 'on'
  }
  function filterColor(tag) {
    const filter = filterValue(tag)
    if (filter == 'off') return 'gray'
    if (filter == 'inverse') return 'red'
    else return 'green'
  }

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

  const platform = getMobileOperatingSystem()

  let filters = ref([])

  watch(filters, () => {
    updateSelection()
  })

  function selectAll() {
    selectedContacts.value = contacts
    filters.value = []
  }

  function clearSelection() {
    selectedContacts.value = []
    filters.value = [{tag: "none", inverse: false}]
  }

  function toggleFilter(tag) {
    const filter = filterFind(tag)
    if (filter == undefined) {
      filters.value.push({
        tag: tag,
        inverse: true
      })
      updateSelection()
      return
    }
    if (filter.inverse) {
      filterChange(tag, false)
    } else {
      filterRemove(tag)
    }
    updateSelection()
  }

  function updateSelection() {
    selectedContacts.value = filteredContacts.value
  }

  const filteredContacts = computed(() => {
    if (filters.value.length == 0) return contacts
    return contacts.filter(i => {
      const passesFilter = filters.value.map(filter => {
        if (arrayContains(i.tags ?? [], filter.tag)) {
          return !filter.inverse
        } else {
          if (filter.inverse) {
            return true
          }
        }
      })
      return passesFilter.every(i => i)
    })
  })

  function filterFind(tag) {
    return filters.value.find(i => i.tag == tag)
  }

  function filterChange(tag, inverse) {
  filters.value = filters.value.map(i => {
    if (i.tag != tag) return i
    i.inverse = inverse
    return i
  })
  }

  function filterRemove(tag) {
    filters.value = filters.value.filter(i => i.tag != tag)
  }

  function arrayContains(array, content) {
    return array.find(i => i == content) != undefined
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
    /* opacity: 0.7; */
    color: color-mix(in srgb, white, #222222 30%);
  }

  div.buttons {
    display: flex;
    gap: 1em;

    >* {
      flex-grow: 1;
    }
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

  :global(.split-send-confirm) {
    text-decoration: none;
  }
  :global(.send-confirm) {
    text-decoration: none;
  }

  :global(button) {
    display: unset;
  }

  :global(.horizontal-label) {
    display: flex;
    gap: 1ex;
  }
}
</style>
