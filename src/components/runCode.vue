<template>
  <div style="position:relative;">
    <a href="javascript:void(0)" class="code_copy" @click="copyCode(props.tid)"></a>
    <a href="javascript:void(0)" class="code_edit" @click="showEdit(props.tid)"></a>
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