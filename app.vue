<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}

* {
  font-family: 'Pretendard';
  box-sizing: border-box;

  color: inherit;
  word-break: keep-all;
  line-height: 1.5;
}

html {
  background: #222222;
  color: white;
  display: flex;
  height: 100%;

  justify-content: center;
  align-items: center;

  body {
    display: flex;
    width: 100%;
    max-width: 500px;
    height: 100%;
    margin: 0;
    padding: 2em;
    max-height: 1000px;

    >div#__nuxt {
      display: flex;
      width: 100%;
      height: 100%;

      >div {
        display: flex;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
