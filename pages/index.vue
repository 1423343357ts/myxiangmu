<template>
    <div class="container ">
      <!-- <div class="banner">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in bannerList.rows">
            <nuxt-link :to="item.url">
              <el-image :src="item.img" fit="cover" style="background: #f0f0f0; width: 100%" />
            </nuxt-link>
          </el-carousel-item>
        </el-carousel>
      </div> -->
      <div class="index">
        <div>
        <h1 class="entry-title owards">Xoilac TV – Link Xem Trực Tiếp Bóng Đá Xôi Lạc TV Full HD</h1>
      </div>
      <div class="tabsout">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane v-for="(i,index) in constList" :key="index" :name="i.title">
            <template #label>
              <span class="custom-tabs-label" @mouseenter="mouseenter(index)" @mouseleave="mouseleave(index)">
                <span >{{i.title }}</span>
                <el-tag :class="(nowindex==index || nowindexname==i.title)?'ml-2s':'ml-2' "  >{{i.title2 }}</el-tag>
              </span>
            </template>
            <div>
              <home :fatherMessage="i.title"></home>
            </div>
          </el-tab-pane>

          <!-- <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>Tất cả</span>
                <el-tag class="ml-2" >139</el-tag>
              </span>
            </template>
            <div>
              Tất cả
            </div>
          </el-tab-pane> -->


          <!-- <el-tab-pane label="Trực tiếp">Trực tiếp</el-tab-pane>
          <el-tab-pane label="Nóng">Nóng</el-tab-pane>
          <el-tab-pane label="Hôm nay">Hôm nay</el-tab-pane>
          <el-tab-pane label="Ngày mai">Ngày mai</el-tab-pane> -->
        </el-tabs>
      </div>


      <!-- <el-row :gutter="20" class="mt-20" v-for="categoryItem in movieList.data">
        <el-col :sm="18">
          <div class="panel_hd between items-center">
            <div class="panel_hd__left">
              <h3 class="title items-center">
                <nuxt-link to="/">最新{{ categoryItem.name }}</nuxt-link>
              </h3>
            </div>
            <div class="panel_hd__right items-center">
              <ul class="items-center">
                <li class="hidden-sm-and-down" v-for="item in categoryItem.genres">
                  <nuxt-link :to="`/column/${categoryItem.value}/show?t=${item.name}`">{{ item.name }}</nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/column/${categoryItem.value}`" class="items-center">
                    更多 <el-icon><ElIconArrowRight /></el-icon>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="video-list">
            <el-row :gutter="20">
              <el-col :sm="4" :xs="8" v-for="item in categoryItem.rows">
                <div class="video-list__block">
                  <nuxt-link :to="`/column/${item.columnValue}/${item.id}`" class="img-box">
                    <el-image lazy class="video-list__block__img" :src="item.poster" fit="cover" />
                    <span>暂无评分</span>
                  </nuxt-link>
                  <div class="video-list__detail">
                    <h4 class="title text-overflow">{{ item.title }}</h4>
                    <p class="text-overflow">
                      <span style="padding-right: 5px" v-for="user in item.casts">{{ user.actor.name }}</span>
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="hidden-sm-and-down">
          <div class="panel_hd items-center">
            <h3 class="title items-center">
              {{ categoryItem.name }}榜单
            </h3>
          </div>
          <ul class="col-pd">
            <li v-for="(item, index) in categoryItem.ranks">
              <nuxt-link :to="`/column/${item.columnValue}/${item.id}`" class="between">
                <div>
                  <span class="badge">{{ index + 1 }}</span>
                  {{ item.title }}
                </div>
                <span class="text-muted" v-if="+item.theEnd === 1">已完结</span>
                <span class="text-muted" v-else>更新至{{ item.episodeCount || 0 }}集</span>
              </nuxt-link>
            </li>
          </ul>
        </el-col>
      </el-row> -->
      <!-- <div class="friendly-link flex items-center mt-20">
        <el-icon><ElIconLink/></el-icon>
        友情链接
      </div>
      <div class="friendly-link__content">
        <a v-for="item in linkList.data" :href="item.url" target="_blank">{{ item.text }}</a>
      </div> -->
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import {useServerRequest} from "~/composables/useServerRequest";
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  const fatherMessage = ref<string>("")

//   // banner数据
// const bannerList = ref([{}]),
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
const nowindex=ref<any>()
let nowindexname=ref('Tất cả')
// const clickindex=ref<any>{}
let constList = ref([
  {
    'title':'Tất cả',
    'title2':'139'
  },
  {
    'title':'Trực tiếp',
    'title2':'7'
  },
  {
    'title':'Nóng',
    'title2':'47'
  },
  {
    'title':'Hôm nay',
    'title2':'66'
  },
  {
    'title':'Ngày mai',
    'title2':'71'
  }
])
  // 移入移出
  function mouseenter(command: any){
    nowindex.value=command
    console.log('222',nowindex.value)
  }
  function mouseleave(command: any){
    nowindex.value=null
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
    nowindexname.value=tab.paneName
    console.log(tab.paneName)
  }
  </script>
  
  <style lang="scss">
  .index {
    margin-top: 20px;
    .ml-2{
      background-color: #fff;
      color: #2AB036;
      padding: 0px 0px;
      height: 20px;
      width: 30px;
      border: 0px;
    }
    .ml-2s{
      background-color: #2AB036;
      color: #fff;
      padding: 0px 0px;
      height: 20px;
      width: 30px;
      border: 0px;
    }
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
    .demo-tabs .custom-tabs-label .el-icon {
      vertical-align: middle;
    }
    .demo-tabs .custom-tabs-label span {
      vertical-align: middle;
      margin-left: 4px;
    }
    .el-tabs__item {
      color: #fff;
      font-size: 20px;
    }
    .el-tabs__item.is-active {
    color: #2AB036;}
    .el-tabs__item:hover {
    color: #2AB036;
        cursor: pointer;
    }
    .el-tabs__nav-wrap::after{
      background-color: #1a1b1c;
    }
    .el-tabs__active-bar {
      background-color: #2AB036 !important;
    }
    .tabsout{
      padding: 27px 27px 0px 27px;
    }
    .entry-title{
      padding: 20px 15px;
      background-color: #303030;
      font-size: 20px;
      color: white;
      display: block;
      width: fit-content;
      position: relative;
    } 
    .owards{
      text-transform: uppercase !important;
      font-family: "Oswald", sans-serif !important;
      font-weight: 500 !important;
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
    top: 0;}
    // padding-top: 20px;
    background-color: var(--content-background-color);
    .banner {
      .el-carousel__container {
        height: 380px;
      }
  
      .el-image {
        height: 380px;
      }
  
      @media (max-width: 768px){
        .el-carousel__container {
          height: 200px;
        }
  
        .el-image {
          height: 200px;
        }
      }
    }
  
    .friendly-link {
      border-bottom: #eee solid 1px;
      padding: 10px 0;
      font-size: 18px;
      > img {
        margin-right: 10px;
      }
      &__content {
        padding: 20px 0;
        a {
          padding-right: 15px;
        }
      }
    }
  }
  
  .demonstration {
    color: var(--el-text-color-secondary);
  }
  
  .col-pd {
    li {
      a {
        font-size: 14px;
        padding: 10px 0 10px;
        border-bottom: dotted 1px #eeeeee;
  
        .badge {
          display: inline-block;
          margin-right: 10px;
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          border-radius: 2px;
          font-size: 12px;
          background-color: #eee;
          color: #333;
        }
  
        .text-muted {
          color: #999;
        }
      }
  
      &:nth-child(1) {
        .badge {
          background-color: #ff4a4a;
          color: #fff;
        }
      }
  
      &:nth-child(2) {
        .badge {
          background-color: #ff7701;
          color: #fff;
        }
      }
  
      &:nth-child(3) {
        .badge {
          background-color: #ffb400;
          color: #fff;
        }
      }
    }
  }
  
  .panel_hd {
    border-bottom: #eeeeee solid 1px;
    height: 46px;
    margin-bottom: 15px;
    .title {
      font-size: 18px;
      line-height: 24px;
  
      img {
        margin-right: 10px;
      }
    }
    &__right {
      li {
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 1px;
          height: 10px;
          background: #eee;
          position: absolute;
          top: 50%;
          transform: translateY(-30%);
          right: 0;
        }
        &:last-child::before {
          display: none;
        }
        a {
          padding: 0 10px;
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
  
  .video-list {
    &__block {
      padding: 10px 0;
      &__img {
        width: 100%;
        height: 218px;
      }
      .img-box {
        position: relative;
        height: 218px;
        display: block;
        span {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30px;
          line-height: 30px;
          left: 0;
          display: inline-block;
          background-image: linear-gradient(transparent,rgba(0,0,0,.5));
          color: #fff;
          font-size: 12px;
          text-align: right;
          padding-right: 10px;
          box-sizing: border-box;
        }
      }
    }
  
    &__detail {
      .title {
        font-size: 14px;
        color: #333;
        padding-top: 10px;
      }
  
      p {
        min-height: 19px;
        font-size: 12px;
        margin-bottom: 0;
        margin-top: 5px;
        color: #999;
      }
    }
  }
  
  @media only screen and (max-width:991px){
    .video-list {
      &__block {
        &__img, .img-box {
          height: 170px;
        }
      }
    }
  }
  </style>