<template>
  <div class="lyrics" ref="lyrics">
    <div class="text" v-for="(line, index) in state.lyrics" :key="index" @click="onLyricClick(index)"
      :class="{ active: state.currentIndex === index }">
      {{ line.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAudio } from "@/store/audioPlay";
interface Lyric {
  time: number;
  text: string;
}
const props = defineProps({
  lyricsData: {
    type: String,
    required: true,
  },
  currentTime: {
    type: Number,
    default: 0,
  },
})
const state = reactive({
  lyrics: [] as Lyric[],
  currentIndex: 0,
});
const store = useAudio();
const emits = defineEmits(['setPlaybackProgress'])
/**
 * @description: 歌词逐行分割成数组
 * @param {string} lyricsData 歌词
 * @return {Lyric[]}
 */
const parseLyrics = (lyricsData: string) => {
  const lines = lyricsData.split('\n');
  const result: Lyric[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim(); // 去除两边的空格
    // 添加判断，过滤掉空白行
    if (line === '') {
      continue;
    }
    const bracketStartIndex = line.indexOf('[');
    const bracketEndIndex = line.indexOf(']');
    if (bracketStartIndex === 0 && bracketEndIndex > 0) {
      const timeStr = line.slice(bracketStartIndex + 1, bracketEndIndex);
      const timeArr = timeStr.split(':').map(Number);
      const time = timeArr[0] * 60 + timeArr[1];
      const text = line.slice(bracketEndIndex + 1).trim(); // 去除文本两端可能存在的空格
      // 添加判断，过滤掉文本信息为空的行
      if (text === '') {
        continue;
      }
      result.push({ time, text });
    }
  }
  return result;
};
/**
 * @description: 当用户点击某一行歌词时，会触发该函数
 * @param {number} index 歌词所在的索引
 * @return {void}
 */
const onLyricClick = (index: number) => {
  // 更新当前歌词索引
  state.currentIndex = index;

  // 滚动到当前歌词
  scrollToCurrentLyric();

  // 更改当前播放进度
  store.setCurrentTime = state.lyrics[index].time;
};


/**
 * @description: 滚动到当前歌词位置
 * @return {void}
 */
const scrollToCurrentLyric = () => {
  const { lyrics, currentIndex } = state;
  if (lyrics.length === 0 || currentIndex < 0) return;
  const textElements = document.querySelectorAll('.text');
  const currentTextElement = textElements[currentIndex] as HTMLElement;
  const lyricsElement = document.querySelector('.lyrics') as HTMLElement;
  const offsetTop = currentTextElement.offsetTop;
  const scrollY = offsetTop - lyricsElement.offsetHeight / 2 + currentTextElement.offsetHeight / 2;
  lyricsElement.scrollTo({ top: scrollY, behavior: 'smooth' });
};

onMounted(() => {
  state.lyrics = parseLyrics(props.lyricsData);
});

watch(
  () => props.currentTime,
  (newVal) => {
    const { lyrics } = state;
    if (lyrics.length === 0) return;
    let index = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time > newVal) {
        break;
      }
      index = i;
    }
    if (index !== state.currentIndex) {
      state.currentIndex = index;
      scrollToCurrentLyric();
    }
  }
);

onUnmounted(() => {
  state.lyrics = [];
});
</script>

<style lang="scss">
.lyrics {
  overflow-y: scroll;
  // height: 200px;
  padding: 50vh 0 ;
  scroll-behavior: smooth;
  &::-webkit-scrollbar{
    display: none;
  }
  .text {
    font-size: 1.875rem;
    line-height: 2.25rem;
    color: #fff;
    opacity: 0.6;
    padding: 1.25rem;
    transition: all .5s;
    &.active {
      opacity: 1;
      font-weight: bold;
      font-size: 2.3rem;
    }
    &:hover {
      background-color: var(--hoverBgc);
      border-radius: 8px;
    }
  }
}
</style>
