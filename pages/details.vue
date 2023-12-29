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
                    <div v-for="(item,index) in teamsClashlist" :key="index">
                        <div class="teamsClashlist_class">
                            <div>Tên của đội</div><div>Ghi điểm</div><div>Ngày bắt đầu của trò chơi</div>
                        </div>
                        <div class="teamsClashlist_class">
                            <div> <img :src="item.teamaImageUrl" alt="">{{ item.teamaShort }}</div><div>{{ item.scoreTeama }}</div><div>{{ item.startdate }}</div>
                        </div>
                        <div class="teamsClashlist_class">
                            <div><img :src="item.teambImageUrl" alt="">{{ item.teambShort }}</div><div>{{ item.scoreTeamb }}</div><div>{{ item.startdate }}</div>
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
        console.log(DecryptData(Competitiondetailsdata.value))
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
    console.log('赛事关键事件',Key_events.value.length)
    if(typeof Key_events.value === 'string' || Key_events.value.length==0){
        // 是否展示赛事关键事件
        Key_events_show.value=false
        // Competitiondeta_show.value=Competitiondeta.value.includes('暂无')
    }else{
        console.log(Key_events.value.length)
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
        console.log(teamsClashlist.value.length)
        teamsClash_show.value=true
    }
  console.log('获取近期比赛', DecryptData(courseList1.value))
}else{
    teamsClash_show.value=false
}


//   loading.value=false
//   total.value = DecryptData(courseList.value).r.total
//   console.log('赛程', DecryptData(courseList.value))


</script>
<style lang="scss" scoped >
.container{
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
                width: 300px;
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