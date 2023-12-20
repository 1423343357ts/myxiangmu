<template>
  <div class="container">

    <div class="index">
      <div>
        <h1 class="entry-title owards">Xoilac TV – Link Xem Trực Tiếp Bóng Đá Xôi Lạc TV Full HD</h1>
      </div>

      <div class="tabsout">
        <el-tabs v-model="activeName">
          <el-tab-pane v-for="(i, index) in constList" :key="index" :name="i.title">
            <template #label>
              <div class="custom-tabs-label" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
                <span class="custom-title">{{ i.title }}</span>
                <el-tag>{{ i.title2 }}</el-tag>
              </div>
            </template>

            <div class="card-list">
              <div class="card-game-iv" v-for="(item,index) in 4">
                <div class="card-game-containe">
                  <div class="blv-container">
                    <div class="blv-collapse">
                      <span class="blv-toggle" @click="openBlv(index)">BLV (4)</span>
                      <!-- :class="false ? 'ops' : ''" -->
                      <div class="blv-list" ref="dom">
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
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- <div class="tabsout">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane v-for="(i, index) in constList" :key="index" :name="i.title">
            <template #label>
              <span class="custom-tabs-label" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
                <span>{{ i.title }}</span>
                <el-tag :class="(nowindex == index || nowindexname == i.title) ? 'ml-2s' : 'ml-2'">{{ i.title2 }}</el-tag>
              </span>
            </template>
            <div>
              <home :fatherMessage="i.title"></home>
            </div>
          </el-tab-pane>

          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>Tất cả</span>
                <el-tag class="ml-2">139</el-tag>
              </span>
            </template>
            <div>
              Tất cả
            </div>
          </el-tab-pane>


          <el-tab-pane label="Trực tiếp">Trực tiếp</el-tab-pane>
          <el-tab-pane label="Nóng">Nóng</el-tab-pane>
          <el-tab-pane label="Hôm nay">Hôm nay</el-tab-pane>
          <el-tab-pane label="Ngày mai">Ngày mai</el-tab-pane>
        </el-tabs>
      </div> -->
    </div>

  </div>
</template>
  
<script setup lang="ts">
const i18n = useI18n();
import { useServerRequest } from "~/composables/useServerRequest";
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
const fatherMessage = ref<string>("")

//   // banner数据
// const bannerList = ref([{}])
// // 影视数据
// const movieList = ref([
//   {
//     rows: [{}],
//     ranks: [{}]
//   }
// ]),
// // 获取友情链接
// const linkList = ref([
//   { text: 'Nuxt3教程', url: 'http://www.yinchunyu.com' }
// ]),
const nowindex = ref<any>()
let nowindexname = ref('Tất cả')
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
    'title': 'Nóng',
    'title2': '47'
  },
  {
    'title': 'Hôm nay',
    'title2': '66'
  },
  {
    'title': 'Ngày mai',
    'title2': '71'
  }
])
// 移入移出
function mouseenter(command: any) {
  nowindex.value = command
  console.log('222', nowindex.value)
}
function mouseleave(command: any) {
  nowindex.value = null
}
// const [{ data: bannerList }, { data: linkList }, { data: movieList }] = await Promise.all([
//   // banner数据
//   useServerRequest('basic/banner/list'),
//   // 获取友情链接
//   useServerRequest('basic/link/all'),
//   // 影视数据
//   useServerRequest('web/index')
// ])
const activeName = ref('Tất cả')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  nowindexname.value = tab.paneName
  console.log(tab.paneName)
}

const { data: bannerList } = await useServerRequest<{ data: any }>('/rpa/competition/ongoingCompetition', {
  method: "post",
  body: {
    "area": '',
    "language": '',
    "name": '',
    "pageNumber": 1,
    "pageSize": 20
  },
})

// console.log('bannerList===',bannerList.value)
console.log('bannerList===', DecryptData(bannerList.value))

// const dom: Ref<HTMLElement | null> = ref(null)
const dom = ref<any>(null)
const openBlv = (idx: number) => {
  // if(dom.value) {
    console.log(dom.value[idx].style.opacity)
    dom.value[idx].style.opacity = 1
  // }
 
  // console.log(proxy.$refs.dom[idx])
  // proxy.$refs.dom[idx].style.opacity = 1

  // console.log(dom.value)
  // console.log('123')
}

</script>
  
<style lang="scss" scoped>
$Theme-color: #2AB036;

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
            background-color: $Theme-color;
          }
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
          height: 240px;
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

            .blv-collapse {

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
                opacity: 0;
                transform: translate(-50%, -50%);
                background-color: #0c0c0ce8;

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
          }
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

.index {


  // .ml-2 {
  //   background-color: #fff;
  //   color: #2AB036;
  //   padding: 0px 0px;
  //   height: 20px;
  //   width: 30px;
  //   border: 0px;
  // }

  // .ml-2s {
  //   background-color: #2AB036;
  //   color: #fff;
  //   padding: 0px 0px;
  //   height: 20px;
  //   width: 30px;
  //   border: 0px;
  // }

  // .demo-tabs>.el-tabs__content {
  //   padding: 32px;
  //   color: #6b778c;
  //   font-size: 32px;
  //   font-weight: 600;
  // }

  // .demo-tabs .custom-tabs-label .el-icon {
  //   vertical-align: middle;
  // }

  // .demo-tabs .custom-tabs-label span {
  //   vertical-align: middle;
  //   margin-left: 4px;
  // }

  // .el-tabs__item {
  //   color: #fff;
  //   font-size: 20px;
  // }

  // .el-tabs__item.is-active {
  //   color: #2AB036;
  // }

  // .el-tabs__item:hover {
  //   color: #2AB036;
  //   cursor: pointer;
  // }

  // .el-tabs__nav-wrap::after {
  //   background-color: #1a1b1c;
  // }

  // .el-tabs__active-bar {
  //   background-color: #2AB036 !important;
  // }



  // padding-top: 20px;
  // background-color: var(--content-background-color)
}

@media only screen and (max-width: 768px) {
  .index {
    h1::after {
      display: none;
    }
  }
}
</style>