# o2-tv-noise

[![Build Status](https://travis-ci.org/novelsphere/o2-tv-noise.svg?branch=master)](https://travis-ci.org/novelsphere/o2-tv-noise)

![Preview](https://cloud.githubusercontent.com/assets/127193/14793932/f9dda21c-0b53-11e6-9a4f-fe63c97bf12c.png)

Add a noise layer to the game, something like an old television.

- It is made for, and used in [Ghostpia](http://ghostpia.xyz).
- It redaws for every frame, every pixel.
- You can specify the which layer is it above / below
- Color and opacity are customizable

ゲームのノイズのレイヤーを追加します、古いテレビ見たいなやつ。

- [Ghostpia](http://ghostpia.xyz) のために作った、そして使われた
- 更新するたびにピクセルを全部再描画
- どのレイヤーの上、下にあるのかを指定できる
- 色と透明度は設定できる

## Usage 使い方

- Download `tv-noise.js`
- Move the file to your project's plugin folder
- Add this to the beginning of your `first.ks`
  ```
  [o2_loadplugin module="tv-noise.js"]
  ```

- Enable it like this
  ```
  [tvnoise
  enable=true
  above=base
  opacity=255
  color=0xffffff
  ]
  ```

------

- `tv-noise.js` をダウンロード
- ファイルをプロジェクトの plugin フォルダーに移動
- `first.ks` の最初にこれを追加
  ```
  [o2_loadplugin module="tv-noise.js"]
  ```

- こういう風に起動する
  ```
  [tvnoise
  enable=true
  above=base
  opacity=255
  color=0xffffff
  ]
  ```

### Parameters 属性

All parameters are optional, if nothing is provided, nothing changes.

- `enabled`
  - true / false
  - Specify whether the noise layer is enabled
  - レイヤーを起動 / 無効化する
- above
  - Specific which layer is the noise layer above, e.g. "base", "0", "message0"
  - どのレイヤーの上にあるのかを指定する
- index
  - Specific the order of layer, see the index of [[layopt]](https://developer.novelsphere.jp/doc/o2doc2/content/ref_tag.html#layopt)
  - indexでどのレイヤーの上にあるのかを指定する、詳細は [[layopt]](https://developer.novelsphere.jp/doc/o2doc2/content/ref_tag.html#layopt) を読んで
  - `index` has higher priority than `above`
  - `above` より `index` が優先されます
- opacity
  - 透明度
  - 0 - 255


- color
  - 0xrrggbb