<template>
  <footer>
    <div class="footer">
      <div class="container">
        <div class="container-box">
          <div class="col-item">
            <div class="col-ximg">
              <nuxt-link to="https://www.camrgb.org/">
                <img src="@/assets/logo-xoilac66-new.png" alt="">
              </nuxt-link>
            </div>
            <div class="col-dec" style="margin-bottom: 10px;">
              <nuxt-link to="https://www.camrgb.org/" class="col-f-t">
                Xoilac TV 
              </nuxt-link>
              – Xem bóng đá trực tuyến Full HD 4K miễn phí hôm nay. 
              <strong>Xôi Lạc</strong>
              trực tiếp bóng đá Ngoại Hạng Anh, La Liga, World Cup, Champion League, V-League. Link xem bóng đá sẽ được
              <strong>XoilacTV </strong>
              cập nhật 24/7, tốc độ cao, miễn phí không bị chặn.
            </div>
          </div>

          <div class="col-item">
            <div class="col-title">Thông Tin</div>
            <div class="col-dec">
              <p>Giám Đốc: <nuxt-link class="col-t">Trương Tiểu Kì</nuxt-link></p>
              <p>Biên Tập Viên: Vương Hạ Linh</p>
              <p>Email: xoilac66io@gmail.com</p>
              <p>Phone: 0904385423</p>
              <p>
                Địa chỉ: 
                <nuxt-link class="col-t">100 Đê La Thành, Đống Đa, Hà Nội, Việt Nam</nuxt-link>
              </p>
              <p>
                <em>Website được bảo vệ bởi DMCA</em>
                <br>
                <nuxt-link class="col-rimg">
                  <img src="@/assets/_dmca_premi_badge_5.png" alt="">
                </nuxt-link>
              </p>
            </div>
          </div>

          <div class="col-item">
            <div class="col-title">Về chúng tôi</div>
            <div class="col-dec p-mg">
              <p>
                <nuxt-link class="col-t">Giới thiệu</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-t">Tuyển Dụng</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-t">Chính sách bảo mật</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-t">Liên hệ</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-t">Trách Nhiệm Cá Cược</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-t">Tỷ Lệ Bóng Đá</nuxt-link>
              </p>
            </div>
          </div>

          <div class="col-item">
            <div class="col-title">Mạng Xã Hội</div>
            <div class="col-dec p-mg">
              <p>
                <nuxt-link class="col-f-t">Facebook</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-f-t">Twitter</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-f-t">Youtube</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-f-t">Pinterest</nuxt-link>
              </p>
              <p>
                <nuxt-link class="col-f-t">Tiktok</nuxt-link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

  </footer>
</template>
  
<style scoped lang="scss">
footer {
  width: 100%;
  padding-bottom: 14px;

  .container {
    margin-top: 20px;
    .container-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: 0 -24px;
      .col-item {
        width: 25%;
        padding: 0 24px;
        box-sizing: border-box;
        .col-ximg {
          a {
            display: block;
            width: 100%;
            // height: 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .col-dec {
          margin-top: 10px;
          font-size: 16px;
          color: #fff;
          .col-f-t {
            font-weight: bold;
            color: $theme-color;
          }
          p {
            margin: 10px 0;
            .col-rimg {
              display: block;
              img {
                width: 135px;
                height: 28px;
              }
            }
          }
          &.p-mg {
            p {
              margin: 6px;
            }
          }

          .col-t {
            color: $theme-color;
          }
        }
        .col-title {
          position: relative;
          padding-left: 15px;
          line-height: 30px;
          color: $theme-font-color;
          font-size: 24px;
          &::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 100%;
            left: 0;
            top: 0;
            background: $theme-color;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .footer {
    .container .container-box .col-item{
      width: 50%;
    }
  }
}

@media only screen and (max-width: 575px) {
  .footer {
    .container .container-box .col-item{
      width: 100%;
    }
  }
} 
</style>