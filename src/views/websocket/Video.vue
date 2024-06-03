<template>
  <div id="main">
    <video ref="localVideo" playsinline autoplay muted></video>
    <video ref="remoteVideo" playsinline autoplay></video>
    <div id="buttons">
      <input v-model="toUser" placeholder="输入在线好友账号"/>
      <br/>
      <button @click="startCall">视频通话</button>
      <button @click="hangup">挂断</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useUserStore, useUserTokenStore} from '@/stores/index'

let userInfo = ''
const initUserInfo = () => {
  const user = useUserStore()
  user.getUser()
  userInfo = user.user.userId
}

// 在实际应用中，从服务器获取用户名
const localVideo = ref(null);
const remoteVideo = ref(null);
const toUser = ref('');
let websocket = null;
let peer = null;

function WebSocketInit() {
  if ('WebSocket' in window) {
    const userStore = useUserTokenStore();
    const user = userStore.info.userId
    const token = userStore.info.token
    websocket = new WebSocket("ws://" + __BACKEND_URL__ + "/webrtc/" + userInfo, [user, token]);
  } else {
    alert("当前浏览器不支持WebSocket！");
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

  websocket.onmessage = async (event) => {
    const {type, fromUser, msg, sdp, iceCandidate} = JSON.parse(event.data.replace(/\n/g, "\\n").replace(/\r/g, "\\r"));

    if (type === 'hangup') {
      console.log(msg);
      hangup();
      return;
    }

    if (type === 'call_start') {
      let msg = "0";
      if (confirm(`${fromUser}发起视频通话，确定接听吗`) === true) {
        toUser.value = fromUser;
        WebRTCInit();
        msg = "1";
      }

      websocket.send(JSON.stringify({
        type: "call_back",
        toUser: fromUser,
        fromUser: userInfo,
        msg: msg
      }));

      return;
    }

    if (type === 'call_back') {
      if (msg === "1") {
        console.log(toUser.value + "同意视频通话");

        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        localVideo.value.srcObject = stream;
        stream.getTracks().forEach(track => {
          peer.addTrack(track, stream);
        });

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        const newOffer = {...offer.toJSON(), fromUser: userInfo, toUser: toUser.value};
        websocket.send(JSON.stringify(newOffer));
      } else if (msg === "0") {
        alert(toUser.value + "拒绝视频通话");
        hangup();
      } else {
        alert(msg);
        hangup();
      }

      return;
    }

    if (type === 'offer') {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
      localVideo.value.srcObject = stream;
      stream.getTracks().forEach(track => {
        peer.addTrack(track, stream);
      });

      await peer.setRemoteDescription(new RTCSessionDescription({type, sdp}));
      const answer = await peer.createAnswer();
      const newAnswer = {...answer.toJSON(), fromUser: userInfo, toUser: toUser.value};
      websocket.send(JSON.stringify(newAnswer));
      await peer.setLocalDescription(answer);
      return;
    }

    if (type === 'answer') {
      await peer.setRemoteDescription(new RTCSessionDescription({type, sdp}));
      return;
    }

    if (type === '_ice') {
      await peer.addIceCandidate(iceCandidate);
    }
  };
}

function WebRTCInit() {
  peer = new RTCPeerConnection();

  peer.onicecandidate = (e) => {
    if (e.candidate) {
      websocket.send(JSON.stringify({
        type: '_ice',
        toUser: toUser.value,
        fromUser: userInfo,
        iceCandidate: e.candidate
      }));
    }
  };

  peer.ontrack = (e) => {
    if (e && e.streams) {
      remoteVideo.value.srcObject = e.streams[0];
    }
  };
}

async function startCall() {
  if (!toUser.value) {
    alert("请先指定好友账号，再发起视频通话！");
    return;
  }

  if (peer == null) {
    WebRTCInit();
  }

  websocket.send(JSON.stringify({
    type: "call_start",
    fromUser: userInfo,
    toUser: toUser.value
  }));
}

function hangup() {
  if (localVideo.value.srcObject) {
    const videoTracks = localVideo.value.srcObject.getVideoTracks();
    videoTracks.forEach(videoTrack => {
      videoTrack.stop();
      localVideo.value.srcObject.removeTrack(videoTrack);
    });
  }

  if (remoteVideo.value.srcObject) {
    const videoTracks = remoteVideo.value.srcObject.getVideoTracks();
    videoTracks.forEach(videoTrack => {
      videoTrack.stop();
      remoteVideo.value.srcObject.removeTrack(videoTrack);
    });

    websocket.send(JSON.stringify({
      type: "hangup",
      fromUser: userInfo,
      toUser: toUser.value
    }));
  }

  if (peer) {
    peer.ontrack = null;
    peer.onremovetrack = null;
    peer.onremovestream = null;
    peer.onicecandidate = null;
    peer.oniceconnectionstatechange = null;
    peer.onsignalingstatechange = null;
    peer.onicegatheringstatechange = null;
    peer.onnegotiationneeded = null;

    peer.close();
    peer = null;
  }

  localVideo.value.srcObject = null;
  remoteVideo.value.srcObject = null;
  toUser.value = '';
}

onMounted(() => {
  // 初始化用户信息
  initUserInfo()
  WebSocketInit();
});
</script>

<style scoped>
#main {
  position: absolute;
  width: 370px;
  height: 550px;
}

#localVideo {
  position: absolute;
  background: #757474;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 150px;
  z-index: 2;
}

#remoteVideo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #222;
}

#buttons {
  z-index: 3;
  bottom: 20px;
  left: 90px;
  position: absolute;
}

#toUser {
  border: 1px solid #ccc;
  padding: 7px 0;
  border-radius: 5px;
  padding-left: 5px;
  margin-bottom: 5px;
}

#toUser:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}

button {
  width: 70px;
  height: 35px;
  border: none;
  color: white;
  border-radius: 5px;
  margin-right: 25px;
}

#call {
  background-color: #00bb00;
}

#hangup {
  background-color: #ff5151;
}
</style>
