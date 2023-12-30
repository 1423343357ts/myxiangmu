<template>
    <div class="container">
        <div class="CompetitionResults">
             <div>
                   <h1 class="entry-title owards">Chọn thời gian để truy vấn kết quả cuộc thi</h1> 
             </div>
             <div class="datachange">
                <span class="date-picker-span" style="color: #fff;">Theo ngày:</span><el-date-picker size="small" v-model="date" type="date" style="width: 300px;" placeholder="Pick a day" :editable="false" :disabled-date="disabledDate" @change="handleChange()"/>
             </div>
             <div class="centent">
                <div class="centent_title">
                    <!-- <div></div> -->
                    <div>tên</div>
                    <div>Ghi điểm</div>
                    <div>Nửa đường</div>
                    <div>Thêm điểm</div>
                    <div>Ngày tháng</div>
                </div>
                <div v-if="total==0" class="Competitiondeta_class-center1">
                </div>
                <div v-if="total!=0">
                    <div  style="padding-bottom: 8px; padding-top: 8px;" v-for="(item,index) in decCourseList" :key="index" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
                    <div class="centent_pstion1" :class="nowindex==index?'nowindexclass':''">
                        <!-- <div style="width: 80px;"></div> -->
                        <div style="display: flex;"><img :src="item.teamaImageUrl" alt=""><div>{{ item.teamaShort }}</div></div>
                        <div>{{ item.scoreTeama }}</div>
                        <div>{{ item.halftimeTeama }}</div>
                        <div>{{ item.extratimeTeama }}</div>
                        <div>{{ item.startdate }}</div>
                    </div>
                    <div class="centent_pstion2" :class="nowindex==index?'nowindexclass':''">
                        <!-- <div style="width: 80px;"><img :src="item.teambImageUrl" alt=""></div> -->
                        <div style="display: flex;"><img :src="item.teambImageUrl" alt=""><div>{{ item.teambShort }}</div></div>
                        <div>{{ item.scoreTeamb }}</div>
                        <div>{{ item.halftimeTeamb }}</div>
                        <div>{{ item.extratimeTeamb }}</div>
                        <div>{{ item.startdate }}</div>
                    </div>
                </div>
                <div class="pagination">
                  <el-pagination background layout="prev, pager, next" :current-page="pageNumber" :page-size="20" :total="total" @current-change="handleCurrentChange" />
                </div>
                </div>
      
             </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
const text = ref('我是动态内容')
const date = ref('')
const pageNumber = ref<number>(1)
const total = ref<number>()
const disabledDate  = (time: Date) => {
    return time.getTime() >= Date.now();
}
const nuxtApp = useNuxtApp()
date.value = nuxtApp.$dayjs().format('YYYY-MM-DD')
const handleChange = () => {
  console.log('===')
  console.log("当前时间",date.value)
  pageNumber.value=1
  getCourseFutureList()
}
// 赛果(赛果查询当天及过去的数据，有日期按日期查)
const decCourseList=ref([])

const getCourseFutureList = async () => {
  const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/saiGuo', {
    method: "post",
    body: {
        "date": nuxtApp.$dayjs(date.value).format('YYYY-MM-DD') ,
        "language": "",
        "pageNumber": pageNumber.value,
        "pageSize": 20
    }
  })
  decCourseList.value = DecryptData(courseList.value).r.data
  total.value = DecryptData(courseList.value).r.total
  console.log('赛果===', DecryptData(courseList.value),total.value)
}
getCourseFutureList()
const nowindex = ref<any>()
// 移入移出
function mouseenter(command: any) {
    console.log(111)
  nowindex.value = command
}
function mouseleave(command: any) {
  nowindex.value = null
}


const handleCurrentChange = (val: number) => {
  pageNumber.value = val
  getCourseFutureList()
}
</script>


<style lang="scss" scoped>

.CompetitionResults{
    margin-top: 20px;
    width: 100%;
    background: #1c1c1c;

    .centent{
        .Competitiondeta_class-center1{
            height: 150px;
            width: 100%;
            line-height: 150px; 
            text-align: center;
            align-items: center;
            color: #becbc3;
            font-size: 18px;
            background: #504f4f;
        }
        .nowindexclass{
            background: rgb(108, 114, 108) !important;
        }
        .centent_title{
            display: flex;
            background: #504f4f;
            height: 35px;
            line-height: 35px;
            color: #fff;
            div{
                flex: 1;
            }
        }
        .centent_pstion1 , .centent_pstion2{
            display: flex;
            background: #504f4f;
            height: 35px;
            line-height: 35px;
            color: #fff;
            div{
                flex: 1;
                line-height: 35px;
                img{
                    max-width: 35px;
                    height: auto;
                }
            }
        }
        .pagination {
        display: flex;
        justify-content: center;

        ::v-deep(.is-active) {
          background-color: $theme-color;
        }

        ::v-deep(button):hover {
          color: $theme-font-color;
          background-color: $theme-color;
        }

        ::v-deep(li):hover {
          color: $theme-font-color;
          background-color: $theme-color;
        }
      }
    }
    .datachange{
        margin: 20px 0px 15px 0px;
        padding-left: 15px;
    }
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
}

</style>