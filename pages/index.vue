<template>
  <section class="container">
    <header style="text-align:center;">
      <p>自由にプレーヤー名を入力＋対戦ルームを選んで「入室」を入力してください。</p>
      <i>プレーヤー名：</i>
      <input
        id="name_input"
        type="text"
        style="width:150px;"
      >
      <label>
        <span class="title">　対戦ルーム：</span>
        <select
          id="room"
          style="width:150px;"
        >
          <option value="roomA">ルームA</option>
        </select>
      </label>
      <button @click="start('room') ">入室
      </button>
    </header>

    <div
      id="box"
    >
      <div
        v-show="init_flg"
        id="wrapper"
      >
        <label for="msg">＜ステータス＞</label>
        <textarea
          id="msg"
          name="textarea"
          cols="320"
          rows="400"
          readOnly/>
        <label for="explanation">＜当ゲームのルールについて＞</label>
        <div id="explanation">
          <p>当マインスイーパーは１対１の対戦ゲームです。</p>
          <p>自動でセットされた爆弾マス上には右クリックで旗を立て、<br>
            それ以外は左クリックで開いて自分の陣地にしてください。<br>
            自分の陣地1マスにつき、1点がもらえます。</p>
          <p>爆弾マスに旗を立てれば、1マスにつき1点がもらえます。<br>
            （※爆弾が無いマス上の旗１マスにつき1点マイナスです。<br>
            　　旗が立ってるマスは右クリックで閉じる事ができ、<br>
            　　爆弾が無いマス上の旗を閉じる事ができれば、<br>
            　　1点がもらえます。</p>
          <p>爆弾マスを誤って左クリックすると、開いたプレーヤーが<br>
            即座に負けとなりますので、ご注意ください。</p>
        </div>
      </div>
      <div
        v-show="init_flg"
        id="board"
      >
        <div
          v-for="i in 10"
          :key="i"
          :class="'row'"
        >
          <div
            v-for="t in 10"
            :key="t"
            :class="'col x' + t + ' ' + 'y' + i"
          />
        </div>
      </div>
      <div
        v-show="init_flg"
        id="play"
      >
        <button
          id="competition_start"
          onclick="play()"
        >対戦開始
        </button>
        <button
          id="next_play"
          onclick="nextPlay()"
          disabled
        >再戦する
        </button>
        <button
          id="exit_play"
          onclick="exitPlay()"
          disabled
        >退出する
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      init_flg: false, //盤面表示判定フラグ
      play_flg: false, //試合中か否かの判定フラグ
      restart_flg: false, //再入室したか否かの判定フラグ
      final_flg: false, //試合終了したか否かの判定フラグ
      flg_mode: false, //フラグモードか否かの判定フラグ
      next_flg: false, //再戦希望か否かの判定フラグ
      msg_roomA: [] //メッセージ管理用
    }
  },
  methods: {
    start(idname) {
      var obj = document.getElementById(idname)
      var idx = obj.selectedIndex
      var opval = obj.options[idx].value
      var optxt = obj.options[idx].text

      // 試合途中の再入室か本当に試合を開始するのかを判定
      if (localStorage.getItem('msweep') !== null) {
        var id = localStorage.getItem('msweep')
        var param = 'id=' + id + '&opval=' + opval + '&optxt=' + optxt
        var url = '/restart/?' + param
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.send()

        // サーバーからの応答内容を処理
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            JSON.parse(xhr.responseText) !==
            'その部屋は他のプレーヤーが対戦中です。'
              ? (this.init_flg = true)((this.play_flg = true))(
                  (this.restart_flg = true)
                )
              : alert(JSON.parse(xhr.responseText))
          }
        }
      } else {
        var player = document.getElementById('name_input').value // プレーヤー名を取得
        var id = 'id' + Math.floor(Math.random() * 1111111) + player // 当ユーザー用識別ID生成
        localStorage.setItem('msweep', id) //ローカルストレージに当ユーザー用識別ID格納

        // ユーザー情報をサーバー側にセット
        var param =
          'id=' +
          id +
          '&player=' +
          player +
          '&opval=' +
          opval +
          '&optxt=' +
          optxt
        var url = '/prepare/?' + param
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.send()

        // サーバーからの応答内容を処理
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            JSON.parse(xhr.responseText) ===
            'その部屋は他のプレーヤーが対戦中です。'
              ? alert(JSON.parse(xhr.responseText))
              : (this.init_flg = true)
          }
        }
      }
    }
  }
}
</script>

<style>
#board {
  width: 500px;
  height: 500px;
  margin: 20px;
}

.row {
  display: flex;
}

.col {
  width: 48px;
  height: 48px;
  border: 1px solid black;
  background-color: darkgrey;
}
#box {
  width: 66%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
}

#play {
  margin-top: 20px;
}

#msg {
  width: 326px;
  height: 220px;
  vertical-align: top;
  margin-right: 30px;
  margin-bottom: 20px;
}

#wrapper {
  width: 330px;
}

#explanation {
  border: 1px outset black;
  width: 326px;
  font-size: 12px;
}

#next_play,
#exit_play {
  margin-top: 5px;
}
</style>
