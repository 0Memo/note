<template>
    <div class="container">
        <h2 class="halloween">
            <span style="--i:1;">H</span>
            <span style="--i:2;">a</span>
            <span style="--i:3;">l</span>
            <span style="--i:4;">l</span>
            <span style="--i:5;">o</span>
            <span style="--i:6;">w</span>
            <span style="--i:7;">e</span>
            <span style="--i:8;">e</span>
            <span style="--i:9;">n</span>
        </h2>
        <img src="https://assets.codepen.io/7773162/spider.png" class="spider">
        <img src="https://assets.codepen.io/7773162/spiderWeb.png" class="spiderWeb">
    </div>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
</script>