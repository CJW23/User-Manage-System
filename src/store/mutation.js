export default {
  SET_USER_LIST: (state, userList) => {
    state.userList = userList;
  },
  SET_UPDATE_USER: (state, data) => {
    state.updateUser = data.user;
    state.selectUserUuid = data.uuid;
  },
  SET_ADD_MODAL: (state, is) => {
    state.isAddModal = is;
  },
  SET_UPDATE_MODAL: (state, is) => {
    state.isUpdateModal = is;
  },
};
