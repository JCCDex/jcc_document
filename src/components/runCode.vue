<template>
  <div style="position:relative;">
    <button class="code_copy" @click="copyCode(props.tid)">复制</button>
    <button class="code_edit" @click="showEdit(props.tid)">编辑</button>
    <button class="runBtn" @click="execute_javascript($event, props.tid)"> Run </button>
  </div>
</template>

<script setup>
import {execute_javascript, showEdit, copyCode} from '../js/runCode.js'
const props = defineProps({
  tid: String
})
</script>

<style>
</style>