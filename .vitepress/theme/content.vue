<template>
  <div class="content_box">
    <div class="content">
      <h2>SWTC链开发包的历史演变</h2>
      <p>SWTC链作为联盟链，无锡井通公司开发了商业开发包 <a href="./../jingtum_lib/">jingtum_lib</a>，为商业应用提供了高级调用方式和底层RPC操作的说明。</p>
      <p>来自加拿大的程序员 <a href="https://github.com/xcliu-ca" target="_blank" rel="noreferrer">xcliu-ca</a>为SWTC开源社区贡献了<a href="https://github.com/swtcca/swtclib" target="_blank" rel="noreferrer">swtclib</a>, 主要改进在于使用了更现代的TS语法范式，提升了代码的鲁棒性和互操作的扩展性，增加了国密加密算法支持以及同构联盟链的支持。</p>
      <p>井畅在自身的商业服务中，逐步提炼开发了jcc_wallet和jcc_jingtum_lib开发包，均是基于swtclib开发包二次开发，jingtum_lib更多被作为和节点交互RPC报文的分析依据使用。</p>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.content {
  max-width: 1152px;
  color: white;
}

.content_box {
  display: flex;
  justify-content: center;
  padding: 0px 64px 20px;
  margin-bottom: 50px;
  background: linear-gradient(90deg, rgba(127, 146, 243, 1) 0%, rgba(82, 128, 255, 1) 100%);
}

.dark .content_box {
  background: var(--vp-nav-bg-color);;
}

.content h2 {
  margin: 0px 0 16px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
  font-weight: 600;
}
.content a {
  color: rgb(254, 179, 126);
  font-weight: 500;
}
.content p {
  line-height: 28px;
  font-size: 16px;
  font-weight: 500;
}
.content p {
  margin: 30px 0;
}
h2, p {
  overflow-wrap: break-word;
}
</style>