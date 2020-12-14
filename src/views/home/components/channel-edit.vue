<template>
  <div class="channel-edit">
    <van-cell :border="false" title="我的频道" size="large">
      <van-button
        class="edit-btn"
        plain
        type="danger"
        size="mini"
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        :class="{ active: index == active }"
        v-for="(channels, index) in myChannels"
        :key="index"
        @click="onRemoveChannel(index)"
      >
        <van-icon
          v-if="isEdit && !fiexChannels.includes(channels.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span slot="text">{{ channels.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false" title="频道推荐" size="large"> </van-cell>
    <van-grid :gutter="10" class="edit-grid">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel } from '@/api/channel'
export default {
  name: '',
  data() {
    return {
      allChannel: [], // 所有频道列表
      isEdit: false,
      fiexChannels: [0] //固定频道
    }
  },
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    // 未被选择的频道列表
    // recommendChannels() {
    //   const channels = this.allChannel
    //   this.allChannel.forEach((item, index) => {
    //     this.myChannels.forEach((item2, index2) => {
    //       if (item.id == item2.id) {
    //         console.log(item.id, item.name)
    //         channels.splice(index, 1)
    //         return
    //       }
    //     })
    //   })
    //   return channels
    // }

    // 第二种
    recommendChannels() {
      return this.allChannel.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created() {
    // 获取所有频道列表
    this.loadAllChannel()
    console.log(this.allChannel)
  },
  mounted() {},
  methods: {
    // 获取所有频道
    async loadAllChannel() {
      try {
        const { data } = await getAllChannel()
        // console.log(data)
        this.allChannel = data.data.channels
        console.log(this.allChannel)
      } catch (err) {
        // console.log(err)
        this.$toast('数据获取失败')
      }
    },
    // 添加频道到我的频道
    onAddChannel(channel) {
      this.myChannels.push(channel)
    },
    // 删除当前点击的我的频道
    onRemoveChannel(index) {
      if (this.isEdit && !this.fiexChannels.includes(index)) {
        this.myChannels.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 80px 0;
  .van-cell {
    display: flex;
    align-items: center;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.van-grid-item {
    width: 91px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f6f7;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
      }
      span {
        font-size: 28px;
      }
      .van-grid-item__text {
        margin-top: 10px;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }

    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
      }
    }
  }
  // 激活的频道
  .active {
    color: #f85959 !important;
  }
  // 频道推荐加号样式
  /deep/.edit-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 24px;
        margin-right: 4px;
      }
    }
  }

  // 右上角加号图标
  /deep/ .my-grid {
    .van-icon-clear {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
      z-index: 99;
      color: #ccc;
    }
  }
}
</style>
