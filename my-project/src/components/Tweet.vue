<template>
  <div class="tweet">
    <div class="tweet-author">{{ tweet.author }}</div>
    <div class="tweet-content">{{ tweet.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.tweet {
  border: 1px solid #e8e8e8;
  padding: 10px;
  background-color: #fff;
}

.tweet-author {
  font-weight: bold;
  margin-bottom: 5px;
}

.tweet-content {
  margin-bottom: 10px;
}
</style>
