@echo off
REM 检查dist文件夹是否存在并删除
if exist "dist" (
  rmdir /S /Q "dist"
  echo 删除dist文件夹成功
) else (
  echo dist文件夹不存在，无需删除
)

REM 运行npm命令
call npm run build

echo npm run build命令执行完毕

REM 使用ssh远程执行命令，删除远程目录
ssh root@120.55.165.76 "rm -rf /root/install/nginx/data/dist && mkdir /root/install/nginx/data/dist"

REM 请确保你已经配置了ssh密钥对以避免输入密码
REM 将以下命令中的IP、用户名、远程目录替换为实际信息
scp -r ./dist/* root@120.55.165.76:/root/install/nginx/data/dist

echo success