<template>
  <section>
    <!-- モーダルウィンドウ -->
    <div
      id="modal-content"
    >
      <!-- モーダルウィンドウのコンテンツ開始 -->
      <div
        id="modal-content-innar"
      >
        <p style="white-space: pre-wrap;">{{ final_msg }}</p>
        <button
          id="next_play"
          @click="next"
        >再戦する
        </button>
        <button
          id="exit_play"
          @click="exit"
        >退出する
        </button>
      </div>
    <!-- モーダルウィンドウのコンテンツ終了 -->
    </div>
    <div
      id="modal-bg"
    />
    <!-- モーダルウィンドウ -->
  </section>
</template>

<script>
export default {
  props: {
    final_msg: {
      type: String,
      default: '現在、試合中ではございません。'
    }
  },
  mounted() {
    const modal_bg = document.getElementById('modal-bg')
    const modal_content = document.getElementById('modal-content')
    const modal_content_innar = document.getElementById('modal-content-innar')
    const w = window.innerWidth
    const h = window.innerHeight
    const cw = modal_content_innar.getBoundingClientRect().width
    const ch = modal_content_innar.getBoundingClientRect().height

    //取得した値をcssに追加する
    modal_content.style.left = (w - cw) / 2 + 'px'
    modal_content.style.top = +((h - ch) / 3) + 'px'
  },
  methods: {
    exit: function() {
      if (localStorage.getItem('msweep') !== null) {
        const param = 'id=' + localStorage.getItem
        const url = '/exit/?' + param
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.send()

        // サーバーからの応答内容を処理
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            localStorage.removeItem('msweep') //ローカルストレージのIDを削除
            window.open('/', '_self').close() //画面を閉じる
          }
        }
      }
    },
    next: function() {
      if (localStorage.getItem('msweep') !== null) {
        let next_flg = true
        const id = localStorage.getItem('msweep')
        const param = 'id=' + id
        const url = '/nextplay/?' + param
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.send()

        // サーバーからの応答内容を処理
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this.$emit('next_flg', true)
          } else {
            this.$emit('next_flg', false)
          }
        }
      }
    }
  }
}
</script>

<style>
#next_play,
#exit_play {
  margin: 10px;
  text-align: center;
  background: transparent;
  border: 1px solid #1ebeb4;
  color: #1ebeb4;
}
#modal-content {
  width: 40%;
  padding: 10px 20px;
  border: 2px solid #aaa;
  background: #fff;
  position: fixed;
  z-index: 2;
  text-align: center;
}

#modal-content-innar {
  margin: 0 auto;
  width: 100%;
  z-index: 2;
}

#modal-bg {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
