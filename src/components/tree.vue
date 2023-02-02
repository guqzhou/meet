<template>
  <div class="tree">
    <div class="seach">
      <van-field
        v-model="filterText"
        :clearable="true"
        clear-trigger="always"
        placeholder="请输入组织部门名称"
      />
      <span class="seachBtn" type="info" @click="clickSeach">搜索</span>
    </div>
    <div class="filter-tree">
      <el-tree
        :props="defaultProps"
        default-expand-all
        :data="treeData"
        node-key="id"
        :check-strictly="true"
        show-checkbox
        @check="treeNodeClick"
        :filter-node-method="filterNode"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      tempId: "",
      currentCheckData: {} // 当前选中的值
    };
  },
  props: {
    showClose: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    /**
     * @function 关闭弹框清空输入框
     * @param v {Boolean} 关闭与否
     */
    showClose(v) {
      if (v) {
        this.filterText = "";
      }
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    // 点击时设置单选
    treeNodeClick(data) {
      if (data.id === this.tempId) {
        if (this.$refs.tree.getCheckedKeys().length === 0) {
          this.$refs.tree.setCheckedKeys([]);
          this.$emit("clickTreeNode", {});
        } else if (this.$refs.tree.getCheckedKeys().length === 1) {
          this.$refs.tree.setCheckedKeys([data.id]);
          this.$emit("clickTreeNode", data);
        }
      } else {
        this.$refs.tree.setCheckedKeys([data.id]);
        this.$emit("clickTreeNode", data);
      }
      this.tempId = data.id;
    },
    /**
     * @function 点击搜索
     */
    clickSeach() {
      this.$refs.tree.filter(this.filterText);
    }
  }
};
</script>

<style lang="less">
.tree {
  padding: 0 20px 0 20px;
  overflow: auto;
  .seach {
    position: fixed;
    display: flex;
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
  .filter-tree {
    padding-top: 120px;
    padding-left: 20px;
  }
}
</style>
