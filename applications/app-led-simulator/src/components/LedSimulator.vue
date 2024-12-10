<!-- <script setup lang="ts"> -->
<!-- /** -->
<!-- * @desc StarAround -->
<!-- * @author MiyueFE <https://github.com/miyuesc> -->
<!-- * @since 2024/9/4 14:52 -->
<!-- */ -->

<!-- defineOptions({ name: 'LedSimulator' }) -->

<!-- const SCROLLER_LENGTH = 60 -->
<!-- const HEIGHT = 7 -->
<!-- const theInput = $('#theInput') -->
<!-- const fps = 30 -->

<!-- let myMessage = textToLED('Hello everyone ') -->
<!-- let leftPointer = SCROLLER_LENGTH + 1 -->
<!-- const rightPointer = 0 -->
<!-- let furthestLeftPoint = 0 - myMessage.length -->

<!-- theInput.change(function () { -->
<!--  clearLights() -->
<!--  myMessage = textToLED(this.value) -->
<!--  furthestLeftPoint = 0 - myMessage.length -->
<!--  leftPointer = SCROLLER_LENGTH + 1 -->
<!-- }) -->

<!-- function clearLights() { -->
<!--  const lightsOn = $('.on') -->
<!--  lightsOn.removeClass('on') -->
<!--  lightsOn.addClass('off') -->
<!-- } -->
<!-- function setLight(row, col, state) { -->
<!--  const theLight = $(`.${row}_${col}`) -->

<!--  if (theLight.hasClass('on') && !state) { -->
<!--    theLight.removeClass('on') -->
<!--    theLight.addClass('off') -->
<!--  } -->
<!--  else if (theLight.hasClass('off') && state) { -->
<!--    theLight.removeClass('off') -->
<!--    theLight.addClass('on') -->
<!--  } -->
<!-- } -->

<!-- function drawMessage(messageArray: string[], leftPointer: number) { -->
<!--  const messageLength = messageArray.length -->

<!--  if (messageLength > 0) { -->
<!--    for (let col = 0; col < messageLength; col++) { -->
<!--      for (let row = 0; row < HEIGHT; row++) { -->
<!--        const offsetCol = leftPointer + col -->

<!--        if (offsetCol < SCROLLER_LENGTH || offsetCol >= 0) { -->
<!--          setLight(row, offsetCol, messageArray[col][row]) -->
<!--        } -->
<!--      } -->
<!--    } -->
<!--  } -->
<!-- } -->

<!-- function textToLED(theWord: string) { -->
<!--  const theMessage: Array<boolean[]>[] = [] -->
<!--  theWord = theWord.toUpperCase() -->
<!--  for (let i = 0; i < theWord.length; i++) { -->
<!--    theMessage.push(charToLED(theWord.charAt(i))) -->
<!--    theMessage.push(charToLED()) -->
<!--  } -->

<!--  let flatten: Array<boolean[]>[] = [] -->
<!--  // eslint-disable-next-line prefer-spread -->
<!--  flatten = flatten.concat.apply(flatten, theMessage) -->

<!--  return flatten -->
<!-- } -->

<!-- function charToLED(theChar?: string): Array<boolean[]> { -->
<!--  let theLed = [] -->
<!--  switch (theChar) { -->
<!--    case 'A' : -->
<!--      theLed = [[false, false, true, true, true, true, true], [false, true, false, false, true, false, false], [true, false, false, false, true, false, false], [false, true, false, false, true, false, false], [false, false, true, true, true, true, true]] -->
<!--      break -->
<!--    case 'B' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [true, false, false, true, false, false, true], [true, false, false, true, false, false, true], [true, false, false, true, false, false, true], [false, true, true, false, true, true, false]] -->
<!--      break -->
<!--    case 'C' : -->
<!--      theLed = [[false, true, true, true, true, true, false], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [false, true, false, false, false, true, false]] -->
<!--      break -->
<!--    case 'D' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [false, true, true, true, true, true, false]] -->
<!--      break -->
<!--    case 'E' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [true, false, false, true, false, false, true], [true, false, false, true, false, false, true], [true, false, false, true, false, false, true], [true, false, false, false, false, false, true]] -->
<!--      break -->
<!--    case 'F' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [true, false, false, true, false, false, false], [true, false, false, true, false, false, false], [true, false, false, true, false, false, false], [true, false, false, false, false, false, false]] -->
<!--      break -->
<!--    case 'G' : -->
<!--      theLed = [[false, true, true, true, true, true, false], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [true, false, false, false, true, false, true], [true, true, false, false, true, true, true]] -->
<!--      break -->
<!--    case 'H' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [false, false, false, true, false, false, false], [false, false, false, true, false, false, false], [false, false, false, true, false, false, false], [true, true, true, true, true, true, true]] -->
<!--      break -->
<!--    case 'I' : -->
<!--      theLed = [[false, false, false, false, false, false, false], [true, false, false, false, false, false, true], [true, true, true, true, true, true, true], [true, false, false, false, false, false, true], [false, false, false, false, false, false, false]] -->
<!--      break -->
<!--    case 'J' : -->
<!--      theLed = [[false, false, false, false, false, true, false], [false, false, false, false, false, false, true], [true, false, false, false, false, false, true], [true, true, true, true, true, true, false], [true, false, false, false, false, false, false]] -->
<!--      break -->
<!--    case 'K' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [false, false, false, true, false, false, false], [false, false, true, false, true, false, false], [false, true, false, false, false, true, false], [true, false, false, false, false, false, true]] -->
<!--      break -->
<!--    case 'L' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [false, false, false, false, false, false, true], [false, false, false, false, false, false, true], [false, false, false, false, false, false, true], [false, false, false, false, false, false, true]] -->
<!--      break -->
<!--    case 'M' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [false, true, false, false, false, false, false], [false, false, true, false, false, false, false], [false, true, false, false, false, false, false], [true, true, true, true, true, true, true]] -->
<!--      break -->
<!--    case 'N' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [false, false, true, false, false, false, false], [false, false, false, true, false, false, false], [false, false, false, false, true, false, false], [true, true, true, true, true, true, true]] -->
<!--      break -->
<!--    case 'O' : -->
<!--      theLed = [[false, true, true, true, true, true, false], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [true, false, false, false, false, false, true], [false, true, true, true, true, true, false]] -->
<!--      break -->
<!--    case 'P' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [true, false, false, true, false, false, false], [true, false, false, true, false, false, false], [true, false, false, true, false, false, false], [false, true, true, false, false, false, false]] -->
<!--      break -->
<!--    case 'Q' : -->
<!--      theLed = [[false, true, true, true, true, true, false], [true, false, false, false, false, false, true], [true, false, false, false, true, false, true], [true, false, false, false, false, true, false], [false, true, true, true, true, false, true]] -->
<!--      break -->
<!--    case 'R' : -->
<!--      theLed = [[true, true, true, true, true, true, true], [true, false, false, true, false, false, false], [true, false, false, true, false, false, false], [true, false, false, true, false, false, false], [false, true, true, false, true, true, true]] -->
<!--      break -->
<!--    case 'S' : -->
<!--      theLed = [[false, true, true, false, false, false, true], [true, false, false, true, false, false, true], [true, false, false, true, false, false, true], [true, false, false, true, false, false, true], [true, false, false, false, true, true, false]] -->
<!--      break -->
<!--    case 'T' : -->
<!--      theLed = [[true, false, false, false, false, false, false], [true, false, false, false, false, false, false], [true, true, true, true, true, true, true], [true, false, false, false, false, false, false], [true, false, false, false, false, false, false]] -->
<!--      break -->
<!--    case 'U' : -->
<!--      theLed = [[true, true, true, true, true, true, false], [false, false, false, false, false, false, true], [false, false, false, false, false, false, true], [false, false, false, false, false, false, true], [true, true, true, true, true, true, false]] -->
<!--      break -->
<!--    case 'V' : -->
<!--      theLed = [[true, true, true, true, true, false, false], [false, false, false, false, false, true, false], [false, false, false, false, false, false, true], [false, false, false, false, false, true, false], [true, true, true, true, true, false, false]] -->
<!--      break -->
<!--    case 'W' : -->
<!--      theLed = [[true, true, true, true, true, true, false], [false, false, false, false, false, false, true], [false, false, false, false, true, true, false], [false, false, false, false, false, false, true], [true, true, true, true, true, true, false]] -->
<!--      break -->
<!--    case 'X' : -->
<!--      theLed = [[true, false, false, false, false, false, true], [false, true, true, false, true, true, false], [false, false, false, true, false, false, false], [false, true, true, false, true, true, false], [true, false, false, false, false, false, true]] -->
<!--      break -->
<!--    case 'Y' : -->
<!--      theLed = [[true, false, false, false, false, false, false], [false, true, false, false, false, false, false], [false, false, true, true, true, true, true], [false, true, false, false, false, false, false], [true, false, false, false, false, false, false]] -->
<!--      break -->
<!--    case 'Z' : -->
<!--      theLed = [[true, false, false, false, false, true, true], [true, false, false, false, true, false, true], [true, false, false, true, false, false, true], [true, false, true, false, false, false, true], [true, true, false, false, false, false, true]] -->
<!--      break -->
<!--    default: -->
<!--      theLed = [[false, false, false, false, false, false, false]] -->
<!--  } -->
<!--  return theLed -->
<!-- } -->

<!-- function draw() { -->
<!--  setTimeout(() => { -->
<!--    requestAnimationFrame(draw) -->

<!--    if (leftPointer === furthestLeftPoint) { -->
<!--      leftPointer = SCROLLER_LENGTH + 1 -->
<!--    } -->

<!--    drawMessage(myMessage, leftPointer) -->
<!--    leftPointer&#45;&#45; -->
<!--  }, 1000 / fps) -->
<!-- } -->

<!-- draw() -->
<!-- </script> -->

<template>
  <div id="wrapper">
    <div id="theMarquee">
      <div v-for="(_, idx) in 60" :key="`0_${idx}`" :class="`0_${idx}`" class="light off" />
      <div v-for="(_, idx) in 60" :key="`1_${idx}`" :class="`1_${idx}`" class="light off" />
      <div v-for="(_, idx) in 60" :key="`2_${idx}`" :class="`2_${idx}`" class="light off" />
      <div v-for="(_, idx) in 60" :key="`3_${idx}`" :class="`3_${idx}`" class="light off" />
      <div v-for="(_, idx) in 60" :key="`4_${idx}`" :class="`4_${idx}`" class="light off" />
      <div v-for="(_, idx) in 60" :key="`5_${idx}`" :class="`5_${idx}`" class="light off" />
      <div v-for="(_, idx) in 60" :key="`6_${idx}`" :class="`6_${idx}`" class="light off" />
    </div>
    <input id="theInput" name="input" type="text" value="Hello everyone">
  </div>
</template>

<style scoped lang="scss">
#wrapper{
  width: 420px;
  margin: 50px auto;
}

#theMarquee{
  height: 55px;
  border-radius: 5px;
}

#theInput{
  clear: both;
  margin: 25px 100px;
  width: 200px;
  text-align: center;
}
.light {
  width: 5px;
  height: 5px;
  margin: 1px 1px;
  text-align: center;
  font-size: 15px;
  float: left;
  border-radius: 50%;
}

.off{
  background-color: #121212;
}

.on{
  background-color: #0ff;
  box-shadow: 0px 0px 5px #0ff;
}
</style>
