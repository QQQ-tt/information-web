import requestList from "@/utils/requestList";

export function getOnlineUserList() {
    return requestList.get('/chat/getOnlineUser')
}