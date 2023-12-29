<template>
  <div class="container">
    <!-- {{ $dayjs().format('YYYY-MM-DD hh:mm:ss') }} -->
    <div class="index">
      <div>
        <h1 class="entry-title owards">Xoilac TV – Link Xem Trực Tiếp Bóng Đá Xôi Lạc TV Full HD</h1>
      </div>

      <div class="tabsout">
        <el-tabs v-model="activeName" @tab-change="handleTab()">
          <el-tab-pane v-for="(i, index) in constList" :key="index" :name="i.title">
            <template #label>
              <div class="custom-tabs-label" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
                <span class="custom-title">{{ i.title }}</span>
                <el-tag>{{ i.title2 }}</el-tag>
              </div>
            </template>

            <div v-if="activeName == 'Theo ngày'" style="margin-bottom: 10px;">
             <span class="date-picker-span">Theo ngày:</span><el-date-picker v-model="date" type="date" style="width: 300px;" placeholder="Pick a day" :editable="false" :disabled-date="disabledDate" @change="handleChange()"/>
            </div>

            <div class="card-list" v-loading="loading">
              <!-- courseList.r.data -->
              <div class="card-game-iv" v-for="(item, index) in decCourseList" :key="index">
                <div class="card-game-containe">
                  <div class="card-title">
                    <div class="owards"> {{ item.name }} </div>
                    <!-- <div class="stage-label">Round 3</div> -->
                  </div>

                  <div class="blv-container">
                    <div class="blv-collapse">

                      <span class="blv-toggle" @click="openBlv(index)">BLV (4)</span>
                      <div class="blv-list" ref="dom">
                        <span class="close-blv" @click="closeBlv(index)">✕</span>
                        <div class="blv-item">
                          <nuxt-link>
                            EDWARD
                          </nuxt-link>
                        </div>
                        <div class="blv-item">
                          <nuxt-link>
                            SUNNY
                          </nuxt-link>
                        </div>
                        <div class="blv-item">
                          <nuxt-link>
                            EDWARD
                          </nuxt-link>
                        </div>
                        <div class="blv-item">
                          <nuxt-link>
                            EDWARD
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <nuxt-link class="match-link">
                    <div class="match-content">
                      <div class="match-mid-option">
                        <div class="match-team">
                          <div class="team-logo-option">
                            <img :src="item.teamaImageUrl" alt="">
                          </div>
                          <div class="team-label-option">
                            {{ item.teamaShort }}
                          </div>
                        </div>
                        <div class="match-status">
                          <div class="match-live-time-info-option">
                            <div class="live-icon"></div>
                            <!-- <div class="match-time-count-option">H2: 92'</div> -->
                            <div class="match-time-count-option">{{item.startdate}}</div>

                          </div>
                          <!-- <div class="match-score-option" v-show="activeName=='Tất cả'">
                           
                          </div> -->
                          <div class="match-score-option" v-show="activeName=='Trực tiếp'">
                           {{ item.scoreTeama }}-{{ item.scoreTeamb }}
                          </div>
                          <div class="match-score-option" v-show="activeName=='Theo ngày' && item.scoreTeama">
                           {{ item.scoreTeama }}-{{ item.scoreTeamb }}
                          </div>
                        </div>

                        <div class="match-team">
                          <div class="team-logo-option">
                            <img :src="item.teambImageUrl" alt="">
                          </div>
                          <div class="team-label-option">
                            {{ item.teambShort }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>

                  <div class="watch">
                    <div class="watch-btn"  @click="showdetails(item)">
                      <!-- <nuxt-link :to="`/details/${categoryItem.value}/show?t=${item.name}`">Xem ngay</nuxt-link> -->
                      <nuxt-link >Xem ngay</nuxt-link>
                      <span class="arrow-match">⟩⟩</span>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :current-page="pageNumber" :page-size="20" :total="total"
            @current-change="handleCurrentChange" />
        </div>



      </div>
    </div>

  </div>
</template>
  
<script setup lang="ts">
const i18n = useI18n();
const router = useRouter()
import { useServerRequest } from "~/composables/useServerRequest";
import type { gameRespon } from "~/types/index/index.d.ts"
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
const fatherMessage = ref<string>("")
let loading=ref<any>(false)
const nowindex = ref<any>()
// const clickindex=ref<any>{}
let constList = ref([
  {
    'title': 'Tất cả',
    'title2': '139'
  },
  {
    'title': 'Trực tiếp',
    'title2': '7'
  },
  {
    'title': 'Theo ngày',
    'title2': '47'
  },
])
// 移入移出
function mouseenter(command: any) {
  nowindex.value = command
}
function mouseleave(command: any) {
  nowindex.value = null
}
const activeName = ref('Tất cả')
const date = ref('')
const pageNumber = ref<number>(1)

const handleTab = () => {
  pageNumber.value = 1
  if (activeName.value == 'Tất cả') loading.value=true ,getCourseList();
  if (activeName.value == 'Trực tiếp')loading.value=true ,getCourseIngList()
  if (activeName.value == 'Theo ngày')loading.value=true ,getCourseFutureList()
}

const decCourseList = ref([])
const total = ref<number>()
const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/schedule', {
  method: "post",
  body: {
    "area": '',
    "language": '',
    "name": '',
    "pageNumber": pageNumber.value,
    "pageSize": 20
  }
})

decCourseList.value = DecryptData(courseList.value).r.data
total.value = DecryptData(courseList.value).r.total

const getCourseList = async () => {
  const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/schedule', {
    method: "post",
    body: {
      "area": '',
      "language": '',
      "name": '',
      "pageNumber": pageNumber.value,
      "pageSize": 20
    }
  })
  decCourseList.value = DecryptData(courseList.value).r.data
  loading.value=false
  total.value = DecryptData(courseList.value).r.total
  console.log('赛程', DecryptData(courseList.value))
}

const getCourseIngList = async () => {
  const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/ongoingCompetition', {
    method: "post",
    body: {
      "area": '',
      "language": '',
      "name": '',
      "pageNumber": pageNumber.value,
      "pageSize": 20
    }
  })
  decCourseList.value = DecryptData(courseList.value).r.data
  loading.value=false
  total.value = DecryptData(courseList.value).r.total
  console.log('进行中===', DecryptData(courseList.value))
}

const disabledDate  = (time: Date) => {
    return time.getTime() < Date.now();
}

const nuxtApp = useNuxtApp()
date.value = nuxtApp.$dayjs().format('YYYY-MM-DD')

const handleChange = () => {
  console.log('===')
  loading.value=true
  getCourseFutureList()
  console.log("当前时间",date.value)
}

const getCourseFutureList = async () => {
  const { data: courseList } = await useServerRequest<{ data: any }>('/rpa/competition/getCompetition', {
    method: "post",
    body: {
      "date": date.value,
      "language": "",
      "pageNumber": pageNumber.value,
      "pageSize": 20,
    }
  })
  decCourseList.value = DecryptData(courseList.value).r.data
  loading.value=false
  total.value = DecryptData(courseList.value).r.total
  console.log('指定时间===', DecryptData(courseList.value))
}

const dom = ref<Array<HTMLElement>>([])
const openBlv = (idx: number) => {
  dom.value[idx].style.display = 'flex'
}

const closeBlv = (idx: number) => {
  dom.value[idx].style.display = 'none'
}

const handleCurrentChange = (val: number) => {
  pageNumber.value = val
  if (activeName.value == 'Tất cả') getCourseList();
  if (activeName.value == 'Trực tiếp') getCourseIngList()
  if (activeName.value == 'Nóng') getCourseFutureList()
}
// const showdetails = (val: any) => {
//   console.log('val',val)
//   router.push(
//     {name: 'details', params: {name: 'qwe', age: 23}}
//   )
// }
// 跳转至详情页面
async function showdetails(data: any) {
  console.log(activeName.value,data)
  await navigateTo({
    path: '/details',
    query: {
      matchId: data.competitionId,
    }
  })
 
}
</script>
  
<style lang="scss" scoped>
// $theme-color: #2AB036;

.container {
  margin-top: 20px;

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

  .index {
    width: 100%;
    background: $theme-bg-color;

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

    .tabsout {
      padding: 15px 30px;

      .el-tabs {
        margin-bottom: 10px;

        ::v-deep(.el-tabs__nav-wrap) {
          &::after {
            display: none;
          }

          .el-tabs__active-bar {
            background-color: $theme-color;
          }
        }
        .date-picker-span{
          color: #fff;
        }
        .custom-tabs-label {
          .custom-title {
            color: $theme-font-color;
            font-weight: bold;
          }

          .el-tag {
            margin-left: 8px;
            color: $theme-color;
            font-weight: bold;
            border: none;
          }

        }

        ::v-deep(.is-active) {

          // color: red;
          &>.custom-tabs-label {
            .custom-title {
              color: $theme-color;
              font-weight: bold;
            }

            .el-tag {
              color: $theme-font-color;
              background: $theme-color;
            }
          }
        }
      }

      .card-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -6px;

        .card-game-iv {
          width: 50%;
          // height: 240px;
          padding: 0 6px;
          margin: 6px 0;

          box-sizing: border-box;

          .card-game-containe {
            height: 100%;
            position: relative;
            border-radius: 8px;
            border: 1px solid red;
            box-sizing: border-box;
            overflow: hidden;

            .card-title {
              position: absolute;
              left: 15px;
              top: 15px;
              width: 100%;
              // padding: 0 15px;

              .owards {
                width: calc(100% - 100px);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: $theme-font-color;
              }

              .stage-label {
                color: $theme-font-color;
              }
            }

            .blv-collapse {
              .close-blv {
                position: absolute;
                top: 10px;
                right: 10px;
                color: $theme-font-color;
                z-index: 14;
                cursor: pointer;
              }

              .blv-toggle {
                position: absolute;
                padding: 5px;
                top: 15px;
                right: 0;
                background: $theme-color;
                cursor: pointer;
                font-weight: 600;
                z-index: 9;
              }

              .blv-list {
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                // opacity: 0;
                display: none;
                transform: translate(-50%, -50%);
                background-color: #0c0c0ce8;
                z-index: 10;

                &.ops {
                  opacity: 1;
                }

                .blv-item {
                  width: 50%;
                  height: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-right-style: solid;
                  border-bottom-style: solid;
                  border-image: radial-gradient(circle at center, #2AB036, #ffe59403);
                  border-image-slice: 1;
                  box-sizing: border-box;

                  a {
                    color: $theme-font-color;
                  }
                }
              }

            }

            .match-link {
              cursor: pointer;

              .match-content {
                position: relative;
                padding: 50px 14px 0px;

                .match-mid-option {
                  display: flex;
                  height: 130px;

                  .match-team {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .team-logo-option {
                      width: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;

                      img {
                        max-width: 70px;
                        height: auto;
                      }
                    }

                    .team-label-option {
                      font-size: 16px;
                      font-weight: 700;
                      line-height: 150%;
                      color: $theme-font-color;
                    }
                  }

                  .match-status {
                    padding: 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .match-live-time-info-option {
                      flex-direction: row;
                      align-items: center;
                      margin-bottom: 10px;
                      margin-top: 10px;
                      display: flex;
                      justify-content: center;

                      .live-icon {
                        margin: 0 4px;
                        display: block;
                        height: 8px;
                        width: 8px;
                        border-radius: 50%;
                        background-color: $theme-color;
                      }

                      .match-time-count-option {
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 150%;
                        color: $theme-font-color;
                        text-transform: uppercase;
                      }
                    }

                    .match-score-option {
                      font-size: 24px;
                      padding: 10px;
                      background-color: $theme-color;
                      border-radius: 5px;
                    }
                  }
                }
              }
            }

            .watch {
              width: 100%;
              display: grid;
              justify-content: flex-end;
              align-items: center;
              height: 50px;

              box-sizing: border-box;

              &::before {
                content: "";
                width: 100%;
                background: #00000040;
                height: 100%;
                display: block;
                position: absolute;
                z-index: -2;
              }

              // &:hover {

              // }

              .watch-btn {
                position: relative;
                display: flex;
                align-items: center;
                height: 100%;
                padding: 6px 12px;
                box-sizing: border-box;
                border-radius: 0 2px 2px 0;
                background-color: $theme-color;

                a {
                  height: 100%;
                  display: flex;
                  align-items: center;
                  color: #000;
                  font-weight: bolder;
                  border-radius: 0;
                }

                .arrow-match {
                  margin-left: 10px;
                }

                &::before {
                  content: '';
                  position: absolute;
                  top: -1px;
                  right: 100%;
                  width: 100%;
                  height: 100%;
                  border-top: 62px solid transparent;
                  border-bottom: 60px solid transparent;
                  border-right: 20px solid $theme-color;
                }
              }
            }
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


      // .custom-title {
      //   .custom-title {
      //     color: #fff;
      //   }
      // }
    }
  }
}

@media only screen and (max-width: 768px) {
  .index {
    h1::after {
      display: none;
    }

    .card-list .card-game-iv {
      width: 100% !important;
    }
  }
}
</style>