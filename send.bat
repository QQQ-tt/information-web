@echo off
REM ���dist�ļ����Ƿ���ڲ�ɾ��
if exist "dist" (
  rmdir /S /Q "dist"
  echo ɾ��dist�ļ��гɹ�
) else (
  echo dist�ļ��в����ڣ�����ɾ��
)

REM ����npm����
call npm run build

echo npm run build����ִ�����

REM ʹ��sshԶ��ִ�����ɾ��Զ��Ŀ¼
ssh root@120.55.165.76 "rm -rf /root/install/nginx/data/dist && mkdir /root/install/nginx/data/dist"

REM ��ȷ�����Ѿ�������ssh��Կ���Ա�����������
REM �����������е�IP���û�����Զ��Ŀ¼�滻Ϊʵ����Ϣ
scp -r ./dist/* root@120.55.165.76:/root/install/nginx/data/dist

echo success