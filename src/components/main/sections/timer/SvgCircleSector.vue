<template>
  <div>
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg">
    <circle class="bigCircle" r="100" cx="100" cy="100" fill="gray"></circle>
    <circle class="smallsunCircle" r="90" cx="100" cy="100" fill="lightgray"></circle>
    <path class="segment" :d="path"></path>
    <text v-if="text != ''" class="text" x="100" y="100"> {{ text }}
    </text>
    </svg>
  </div>
</template>
<script>
function calcEndPoint (angle) {
  let x, y
  x = 100 - 100 * Math.sin(Math.PI * angle / 180)
  y = 100 - 100 * Math.cos(Math.PI * angle / 180)
  return { x, y }
}
function calPath (angle) {
  let d
  let {x, y} = calcEndPoint(angle)
  if (angle <= 180) {
    d = `M100,100 L100, 0 A100,100 0 0,0 ${x}, ${y} z`
  } else {
    d = `M100,100 L100, 0 A100,100 0 0,0 100, 200 A100,100 0 0,0 ${x}, ${y} z`
  }
  return d
}
export default {
  props: ['angle', 'text'],
  computed: {
    path () {
      return calPath(this.angle)
    }
  }
}
</script>
<style lang="scss" scoped>
$big-circle-color:gray;
$small-circle-color: lightgray;
$segment-color: darkgray;
$text-color: green;
.bigCircle {
  fill: $big-circle-color;
}
.smallsunCircle {
  fill: $small-circle-color;
}
.segment {
  fill: $segment-color;
  opacity: 0.6;
}
.text {
  font-size: 1rem;
  stroke-width: 0;
  opacity: .9;
  fill: $text-color;
}
</style>
