<script setup>
import {ref, onMounted, reactive} from 'vue'
import {useUserStore, useUserTokenStore} from '@/stores/index'
import {getOnlineUserList} from '@/api/chat'

let userInfo = ''
const initUserInfo = () => {
  const user = useUserStore()
  user.getUser()
  userInfo = user.user.userId
}

let onlineUser = ref([])

async function onlineUserList() {
  onlineUser.value = (await getOnlineUserList()).data.data
}

onlineUserList()
const toUser = ref('');
const textarea = ref('')
let messageList = ref([])
let websocket = null;

function WebSocketInit() {
  if ('WebSocket' in window) {
    /*    const userStore = useUserTokenStore();
        const user = userStore.info.userId
        const token = userStore.info.token*/
    websocket = new WebSocket("ws://" + __BACKEND_URL__ + "/websocket/chat/" + userInfo);
  } else {
    console.error("当前浏览器不支持WebSocket！");
  }

  websocket.onerror = (event) => {
    console.error("WebSocket连接发生错误", event);
  };

  websocket.onclose = () => {
    console.error("WebSocket连接关闭");
  };

  websocket.onopen = () => {
    console.log("WebSocket连接成功");
  };

  websocket.onmessage = (event) => {
    console.log(event.data);
    let msg;
    switch (event.data) {
      case 'updateOnlineUser':
        onlineUserList()
        break
      default:
        msg = JSON.parse(event.data)
        messageList.value.push(msg)
        break
    }
    //ReferenceError: h is not defined at WebSocketInit.websocket.onmessage
    ElNotification({
      title: 'Msg',
      message: '来自：' + msg.fromUser + '的消息.'
    })
  };
}

onMounted(() => {
  // 初始化用户信息
  initUserInfo()
  WebSocketInit();
});
let message = reactive({
  content: '',
  toUser: '',
  fromUser: ''
})

const setToUser = (e) => {
  toUser.value = e
}

const sendMessage = () => {
  if (websocket.readyState === WebSocket.OPEN) {
    message.content = textarea.value
    message.toUser = toUser.value
    message.fromUser = userInfo
    messageList.value.push(message)
    websocket.send(JSON.stringify(message));
    message = reactive({
      content: '',
      toUser: ''
    });
    textarea.value = ''
  } else {
    console.error("WebSocket连接未建立，无法发送消息");
  }
};
</script>

<template>
  <el-row :gutter="15" style="height: 98%">
    <el-col :span="3">
      <el-card style="max-width: 200px;height: 50%">
        <template #header>
          <div class="card-header">
            <span>User List</span>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="list-item">
          <el-avatar :size="'default'"></el-avatar>
          <span style="margin-left: 10px">{{ 'List item ' + o }}</span>
        </div>
      </el-card>
      <el-card style="max-width: 200px;height: 50%">
        <template #header>
          <div class="card-header">
            <span>Online User</span>
          </div>
        </template>
        <div v-for="o in onlineUser" :key="o" class="list-item">
          <el-avatar :size="'default'"></el-avatar>
          <span style="margin-left: 10px" @click="setToUser(o)">{{ o }}</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="21">
      <el-card style="width: auto;height: 100%" body-style="padding: 8px;height: 80%">
        <template #header>
          <div class="card-header">
            <span>User List</span>
          </div>
        </template>
        <el-card style="width: auto;height: 95%;margin-bottom: 8px">
          <div v-for="item in messageList" :key="item">
            <span v-show="item.fromUser === userInfo || item.toUser === userInfo">
              {{ item.fromUser }}:{{ item.content }}
            </span>
          </div>
        </el-card>
        <el-input
            v-model="textarea"
            style="width: 240px"
            :rows="2"
            type="text"
            placeholder="Please input"
        />
        <el-button @click="sendMessage()">
          发送
        </el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.list-item {
  display: flex;
  align-items: center; /* 这将使子元素垂直居中 */
  margin-bottom: 10px;
}
</style>