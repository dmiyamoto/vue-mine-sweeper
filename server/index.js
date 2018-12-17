const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

app.use('/assets', express.static(__dirname + '/assets'))

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

// 初期ステータス一覧
// prettier-ignore
let init_state = {
  map: [
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
    [{opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}, {opened:false, hasBom:false, numBom:'', hasFlag:false}],
  ],
  client: [
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
    [{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false},{opened:false}],
  ],
  player: {
    one: '',
    two: '',
    oneID: '',
    twoID: '',
    roomName: ''
  },
  explosion: {
    player: ''
  },
  score: {
    one: 0,
    two: 0
  }
}

const COLS = 10,
  ROWS = 10 // 横10、縦10マス

let state = {} // 試合中の情報
let play_flg = false //試合中か否かの判定フラグ
let final_flg = false //試合終了したか否かの判定フラグ
let next_flg = false //再戦希望か否かの判定フラグ
let replay_flg = false //再戦を受け入れたか否かの判定フラグ
let exit_flg = false //対戦相手が退出したか否かの判定フラグ
let x = 0 //座標取得用変数のCOLS用
let y = 0 //座標取得用変数のROWS用

let calcX
let calcY

let msg // メッセージ用変数

// 開く箇所周囲の爆弾有無チェック用配列
const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0]
]

// ルーム管理
let roomA = []

app.get('/prepare', function(req, res) {
  const room = req.query
  let flag_room = false
  switch (room['opval']) {
    case 'roomA':
      if (roomA.length < 2) {
        let detail = {
          id: room['id'],
          player: room['player'],
          roomName: room['optxt']
        }
        roomA.push(detail)
      } else {
        flag_room = true
      }
      break
  }

  flag_room ? (msg = 'その部屋は他のプレーヤーが対戦中です。') : (msg = '')

  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json(msg)
})

app.get('/restart', function(req, res) {
  const room = req.query
  let reFlag = { flg: false, name: '' }
  switch (room['opval']) {
    case 'roomA':
      for (let i = 0; i < roomA.length; i += 1) {
        if (roomA[i]['id'] === room['id'])
          reFlag = { flg: true, name: roomA[idx]['player'] }
      }

      reFlag['flg']
        ? (msg = reFlag['name'] + 'が、' + room['optxt'] + 'に再入室しました')
        : (msg = 'その部屋は他のプレーヤーが対戦中です。')
      res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
      res.json(msg)
      break
  }
})

app.get('/play', function(req, res) {
  if (roomA.length === 2 && play_flg === false) {
    play_flg = true
    //オブジェクトを初期化（初回用）
    state = Object.assign({}, init_state)

    //オブジェクトを初期化（２周目以降用）
    for (let k = 0; k < ROWS; k++) {
      for (let c = 0; c < COLS; c++) {
        state['map'][k][c]['opened'] = false
        state['map'][k][c]['hasBom'] = false
        state['map'][k][c]['numBom'] = false
        state['map'][k][c]['hasFlag'] = false
        state['client'][k][c]['opened'] = false
        if (state['client'][k][c]['numBom'] !== undefined) {
          delete state['client'][k][c]['numBom']
          delete state['client'][k][c]['hasFlag']
        }
      }
    }
    state['score']['one'] = 0
    state['score']['two'] = 0

    for (let i = 0; i < ROWS; i++) {
      state['map'][i][Math.floor(Math.random() * 10)] = {
        opened: false,
        hasBom: true,
        numBom: '',
        hasFlag: false
      }
    }

    state['player']['one'] = roomA[0]['player']
    state['player']['two'] = roomA[1]['player']
    state['player']['oneID'] = roomA[0]['id']
    state['player']['twoID'] = roomA[1]['id']
    state['player']['roomName'] = roomA[0]['roomName']
    msg = ''
  } else if (play_flg) {
    msg = '既に試合中です。'
  } else {
    msg = 'まだ対戦相手がいないので、試合開始できません。'
  }

  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json(msg)
})

app.get('/nextplay', function(req, res) {
  next_flg = true
  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json('')
})

app.get('/nextstatus', function(req, res) {
  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json({ flg: next_flg })
})

app.get('/nextstart', function(req, res) {
  //初期化
  for (let k = 0; k < ROWS; k++) {
    for (let c = 0; c < COLS; c++) {
      state['map'][k][c]['opened'] = false
      state['map'][k][c]['hasBom'] = false
      state['map'][k][c]['numBom'] = false
      state['map'][k][c]['hasFlag'] = false
      state['client'][k][c]['opened'] = false
      if (state['client'][k][c]['numBom'] !== undefined) {
        delete state['client'][k][c]['numBom']
        delete state['client'][k][c]['hasFlag']
      }
    }
  }
  state['score']['one'] = 0
  state['score']['two'] = 0

  final_flg = false
  next_flg = false
  replay_flg = true

  for (let i = 0; i < ROWS; i++) {
    state['map'][i][Math.floor(Math.random() * 10)] = {
      opened: false,
      hasBom: true,
      numBom: '',
      hasFlag: false
    }
  }

  msg = '試合が開始しますので、よろしくお願いします。'

  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json(msg)
})

app.get('/exit', function(req, res) {
  const exitData = req.query

  for (let k = 0; k < ROWS; k++) {
    for (let c = 0; c < COLS; c++) {
      state['map'][k][c]['opened'] = false
      state['map'][k][c]['hasBom'] = false
      state['map'][k][c]['numBom'] = false
      state['map'][k][c]['hasFlag'] = false
      state['client'][k][c]['opened'] = false
      if (state['client'][k][c]['numBom'] !== undefined) {
        delete state['client'][k][c]['numBom']
        delete state['client'][k][c]['hasFlag']
      }
    }
  }
  if (state['player']['oneID'] === exitData['id']) {
    state['player']['one'] = ''
    state['player']['oneID'] = ''
  } else {
    state['player']['two'] = ''
    state['player']['twoID'] = ''
  }
  state['score']['one'] = 0
  state['score']['two'] = 0

  play_flg = false
  final_flg = false
  next_flg = false
  exit_flg = true

  for (let s = 0; s < roomA.length; s++) {
    if (roomA[s]['id'] === exitData['id']) roomA.splice(s, 1)
  }

  msg = ''
  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json(msg)
})

app.get('/nextwait', function(req, res) {
  if (exit_flg) {
    exit_flg = false
    msg =
      '対戦相手が退出しました。新しい対戦相手が入室してくるまでお待ちください。'
    res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
    res.json({ msg: msg, flg: 'exit' })
  } else if (replay_flg) {
    replay_flg = false
    msg =
      '対戦相手が再戦を受け入れましたので再試合が開始します。\nよろしくお願いします。'
    res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
    res.json({ msg: msg, flg: 'replay' })
  } else {
    msg = ''
    res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
    res.json({ msg: msg, flg: '' })
  }
})

app.get('/status', function(req, res) {
  let data = []
  for (let a = 0; a < roomA.length; a++) {
    data.push(
      roomA[a]['player'] + 'が、' + roomA[a]['roomName'] + 'に入室しました'
    )
  }
  msg = data
  if (play_flg) msg = '試合が開始しましたので、よろしくお願いします。'
  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json({ msg: msg, flg: play_flg })
})

app.get('/set', function(req, res) {
  const data = req.query
  let cnt = 0 // 開いているブロック数の合計

  // 現在開いているマスの数を計測
  if (play_flg) {
    for (let i = 0; i < ROWS; i += 1) {
      for (let s = 0; s < COLS; s += 1) {
        cnt = cnt + (state['map'][i][s]['opened'] ? 1 : 0)
      }
    }
  }

  // 試合中かつ対象のプレイヤーなら、操作を可能とする
  if (
    play_flg &&
    final_flg === false &&
    cnt !== COLS * ROWS &&
    (data['id'] === state['player']['oneID'] ||
      data['id'] === state['player']['twoID'])
  ) {
    // y座標を取得
    calcY = data['y'] - 1

    // x座標を取得
    calcX = data['x'] - 1

    // 対象座標の箇所を判定・処理
    if (
      state['map'][calcY][calcX]['opened'] === false &&
      state['map'][calcY][calcX]['hasBom'] === false
    ) {
      // 所定の箇所を開き、その周囲に爆弾が無いかチェックしてオープンする。
      let counter = 0
      for (let h = 0; h < directions.length; h++) {
        let tmp2X = calcX - directions[h][0]
        let tmp2Y = calcY - directions[h][1]
        if (
          tmp2X >= 0 &&
          tmp2X < COLS &&
          tmp2Y >= 0 &&
          tmp2Y < ROWS &&
          state['map'][tmp2Y][tmp2X] !== 0
        ) {
          counter = counter + state['map'][tmp2Y][tmp2X]['hasBom'] ? 1 : 0
        }
      }

      if (state['player']['oneID'] === data['id']) {
        if (data['flg']) {
          // 該当箇所を開き、対象プレーヤーから得点を減算する(間違った箇所にフラグを立てているため)
          state['map'][calcY][calcX] = {
            opened: true,
            hasBom: false,
            numBom: counter !== 0 ? counter : '',
            hasFlag: true
          }
          state['client'][calcY][calcX] = { opened: true, hasFlag: true }
          state['score']['one'] = state['score']['one'] - 1
        } else {
          // 該当箇所を開き、対象プレーヤーに得点を加算し、周囲のマスを開く
          state['map'][calcY][calcX] = {
            opened: true,
            hasBom: false,
            numBom: counter !== 0 ? counter : '',
            hasFlag: false
          }
          state['client'][calcY][calcX] = {
            opened: true,
            numBom: counter !== 0 ? counter : '',
            hasFlag: false
          }
          state['score']['one'] = state['score']['one'] + 1
          judge(calcX, calcY, data['id'])
        }
      } else if (state['player']['twoID'] === data['id']) {
        if (data['flg']) {
          // 該当箇所を開き、対象プレーヤーから得点を減算する(間違った箇所にフラグを立てているため)
          state['map'][calcY][calcX] = {
            opened: true,
            hasBom: false,
            numBom: counter !== 0 ? counter : '',
            hasFlag: true
          }
          state['client'][calcY][calcX] = { opened: true, hasFlag: true }
          state['score']['two'] = state['score']['two'] - 1
        } else {
          // 該当箇所を開き、対象プレーヤーに得点を加算し、周囲のマスを開く
          state['map'][calcY][calcX] = {
            opened: true,
            hasBom: false,
            numBom: counter !== 0 ? counter : '',
            hasFlag: false
          }
          state['client'][calcY][calcX] = {
            opened: true,
            numBom: counter !== 0 ? counter : '',
            hasFlag: false
          }
          state['score']['two'] = state['score']['two'] + 1
          judge(calcX, calcY, data['id'])
        }
      }
      msg = ''
    } else if (
      state['map'][calcY][calcX]['opened'] &&
      state['map'][calcY][calcX]['hasFlag'] === false
    ) {
      msg = ''
    } else if (
      state['map'][calcY][calcX]['opened'] &&
      state['map'][calcY][calcX]['hasFlag'] &&
      state['map'][calcY][calcX]['hasBom'] === false
    ) {
      if (state['player']['oneID'] === data['id'] && data['flg']) {
        state['map'][calcY][calcX] = {
          opened: false,
          hasBom: false,
          numBom: '',
          hasFlag: false
        }
        state['client'][calcY][calcX] = { opened: false }
        state['score']['one'] = state['score']['one'] + 1
      } else if (state['player']['twoID'] === data['id'] && data['flg']) {
        state['map'][calcY][calcX] = {
          opened: false,
          hasBom: false,
          numBom: '',
          hasFlag: false
        }
        state['client'][calcY][calcX] = { opened: false }
        state['score']['two'] = state['score']['two'] + 1
      }
      msg = ''
    } else if (
      state['map'][calcY][calcX]['opened'] &&
      state['map'][calcY][calcX]['hasFlag'] &&
      state['map'][calcY][calcX]['hasBom']
    ) {
      if (state['player']['oneID'] === data['id'] && data['flg']) {
        state['map'][calcY][calcX] = {
          opened: false,
          hasBom: true,
          numBom: '',
          hasFlag: false
        }
        state['client'][calcY][calcX] = { opened: false }
        state['score']['one'] = state['score']['one'] - 1
      } else if (state['player']['twoID'] === data['id'] && data['flg']) {
        state['map'][calcY][calcX] = {
          opened: false,
          hasBom: true,
          numBom: '',
          hasFlag: false
        }
        state['client'][calcY][calcX] = { opened: false }
        state['score']['two'] = state['score']['two'] - 1
      }
      msg = ''
    } else if (
      state['map'][calcY][calcX]['opened'] === false &&
      state['map'][calcY][calcX]['hasBom']
    ) {
      if (state['player']['oneID'] === data['id'] && data['flg']) {
        state['map'][calcY][calcX] = {
          opened: true,
          hasBom: true,
          numBom: '',
          hasFlag: true
        }
        state['client'][calcY][calcX] = { opened: true, hasFlag: true }
        state['score']['one'] = state['score']['one'] + 1
        msg = ''
      } else if (state['player']['twoID'] === data['id'] && data['flg']) {
        state['map'][calcY][calcX] = {
          opened: true,
          hasBom: true,
          numBom: '',
          hasFlag: true
        }
        state['client'][calcY][calcX] = { opened: true, hasFlag: true }
        state['score']['two'] = state['score']['two'] + 1
        msg = ''
      } else {
        if (state['player']['oneID'] === data['id']) {
          if (state['explosion']['player'] === '') {
            state['explosion']['player'] = state['player']['oneID']
            msg =
              '爆弾に引っかかったので、' +
              state['player']['one'] +
              'さんの負けになります。'
          } else {
            msg = '対戦相手が爆弾に引っかかったので、あなたの勝利です。'
          }
        } else {
          if (state['explosion']['player'] === '') {
            state['explosion']['player'] = state['player']['twoID']
            msg =
              '爆弾に引っかかったので、' +
              state['player']['two'] +
              'さんの負けになります。'
          } else {
            msg = '対戦相手が爆弾に引っかかったので、あなたの勝利です。'
          }
        }
        final_flg = true
      }
    }
  } else if (play_flg === false && final_flg === false && cnt !== COLS * ROWS) {
    msg = 'まだ試合中では無いので操作できません。'
  } else if (play_flg && cnt === COLS * ROWS) {
    final_flg = true
    const part =
      '  ' +
      state['player']['one'] +
      'さん：' +
      state['score']['one'] +
      '点\n  ' +
      state['player']['two'] +
      'さん：' +
      state['score']['two'] +
      '点'
    if (state['score']['one'] === state['score']['two']) {
      msg = 'この勝負は引き分けになります。\n' + part
    } else if (state['score']['one'] > state['score']['two']) {
      msg = state['player']['one'] + 'さんの勝利です。\n' + part
    } else {
      msg = state['player']['two'] + 'さんの勝利です。\n' + part
    }
  } else if (play_flg && final_flg && cnt !== COLS * ROWS) {
    if (state['player']['oneID'] === data['id']) {
      if (state['explosion']['player'] === '') {
        state['explosion']['player'] = state['player']['oneID']
        msg =
          '爆弾に引っかかったので、' +
          state['player']['one'] +
          'さんの負けになります。'
      } else {
        msg = '対戦相手が爆弾に引っかかったので、あなたの勝利です。'
      }
    } else {
      if (state['explosion']['player'] === '') {
        state['explosion']['player'] = state['player']['twoID']
        msg =
          '爆弾に引っかかったので、' +
          state['player']['two'] +
          'さんの負けになります。'
      } else {
        msg = '対戦相手が爆弾に引っかかったので、あなたの勝利です。'
      }
    }
  }
  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json({ msg: msg, flg: final_flg, id: data['id'] })
})

app.get('/draw', function(req, res) {
  res.set('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN)
  res.json({ flg: final_flg, map: state['client'] })
})

// 所定の箇所の周囲を判定し、開いていく関数
function judge(calcX, calcY, playerID) {
  for (let p = 0; p < directions.length; p++) {
    let tmpX = calcX - directions[p][0]
    let tmpY = calcY - directions[p][1]
    if (
      tmpX >= 0 &&
      tmpX < COLS &&
      tmpY >= 0 &&
      tmpY < ROWS &&
      state['map'][tmpY][tmpX]['opened'] === false &&
      state['map'][tmpY][tmpX]['hasBom'] === false
    ) {
      let counter = 0
      for (let g = 0; g < directions.length; g++) {
        let tmp2X = tmpX - directions[g][0]
        let tmp2Y = tmpY - directions[g][1]
        if (tmp2X >= 0 && tmp2X < COLS && tmp2Y >= 0 && tmp2Y < ROWS) {
          counter = counter + state['map'][tmp2Y][tmp2X]['hasBom'] ? 1 : 0
        }
      }
      // 該当箇所を開き、対象プレーヤーに得点を加算
      state['map'][tmpY][tmpX] = {
        opened: true,
        hasBom: false,
        numBom: counter !== 0 ? counter : '',
        hasFlag: false
      }
      state['client'][tmpY][tmpX] = {
        opened: true,
        numBom: counter !== 0 ? counter : '',
        hasFlag: false
      }
      if (counter === 0) judge(tmpX, tmpY, playerID) // 再帰処理(周囲に爆弾が無い時だけ連鎖爆発させる)
      state['player']['oneID'] === playerID
        ? (state['score']['one'] = state['score']['one'] + 1)
        : (state['score']['two'] = state['score']['two'] + 1)
    }
  }
}
