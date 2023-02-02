<template>
  <div id="signIn">
    <header>
      <h3>智慧园区平台使用培训会</h3>
    </header>
    <main>
      <ul>
        <li>
          <van-field v-model="main.roomName" readonly input-align="right" label="地点:" placeholder />
        </li>
        <li>
          <van-field v-model="main.startTime" readonly input-align="right" label="开始时间：" />
        </li>
        <li>
          <van-field v-model="main.endTime" readonly input-align="right" label="结束时间：" />
        </li>
        <li>
          <van-field v-model="main.linkman" readonly input-align="right" label="联系人：" />
        </li>
        <li>
          <van-field
            v-model="main.remark"
            rows="2"
            autosize
            readonly
            type="textarea"
            maxlength="50"
            placeholder
            show-word-limit
          />
        </li>
      </ul>
    </main>
    <footer>
      <van-form>
        <ul>
          <li>
            <van-field
              label-align="right"
              v-model="form.name"
              :rules="[{  required: true ,}]"
              required
              name="validator"
              label="姓名:"
              placeholder="请输入姓名"
            />
          </li>
          <li>
            <van-field
              label-align="right"
              v-model="form.phone"
              required
              maxlength="11"
              :rules="[{  required: true ,}]"
              label="手机号:"
              placeholder="请输入手机号"
            />
          </li>
          <li>
            <van-field
              label-align="right"
              v-model="choicePlace"
              required
              is-link
              :rules="[{  required: true ,}]"
              label="单位名称:"
              placeholder="请选择单位名称"
              @focus="showChoice=true"
            />
            <van-popup
              v-model="showChoice"
              :closeable="true"
              @click-close-icon="closeIcon"
              close-icon-position="bottom-right"
              position="bottom"
            >
              <div class="popup">
                <ul class="tab">
                  <li @click="checkClick(1)">
                    <h6 :class="typeIndex === 1?'activeH6':''">企业信息</h6>
                  </li>
                  <li @click="checkClick(2)">
                    <h6 :class="typeIndex === 2?'activeH6':''">其他</h6>
                  </li>
                </ul>
                <tree
                  ref="tree"
                  v-show="typeIndex === 1"
                  :treeData="treeData"
                  :showClose="showChoice"
                  @clickTreeNode="clickTreeNode"
                ></tree>
                <div class="other">
                  <div v-show="typeIndex === 2" class="seach">
                    <van-field
                      v-model="form.unitName"
                      :clearable="true"
                      clear-trigger="always"
                      placeholder="请输入企业名称"
                    />
                    <span class="seachBtn" type="info" @click="clickAddSure">确定</span>
                  </div>
                </div>
                <!-- <van-tabs color="#3a8ee6" v-model="active">
                  <van-tab title="企业信息">
                    <tree :treeData="treeData" :showClose="showChoice" @clickTreeNode="clickTreeNode"></tree>
                  </van-tab>
                  <van-tab title="其他" class="other">
                    <div class="seach">
                      <van-field
                        v-model="form.unitName"
                        :clearable="true"
                        clear-trigger="always"
                        placeholder="请输入企业名称"
                      />
                      <span class="seachBtn" type="info" @click="clickAddSure">确定</span>
                    </div>
                  <van-field v-model="form.unitName" placeholder="请输入企业" /> 
                  </van-tab>
                </van-tabs>-->
                <!-- <div class="firm" v-show="currentIndex==1">
                      <ul>
                        <li v-for="item in firmList" :key="item.id">
                          <span @click="clickCompany(item)" class="partment">{{item.orgName}}</span>
                        </li>
                      </ul>
                </div>-->
              </div>
            </van-popup>
            <!-- <van-action-sheet
              v-model="showChoice"
              :round="false"
              :actions="place"
              @select="onSelect"
            ></van-action-sheet>-->
          </li>
          <li>
            <van-field label-align="right" readonly v-model="form.time1" label="签到时间:" />
          </li>
        </ul>
        <div class="btn">
          <van-button round block type="info" @click="submit">提交</van-button>
          <!-- <van-overlay :show="show" @click="show = false" /> -->
        </div>
        <!-- <van-button type="default" @click="onSuccess">提交</van-button> -->
      </van-form>
    </footer>
    <!--    <div style="width: 20px;height: 20px;"></div>-->
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block" />
      </div>
    </van-overlay>
    <van-dialog
      v-model="dialogShow"
      title="标题"
      :message="msg"
      :show-confirm-button="false"
      :show-cancel-button="false"
    ></van-dialog>
  </div>
</template>

<script>
import moment from "moment";
import tree from "@/components/tree";
export default {
  name: "signIn",
  components: {
    tree
    // prentTree
  },
  created() {
    this.getDate();
    this.getGarden();
    this.getFirm();
  },
  mounted() {
    document.title = "会议签到";
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          orgName: "品牌一",
          children: [
            {
              id: 4,
              orgName: "华东区域",
              children: [
                {
                  id: 9,
                  orgName: "上海"
                },
                {
                  id: 10,
                  orgName: "昆山"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          orgName: "品牌二",
          children: [
            {
              id: 5,
              orgName: "华东区域"
            },
            {
              id: 6,
              orgName: "华南区域"
            }
          ]
        },
        {
          id: 3,
          orgName: "品牌三",
          children: [
            {
              id: 7,
              orgName: "华北区域"
            },
            {
              id: 8,
              orgName: "华南区域",
              children: [
                {
                  id: 7,
                  orgName: "华北区域"
                },
                {
                  id: 8,
                  orgName: "华南区域"
                }
              ]
            }
          ]
        }
      ],
      typeIndex: 1,
      firmList: [],
      defaultProps: null,
      selectOrg: {
        orgsid: []
      },
      main: {
        id: "",
        roomName: "",
        startTime: "",
        endTime: "",
        linkman: "",
        remark: ""
      },
      partmentId: "",
      form: {
        name: "",
        errorName: "",
        phone: "",
        unitName: "",
        time1: moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss"),
        time2: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      },
      tabList: [
        { id: 1, title: "园区管委会" },
        { id: 2, title: "企业" }
      ],
      choicePlace: "",
      showChoice: false,
      show: false,
      currentIndex: 0,
      dialogShow: false,
      msg: ""
    };
  },
  methods: {
    /**
     * @function 获取会议信息 1537003660850122753
     * */
    getDate() {
      this.$axios
        .post(`meet/meetSign/info/${this.$route.params.id}`)
        .then(res => {
          if (res.data.code === 0) {
            const { data } = res.data;
            if (data == null) return;
            this.main = data;
            this.main.linkman = `${data.linkMan}  ${data.linkTel}`;
          }
        });
    },
    /**
     * @function 获取园区列表
     * */
    getGarden() {
      const params = {
        govFlag: 0
      };
      this.$axios.post("meet/meeting/getGovTree", params).then(res => {
        const { data } = res.data;
        this.treeData = data;
      });
    },
    /**
     * @function 获取企业列表
     * */
    getFirm() {
      const params = {
        name: ""
      };
      this.$axios.post("meet/meeting/getEntTree", params).then(res => {
        const { data } = res.data;
        this.firmList = data;
      });
    },
    /**
     * @function 切换园区企业
     * */
    changeTab(index) {
      this.currentIndex = index;
    },
    /**
     * @function 搜索园区企业
     * */
    onSeach() {
      this.currentIndex = 0 ? this.getGarden() : this.getFirm();
    },
    /**
     *
     * @param {object} data 为选中节点对象
     */
    clickTreeNode(data) {
      if (this.typeIndex === 2) {
        return;
      }
      this.choicePlace = data.orgName;
      this.partmentId = data.id;
      this.showChoice = false;
    },
    /**
     * @ {object} 每一项所对应的数据
     */
    clickCompany(item) {
      console.log(item);
      this.choicePlace = item.orgName;
    },
    /**
     * @function 关闭底框事件
     */
    closeIcon() {
      document.querySelector(".van-popup").scrollTop = 0;
    },
    // /**
    // * @function 验证正确的手机号
    // */
    // phoneBlur () {
    //   let patt = /^[1][3-9][\d]{9}/
    //   if(!patt.test(this.form.phone)) {
    //     this.$toast.fail('请输入正确的手机号');
    //   }
    // },
    /**
     * @function 其他确认
     */
    clickAddSure() {
      this.partmentId = -1;
      this.choicePlace = this.form.unitName;
      this.showChoice = false;
    },
    checkClick(index) {
      this.typeIndex = index;
      if (index != 1) {
        this.$refs.tree.treeNodeClick({
          ...this.partmentId,
          ...this.choicePlace
        });
      }
    },
    submit() {
      if (!this.form.name) {
        return;
      }
      if (!this.form.phone) {
        return;
      }
      let patt = /^[1][3-9][\d]{9}/;
      if (!patt.test(this.form.phone)) {
        this.$toast.fail("请输入正确的手机号");
        return;
      }
      if (!this.choicePlace) {
        return;
      }
      if (moment(new Date()).valueOf() > moment(this.main.endTime).valueOf()) {
        this.$toast.fail("会议已结束");
        return;
      }
      const params = {
        meetId: this.main.id,
        name: this.form.name,
        phone: this.form.phone,
        sealFixedOrgId: this.partmentId,
        signinTime: this.form.time2,
        unitName: this.form.unitName
      };
      this.$axios.post("meet/meetSign/signIn", params).then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.$toast.success("签到成功");
        } else if (res.data.code === 500) {
          this.msg = res.data.msg;
          this.dialogShow = true;
          setTimeout(() => {
            this.dialogShow = false;
          }, 2000);
        }
      });
    }
  }
};
</script>

<style lang="less">
#signIn {
  .van-dialog {
    width: 210px !important;
  }
  header {
    width: 100%;
    height: 35.4667vw;
    padding-top: 9.8667vw;
    box-sizing: border-box;
    .van-cell {
      // line-height: 6.4vw;
      // font-size: 1.8667vw;
      padding: 2.6667vw 4.2667vw;
      // width: 1.3333vw 2.1333vw 6.4vw;
    }
    h3 {
      text-align: center;
      color: #fff;
      font-size: 6.4vw;
    }
    // background: url('./组 118.png') no-repeat;
    // background-size: 375px 153px;
  }
  main {
    padding: 0 8.8vw;
    box-sizing: border-box;
    ul {
      height: 84vw;
      padding-top: 5.3333vw;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 1.6vw;
      li {
        .van-field__control {
          color: #0079fe;
        }
        display: flex;
        &:last-child {
          .van-field__value {
            background: #ebeef5;
          }
        }
      }
    }
  }
}
footer {
  margin-top: 5.3333vw;
  padding: 0 5.3333vw;
  box-sizing: border-box;
  padding-bottom: 4vw;
  .van-form {
    height: 70.6667vw;
    padding-top: 5.3333vw;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 1.6vw;
    ul {
      li {
        .van-cell__right-icon {
          position: absolute;
          right: 6vw;
          top: 4vw;
        }
        .van-field__label {
          width: 82px;
          line-height: 9.6vw;
        }
        .van-field__control {
          height: 9.6vw;
          padding: 0 6px 0 10px;
          border: 1px solid #d9d9d9;
          border-radius: 1.0667vw;
        }
        &:nth-child(1) {
          .van-cell--required::before {
            top: 4.2667vw;
            left: 60px;
          }
        }

        &:nth-child(2) {
          .van-cell--required::before {
            top: 4.2667vw;
            left: 48px;
          }
        }
        &:nth-child(3) {
          .van-cell--required::before {
            top: 4.2667vw;
            left: 34px;
          }
          .van-field__control {
            padding: 0 6px;
          }
          .van-popup__close-icon--bottom-right {
            position: fixed;
            bottom: 280px;
            z-index: 99999;
          }
          .popup {
            height: 90vw;
            .tab {
              display: flex;
              justify-content: space-around;
              position: fixed;
              width: 100%;
              z-index: 10000;
              h6 {
                font-weight: 400;
              }
              .activeH6 {
                border-bottom: 2px solid #0079fe;
                padding-bottom: 6px;
              }
            }
          }
          .other {
            .seach {
              position: fixed;
              display: flex;
              padding-left: 20px;
              width: calc(100% - 40px);
              height: 60px;
              background: #fff;
              padding-top: 60px;
              z-index: 100;
              .van-cell::after {
                border: none;
              }
              .van-cell {
                padding: 0;
              }
              .van-field__clear {
                position: absolute;
                right: 10px;
              }
              .seachBtn {
                width: 80px;
                height: 9.6vw;
                background-color: #187af7;
                color: #fff;
                text-align: center;
                line-height: 9.6vw;
              }
            }
          }
          .firm {
            padding: 0 40px 0 20px;
            color: #606266;
          }
        }
      }
    }
    .btn {
      padding: 0 0 14px;
      .van-button {
        height: 12vw;
        padding: 0 5.3333vw;
        margin-top: 11.3333vw;
        overflow: auto;
        background: linear-gradient(180deg, #fed049 0%, #fc911d 100%);
        font-size: 4.8vw;
        border: none;
      }
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
  // ul {
  //     height: 70.6667vw;
  //     // padding-top: 5.3333vw;
  //     box-sizing: border-box;
  //     li {
  //             // display: flex;
  //             .van-field__label {
  //               width: 82px;
  //               line-height: 9.6vw;
  //             }
  //             &:nth-child(1) {
  //               .van-cell--required::before {
  //                 top: 4.2667vw;
  //                 left: 56px;
  //               }
  //             }
  //             &:nth-child(2) {
  //               .van-cell--required::before {
  //                 top: 4.2667vw;
  //                 left: 42px;
  //               }
  //             }
  //             &:nth-child(3) {
  //               .van-cell--required::before {
  //                 top: 4.2667vw;
  //                 left: 28px;
  //               }
  //             }
  //             &:nth-child(4) {
  //               .van-cell--required::before {
  //                 top: 4.2667vw;
  //                 left: 28px;
  //               }
  //             }
  //             .van-field__control {
  //               height: 9.6vw;
  //               padding: 0 10px;
  //               border: 1px solid #D9D9D9
  //             }
  //             // margin-bottom: 8vw;
  //             // label {
  //             //     width: 30.4vw;
  //             //     font-size: 3.7333vw;
  //             //     color: #000;
  //             // }
  //         }
  // }
  // .btn {
  //     padding:0 5.3333vw;
  //     box-sizing: border-box;
  //     button {
  //         width: 100%;
  //         height: 12vw;
  //         // margin-top: 20px;
  //         color: #fff;
  //         border-radius: 6.6667vw;
  //         font-size: 4.8vw;
  //         text-align: center;
  //         border:none
  //     }
  // }
}
</style>
