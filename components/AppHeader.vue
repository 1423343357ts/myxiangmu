<template>
    <header class="header">
      <div class="container between">
        <div class="header__left">
          <!-- 头部导航栏 -->
          <li  class="indexhome" style="width: 250px;height: 60px;cursor:pointer;background-color: aliceblue;" @click="goindex"></li>
          <nav class="hidden-sm-and-down">
            <ul>
            <li  style="background-color: aliceblue;" ></li>
           
            <!-- <li><nuxt-link >Xoilac TV</nuxt-link></li>
            <li><nuxt-link >Tỷ lệ</nuxt-link></li>
            <li><nuxt-link >Lịch Thi Đấu</nuxt-link></li>
            <li><nuxt-link >BXH</nuxt-link></li>
            <li><nuxt-link >Máy Tính Dự Đoán Tỷ Số</nuxt-link></li>
            <li><nuxt-link >Nhận Định Bóng Đá</nuxt-link></li>
            <li><nuxt-link >Blog Bóng Đá</nuxt-link></li> -->

            <li v-for="(i,index) in movieList" :key="index" >
              <div :class="nowindex==index?'nowindexclass':''">
                <nuxt-link  :to="`/XoilacTV?name=${i}`" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">{{i}}</nuxt-link>
              </div>
            </li>  
            <!-- <li v-for="item in navigation.data" :key="item.id">
                <nuxt-link :to="`/column/${item.value}`" v-if="+item.type === 1">{{ item.name }}</nuxt-link>
                <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
            </li> -->
            </ul>
        </nav>
        </div>
        <!-- <div class="header__right items-center">
          <el-input
              class="w-50 m-2 mr-20"
              placeholder="请输入搜索的影视名"
              :suffix-icon="ElIconSearch"
              v-model="searchValue"
              @keyup.enter.native="handleSearch"
          />
          <ClientOnly>
            <template v-if="token">
              <el-dropdown @command="handleCommand">
                <el-button circle :icon="ElIconUserFilled" color="#155FAA"></el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="user">个人中心</el-dropdown-item>
                    <el-dropdown-item divided command="logOut">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button circle :icon="ElIconUserFilled" @click="goLogin"></el-button>
            </template>
          </ClientOnly>
        </div> -->
      </div>
      <div class="mobile-nav hidden-sm-only hidden-sm-and-up">
       
        <ul>
          <li v-for="(i,index) in movieList" :key="index" >
              <div :class="nowindex==index?'nowindexclass':''">
                <nuxt-link  :to="`/XoilacTV?name=${i}`" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">{{i}}</nuxt-link>
              </div>
          </li>  
          <!-- <li v-for="item in navigation.data" :key="item.id">
            <nuxt-link :to="`/column/${item.value}`" v-if="+item.type === 1">{{ item.name }}</nuxt-link>
            <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
          </li> -->
        </ul>
    </div>

    </header>
    <div class="header__height__placeholder"></div>
  </template>
  
  <script setup lang="ts">
  // import{DecryptData} from ''
  const route = useRoute()
  const searchValue = ref<string>('')
  const token = ref<string | undefined>(undefined)
  const movieList = ref(['Xoilac TV','Tỷ lệ','Lịch Thi Đấu','BXH','Máy Tính Dự Đoán Tỷ Số','Nhận Định Bóng Đá','Blog Bóng Đá'])
  const nowindex=ref<any>()
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
  function goindex(command: string){
    navigateTo('/')
  }
  function logOut() {}
  
  function goLogin() {}
  
  function handleSearch() {
    navigateTo('/search?keyword=' + searchValue.value)
  }
  // 移入移出
  function mouseenter(command: any){
    nowindex.value=command
  }
  function mouseleave(command: any){
    nowindex.value=null
  }
  
  // ...
    // 请求获取栏目数据接口
    // http://api.yinchunyu.com/swagger-ui#/焦点图管理/ColumnController_all
    // const { data: navigation } = await useServerRequest<{data: any}>('column/all', {
    // query: { status: 0 }
    // })
     const { data: navigation } = await useServerRequest<{data: any}>('/rpa/competition/byCompetitionGetMatch', {
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
    console.log(DecryptData(navigation.value))
  </script>
  
  
  <style lang="scss">
  .header {
    position: fixed;
    margin-bottom: 5px;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 60px;
    background-color: #2AB036;
    .nowindexclass{
      background-color: #fff;
      color: #2AB036;
      a{
        color: #2AB036 !important;
      }
    }
    &__left {
      display: flex;
      .indexhome{
          background: url(../assets/xoilac-tv-logo.png);
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
        }
      .logo {
        display: flex;
        width: 150px;
        height: 55px;
        line-height: 55px;
        font-size: 24px;
        color: #FF9900;
        font-weight: bold;
        background-position: 50% 50% !important;
        background-size: cover !important;
        overflow: hidden;
      }
      nav {
        .indexhome{
            background: url(../assets/xoilac-tv-logo.png);
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
        }
        ul {
          display: flex;
          li {
            a {
              display: inline-block;
              height: 60px;
              line-height: 60px;
              font-size: 15px;
              padding: 0 20px;
              color: #fff;
            }
            // &.active {
            //   a {
            //     background-color: #fff;
            //     color: #2AB036;
            //   }
            // }
          }
        }
      }
    }
    &__height__placeholder {
      height: 55px;
    }
  }
  
  
  @media only screen and (max-width:991px){
    .header {
      position: relative;
      .indexhome{
          background: url(../assets/xoilac-tv-logo.png);
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          position: absolute;
          left: 0px;
        }
      .mobile-nav {
        border-top: #666 solid 1px;
        background: #292838;
        position: absolute;
        height: 46px;
        bottom: -46px;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        padding-top: 8px;
        z-index: 9;
        &::-webkit-scrollbar {
          display: none;
        }
       
        ul {
          white-space: nowrap;
          li {
            display: inline-block;
            position: relative;
            &.active {
              a {
                color: #1583f3;
              }
            }
            a {
              display: inline-block;
              padding: 5px 19px;
              color: #ffffff;
              font-size: 16px;
            }
          }
        }
      }
    }
    .header__height__placeholder {
      height: 46px;
    }
  }
  </style>