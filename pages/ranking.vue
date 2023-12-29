<template>
    <div class="container">
      <div class="ranking">
       <div class="left">
          <div class="left-test1">Bảng Xếp Hạng Bóng Đá Mới Nhất, BXH Bóng Đá 24/7</div>
          <div class="left-test2">
            <a href="">Bảng xếp hạng bóng đá </a>
            là một cách tuyệt vời để theo dõi thành tích của các đội bóng. BXH cung cấp cái nhìn tổng quan về sự phát triển và vị trí của mỗi đội trong giải đấu. Người hâm mộ có thể dễ dàng nhận ra những câu lạc bộ đang thi đấu tốt hay những đội bóng đang trượt dốc. Thông qua thứ hạng của các đội cũng tạo cơ hội cạnh tranh, cố gắng vươn lên vị trí cao hơn trong cuộc đua tranh ngôi vô địch.
          </div>
          <div class="left-select">
            <div class="left-select-test">Tên giải đấu：</div>
            <div>
              <el-select v-model="competitionId" class="m-2" placeholder="Giải bóng đá Ngoại hạng Anh" size="small" @change="select_change()">
                <el-option
                  v-for="item in decCourseList"
                  :key="item.competitionId"
                  :label="item.name"
                  :value="item.competitionId"
                />
              </el-select>
            </div>
          </div>
          <div>
            <el-table :data="tableList" stripe style="width: 100%">
              <el-table-column prop="teamName" label="Đội" width="180" />
              <el-table-column prop="played" label="Số trận đấu" width="180" />
              <el-table-column prop="win" label="Thắng" />
              <el-table-column prop="draw" label="Hòa" />
              <el-table-column prop="lose" label="Thua" />Phong độ
              <el-table-column label="Phong độ">
                <template #default="scope">
                  <div style="display: flex;">
                    <span v-for="i in scope.row.recent" :key="i.index" :class="i=='W'?'cla1':i=='L'?'cla2':'cla3' " >{{ i }}</span>
                  </div>
                  <!-- {{ scope.row.recent }} -->
                </template>
              </el-table-column>
            </el-table>
          </div>
       </div>
       <div class="right">

      </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
const text = ref('我是动态内容')
// 获取联赛列表
let competitionId = ref('')
const decCourseList = ref([])
const total = ref<number>()
const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/leagueName', {
  method: "post",
  body: {
  "area": "",
  "language": "",
  "name": "",
  "pageNumber": 1,
  "pageSize": 100
}
})
decCourseList.value = DecryptData(courseList.value).r.data
competitionId.value=decCourseList.value[0].competitionId

const select_change = (value:any) => {
  console.log('===',competitionId.value)
  console.log("当前选择",competitionId.value)
  getCourseFutureList()
}

const tableList = ref([])
const { data: courseLisst } = await useServerRequest<{ data: any }>('/rpa/competition/pointsTable', {
  method: "post",
  body: {
   "competitionId": competitionId.value,
  "language": "",
  "pageNumber": 1,
  "pageSize": 110
}
})
tableList.value = DecryptData(courseLisst.value).r.data
// total.value = DecryptData(courseList.value).r.total

const getCourseFutureList = async () => {
  const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/pointsTable', {
    method: "post",
    body: {
      "competitionId": competitionId.value,
      "language": "",
      "pageNumber": 1,
      "pageSize": 110
    }
  })
  tableList.value = DecryptData(courseLisst.value).r.data
}
</script>
<style lang="scss" scoped>
.ranking{
  width: 100%;
  background: #1c1c1c;
  display: flex;
  .left{
    width: 70%;
    .left-test1{
      font-size: 38px;
      font-weight: 500;
      line-height: 1.2;
      color: azure;
      margin-bottom: 15px;
    }
    .left-test2{
      font-size: 18px;
      line-height: 1;
      color: azure;
      font-weight: 400;
      margin-bottom: 15px;
      a{
        color: green;
      }
    }
    .left-select{
      display: flex;
      margin-bottom: 15px;
      .left-select-test{
        color: #fff;
      }
    }
    .cla1{
      background-color: green;
      color: #fff;
      line-height: 20px;
    text-align: center;
    display: block;
    width: 20px;
    font-size: 12px;
    border-radius: 5px;
    height: 20px;
    margin: 0 auto;
    color: white;
    font-weight: bold;
    }
    .cla2{
      background-color: red; color: #fff;line-height: 20px;
    text-align: center;
    display: block;
    width: 20px;
    font-size: 12px;
    border-radius: 5px;
    height: 20px;
    margin: 0 auto;
    color: white;
    font-weight: bold;
    }
    .cla3{
      background-color: rgb(255, 174, 0); color: #fff;line-height: 20px;
    text-align: center;
    display: block;
    width: 20px;
    font-size: 12px;
    border-radius: 5px;
    height: 20px;
    margin: 0 auto;
    color: white;
    font-weight: bold;
    }
  }
  .right{
    width: 30%;
  }
}
</style>