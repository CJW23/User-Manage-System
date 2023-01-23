import store from "@/store";

//엑셀 데이터 업로드
export const saveUserList = (list) => {
  localStorage.setItem("userList", JSON.stringify(list));
  store.commit("SET_USER_LIST", list);
};

//유저 저장후 localStorage 저장
export const saveUser = (userName, phoneNum, address, identityNum, note) => {
  const user = {
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
  }
  userList.push(user);
  localStorage.setItem("userList", JSON.stringify(userList));
  store.commit("SET_USER_LIST", userList);
};

export const updateUser = (
  idx,
  userName,
  phoneNum,
  address,
  identityNum,
  note
) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  const updateUser = userList[idx];

  updateUser["이름"] = userName;
  updateUser["전화번호"] = phoneNum;
  updateUser["주소"] = address;
  updateUser["주민번호"] = identityNum;
  updateUser["비고"] = note;

  localStorage.setItem("userList", JSON.stringify(userList));
  store.commit("SET_USER_LIST", userList);
  store.commit("SET_UPDATE_USER", { index: idx, user: userList[idx] });
};

export const deleteUser = (index) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  userList.splice(index, 1);

  localStorage.setItem("userList", JSON.stringify(userList));
  store.commit("SET_USER_LIST", userList);
};

//유저 반환
export const getUserList = () => {
  return JSON.parse(localStorage.getItem("userList"));
};

export const getUser = (index) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  return userList[index];
};
