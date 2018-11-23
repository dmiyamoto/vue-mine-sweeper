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
          :id="'y=' + i"
          :class="'row'"
        >
          <div
            v-for="t in 10"
            :key="t"
            :id="'x=' + t"
            :class="'col'"
            @click.right.prevent="flag"
            @click="set"
          />
        </div>
      </div>
      <div
        v-show="init_flg"
        id="play"
      >
        <button
          id="competition_start"
          @click="play"
        >対戦開始
        </button>
        <button
          id="next_play"
          disabled
          @click="nextPlay"
        >再戦する
        </button>
        <button
          id="exit_play"
          disabled
          @click="exitPlay"
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
      intervalId: undefined
    }
  },
  mounted() {
    //*******************変数宣言領域***********************
    var play_flg = false //試合中か否かの判定フラグ
    var restart_flg = false //再入室したか否かの判定フラグ
    var final_flg = false //試合終了したか否かの判定フラグ
    var next_flg = false //再戦希望か否かの判定フラグ
    var msg_roomA = [] //メッセージ管理用
    const COLS = 10 //横10マス
    const ROWS = 10 //縦10マス
    //******************************************************
    // ポーリング処理
    this.intervalId = setInterval(function() {
      if (play_flg) {
        if (final_flg === false) {
          var tmpResponse
          var state_info
          var xhr = new XMLHttpRequest()
          var url = '/draw/'
          xhr.open('GET', url, true)
          xhr.send()

          // サーバーからの応答内容を処理
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              tmpResponse = JSON.parse(xhr.responseText)
              if (tmpResponse['msg'] === '' || restart_flg) {
                state_info = tmpResponse['map']
                restart_flg = false // 再入室時１回のみの処理

                //y座標の処理ループ
                for (var q = 1; q <= ROWS; q++) {
                  //x座標の処理ループ
                  for (var t = 0; t < COLS; t++) {
                    var y = document.getElementById('y=' + q)
                    var x = document.getElementById('y=' + q).childNodes[t]
                    if (state_info[q - 1][t]['opened'] === false) {
                      x.childElementCount !== 0 ? (x.innerHTML = '') : ''
                    } else if (
                      state_info[q - 1][t]['opened'] &&
                      state_info[q - 1][t]['hasFlag'] === false
                    ) {
                      x.style.backgroundColor = 'whitesmoke' //マスを開いた状態を描画
                      // 該当箇所に爆弾が無く、周囲に爆弾があれば、爆弾の個数を描画
                      if (state_info[q - 1][t]['numBom'] !== '') {
                        switch (state_info[q - 1][t]['numBom']) {
                          case 1:
                            x.classList.add('splite1')
                            break
                          case 2:
                            x.classList.add('splite2')
                            break
                          case 3:
                            x.classList.add('splite3')
                            break
                          case 4:
                            x.classList.add('splite4')
                            break
                          case 5:
                            x.classList.add('splite5')
                            break
                          case 6:
                            x.classList.add('splite6')
                            break
                          case 7:
                            x.classList.add('splite7')
                            break
                          case 8:
                            x.classList.add('splite8')
                            break
                          default:
                            break
                        }
                      }
                    } else if (
                      state_info[q - 1][t]['opened'] &&
                      state_info[q - 1][t]['hasFlag']
                    ) {
                      x.style.backgroundColor = 'whitesmoke' //マスを開いた状態を描画
                      x.classList.add('splite_flg') //フラグ画像を描画
                    }
                  }
                }
              } else {
                // 試合終了のメッセージ表示
                if (final_flg === false) {
                  final_flg = true //試合終了フラグをONにする
                  document.getElementById('competition_start').disabled = true // 対戦開始ボタンの操作を不可にする
                  document.getElementById('next_play').disabled = false // 再戦するボタンの操作を可能にする
                  document.getElementById('exit_play').disabled = false // 退出するボタンの操作を可能にする
                  alert(tmpResponse['msg'])
                }
              }
            }
          }
        } else if (final_flg && next_flg === false) {
          var xhr = new XMLHttpRequest()
          var url = '/nextstatus/'
          xhr.open('GET', url, true)
          xhr.send()

          // サーバーからの応答内容を処理
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var nextFlg = JSON.parse(xhr.responseText)
              if (nextFlg['flg']) {
                // 確認ダイアログの表示
                if (
                  window.confirm(
                    '対戦相手が再戦を希望しています。再戦されますか？\n再戦する場合はOK、退出する場合はキャンセルを押してください。'
                  )
                ) {
                  // OKボタン押下時の処理
                  var xhr = new XMLHttpRequest()
                  var url = '/nextstart/'
                  xhr.open('GET', url, true)
                  xhr.send()

                  // サーバーからの応答内容を処理
                  xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                      var tmp = JSON.parse(xhr.responseText)
                      // init(); //初期化処理を実施する
                      final_flg = false
                      document.getElementById(
                        'competition_start'
                      ).disabled = false // 対戦開始ボタンの操作を可能にする
                      document.getElementById('next_play').disabled = true // 再戦するボタンの操作を不可にする
                      document.getElementById('exit_play').disabled = true // 退出するボタンの操作を不可にする
                      alert(tmp)
                    }
                  }
                } else {
                  // キャンセルボタン押下時の処理
                  var xhr = new XMLHttpRequest()
                  var param = 'id=' + localStorage.getItem('msweep')
                  url = '/exit/?' + param
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
              }
            }
          }
        } else if (final_flg && next_flg) {
          var xhr = new XMLHttpRequest()
          var url = '/nextwait/'
          xhr.open('GET', url, true)
          xhr.send()

          // サーバーからの応答内容を処理
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var reply = JSON.parse(xhr.responseText)
              switch (reply['flg']) {
                case 'exit':
                  alert(reply['msg'])
                  next_flg = false
                  play_flg = false
                  final_flg = false
                  break
                case 'replay':
                  next_flg = false
                  final_flg = false
                  alert(reply['msg'])
                  break
                default:
                  break
              }
            }
          }
        }
      } else {
        // 対戦相手が試合開始しているか否か判定
        var tmpResponse
        if (localStorage.getItem('msweep') !== null) {
          var xhr = new XMLHttpRequest()
          var param = 'id=' + localStorage.getItem('msweep')
          var url = '/status/?' + param
          xhr.open('GET', url, true)
          xhr.send()

          // サーバーからの応答内容を処理
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var tmpResponse = JSON.parse(xhr.responseText)
              tmpResponse['flg']
                ? (play_flg = tmpResponse['flg']) //試合開始する
                : ''
              if (play_flg) {
                alert(tmpResponse['msg'])
              } else {
                if (tmpResponse['msg'].length > 0 && msg_roomA.length < 2) {
                  for (var t = 0; t < tmpResponse['msg'].length; t++) {
                    if (msg_roomA.length !== 0) {
                      msg_roomA[0] !== tmpResponse['msg'][t]
                        ? msg_roomA.push(tmpResponse['msg'][t])
                        : ''
                      if (msg_roomA[0] !== tmpResponse['msg'][t]) {
                        var content = msg_roomA[0]
                        for (var s = 1; s < msg_roomA.length; s++) {
                          content = content + '\n\n' + msg_roomA[s]
                        }
                        document.getElementById('msg').value = content
                      }
                    } else {
                      msg_roomA.push(tmpResponse['msg'][t])
                      var content = msg_roomA[0]
                      document.getElementById('msg').value = content
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, 1000)
  },
  beforeDestroy() {
    console.log('clearInterval')
    clearInterval(this.intervalId)
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
    },
    set: function(e) {
      var x = e.currentTarget.id
      var y = e.currentTarget.parentNode.id
      var playerID = localStorage.getItem('msweep')

      var xhr = new XMLHttpRequest()
      var param = 'id=' + playerID + '&' + x + '&' + y + '&flg=' + ''
      var url = '/set/?' + param
      xhr.open('GET', url, true)
      xhr.send()

      // サーバーからの応答内容を処理
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText)
          if (data['flg']) {
            document.getElementById('competition_start').disabled = true // 対戦開始ボタンの操作を不可にする
            document.getElementById('next_play').disabled = false // 再戦するボタンの操作を可能にする
            document.getElementById('exit_play').disabled = false // 退出するボタンの操作を可能にする
          }
          data['msg'] !== '' ? alert(data['msg']) : ''
        }
      }
    },
    flag: function(e) {
      var x = e.currentTarget.id
      var y = e.currentTarget.parentNode.id
      var playerID = localStorage.getItem('msweep')

      var xhr = new XMLHttpRequest()
      var param = 'id=' + playerID + '&' + x + '&' + y + '&flg=true'
      var url = '/set/?' + param
      xhr.open('GET', url, true)
      xhr.send()

      // サーバーからの応答内容を処理
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText)
          if (data['flg']) {
            document.getElementById('competition_start').disabled = true // 対戦開始ボタンの操作を不可にする
            document.getElementById('next_play').disabled = false // 再戦するボタンの操作を可能にする
            document.getElementById('exit_play').disabled = false // 退出するボタンの操作を可能にする
          }
          data['msg'] !== '' ? alert(data['msg']) : ''
        }
      }
    },
    play: function() {
      var xhr = new XMLHttpRequest()
      var url = '/play/'
      xhr.open('GET', url, true)
      xhr.send()

      // サーバーからの応答内容を処理
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          JSON.parse(xhr.responseText) !== ''
            ? alert(JSON.parse(xhr.responseText))
            : ''
        }
      }
    },
    exitPlay: function() {
      if (localStorage.getItem('msweep') !== null) {
        var param = 'id=' + localStorage.getItem
        var xhr = new XMLHttpRequest()
        var url = '/exit/?' + param
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
    nextPlay: function() {
      if (localStorage.getItem('msweep') !== null) {
        next_flg = true
        var id = localStorage.getItem('msweep')
        var param = 'id=' + id
        var xhr = new XMLHttpRequest()
        var url = '/nextplay/?' + param
        xhr.open('GET', url, true)
        xhr.send()

        // サーバーからの応答内容を処理
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            next_flg = true
          } else {
            next_flg = false
          }
        }
      }
    }
  }
}
</script>

<style>
#board {
  width: 300px;
  height: 300px;
  margin: 20px;
}

.row {
  display: flex;
}

.col {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background-color: darkgrey;
}

.splite1 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: 0px 0px;
}

.splite2 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -31px 0px;
}

.splite3 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -61px 0px;
}

.splite4 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -91px 0px;
}

.splite5 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -121px 0px;
}

.splite6 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -151px 0px;
}

.splite7 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -181px 0px;
}

.splite8 {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -211px 0px;
}

.splite_flg {
  display: block;
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -271px 0px;
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
