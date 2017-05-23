<template>
<aside class="right">
  <user-box :e="topic_curr.authorInfo" :topicId="topic_curr._id"></user-box>

  <div class="block block-promo flex middle_center">
    Advertisement 1
  </div>
  <div class="block toc"></div>
  <!--
  <div class="block recommeded-topics">
    <header>Recommended Topics</header>
    <div>
      <topic-item v-for="e in topic_recommended_list" :e="e" :key="e._id"></topic-item>
    </div>
  </div>
  -->
  <div class="block related-topics">
    <header>Related Topics</header>
    <div>
      <topic-item v-for="e in topic_related_list" :e="e" :key="e._id"></topic-item>
    </div>
  </div>
  <div class="block block-promo flex middle_center">
    Advertisement 2
  </div>
</aside>
</template>
<script>
export default {
  
}
</script>