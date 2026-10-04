# 行列之间 · Determinant Lab

可自由选择操作的行列式学习网站，包含 60 道练习、精确数学运算、过程动画和可关闭的交互音效。

**在线使用：[GitHub Pages](https://gaygay-lab.github.io/determinant-lab/)**

## 功能

- 60 题，覆盖 2–5 阶和 10 类结构：求和差分、基础变换、三对角递推、分块结构、范德蒙、秩一更新、三角与逆序、线性相关、拆分辨析、齐次范德蒙。
- 任选目标、来源和倍数，使用行列倍加、汇总、交换、常数倍乘、转置与符合条件时提取 x。
- 预览结果、撤销、重做、分题保存路线。无需按唯一顺序解题。
- 零块压缩、非零排列项计数和可读结构识别。
- 九类 Web Audio 合成音效，提供静音、音量和独立试听。
- 纯静态 HTML/CSS/JavaScript，无后端、账户或第三方运行时依赖。

## 使用与开发

下载仓库后直接打开 `index.html`，或在仓库根目录启动任意静态文件服务器，例如：

```sh
python -m http.server 8000
```

然后打开 `http://localhost:8000`。文件全部使用相对路径，可部署到 GitHub Pages 的项目子目录。

```sh
node tests/engine-test.cjs
node tests/symbolic-test.cjs
node tests/bank-test.cjs
```

测试无需安装 npm 依赖。

## 文件

| 文件 | 作用 |
| --- | --- |
| `index.html`、`app.js` | 自由操作界面与游戏状态 |
| `styles.css`、`play.css` | 视觉、响应式和动画 |
| `engine.js` | BigInt 有理数计算 |
| `symbolic.js` | 精确多项式运算与结构识别 |
| `problems.js` | 60 题及参考路线 |
| `sound.js` | 程序化音效 |
| `guide.html`、`guide.js` | 第一题的参考推演 |

## 数学与范围

第 1 题保留含 x 的符号矩阵，其余 59 题为数值练习。倍乘、交换和提取因子都会同步更新外因子，保证原始行列式的值不变。提取 x 使用多项式系数操作，在 x=0 时也成立。

当前可以通过自由消元处理三对角与分块题；尚无专用递推树、拉普拉斯展开动画或通用含变量分式求解器。参考路线只展示一种解法。

学习记录和声音偏好只保存在访问者自己的浏览器 `localStorage` 中。此项目不发送这些记录到服务器。

## 开源与来源

源代码使用 [MIT 许可证](LICENSE)。音效设计参考与上游 MIT 声明见 [sound-sources.txt](sound-sources.txt)。`note.jpg` 是经网站作者授权公开展示的原始数学手稿参考图，版权归原作者，不纳入代码的 MIT 授权。
