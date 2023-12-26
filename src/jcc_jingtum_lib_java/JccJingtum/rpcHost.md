---
# editLink: true
checkCode: '点我查看代码'
outline: deep
---
# 节点相关

## 获取指定节点状态-getServerState

```Java
public ServerInfo getServerState(java.lang.String rpcHost)
```

**参数:**
- rpcHost - rpc节点服务器

**返回:**
- 节点列表和状态

## 获取节点状态-getServerState

```Java
public java.util.ArrayList<ServerInfo> getServerState()
```

**返回:**
- 节点列表和状态

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

ArrayList<com.jccdex.rpc.res.ServerInfo> serverList = jccJingtum.getServerState();
System.out.println(serverList);
for(int i=0; i<serverList.size();i++) {
    ServerInfo serverInfo = serverList.get(i);
    System.out.println(serverInfo.host);
    System.out.println(serverInfo.height);
    System.out.println(serverInfo.lastLedgerHash);
    System.out.println(serverInfo.lastLedgerTime);
    System.out.println("----------------------------");
}
```
:::

## 获取rpc节点列表-getRpcNodes

```Java
public java.util.ArrayList<java.lang.String> getRpcNodes()
```

**返回:**
- rpc节点列表