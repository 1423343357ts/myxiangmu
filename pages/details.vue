<template>
    <div class="container">
        <div class="details">
            <div class="Competitiondeta_class">
                <div class="Competitiondeta_class-test">Chi tiết trò chơi</div>
                <div class="Competitiondeta_class-center1" v-if="Competitiondeta_show==false">Không có dữ liệu mới nhất!</div>
            </div> 

            <div class="Competitiondeta_class">
                <div class="Competitiondeta_class-test">Sự kiện quan trọng của sự kiện</div>
                <div class="Competitiondeta_class-center1" v-if="Key_events_show==false">Không có dữ liệu mới nhất!</div>
            </div>

            <div class="Competitiondeta_class">
                <div class="Competitiondeta_class-test"> Các trò chơi gần đây</div>
                <div class="Competitiondeta_class-center1" v-if="teamsClash_show==false">Không có dữ liệu mới nhất!</div>
                <div  v-if="teamsClash_show==true">
                    <div  class="teamsClashlist_class">
                        <div>Ghi điểm</div><div>Tên của đội</div><div>VS</div><div>Tên của đội</div><div>Ghi điểm</div>
                    </div>
                    <div v-for="(item,index) in teamsClashlist" :key="index">
                        <div class="teamsClashlist_class">
                            <div>{{ item.scoreTeama }}</div><div> <img :src="item.teamaImageUrl" alt=""><div>{{ item.teamaShort }}</div></div><div>VS</div><div><img :src="item.teambImageUrl" alt=""><div>{{ item.teambShort }}</div></div><div>{{ item.scoreTeamb }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="video_class">
                <div class="video">视频预留位置</div>
                <div class="chat">聊天室预留位置</div>
            </div>

           
        </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const text = ref('我是动态内容')
const matchId = ref<any>();
const teamaId = ref<any>();
const teambId = ref<any>();
matchId.value =route.query.matchId
teamaId.value =route.query.teamaId
teambId.value =route.query.teambId
console.log( matchId.value)
if(matchId.value && teamaId.value){
    console.log("两个都查")
}else if(matchId.value){
    console.log('只查获取比赛详情 赛事关键事件')
}else if(teamaId.value){
    console.log("只查两队交锋只获取最近的六条，未来赛事（当场比赛的两个队伍")
}

// 获取比赛详情.
const Competitiondeta_show =ref<any>()
const Competitiondeta = ref([])
if(matchId.value){
    console.log("存在比赛id")
    const { data: Competitiondetailsdata } = await useServerRequest<{ data: any }>('/rpa/competition/matchDetails', {
    method: "post",
    body: {
        "language": "",
        "matchId": matchId.value
    }
    })
    Competitiondeta.value = DecryptData(Competitiondetailsdata.value).r
    console.log('获取比赛详情',DecryptData(Competitiondetailsdata.value))
    if(typeof Competitiondeta.value === 'string'){
        // 是否展示比赛详情
        Competitiondeta_show.value=false
        // Competitiondeta_show.value=Competitiondeta.value.includes('暂无')
    }else{
        Competitiondeta_show.value=true
    }
}else{
      // 是否展示比赛详情
      Competitiondeta_show.value=false
}
//赛事关键事件
const Key_events_show =ref<any>()
const Key_events = ref([])
if(matchId.value){
    const { data: Competitiondetailsdatas } = await useServerRequest<{ data: any }>('/rpa/competition/getMatchEvent', {
    method: "post",
    body: {
        "language": "",
        "matchId": route.query.matchId
    }
    })
    Key_events.value = DecryptData(Competitiondetailsdatas.value).r
    console.log('赛事关键事件',DecryptData(Competitiondetailsdatas.value))
    if(typeof Key_events.value === 'string' || Key_events.value.length==0){
        // 是否展示赛事关键事件
        Key_events_show.value=false
        // Competitiondeta_show.value=Competitiondeta.value.includes('暂无')
    }else{
        Key_events_show.value=true
    }
}else{
    // 是否展示赛事关键事件
    Key_events_show.value=false
}

// 两队交锋只获取最近的六条
const teamsClash_show =ref<any>()
const teamsClashlist=ref([])
if(teamaId.value){
    const { data: courseList1 } = await useServerRequest<{ data: any }>('/rpa/competition/confrontation', {
        method: "post",
        body: {
            "language": "",
            "teamaId": route.query.teamaId,
            "teambId": route.query.teambId
        }
  })
  teamsClashlist.value = DecryptData(courseList1.value).r
  console.log('最近的六条',teamsClashlist.value.length)
  if(typeof Key_events.value === 'string'){
        // 是否展示两队交锋只获取最近的六条
        teamsClash_show.value=false
        // Competitiondeta_show.value=Competitiondeta.value.includes('暂无')
    }else{
        teamsClash_show.value=true
    }
}else{
    teamsClash_show.value=false
}


// 未来赛事（当场比赛的两个队伍）
const FutureEvents_show =ref<any>()
const FutureEvents=ref([])
if(teamaId.value){
    const { data: courseList1 } = await useServerRequest<{ data: any }>('/rpa/competition/future', {
        method: "post",
        body: {
            "date": "",
            "language": "",
            "pageNumber": 1,
            "pageSize": 100,
            "teamaId": route.query.teamaId,
            "teambId": route.query.teambId,
        }
  })
  FutureEvents.value = DecryptData(courseList1.value).r
  console.log('未来赛事（当场比赛的两个队伍）',DecryptData(courseList1.value))
  if(typeof FutureEvents.value === 'string'){
        // 是否展示未来赛事（当场比赛的两个队伍）
        FutureEvents_show.value=false
        // Competitiondeta_show.value=Competitiondeta.value.includes('暂无')
    }else{
        FutureEvents_show.value=true
    }
}else{
    FutureEvents_show.value=false
}




//   loading.value=false
//   total.value = DecryptData(courseList.value).r.total
//   console.log('赛程', DecryptData(courseList.value))


</script>
<style lang="scss" scoped >
.container{
    margin-top: 20px;
    .details{
        width: 100%;
        .Competitiondeta_class{
        width: 100%;
        .Competitiondeta_class-test{
            color: #fff;
            font-size: 18px;
            background: #504f4f;
            margin-top: 15px;
            margin-bottom: 1px;
            line-height: 45px;
            padding-left: 15px;
        }
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

        .teamsClashlist_class{
            color: #becbc3;
            font-size: 16px;
            background: #222121;
            display: flex;
            div{
                display: flex;
                flex:1;
                width: 200px;
                text-align: center;
                line-height: 35px;
                img{
                    max-width: 35px;
                    height: auto;
                }
            }
        }
     }
     .video_class{
        margin-top: 15px;
        display: flex;
        .video{
            height: 450px;
            width: 70%;
            line-height: 450px; 
            text-align: center;
            align-items: center;
            color: #becbc3;
            font-size: 18px;
            background: #504f4f;
        }
        .chat{
            margin-left: 3px;
            height: 450px;
            width: 29%;
            line-height: 450px; 
            text-align: center;
            align-items: center;
            color: #becbc3;
            font-size: 18px;
            background: #504f4f;
        }
     }
    }

}


</style>