window.PROBLEMS = [
  {
    "id": 61,
    "title": "新手：倍加把它变成三角形",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2
      ],
      [
        3,
        4
      ]
    ],
    "expected": "-2",
    "hint": "把第二行减去第一行的3倍，下面左侧就会变成0。",
    "note": "上三角后只看主对角线：1×(−2)=−2。",
    "demoPrinciple": {
      "title": "倍加不改变行列式",
      "text": "把一行的倍数加到另一行，是剪切，不改变有向面积；造出三角形后，答案就是主对角线乘积。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3"
      }
    ]
  },
  {
    "id": 62,
    "title": "新手：交换一次，符号变了",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        0,
        1
      ],
      [
        2,
        3
      ]
    ],
    "expected": "-2",
    "hint": "左上角是0，先交换两行，再读上三角。",
    "note": "交换行让有向面积反向，外因子记录−1。",
    "demoPrinciple": {
      "title": "交换行会变号",
      "text": "同一个平行四边形换了方向，面积大小不变，但有向面积的正负相反。"
    },
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 1
      }
    ]
  },
  {
    "id": 63,
    "title": "新手：点击倍乘，数字自动算",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        0
      ],
      [
        0,
        2
      ]
    ],
    "expected": "2",
    "hint": "点击倍乘，系统会自动填入2；不用自己输入。",
    "note": "第一行乘2后，外因子自动补偿为1/2。",
    "demoPrinciple": {
      "title": "倍乘会同步改变因子",
      "text": "一行放大几倍，有向面积也放大几倍；游戏会把倍率放在矩阵外。"
    },
    "suggestedOps": [
      {
        "type": "scale",
        "axis": "row",
        "target": 0,
        "factor": "2"
      }
    ]
  },
  {
    "id": 64,
    "title": "新手：一键提出公因子",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        2,
        4
      ],
      [
        0,
        2
      ]
    ],
    "expected": "4",
    "hint": "长按第一行，点击“提出公因子”，系统自动找到2。",
    "note": "第一行提出2后，外因子为2，剩余三角矩阵对角线为1、2。",
    "demoPrinciple": {
      "title": "共同因子可以直接提出",
      "text": "一整行或一整列有共同数字因子时，可以先提到外面；玩家不需要计算倒数。"
    },
    "suggestedOps": [
      {
        "type": "scale",
        "axis": "row",
        "target": 0,
        "factor": "1/2"
      }
    ]
  },
  {
    "id": 65,
    "title": "新手：A 键全部汇入第一列",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        0
      ],
      [
        0,
        2
      ]
    ],
    "expected": "2",
    "hint": "按A键，把第二列汇入第一列；它会像方块一样漂过去。",
    "note": "第一列变成(1,2)，矩阵变成下三角，答案仍是2。",
    "demoPrinciple": {
      "title": "汇入是连续的倍加",
      "text": "把其余列依次加到目标列，每次都是列倍加，行列式保持不变。"
    },
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "column",
        "target": 0
      }
    ]
  },
  {
    "id": 66,
    "title": "新手：T 键转置",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2
      ],
      [
        0,
        3
      ]
    ],
    "expected": "3",
    "hint": "按T键转置；行列互换后仍然是同一个值。",
    "note": "转置后变成下三角，主对角线乘积为3。",
    "demoPrinciple": {
      "title": "行和列是对称的",
      "text": "转置只是把观察方向换了，线性变换的有向面积不变。"
    },
    "suggestedOps": [
      {
        "type": "transpose"
      }
    ]
  },
  {
    "id": 67,
    "title": "新手：按列倍加",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2
      ],
      [
        0,
        3
      ]
    ],
    "expected": "3",
    "hint": "选第二列为目标、第一列为来源，自动建议−2。",
    "note": "C2←C2−2C1后成为对角矩阵。",
    "demoPrinciple": {
      "title": "列操作和行操作同样合法",
      "text": "行列地位对称；列倍加也不会改变行列式。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "column",
        "target": 1,
        "source": 0,
        "factor": "-2"
      }
    ]
  },
  {
    "id": 68,
    "title": "新手：零列出现，答案就是0",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2
      ],
      [
        2,
        4
      ]
    ],
    "expected": "0",
    "hint": "让第二列减去第一列的2倍，观察整列零。",
    "note": "两列线性相关，平行四边形塌成线段。",
    "demoPrinciple": {
      "title": "零行或零列意味着体积归零",
      "text": "只要一整行或一整列为0，所有排列项都含0，行列式必为0。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "column",
        "target": 1,
        "source": 0,
        "factor": "-2"
      }
    ]
  },
  {
    "id": 69,
    "title": "新手：反三角只剩一条路线",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        0,
        2
      ],
      [
        3,
        0
      ]
    ],
    "expected": "-6",
    "hint": "现在已经是反三角；直接读副对角线，并数一次交换。",
    "note": "副对角线乘积6，排列21有1个逆序，所以答案−6。",
    "demoPrinciple": {
      "title": "排列符号来自交换次数",
      "text": "反三角排列21需要一次交换恢复到12，因此符号为−1。"
    },
    "suggestedOps": []
  },
  {
    "id": 70,
    "title": "新手：三阶连续消元",
    "family": "新手演示",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2,
        0
      ],
      [
        2,
        3,
        1
      ],
      [
        0,
        1,
        2
      ]
    ],
    "expected": "-3",
    "hint": "先消掉第二行第一列，再消掉第三行第二列。",
    "note": "变成上三角后，1×(−1)×3=−3。",
    "demoPrinciple": {
      "title": "消元是在删掉排列路线",
      "text": "每造出一个0，就会删掉一批不可能的排列项；最后只剩主对角线路线。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1"
      }
    ]
  },
  {
    "id": 71,
    "title": "2cos x 三对角 · n=3",
    "family": "三对角递推",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        0
      ],
      [
        1,
        "2x",
        1
      ],
      [
        0,
        1,
        "2x"
      ]
    ],
    "expected": "8x^3-4x",
    "formula": "sin(4x)/sin x",
    "formulaVariable": "c = cos(x)",
    "recurrence": "D₀=1，D₁=2c，Dₙ=2cDₙ₋₁−Dₙ₋₂",
    "numericSamples": {
      "0": "0",
      "1/2": "-1",
      "1": "4"
    },
    "special": "cos-tridiagonal",
    "n": 3,
    "hint": "先观察主对角线带和上下次对角线。",
    "note": "令 c=cos(x)，主对角线为 2c、相邻对角线为 1。D₃=8c³−4c，闭式为 sin(4x)/sin x。",
    "demoPrinciple": {
      "title": "三项递推来自带状结构",
      "text": "每扩大一阶，只会新增一条主对角线乘积和一条回退项。"
    },
    "suggestedOps": []
  },
  {
    "id": 72,
    "title": "2cos x 三对角 · n=4",
    "family": "三对角递推",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        0,
        0
      ],
      [
        1,
        "2x",
        1,
        0
      ],
      [
        0,
        1,
        "2x",
        1
      ],
      [
        0,
        0,
        1,
        "2x"
      ]
    ],
    "expected": "16x^4-12x^2+1",
    "formula": "sin(5x)/sin x",
    "formulaVariable": "c = cos(x)",
    "recurrence": "D₀=1，D₁=2c，Dₙ=2cDₙ₋₁−Dₙ₋₂",
    "numericSamples": {
      "0": "1",
      "1/2": "-1",
      "1": "5"
    },
    "special": "cos-tridiagonal",
    "n": 4,
    "hint": "把D1、D2写出来，观察D_n的递推。",
    "note": "令 c=cos(x)，带状结构给出 D₄=2cD₃−D₂=16c⁴−12c²+1，闭式为 sin(5x)/sin x。",
    "demoPrinciple": {
      "title": "只由三个数和阶数决定",
      "text": "主对角线、上下次对角线和阶数已经决定整个递推。"
    },
    "suggestedOps": []
  },
  {
    "id": 73,
    "title": "2cos x 三对角 · n=5",
    "family": "三对角递推",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        0,
        0,
        0
      ],
      [
        1,
        "2x",
        1,
        0,
        0
      ],
      [
        0,
        1,
        "2x",
        1,
        0
      ],
      [
        0,
        0,
        1,
        "2x",
        1
      ],
      [
        0,
        0,
        0,
        1,
        "2x"
      ]
    ],
    "expected": "32x^5-32x^3+6x",
    "formula": "sin(6x)/sin x",
    "formulaVariable": "c = cos(x)",
    "recurrence": "D₀=1，D₁=2c，Dₙ=2cDₙ₋₁−Dₙ₋₂",
    "numericSamples": {
      "0": "0",
      "1/2": "0",
      "1": "6"
    },
    "special": "cos-tridiagonal",
    "n": 5,
    "hint": "沿主对角线看冲击波，再回到递推。",
    "note": "令 c=cos(x)，D₅=2cD₄−D₃=32c⁵−32c³+6c，闭式为 sin(6x)/sin x。",
    "demoPrinciple": {
      "title": "从无限晶格截取一段",
      "text": "带状矩阵的局部规则不变，阶数只是截取长度。"
    },
    "suggestedOps": []
  },
  {
    "id": 74,
    "title": "爽关：一键汇入，整片归零",
    "family": "爽关",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        0
      ],
      [
        0,
        2
      ]
    ],
    "expected": "2",
    "hint": "按A，观察整列方块汇入后形成下三角。",
    "note": "这是一个适合第一次看到大块归零反馈的爽关。",
    "demoPrinciple": {
      "title": "汇入后立刻读三角",
      "text": "方块全部流入第一列，剩余结构一眼可读。"
    },
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "column",
        "target": 0
      }
    ]
  },
  {
    "id": 75,
    "title": "爽关：一列变成零",
    "family": "爽关",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2
      ],
      [
        0,
        3
      ]
    ],
    "expected": "3",
    "hint": "让第二列减去第一列的2倍，整列零会出现。",
    "note": "零块和主对角线会连续点亮。",
    "demoPrinciple": {
      "title": "零是最强的视觉反馈",
      "text": "一整列变成0时，排列路线会大面积消失。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "column",
        "target": 1,
        "source": 0,
        "factor": "-2"
      }
    ]
  },
  {
    "id": 76,
    "title": "爽关：第一列汇入后下三角",
    "family": "爽关",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        0
      ],
      [
        0,
        3
      ]
    ],
    "expected": "3",
    "hint": "按A，让第二列流进第一列。",
    "note": "整列移动后立刻形成下三角。",
    "demoPrinciple": {
      "title": "方块汇入后立即读值",
      "text": "这是最短的视觉爽点：一条汇入轨迹，直接留下对角线。"
    },
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "column",
        "target": 0
      }
    ]
  },
  {
    "id": 77,
    "title": "爽关：一条列操作清空上方",
    "family": "爽关",
    "difficulty": "入门",
    "matrix": [
      [
        1,
        2
      ],
      [
        0,
        3
      ]
    ],
    "expected": "3",
    "hint": "选第二列为目标，第一列为来源，自动建议−2。",
    "note": "第二列减去第一列的2倍后直接变成对角结构。",
    "demoPrinciple": {
      "title": "列倍加也能一击造零",
      "text": "目标列沿着第一列滑过去，两个格子同时落位，右上角归零。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "column",
        "target": 1,
        "source": 0,
        "factor": "-2"
      }
    ]
  },
  {
    "id": 78,
    "title": "爽关：三阶连续落零",
    "family": "爽关",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        2,
        0
      ],
      [
        3,
        4,
        1
      ],
      [
        0,
        1,
        2
      ]
    ],
    "expected": "-5",
    "hint": "先消掉左下，再消掉第二列下面的1。",
    "note": "两次消元后对角线为1、−2、5/2，结果−5。",
    "demoPrinciple": {
      "title": "连续两次落零",
      "text": "每次只消一个位置，第三行会沿着斜线继续落零，最后一口气读对角线。"
    },
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1/2"
      }
    ]
  },
  {
    "id": 2,
    "title": "二阶：用倍加制造零",
    "family": "基础变换",
    "difficulty": "基础",
    "matrix": [
      [
        3,
        2
      ],
      [
        1,
        4
      ]
    ],
    "expected": "10",
    "hint": "第一行减去第二行的三倍，第一列就只剩一个非零数。",
    "note": "二阶公式 ad−bc 可以与操作结果互相核对。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 1,
        "factor": "-3"
      }
    ]
  },
  {
    "id": 3,
    "title": "左上角为零时先换行",
    "family": "基础变换",
    "difficulty": "基础",
    "matrix": [
      [
        0,
        2,
        1
      ],
      [
        1,
        3,
        2
      ],
      [
        2,
        1,
        1
      ]
    ],
    "expected": "1",
    "hint": "先交换第一、二行，再消去第一列下方的2。",
    "note": "换行使内部行列式变号；外因子记录补偿，原题的值保持不变。",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 1
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "5/2"
      }
    ]
  },
  {
    "id": 201,
    "title": "2023 期末·三阶参数行列式",
    "family": "期末真题 · 行列式",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        "x",
        1
      ],
      [
        1,
        "-x",
        1
      ],
      [
        -3,
        2,
        "x"
      ]
    ],
    "expected": "-2x^3-x^2-10x+2",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2023 年期末资料：计算题1：求多项式行列式中 x^3 系数。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2023 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 202,
    "title": "2022 期末·三阶参数行列式",
    "family": "期末真题 · 行列式",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        3
      ],
      [
        "x",
        "-x",
        1
      ],
      [
        2,
        1,
        "x"
      ]
    ],
    "expected": "-2x^3-x^2+7x+2",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2022 年期末资料：填空题1：含参数 x 的三阶行列式。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2022 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 203,
    "title": "2012 期末·范德蒙参数行列式",
    "family": "期末真题 · 范德蒙",
    "difficulty": "挑战",
    "matrix": [
      [
        1,
        "x",
        "x^2",
        "x^3"
      ],
      [
        1,
        2,
        4,
        8
      ],
      [
        1,
        3,
        9,
        27
      ],
      [
        1,
        4,
        16,
        64
      ]
    ],
    "expected": "-2x^3+18x^2-52x+48",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2012 年期末资料：填空题4：D(x)=0 的根来自节点重合。",
    "sourceYear": 2012,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2012 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 204,
    "title": "2024 期末·循环三对角 n=3",
    "family": "期末真题 · 行列式",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        0
      ],
      [
        0,
        "2x",
        1
      ],
      [
        1,
        0,
        "2x"
      ]
    ],
    "expected": "8x^3+1",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2024 年期末资料：计算题3：循环带状行列式的特例 a=2x,b=1。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2024 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 205,
    "title": "2024 期末·循环三对角 n=4",
    "family": "期末真题 · 行列式",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        0,
        0
      ],
      [
        0,
        "2x",
        1,
        0
      ],
      [
        0,
        0,
        "2x",
        1
      ],
      [
        1,
        0,
        0,
        "2x"
      ]
    ],
    "expected": "16x^4-1",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2024 年期末资料：计算题3：循环带状行列式的特例 a=2x,b=1。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2024 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 206,
    "title": "2024 期末·循环三对角 n=5",
    "family": "期末真题 · 行列式",
    "difficulty": "挑战",
    "matrix": [
      [
        "2x",
        1,
        0,
        0,
        0
      ],
      [
        0,
        "2x",
        1,
        0,
        0
      ],
      [
        0,
        0,
        "2x",
        1,
        0
      ],
      [
        0,
        0,
        0,
        "2x",
        1
      ],
      [
        1,
        0,
        0,
        0,
        "2x"
      ]
    ],
    "expected": "32x^5+1",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2024 年期末资料：计算题3：循环带状行列式的特例 a=2x,b=1。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2024 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 207,
    "title": "2022 期末·特征多项式行列式",
    "family": "期末真题 · 行列式",
    "difficulty": "挑战",
    "matrix": [
      [
        "2-x",
        -2,
        0
      ],
      [
        -2,
        "1-x",
        -2
      ],
      [
        0,
        -2,
        "-x"
      ]
    ],
    "expected": "-x^3+3x^2+6x-8",
    "hint": "保留参数，先观察结构和递推/范德蒙因子。",
    "note": "2022 年期末资料：二次型题中的 |A−λE|。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "special": "exam-symbolic",
    "suggestedOps": [],
    "demoPrinciple": {
      "title": "2022 真题 · 参数行列式",
      "text": "参数矩阵保留符号形式；演示显示原式和引擎核对后的精确答案。"
    }
  },
  {
    "id": 208,
    "title": "2023 期末·参数行列式（x=-2）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -4,
        -2,
        1
      ],
      [
        1,
        2,
        1
      ],
      [
        -3,
        2,
        -2
      ]
    ],
    "expected": "34",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2023 年期末资料：计算题1 的数值代入。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "1/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-7/3"
      }
    ],
    "demoPrinciple": {
      "title": "2023 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 209,
    "title": "2023 期末·参数行列式（x=-1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -2,
        -1,
        1
      ],
      [
        1,
        1,
        1
      ],
      [
        -3,
        2,
        -1
      ]
    ],
    "expected": "13",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2023 年期末资料：计算题1 的数值代入。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-7"
      }
    ],
    "demoPrinciple": {
      "title": "2023 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 210,
    "title": "2023 期末·参数行列式（x=0）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        0,
        0,
        1
      ],
      [
        1,
        0,
        1
      ],
      [
        -3,
        2,
        0
      ]
    ],
    "expected": "2",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2023 年期末资料：计算题1 的数值代入。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 1
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "3"
      },
      {
        "type": "swap",
        "axis": "row",
        "target": 1,
        "source": 2
      }
    ],
    "demoPrinciple": {
      "title": "2023 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 211,
    "title": "2023 期末·参数行列式（x=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        1,
        1
      ],
      [
        1,
        -1,
        1
      ],
      [
        -3,
        2,
        1
      ]
    ],
    "expected": "-11",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2023 年期末资料：计算题1 的数值代入。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "7/3"
      }
    ],
    "demoPrinciple": {
      "title": "2023 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 212,
    "title": "2023 期末·参数行列式（x=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        4,
        2,
        1
      ],
      [
        1,
        -2,
        1
      ],
      [
        -3,
        2,
        2
      ]
    ],
    "expected": "-38",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2023 年期末资料：计算题1 的数值代入。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "7/5"
      }
    ],
    "demoPrinciple": {
      "title": "2023 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 213,
    "title": "2022 期末·参数行列式（x=-2）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -4,
        1,
        3
      ],
      [
        -2,
        2,
        1
      ],
      [
        2,
        1,
        -2
      ]
    ],
    "expected": "0",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：填空题1 的数值代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 214,
    "title": "2022 期末·参数行列式（x=-1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -2,
        1,
        3
      ],
      [
        -1,
        1,
        1
      ],
      [
        2,
        1,
        -1
      ]
    ],
    "expected": "-4",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：填空题1 的数值代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-4"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 215,
    "title": "2022 期末·参数行列式（x=0）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        0,
        1,
        3
      ],
      [
        0,
        0,
        1
      ],
      [
        2,
        1,
        0
      ]
    ],
    "expected": "2",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：填空题1 的数值代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 2
      },
      {
        "type": "swap",
        "axis": "row",
        "target": 1,
        "source": 2
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 216,
    "title": "2022 期末·参数行列式（x=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        1,
        3
      ],
      [
        1,
        -1,
        1
      ],
      [
        2,
        1,
        1
      ]
    ],
    "expected": "6",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：填空题1 的数值代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 217,
    "title": "2022 期末·参数行列式（x=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        4,
        1,
        3
      ],
      [
        2,
        -2,
        1
      ],
      [
        2,
        1,
        2
      ]
    ],
    "expected": "-4",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：填空题1 的数值代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1/5"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 218,
    "title": "2012 期末·范德蒙 D(x)（x=0）",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        0,
        0,
        0
      ],
      [
        1,
        2,
        4,
        8
      ],
      [
        1,
        3,
        9,
        27
      ],
      [
        1,
        4,
        16,
        64
      ]
    ],
    "expected": "48",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2012 年期末资料：D(x) 的数值代入。",
    "sourceYear": 2012,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-8/3"
      }
    ],
    "demoPrinciple": {
      "title": "2012 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 219,
    "title": "2012 期末·范德蒙 D(x)（x=1）",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        2,
        4,
        8
      ],
      [
        1,
        3,
        9,
        27
      ],
      [
        1,
        4,
        16,
        64
      ]
    ],
    "expected": "12",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2012 年期末资料：D(x) 的数值代入。",
    "sourceYear": 2012,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3"
      }
    ],
    "demoPrinciple": {
      "title": "2012 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 220,
    "title": "2024 期末·循环三对角 n=3（a=2, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        1,
        0
      ],
      [
        0,
        2,
        1
      ],
      [
        1,
        0,
        2
      ]
    ],
    "expected": "9",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1/4"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 221,
    "title": "2024 期末·循环三对角 n=3（a=3, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        3,
        1,
        0
      ],
      [
        0,
        3,
        1
      ],
      [
        1,
        0,
        3
      ]
    ],
    "expected": "28",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1/9"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 222,
    "title": "2024 期末·循环三对角 n=3（a=1, b=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        2,
        0
      ],
      [
        0,
        1,
        2
      ],
      [
        2,
        0,
        1
      ]
    ],
    "expected": "9",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "4"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 223,
    "title": "2024 期末·循环三对角 n=4（a=2, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        0,
        0
      ],
      [
        0,
        2,
        1,
        0
      ],
      [
        0,
        0,
        2,
        1
      ],
      [
        1,
        0,
        0,
        2
      ]
    ],
    "expected": "15",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "1/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1/8"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 224,
    "title": "2024 期末·循环三对角 n=4（a=3, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        3,
        1,
        0,
        0
      ],
      [
        0,
        3,
        1,
        0
      ],
      [
        0,
        0,
        3,
        1
      ],
      [
        1,
        0,
        0,
        3
      ]
    ],
    "expected": "80",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "1/9"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1/27"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 225,
    "title": "2024 期末·循环三对角 n=4（a=1, b=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        2,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0
      ],
      [
        0,
        0,
        1,
        2
      ],
      [
        2,
        0,
        0,
        1
      ]
    ],
    "expected": "-15",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-8"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 226,
    "title": "2024 期末·循环三对角 n=5（a=2, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        0,
        0,
        0
      ],
      [
        0,
        2,
        1,
        0,
        0
      ],
      [
        0,
        0,
        2,
        1,
        0
      ],
      [
        0,
        0,
        0,
        2,
        1
      ],
      [
        1,
        0,
        0,
        0,
        2
      ]
    ],
    "expected": "33",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "1/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-1/8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "1/16"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 227,
    "title": "2024 期末·循环三对角 n=5（a=3, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        3,
        1,
        0,
        0,
        0
      ],
      [
        0,
        3,
        1,
        0,
        0
      ],
      [
        0,
        0,
        3,
        1,
        0
      ],
      [
        0,
        0,
        0,
        3,
        1
      ],
      [
        1,
        0,
        0,
        0,
        3
      ]
    ],
    "expected": "244",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 0,
        "factor": "-1/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "1/9"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-1/27"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "1/81"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 228,
    "title": "2024 期末·循环三对角 n=5（a=1, b=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        2,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2
      ],
      [
        2,
        0,
        0,
        0,
        1
      ]
    ],
    "expected": "33",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "16"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 229,
    "title": "2024 期末·循环三对角 n=6（a=2, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        2,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        2,
        1,
        0,
        0
      ],
      [
        0,
        0,
        0,
        2,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        2,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        2
      ]
    ],
    "expected": "63",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 1,
        "factor": "1/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 2,
        "factor": "-1/8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 3,
        "factor": "1/16"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 4,
        "factor": "-1/32"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 230,
    "title": "2024 期末·循环三对角 n=6（a=3, b=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        3,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        3,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        3,
        1,
        0,
        0
      ],
      [
        0,
        0,
        0,
        3,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        3,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        3
      ]
    ],
    "expected": "728",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 0,
        "factor": "-1/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 1,
        "factor": "1/9"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 2,
        "factor": "-1/27"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 3,
        "factor": "1/81"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 4,
        "factor": "-1/243"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 231,
    "title": "2024 期末·循环三对角 n=6（a=1, b=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        2,
        0,
        0,
        0,
        0,
        1
      ]
    ],
    "expected": "-63",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2024 年期末资料：计算题3 的数值特例。",
    "sourceYear": 2024,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 1,
        "factor": "4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 2,
        "factor": "-8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 3,
        "factor": "16"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 4,
        "factor": "-32"
      }
    ],
    "demoPrinciple": {
      "title": "2024 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 232,
    "title": "2020 期末·范德蒙节点 1、2、3、4",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        2,
        3,
        4
      ],
      [
        1,
        4,
        9,
        16
      ],
      [
        1,
        8,
        27,
        64
      ]
    ],
    "expected": "12",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-6"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 233,
    "title": "2020 期末·范德蒙节点 0、1、2、4",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        2,
        4
      ],
      [
        0,
        1,
        4,
        16
      ],
      [
        0,
        1,
        8,
        64
      ]
    ],
    "expected": "48",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 234,
    "title": "2020 期末·范德蒙节点 1、3、4、6",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        3,
        4,
        6
      ],
      [
        1,
        9,
        16,
        36
      ],
      [
        1,
        27,
        64,
        216
      ]
    ],
    "expected": "180",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-13"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-8"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 235,
    "title": "2020 期末·范德蒙节点 0、2、5、7",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        0,
        2,
        5,
        7
      ],
      [
        0,
        4,
        25,
        49
      ],
      [
        0,
        8,
        125,
        343
      ]
    ],
    "expected": "2100",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-7"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 236,
    "title": "2019 期末·范德蒙节点 2、3、4",
    "family": "期末真题 · 范德蒙",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        2,
        3,
        4
      ],
      [
        4,
        9,
        16
      ]
    ],
    "expected": "2",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2019 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2019,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-5"
      }
    ],
    "demoPrinciple": {
      "title": "2019 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 237,
    "title": "2019 期末·范德蒙节点 0、1、3",
    "family": "期末真题 · 范德蒙",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        0,
        1,
        3
      ],
      [
        0,
        1,
        9
      ]
    ],
    "expected": "6",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2019 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2019,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      }
    ],
    "demoPrinciple": {
      "title": "2019 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 238,
    "title": "2019 期末·范德蒙节点 1、3、6",
    "family": "期末真题 · 范德蒙",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        1,
        3,
        6
      ],
      [
        1,
        9,
        36
      ]
    ],
    "expected": "30",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2019 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2019,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-4"
      }
    ],
    "demoPrinciple": {
      "title": "2019 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 239,
    "title": "2019 期末·范德蒙节点 2、5、8",
    "family": "期末真题 · 范德蒙",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        2,
        5,
        8
      ],
      [
        4,
        25,
        64
      ]
    ],
    "expected": "54",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2019 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2019,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-7"
      }
    ],
    "demoPrinciple": {
      "title": "2019 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 240,
    "title": "2014 期末·范德蒙节点 1、2、3、4",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        2,
        3,
        4
      ],
      [
        1,
        4,
        9,
        16
      ],
      [
        1,
        8,
        27,
        64
      ]
    ],
    "expected": "12",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2014 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2014,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-6"
      }
    ],
    "demoPrinciple": {
      "title": "2014 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 241,
    "title": "2014 期末·范德蒙节点 0、1、2、4",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        2,
        4
      ],
      [
        0,
        1,
        4,
        16
      ],
      [
        0,
        1,
        8,
        64
      ]
    ],
    "expected": "48",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2014 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2014,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3"
      }
    ],
    "demoPrinciple": {
      "title": "2014 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 242,
    "title": "2014 期末·范德蒙节点 1、3、4、6",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        3,
        4,
        6
      ],
      [
        1,
        9,
        16,
        36
      ],
      [
        1,
        27,
        64,
        216
      ]
    ],
    "expected": "180",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2014 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2014,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-13"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-8"
      }
    ],
    "demoPrinciple": {
      "title": "2014 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 243,
    "title": "2014 期末·范德蒙节点 0、2、5、7",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        0,
        2,
        5,
        7
      ],
      [
        0,
        4,
        25,
        49
      ],
      [
        0,
        8,
        125,
        343
      ]
    ],
    "expected": "2100",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2014 年期末资料：范德蒙行列式：节点差连乘。",
    "sourceYear": 2014,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-7"
      }
    ],
    "demoPrinciple": {
      "title": "2014 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 244,
    "title": "2020 期末·对角1非对角3（n=3）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        3,
        3
      ],
      [
        3,
        1,
        3
      ],
      [
        3,
        3,
        1
      ]
    ],
    "expected": "28",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：计算题10 的 n 阶模板。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/4"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 245,
    "title": "2020 期末·对角1非对角3（n=4）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        3,
        3,
        3
      ],
      [
        3,
        1,
        3,
        3
      ],
      [
        3,
        3,
        1,
        3
      ],
      [
        3,
        3,
        3,
        1
      ]
    ],
    "expected": "-80",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：计算题10 的 n 阶模板。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3/7"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 246,
    "title": "2020 期末·对角1非对角3（n=5）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        3,
        3,
        3,
        3
      ],
      [
        3,
        1,
        3,
        3,
        3
      ],
      [
        3,
        3,
        1,
        3,
        3
      ],
      [
        3,
        3,
        3,
        1,
        3
      ],
      [
        3,
        3,
        3,
        3,
        1
      ]
    ],
    "expected": "208",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：计算题10 的 n 阶模板。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-3/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-3/10"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 247,
    "title": "2020 期末·对角1非对角3（n=6）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        3,
        3,
        3,
        3,
        3
      ],
      [
        3,
        1,
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        1,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        1,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3,
        1,
        3
      ],
      [
        3,
        3,
        3,
        3,
        3,
        1
      ]
    ],
    "expected": "-512",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末资料：计算题10 的 n 阶模板。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 1,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-3/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 2,
        "factor": "-3/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-3/10"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 3,
        "factor": "-3/10"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 4,
        "factor": "-3/13"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 248,
    "title": "2020 期末·对角2非对角3（n=6）",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        3,
        3,
        3,
        3,
        3
      ],
      [
        3,
        2,
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        2,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        2,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3,
        2,
        3
      ],
      [
        3,
        3,
        3,
        3,
        3,
        2
      ]
    ],
    "expected": "-17",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2020 年期末计算题10 的对角/非对角常数模板特例。",
    "sourceYear": 2020,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 0,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 0,
        "factor": "-3/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-3/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "-3/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 1,
        "factor": "-3/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3/8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-3/8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 2,
        "factor": "-3/8"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-3/11"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 3,
        "factor": "-3/11"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 5,
        "source": 4,
        "factor": "-3/14"
      }
    ],
    "demoPrinciple": {
      "title": "2020 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 249,
    "title": "2022 期末·|A−λE|（λ=0）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        -2,
        0
      ],
      [
        -2,
        1,
        -2
      ],
      [
        0,
        -2,
        0
      ]
    ],
    "expected": "-8",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：二次型题的特征行列式代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-2"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 250,
    "title": "2022 期末·|A−λE|（λ=1）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        -2,
        0
      ],
      [
        -2,
        0,
        -2
      ],
      [
        0,
        -2,
        -1
      ]
    ],
    "expected": "0",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：二次型题的特征行列式代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1/2"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 251,
    "title": "2022 期末·|A−λE|（λ=2）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        0,
        -2,
        0
      ],
      [
        -2,
        -1,
        -2
      ],
      [
        0,
        -2,
        -2
      ]
    ],
    "expected": "8",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：二次型题的特征行列式代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 1
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 252,
    "title": "2022 期末·|A−λE|（λ=3）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -1,
        -2,
        0
      ],
      [
        -2,
        -2,
        -2
      ],
      [
        0,
        -2,
        -3
      ]
    ],
    "expected": "10",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：二次型题的特征行列式代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 253,
    "title": "2022 期末·|A−λE|（λ=4）",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -2,
        -2,
        0
      ],
      [
        -2,
        -3,
        -2
      ],
      [
        0,
        -2,
        -4
      ]
    ],
    "expected": "0",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：二次型题的特征行列式代入。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-2"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 254,
    "title": "2011 期末·四阶直接计算",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        -5,
        8
      ],
      [
        1,
        -3,
        0,
        9
      ],
      [
        0,
        2,
        -1,
        -5
      ],
      [
        1,
        4,
        -7,
        0
      ]
    ],
    "expected": "27",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2011 年期末资料：计算题1。",
    "sourceYear": 2011,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "4/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "14/3"
      }
    ],
    "demoPrinciple": {
      "title": "2011 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 255,
    "title": "2013 期末·四阶直接计算",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        2,
        -1,
        4
      ],
      [
        2,
        3,
        -1,
        -5
      ],
      [
        3,
        1,
        2,
        11
      ]
    ],
    "expected": "-64",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2013 年期末资料：计算题1。",
    "sourceYear": 2013,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-5"
      }
    ],
    "demoPrinciple": {
      "title": "2013 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 256,
    "title": "2015 期末·范德蒙四阶",
    "family": "期末真题 · 范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        2,
        3,
        4
      ],
      [
        1,
        4,
        9,
        16
      ],
      [
        1,
        8,
        27,
        64
      ]
    ],
    "expected": "12",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2015 年期末资料：计算题2。",
    "sourceYear": 2015,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-6"
      }
    ],
    "demoPrinciple": {
      "title": "2015 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 257,
    "title": "2023 期末·四阶直接计算",
    "family": "期末真题 · 行列式",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        -5,
        1
      ],
      [
        1,
        -3,
        0,
        -6
      ],
      [
        0,
        2,
        -1,
        2
      ],
      [
        1,
        4,
        -7,
        6
      ]
    ],
    "expected": "27",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2023 年期末资料：计算题1。",
    "sourceYear": 2023,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "4/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "14/3"
      }
    ],
    "demoPrinciple": {
      "title": "2023 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  },
  {
    "id": 258,
    "title": "2022 期末·(A−2E) 的行列式",
    "family": "期末真题 · 行列式",
    "difficulty": "基础",
    "matrix": [
      [
        -1,
        -1,
        0
      ],
      [
        0,
        -1,
        -1
      ],
      [
        -1,
        0,
        -1
      ]
    ],
    "expected": "-2",
    "hint": "沿原题结构寻找零，再读出三角或范德蒙结构。",
    "note": "2022 年期末资料：矩阵方程题中的可逆性判断。",
    "sourceYear": 2022,
    "sourceKind": "exam-determinant",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "1"
      }
    ],
    "demoPrinciple": {
      "title": "2022 真题 · 行列式",
      "text": "这是资料中的行列式题；演示展示一条可复核的消元路线。"
    }
  }
];
