<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="updateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">관리 유저 수정</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="closeModal"
            id="update_cancel"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">이름</label>
              <input
                v-if="isUpdate"
                v-model="updateUserInput.userName"
                type="text"
                class="form-control"
                id="user_name_update"
              />
              <input
                v-else
                v-model="userName"
                type="text"
                class="form-control"
                id="user_name"
                disabled
              />
            </div>
            <div
              v-show="isValid.userName"
              class="alert alert-danger"
              role="alert"
            >
              이름을 입력하세요
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">전화번호</label>
              <input
                v-if="isUpdate"
                v-model="updateUserInput.phoneNum"
                type="text"
                class="form-control"
                id="phone_num_update"
              />
              <input
                v-else
                v-model="phoneNum"
                type="text"
                class="form-control"
                id="phone_num"
                disabled
              />
            </div>
            <div
              v-show="isValid.phoneNum"
              class="alert alert-danger"
              role="alert"
            >
              전화번호를 입력하세요
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">주소</label>
              <input
                v-if="isUpdate"
                v-model="updateUserInput.address"
                type="text"
                class="form-control"
                id="address_update"
              />
              <input
                v-else
                v-model="address"
                type="text"
                class="form-control"
                id="address"
                disabled
              />
            </div>
            <div
              v-show="isValid.address"
              class="alert alert-danger"
              role="alert"
            >
              주소를 입력하세요
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">주민번호</label>
              <input
                v-if="isUpdate"
                v-model="updateUserInput.identityNum"
                type="text"
                class="form-control"
                id="identity_num_update"
              />
              <input
                v-else
                v-model="identityNum"
                type="text"
                class="form-control"
                id="identity_num"
                disabled
              />
            </div>
            <div
              v-show="isValid.identityNum"
              class="alert alert-danger"
              role="alert"
            >
              주민 번호를 입력하세요
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">비고</label>
              <textarea
                v-if="isUpdate"
                v-model="updateUserInput.note"
                class="form-control"
                id="note_update"
              />
              <textarea
                v-else
                v-model="note"
                class="form-control"
                id="note"
                disabled
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <template v-if="isUpdate">
            <button
              @click="onClickUserUpdate"
              type="button"
              class="btn btn-primary"
            >
              수정
            </button>
            <button
              @click="clickUpdateCancel"
              type="button"
              class="btn btn-secondary"
            >
              취소
            </button>
          </template>
          <template v-else>
            <button
              @click="onClickIsUpdate"
              type="button"
              class="btn btn-primary"
            >
              수정하기
            </button>
            <button
              @click="onClickDelete"
              type="button"
              class="btn btn-danger"
            >
              삭제하기
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { deleteUser, updateUser } from "@/utils/localStorage";

const store = useStore();

const userName = computed(() => {
  return store.state.updateUser["이름"];
});
const phoneNum = computed(() => store.state.updateUser["전화번호"]);
const address = computed(() => store.state.updateUser["주소"]);
const identityNum = computed(() => store.state.updateUser["주민번호"]);
const note = computed(() => store.state.updateUser["비고"]);

const isValid = reactive({
  userName: false,
  phoneNum: false,
  address: false,
  identityNum: false,
});

const initValid = () => {
  isValid.userName = false;
  isValid.phoneNum = false;
  isValid.address = false;
  isValid.identityNum = false;
};

const isValidInfo = () => {
  let valid = true;

  if (!updateUserInput.userName) {
    isValid.userName = true;
    valid = false;
  }
  if (!updateUserInput.phoneNum) {
    isValid.phoneNum = true;
    valid = false;
  }
  if (!updateUserInput.address) {
    isValid.address = true;
    valid = false;
  }
  if (!updateUserInput.identityNum) {
    isValid.identityNum = true;
    valid = false;
  }
  return valid;
};

const clickUpdateCancel = () => {
  isUpdate.value = false;
  initValid();
};

const closeModal = () => {
  clickUpdateCancel();
  let elementById = document.getElementById("update_cancel");
  elementById.click();
};

const updateUserInput = reactive({
  userName: "",
  phoneNum: "",
  address: "",
  identityNum: "",
  note: "",
});

const onClickUserUpdate = () => {
  if (!isValidInfo()) return;
  updateUser(
    store.state.selectUserUuid,
    updateUserInput.userName,
    updateUserInput.phoneNum,
    updateUserInput.address,
    updateUserInput.identityNum,
    updateUserInput.note
  );
  clickUpdateCancel();
};

const isUpdate = ref(false);
const onClickIsUpdate = () => {
  isUpdate.value = !isUpdate.value;
  updateUserInput.userName = userName.value;
  updateUserInput.phoneNum = phoneNum.value;
  updateUserInput.address = address.value;
  updateUserInput.identityNum = identityNum.value;
  updateUserInput.note = note.value;
};

const onClickDelete = () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    deleteUser(store.state.selectUserUuid);
    closeModal();
  }
};
</script>
