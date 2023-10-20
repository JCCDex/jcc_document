#!/bin/bash

cd `dirname $0`

npm run docs:build

# 拷贝到服务器
rsync -avz -e 'ssh -p 6422' ./.vitepress/dist/ front@58.243.201.56:~/frontcode/jcc_officialWeb/documents/dist

# 服务器地址 https://jccdex.cn/