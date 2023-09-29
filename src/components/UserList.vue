<template>
  <div>
    <button
      v-show="false"
      id="update_modal_btn"
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#updateModal"
    >
      수정
    </button>
    <b-container>
      <b-row style="margin-top: 30px; margin-bottom: 30px">
        <b-col></b-col>
        <b-col></b-col>
        <b-col cols="4">
          <input type="file" id="excelFile" @change="excelUpload" />
        </b-col>
      </b-row>
      <b-row style="margin-top: 30px; margin-bottom: 30px">
        <b-col></b-col>
        <b-col cols="2">
          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              관리 고객 추가
            </button>
          </div>
        </b-col>
        <b-col cols="2">
          <b-button @click="downloadExcel" block variant="success"
            >엑셀 다운로드</b-button
          >
        </b-col>
      </b-row>
      <b-row align-v="end" style="margin-top: 30px; margin-bottom: 30px">
        <b-col></b-col>
        <b-col></b-col>
        <b-col cols="4">
          <b-input-group>
            <b-form-input
              placeholder="검색어를 입력하세요"
              v-model="searchText"
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row align-v="center">
        <b-col align-self="center">
          <b-table striped hover :items="filterUsers" :fields="fields">
            <template #cell(이름)="data">
              <!-- `data.value` is the value after formatted by the Formatter -->
              <a href="#" @click.prevent.stop="onClickUpdateUser(data)">{{
                data.value
              }}</a>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { saveExcel, uploadExcel } from "@/utils/excel";
import { useStore } from "vuex";
import { getUser, getUserList } from "@/utils/localStorage";

const store = useStore();
const fields = ["이름", "전화번호", "주소", "주민번호"];
const items = computed(() => store.state.userList);

//localStorage 저장된 유저 정보 가져오기
const fetchUserList = () => {
  store.commit("SET_USER_LIST", getUserList());
};
fetchUserList();

//엑셀 업로드
const excelUpload = (e) => {
  uploadExcel(e);
};

//검색어
const searchText = ref("");
//검색어 필터
const filterUsers = computed(() => {
  if (!items.value) {
    return {};
  }
  return items.value.filter((i) => {
    const objectKeys = Object.keys(i);
    return objectKeys.some((ok) => i[ok].includes(searchText.value));
  });
});

//유저 엑셀 다운로드
const downloadExcel = () => {
  saveExcel(items.value);
};

const onClickUpdateUser = (data) => {
  console.log("data", data);
  const user = getUser(data.item.uuid);
  store.commit("SET_UPDATE_USER", { uuid: data.item.uuid, user });

  let elementById = document.getElementById("update_modal_btn");
  elementById.click();
};
</script>
