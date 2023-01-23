export default {
  SET_USER_LIST: (state, userList) => {
    state.userList = userList;
  },
  FIND_USER: (state) => {
    return state.userList[state.selectUserIdx];
  },
  SET_UPDATE_USER: (state, data) => {
    state.updateUser = data.user;
    state.selectUserIdx = data.index;
  },
  SET_ADD_MODAL: (state, is) => {
    state.isAddModal = is;
  },
  SET_UPDATE_MODAL: (state, is) => {
    state.isUpdateModal = is;
  },
};
