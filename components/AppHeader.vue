<template>
  <header class="header">
    <!-- d-flex -->
    <div class="container">
      <div class="logo-area">
        <nuxt-link class="navbar-brand">
          <div class="xc"></div>
          <img src="@/assets/xoilac-tv-logo.png" alt="">
        </nuxt-link>

        <div class="expand-more">
          <div class="expand-icon" @click="expandMore()">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

      </div>

      <div class="navbar-collapse">
        <ul>
          <li v-for="(i, index) in movieList" :key="index" >
            <nuxt-link :to="i.path">{{ i.name }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="draw-nav">
        <el-drawer v-model="drawer" :with-header="false">
          <div class="close">
            <el-icon :size="30" color="#fff" @click="drawer = false">
              <CloseBold />
            </el-icon>
          </div>
          <div class="draw-nt">
            <ul>
              <li v-for="(i, index) in movieList" :key="index">
                <nuxt-link to="/">{{ i }}</nuxt-link>
              </li>
            </ul>
          </div>

        </el-drawer>
      </div>




      <!-- <div class="header__left">
          头部导航栏
          <li  class="indexhome" style="width: 250px;height: 60px;cursor:pointer;background-color: aliceblue;" @click="goindex"></li>
            <nav class="hidden-sm-and-down">
              <ul>
                <li  style="background-color: aliceblue;" ></li>

                <li v-for="(i,index) in movieList" :key="index" >
                  <div :class="nowindex==index?'nowindexclass':''">
                    <nuxt-link  :to="`/XoilacTV?name=${i}`" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">{{i}}</nuxt-link>
                  </div>
                </li>  
              </ul>
          </nav>
        </div> -->
    </div>

  </header>
</template>
  
<script setup lang="ts">
// import{DecryptData} from ''
import { CloseBold } from '@element-plus/icons-vue'
const route = useRoute()
const searchValue = ref<string>('')
const token = ref<string | undefined>(undefined)
const movieList = ref([
  {
  'name':'Xoilac TV',
  'path':'/'
  } ,  
  {
  'name':'Bảng Xếp Hạng',
  'path':'/ranking'
  } ,  
  {
  'name':'Lịch Thi Đấu',
  'path':'/ranking'
  } , 
  {
  'name':'KQBD',
  'path':'/ranking'
  } , 
  {
  'name':'Nhận Định',
  'path':'/ranking'
  } , 
  {
  'name':'Máy Tính Dự Đoán',
  'path':'/ranking'
  } , 
  ])
const nowindex = ref<any>()

const drawer = ref<boolean>(false)


function handleCommand(command: string) {
  switch (command) {
    case 'logOut':
      logOut()
      break;
    default:
      navigateTo('/user')
      break;
  }
}
function goindex(command: string) {
  navigateTo('/')
}
function logOut() { }

function goLogin() { }

function handleSearch() {
  navigateTo('/search?keyword=' + searchValue.value)
}
// 移入移出
function mouseenter(command: any) {
  nowindex.value = command
}
function mouseleave(command: any) {
  nowindex.value = null
}
function expandMore() {
  // console.log('$===',jQuery)
  drawer.value = true
}

// ...
// 请求获取栏目数据接口
// http://api.yinchunyu.com/swagger-ui#/焦点图管理/ColumnController_all
// const { data: navigation } = await useServerRequest<{data: any}>('column/all', {
// query: { status: 0 }
// })
const { data: navigation } = await useServerRequest<{ data: any }>('/rpa/competition/byCompetitionGetMatch', {
  // query: { status: 0 }
  method: "post",
  body:
  {
    "area": "",
    "date": "",
    "language": "",
    "name": "",
    "pageNumber": 0,
    "pageSize": 0
  }

})

const { data: navigations } = await useServerRequest<{ data: any }>('/rpa/competition/leagueName', {
  // query: { status: 0 }
  method: "post",
  body:
  {
  "area": "",
  "language": "",
  "name": "",
  "pageNumber": 1,
  "pageSize": 10
}

})
 console.log("dsadsa",DecryptData(navigations.value))
</script>
  
  
<style lang="scss" scoped>
// .container {
//   margin: 0 auto;
//   display: flex;
//   padding: 0 12px;
// }

.header {
  position: relative;
  width: 100%;
  // height: 55px;
  background-color: $theme-color;


  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    // z-index: -1;
    background: #fff;
  }

  .container {
    position: relative;
    z-index: 1;

    .logo-area {
      padding: 5px 0;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;

      // width: 187.5px;
      .navbar-brand {
        display: flex;
        // position: relative;
        align-items: center;
        height: 100%;
        margin: 0;
        top: 0;
        background: white;
        width: fit-content;
        left: 0;
        overflow-y: clip;
        min-width: 150px;

        .xc {
          position: absolute;
          width: 162px;
          left: 0;
          z-index: -1;
        }

        img {
          height: 45px;
          max-height: 100%;
          width: auto;
          margin: 0 auto;
          display: block;
        }
      }


    }

    .navbar-collapse {
      width: 100%;
      box-sizing: border-box;
      background: $theme-color;

      ul {
        display: flex;
        align-items: center;
        height: 100%;

        li {
          height: 100%;

          a {
            position: relative;
            padding: 0 15px;
            height: 100%;
            display: flex;
            align-items: center;
            color: $theme-font-color;
            font-weight: bold;
            font-size: 16px;

            &:hover {
              background-color: $theme-font-color;
              color: $theme-color;
            }
          }
        }
      }
    }

    .expand-more {
      width: 40px;
      height: auto;
      padding: 5px 20px;
      display: none;

      .expand-icon {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        cursor: pointer;

        span {
          display: inline-block;
          width: 100%;
          height: 4px;
          background: #000;
        }
      }


    }

    .draw-nav {
      display: none;
      ::v-deep(.el-drawer__body) {
        background-color: $theme-color;

        .close {
          display: flex;
          justify-content: flex-end;

          .el-icon {
            cursor: pointer;
          }
        }
        .draw-nt {
          ul li a {
            display: inline-block;
            padding: 10px 0;
            font-weight: bold;
            font-size: 16px;
            color: $theme-font-color;
          }
        }
      }
    }

  }

}

@media only screen and (max-width: 768px) {
  .header {
    &::before {
      display: none;
    }
  }

  .container {
    display: block;
    padding-left: 0;
    padding-right: 0;
    // padding-bottom: 20px;

    .logo-area {
      .expand-more {
        display: block;
      }
    }

    .navbar-collapse ul {
      display: none !important;

      li a {
        padding-top: 15px !important;
        padding-bottom: 15px !important;
      }
    }
    .draw-nav {
      display: block !important;
    }
  }
}</style>