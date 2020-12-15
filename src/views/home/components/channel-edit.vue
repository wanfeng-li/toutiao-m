<template>
  <div class="channel-edit">
    <van-cell :border="false" title="我的频道" size="large">
      <van-button class="edit-btn" plain type="danger" size="mini" round @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item class="grid-item" :class="{ active: index == active }" v-for="(channels, index) in myChannels" :key="index" @click="onRemoveChannel(channels,index)">
        <van-icon v-if="isEdit && !fiexChannels.includes(channels.id)" slot="icon" name="clear"></van-icon>
        <span slot="text">{{ channels.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false" title="频道推荐" size="large"> </van-cell>
    <van-grid :gutter="10" class="edit-grid">
      <van-grid-item class="grid-item" icon="plus" v-for="item in recommendChannels" :key="item.id" :text="item.name" @click="onAddChannel(item)" />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannel,
  addUserChannel,
  deleteUserChannel,
  // resteUserChannel,
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: '',
  data() {
    return {
      allChannel: [], // 所有频道列表
      isEdit: false,
      fiexChannels: [0], //固定频道
    }
  },
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
    // 未被选择的频道列表
    // 第二种
    recommendChannels() {
      return this.allChannel.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    },
  },
  watch: {},
  created() {
    // 获取所有频道列表
    this.loadAllChannel()
  },
  mounted() {},
  methods: {
    // 获取所有频道
    async loadAllChannel() {
      try {
        const { data } = await getAllChannel()
        this.allChannel = data.data.channels
      } catch (err) {
        // console.log(err)
        this.$toast('数据获取失败')
      }
    },
    // 添加频道到我的频道
    async onAddChannel(channel) {
      // 操作视图
      this.myChannels.push(channel)

      // 数据持久化
      if (this.user) {
        // 登录下存储到服务器
        try {
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length, // 序号
          })
          this.$toast('添加频道成功')
        } catch (err) {
          this.$toast('添加频道失败')
        }
      } else {
        // 未登录下存到本地
        setItem('TOUTIAO_CHANNEL', this.myChannels)
      }
    },
    // 删除当前点击的我的频道
    onRemoveChannel(channel, index) {
      // 如果是 true 就是编辑状态
      if (this.isEdit) {
        // 如果删除的是固定频道 则return
        if (this.fiexChannels.includes(index)) {
          return
        }
        this.myChannels.splice(index, 1)
        // 如果删的是前面的
        if (index < this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        // 处理数据持久化
        this.deleteChannel(channel.id)
      } else {
        // 切换频道状态
        // this.active = index
        this.$emit('updata-active', index, false)
      }
    },
    // 删除指定频道
    async deleteChannel(channelId) {
      if (this.user) {
        // 存储到线上
        try {
          await deleteUserChannel(channelId)
          this.$toast('移除频道成功')
        } catch (err) {
          this.$toast('移除频道失败')
        }
      } else {
        // 未登录下存到本地
        setItem('TOUTIAO_CHANNEL', this.myChannels)
      }
    },
  },
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
