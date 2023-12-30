<template>
    <div class="container">
        <div class="acquisitionCompetition">
            <div class="left">
                <div>
                   <h1 class="entry-title owards">Chọn thời gian và tên giải đấu</h1> 
                </div>
                <div class="left-select">
                    <div class="left-select-test">Tên league：</div>
                    <div>
                        <el-select v-model="competitionId" class="m-2" placeholder="Giải bóng đá Ngoại hạng Anh" size="small" @change="select_change()">
                            <el-option
                            v-for="item in decCourseLists"
                            :key="item"
                            :label="item"
                            :value="item"
                            />
                        </el-select>
                    </div>
                    <span class="date-picker-span" style="color: #fff;">Theo ngày:</span><el-date-picker v-model="date" type="date" size="small" style="width: 300px;" placeholder="Pick a day" :editable="false" :disabled-date="disabledDate" @change="handleChange()"/>
               </div>
               <div class="left-center">
                <el-table :data="competition" stripe style="width: 100%">
                        <el-table-column prop="area" label="Khu vực" width="130" />
                        <!-- <el-table-column prop="image" label="Số trận đấu" width="180" />
                        <el-table-column label="Hình ảnh">
                            <template #default="scope">
                            <div style="display: flex;">
                                <span v-for="i in scope.row.recent" :key="i.index" :class="i=='W'?'cla1':i=='L'?'cla2':'cla3' " >{{ i }}</span>
                            </div>
                           
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="teamaShort" label="Đội A" />
                        <el-table-column prop="scoreTeama" label="Ghi điểm" />
                        <el-table-column prop="teambShort" label="Đội B" />
                        <el-table-column prop="scoreTeamb" label="Ghi điểm" />
                        <el-table-column prop="startdate" label="Thời gian bắt đầu" />
                        
                        <!-- <el-table-column prop="draw" label="Hòa" />
                        <el-table-column prop="lose" label="Thua" />Phong độ
                        <el-table-column label="Phong độ">
                            <template #default="scope">
                            <div style="display: flex;">
                                <span v-for="i in scope.row.recent" :key="i.index" :class="i=='W'?'cla1':i=='L'?'cla2':'cla3' " >{{ i }}</span>
                            </div>
                          
                            </template>
                        </el-table-column> -->
                 </el-table>
               </div>
            </div>
        
        </div>
  </div>
</template>

<script lang="ts" setup>
const text = ref('我是动态内容')
// 获取联赛名称
let competitionId = ref('')
const date = ref('')
const decCourseLists = ref([])
const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/getMatchType', {
  method: "post",
  body: {
    "isToday": false,
  "language": "",
  "pageNumber": 1,
  "pageSize": 1000
}
})
decCourseLists.value = DecryptData(courseList.value).r.data
competitionId.value=decCourseLists.value[0]
console.log(decCourseLists.value)
// 切换联赛
const select_change = (value:any) => {
  console.log('===',competitionId.value)
  Getthecompetition()
}
const disabledDate  = (time: Date) => {
    return time.getTime() < Date.now();
}
const nuxtApp = useNuxtApp()
date.value = nuxtApp.$dayjs().format('YYYY-MM-DD')
// 切换时间
const handleChange = () => {
  console.log("当前时间",date.value)
  Getthecompetition()
}

const competition=ref([])
// 根据联赛名称和时间获取比赛
const Getthecompetition = async () => {
  const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/byCompetitionGetMatch', {
    method: "post",
    body: {
        "area": "",
        "date": nuxtApp.$dayjs(date.value).format('YYYY-MM-DD') ,
        "language": "",
        "name": competitionId.value,
        "pageNumber": 1,
        "pageSize": 1000
    }
  })

  competition.value = DecryptData(courseList.value).r.data
  console.log('获取比赛===', DecryptData(courseList.value))
}
Getthecompetition()


// /rpa/competition/byCompetitionGetMatch
</script>
<style lang="scss" scoped>
.acquisitionCompetition{
  width: 100%;
  background: #1c1c1c;
  display: flex;
  margin-top: 20px;
  .left{
    width: 90%;
    h1::after {
      content: "";
      width: 50px;
      height: 100%;
      border-bottom-right-radius: 85%;
      display: block;
      background-color: #303030;
      position: absolute;
      right: -50px;
      top: 0;
  }
    .entry-title {
      padding: 20px 15px;
      background-color: #303030;
      font-size: 20px;
      color: white;
      display: block;
      width: fit-content;
      position: relative;
    }
    .owards {
      text-transform: uppercase !important;
      font-family: "Oswald", sans-serif !important;
      font-weight: 500 !important;
   }
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
      line-height: 20px;
      margin-top: 20px;
      display: flex;
      margin-bottom: 15px;
      padding-left: 15px;
      .left-select-test{
        color: #fff;
      }
    }
    .left-center{
        color: #becbc3;
        font-size: 18px;
        padding-left: 15px;
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
//   .right{
//     width: 30%;
//   }
}
</style>