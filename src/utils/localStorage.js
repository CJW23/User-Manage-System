import store from "@/store";
import {v4 as uuid} from "uuid"
//엑셀 데이터 업로드
export const saveUserList = (list) => {
  if (!!!list || list.length === 0) return;

  //각 정보 uuid 담기
  list.forEach(l => l.uuid = uuid())
  localStorage.setItem("userList", JSON.stringify(list));
  store.commit("SET_USER_LIST", list);
};

//유저 저장후 localStorage 저장
export const saveUser = (
  uuid,
  userName,
  phoneNum,
  address,
  identityNum,
  note
) => {
  const user = {
    uuid,
    이름: userName,
    전화번호: phoneNum,
    주소: address,
    주민번호: identityNum,
    비고: note,
  };

  const userList = JSON.parse(localStorage.getItem("userList"));
  if (!userList) {
    localStorage.setItem("userList", JSON.stringify([user]));
    store.commit("SET_USER_LIST", [user]);
    return;
  }
  userList.push(user);
  localStorage.setItem("userList", JSON.stringify(userList));
  store.commit("SET_USER_LIST", userList);
};

export const updateUser = (
  uuid,
  userName,
  phoneNum,
  address,
  identityNum,
  note
) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  const updateUser = getUser(uuid, userList);

  updateUser["이름"] = userName;
  updateUser["전화번호"] = phoneNum;
  updateUser["주소"] = address;
  updateUser["주민번호"] = identityNum;
  updateUser["비고"] = note;

  localStorage.setItem("userList", JSON.stringify(userList));
  store.commit("SET_USER_LIST", userList);
  store.commit("SET_UPDATE_USER", { uuid, user: updateUser });
};

export const deleteUser = (uuid) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  //삭제 유저 필터
  const filtered = userList.filter(u => u.uuid !== uuid)

  localStorage.setItem("userList", JSON.stringify(filtered));
  store.commit("SET_USER_LIST", filtered);
};

//유저 반환
export const getUserList = () => {
  return JSON.parse(localStorage.getItem("userList"));
};

export const getUser = (uuid, userList) => {
  if (!!!userList) {
    userList = JSON.parse(localStorage.getItem("userList"));
  }
  return userList.find((u) => u.uuid === uuid);
};
