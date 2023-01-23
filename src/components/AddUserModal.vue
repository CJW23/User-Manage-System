<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            관리 유저 추가
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="initValid"
            id="cancel"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">이름</label>
              <input
                v-model="userName"
                type="text"
                class="form-control"
                id="user_name"
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
                v-model="phoneNum"
                type="text"
                class="form-control"
                id="phone_num"
              />
            </div>
            <div
              v-show="isValid.phoneNum"
              class="alert alert-danger"
              role="alert"
            >
              핸드폰 번호를 입력하세요
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">주소</label>
              <input
                v-model="address"
                type="text"
                class="form-control"
                id="address"
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
                v-model="identityNum"
                type="text"
                class="form-control"
                id="identity_num"
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
              <textarea v-model="note" class="form-control" id="note" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="onClickUserSave"
            type="button"
            class="btn btn-primary"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { saveUser } from "@/utils/localStorage";

const store = useStore();
const userName = ref("");
const phoneNum = ref("");
const address = ref("");
const identityNum = ref("");
const note = ref("");

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

  if (!userName.value) {
    isValid.userName = true;
    valid = false;
  }
  if (!phoneNum.value) {
    isValid.phoneNum = true;
    valid = false;
  }
  if (!address.value) {
    isValid.address = true;
    valid = false;
  }
  if (!identityNum.value) {
    isValid.identityNum = true;
    valid = false;
  }
  return valid;
};

const clickCancel = () => {
  let elementById = document.getElementById("cancel");
  elementById.click();
};

const onClickUserSave = () => {
  if (!isValidInfo()) return;
  //localStorage에 저장하고
  //vuex에 갱신
  saveUser(
    userName.value,
    phoneNum.value,
    address.value,
    identityNum.value,
    note.value
  );
  clickCancel();
};
</script>
