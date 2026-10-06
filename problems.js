window.PROBLEMS = [
  {
    "id": 1,
    "title": "四列求和，得到一列 x",
    "family": "求和差分",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        -1,
        1,
        "x-1"
      ],
      [
        1,
        -1,
        "x+1",
        -1
      ],
      [
        1,
        "x-1",
        1,
        -1
      ],
      [
        "x+1",
        -1,
        1,
        -1
      ]
    ],
    "expected": "x^4",
    "hint": "把第二至第四列都加到第一列，再让前三行分别减去第四行。",
    "note": "原笔记第①题。右上角是 x−1。全程不必除以 x，x=0 也成立；最终逆序数为6。",
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "col",
        "target": 0
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 3,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 3,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 3,
        "factor": "-1"
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
    "id": 4,
    "title": "从零最多的行入手",
    "family": "基础变换",
    "difficulty": "基础",
    "matrix": [
      [
        0,
        0,
        3
      ],
      [
        2,
        1,
        4
      ],
      [
        1,
        5,
        2
      ]
    ],
    "expected": "27",
    "hint": "第一行只有第三列的3非零。也可以先换列，让它落在左上角。",
    "note": "稀疏结构可以减少有效乘积；位置(1,3)的余子式符号为正。",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "col",
        "target": 0,
        "source": 2
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-4/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-2/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-5"
      }
    ]
  },
  {
    "id": 5,
    "title": "提取第一行的公因子2",
    "family": "基础变换",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        4,
        6
      ],
      [
        1,
        0,
        2
      ],
      [
        3,
        1,
        1
      ]
    ],
    "expected": "22",
    "hint": "第一行乘以1/2，外面补一个2，再继续消元。",
    "note": "只倍乘一行，行列式只乘一次该因子。整个三阶矩阵乘2，才会乘2³。",
    "suggestedOps": [
      {
        "type": "scale",
        "axis": "row",
        "target": 0,
        "factor": "1/2"
      },
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
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-5/2"
      }
    ]
  },
  {
    "id": 6,
    "title": "三次倍加完成消元",
    "family": "基础变换",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        2,
        1
      ],
      [
        2,
        5,
        3
      ],
      [
        3,
        8,
        6
      ]
    ],
    "expected": "1",
    "hint": "先消掉第一列的2、3，再处理第二列。",
    "note": "每一步倍加都保留来源行，是保持原值的可靠方法。",
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
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-2"
      }
    ]
  },
  {
    "id": 7,
    "title": "分数矩阵也能精确求值",
    "family": "基础变换",
    "difficulty": "进阶",
    "matrix": [
      [
        "1/2",
        "1/3"
      ],
      [
        "2/3",
        "3/4"
      ]
    ],
    "expected": "11/72",
    "hint": "可以先把第一行乘6、第二行乘12，外因子会记录这两次变化。",
    "note": "分数以精确有理数处理；答案为11/72。",
    "suggestedOps": [
      {
        "type": "scale",
        "axis": "row",
        "target": 0,
        "factor": 6
      },
      {
        "type": "scale",
        "axis": "row",
        "target": 1,
        "factor": 12
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-8/3"
      }
    ]
  },
  {
    "id": 8,
    "title": "主元需要不止一次交换",
    "family": "基础变换",
    "difficulty": "挑战",
    "matrix": [
      [
        0,
        0,
        2,
        1
      ],
      [
        0,
        3,
        1,
        2
      ],
      [
        4,
        1,
        0,
        1
      ],
      [
        2,
        0,
        1,
        3
      ]
    ],
    "expected": "-54",
    "hint": "先将第三行换到顶部，然后逐列寻找非零主元。",
    "note": "当前对角元素为零不等于行列式为零；先在其下方寻找可交换的行。",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 2
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
        "target": 3,
        "source": 1,
        "factor": "1/6"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-7/12"
      }
    ]
  },
  {
    "id": 9,
    "title": "原题的数值实例：x=2",
    "family": "求和差分",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        -1,
        1,
        1
      ],
      [
        1,
        -1,
        3,
        -1
      ],
      [
        1,
        1,
        1,
        -1
      ],
      [
        3,
        -1,
        1,
        -1
      ]
    ],
    "expected": "16",
    "hint": "先求和造常数列，再用第四行消去前三行的公共部分。",
    "note": "把符号结论放回具体数字中检验，注意负数的四次方。",
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "col",
        "target": 0
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 3,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 3,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 3,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 10,
    "title": "原题的数值实例：x=-1",
    "family": "求和差分",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        -1,
        1,
        -2
      ],
      [
        1,
        -1,
        0,
        -1
      ],
      [
        1,
        -2,
        1,
        -1
      ],
      [
        0,
        -1,
        1,
        -1
      ]
    ],
    "expected": "1",
    "hint": "先求和造常数列，再用第四行消去前三行的公共部分。",
    "note": "把符号结论放回具体数字中检验，注意负数的四次方。",
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "col",
        "target": 0
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 3,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 3,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 3,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 11,
    "title": "循环矩阵里的共同总和",
    "family": "求和差分",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        2,
        3
      ],
      [
        3,
        1,
        2
      ],
      [
        2,
        3,
        1
      ]
    ],
    "expected": "18",
    "hint": "所有列汇入第一列后，第一列会变成三个6。",
    "note": "一整列相同不代表行列式为零；再作行差才能发现剩下的结构。",
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "col",
        "target": 0
      },
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
        "factor": "1"
      }
    ]
  },
  {
    "id": 12,
    "title": "沿行汇流的对称做法",
    "family": "求和差分",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        3,
        2
      ],
      [
        2,
        1,
        3
      ],
      [
        3,
        2,
        1
      ]
    ],
    "expected": "18",
    "hint": "把第二、三行汇入第一行，得到一行相同的6。",
    "note": "行和列的性质对称，转置不会改变行列式。",
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "row",
        "target": 0
      },
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/3"
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
        "factor": "-1"
      }
    ]
  },
  {
    "id": 13,
    "title": "每行的和都为零",
    "family": "求和差分",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        -3,
        1
      ],
      [
        4,
        1,
        -5
      ],
      [
        -2,
        5,
        -3
      ]
    ],
    "expected": "0",
    "hint": "把所有列汇入第一列，观察零列。",
    "note": "各行和都为零，意味着列向量存在一个非平凡线性关系。",
    "suggestedOps": [
      {
        "type": "sum",
        "axis": "col",
        "target": 0
      }
    ]
  },
  {
    "id": 14,
    "title": "等高阶梯的相邻差",
    "family": "求和差分",
    "difficulty": "基础",
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
        2,
        2
      ],
      [
        1,
        2,
        3,
        3
      ],
      [
        1,
        2,
        3,
        4
      ]
    ],
    "expected": "1",
    "hint": "从最后一行开始，逐行减去上一行。",
    "note": "从下往上作差，才能保证使用尚未改变的来源行。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1"
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
        "target": 1,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 15,
    "title": "不等高阶梯的新增量",
    "family": "求和差分",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        5,
        5,
        5
      ],
      [
        2,
        5,
        9,
        9
      ],
      [
        2,
        5,
        9,
        14
      ]
    ],
    "expected": "120",
    "hint": "相邻行作差后，对角线上依次出现2、3、4、5。",
    "note": "差分把累计高度还原成每一级新增的高度。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1"
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
        "target": 1,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 16,
    "title": "相邻点距离形成的矩阵",
    "family": "求和差分",
    "difficulty": "进阶",
    "matrix": [
      [
        0,
        1,
        2,
        3
      ],
      [
        1,
        0,
        1,
        2
      ],
      [
        2,
        1,
        0,
        1
      ],
      [
        3,
        2,
        1,
        0
      ]
    ],
    "expected": "-12",
    "hint": "先做相邻行差，减少线性增长的重复项。",
    "note": "这是四个等间距点的距离矩阵；差分后再进行普通消元。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1"
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
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
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
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 17,
    "title": "平方数列的二次差分",
    "family": "求和差分",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        4,
        9
      ],
      [
        4,
        9,
        16
      ],
      [
        9,
        16,
        25
      ]
    ],
    "expected": "-8",
    "hint": "先从下往上做相邻行差，再让新的第三行减第二行。",
    "note": "二次多项式的一次差分降为一次，二次差分变成常数。",
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
        "target": 1,
        "source": 0,
        "factor": "-1"
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
        "target": 1,
        "source": 0,
        "factor": "-3"
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
        "factor": "-6/7"
      }
    ]
  },
  {
    "id": 18,
    "title": "线性增长的四阶行列式",
    "family": "求和差分",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        2,
        3,
        4
      ],
      [
        3,
        4,
        5,
        6
      ],
      [
        5,
        6,
        7,
        8
      ],
      [
        7,
        8,
        9,
        10
      ]
    ],
    "expected": "0",
    "hint": "相邻行作差后，后三行是否相同？",
    "note": "发现相同行后，再相减得到零行，即可读值。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1"
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
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
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
        "factor": "-2"
      },
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
      }
    ]
  },
  {
    "id": 19,
    "title": "三对角：主对角线为2",
    "family": "三对角递推",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        0,
        0
      ],
      [
        1,
        2,
        1,
        0
      ],
      [
        0,
        1,
        2,
        1
      ],
      [
        0,
        0,
        1,
        2
      ]
    ],
    "expected": "5",
    "hint": "这是4阶矩阵。可先用消元求值，再用 Dₙ=2Dₙ₋₁−1Dₙ₋₂ 核对。",
    "note": "递推初值 D₀=1，D₁=2；第二项系数来自两条副对角线的乘积。",
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
        "source": 1,
        "factor": "-2/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3/4"
      }
    ]
  },
  {
    "id": 20,
    "title": "三对角：把阶数增加到5",
    "family": "三对角递推",
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
        1,
        2,
        1,
        0,
        0
      ],
      [
        0,
        1,
        2,
        1,
        0
      ],
      [
        0,
        0,
        1,
        2,
        1
      ],
      [
        0,
        0,
        0,
        1,
        2
      ]
    ],
    "expected": "6",
    "hint": "这是5阶矩阵。可先用消元求值，再用 Dₙ=2Dₙ₋₁−1Dₙ₋₂ 核对。",
    "note": "递推初值 D₀=1，D₁=2；第二项系数来自两条副对角线的乘积。",
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
        "source": 1,
        "factor": "-2/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3/4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-4/5"
      }
    ]
  },
  {
    "id": 21,
    "title": "三对角：主对角线为1",
    "family": "三对角递推",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1
      ],
      [
        0,
        0,
        1,
        1
      ]
    ],
    "expected": "-1",
    "hint": "这是4阶矩阵。可先用消元求值，再用 Dₙ=1Dₙ₋₁−1Dₙ₋₂ 核对。",
    "note": "递推初值 D₀=1，D₁=1；第二项系数来自两条副对角线的乘积。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 22,
    "title": "三对角：主对角线为0",
    "family": "三对角递推",
    "difficulty": "进阶",
    "matrix": [
      [
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0
      ]
    ],
    "expected": "0",
    "hint": "这是5阶矩阵。可先用消元求值，再用 Dₙ=0Dₙ₋₁−1Dₙ₋₂ 核对。",
    "note": "递推初值 D₀=1，D₁=0；第二项系数来自两条副对角线的乘积。",
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
      },
      {
        "type": "swap",
        "axis": "row",
        "target": 2,
        "source": 3
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 23,
    "title": "三对角：主对角线为3",
    "family": "三对角递推",
    "difficulty": "基础",
    "matrix": [
      [
        3,
        1,
        0
      ],
      [
        1,
        3,
        1
      ],
      [
        0,
        1,
        3
      ]
    ],
    "expected": "21",
    "hint": "这是3阶矩阵。可先用消元求值，再用 Dₙ=3Dₙ₋₁−1Dₙ₋₂ 核对。",
    "note": "递推初值 D₀=1，D₁=3；第二项系数来自两条副对角线的乘积。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3/8"
      }
    ]
  },
  {
    "id": 24,
    "title": "两条副对角线不相同",
    "family": "三对角递推",
    "difficulty": "挑战",
    "matrix": [
      [
        3,
        1,
        0,
        0
      ],
      [
        2,
        3,
        1,
        0
      ],
      [
        0,
        2,
        3,
        1
      ],
      [
        0,
        0,
        2,
        3
      ]
    ],
    "expected": "31",
    "hint": "这是4阶矩阵。可先用消元求值，再用 Dₙ=3Dₙ₋₁−2Dₙ₋₂ 核对。",
    "note": "递推初值 D₀=1，D₁=3；第二项系数来自两条副对角线的乘积。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-2/3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-6/7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-14/15"
      }
    ]
  },
  {
    "id": 25,
    "title": "先制造出合法的方形分块",
    "family": "分块结构",
    "difficulty": "挑战",
    "matrix": [
      [
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        2,
        3,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        2,
        3,
        5
      ],
      [
        0,
        1,
        4,
        9,
        25
      ]
    ],
    "expected": "-26",
    "hint": "第二、三列先减第一列，再让第三列减第二列的两倍。",
    "note": "原笔记第⑤题的数值实例。操作后才形成左上2×2、右下3×3的分块三角结构。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 1,
        "factor": "-2"
      },
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
        "target": 4,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-11/3"
      }
    ]
  },
  {
    "id": 26,
    "title": "右上角零块已经就位",
    "family": "分块结构",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        0,
        0
      ],
      [
        1,
        3,
        0,
        0
      ],
      [
        7,
        -2,
        4,
        1
      ],
      [
        5,
        8,
        2,
        2
      ]
    ],
    "expected": "30",
    "hint": "先分别观察两个2×2对角块，再用消元验证它们的乘积。",
    "note": "分块下三角矩阵的左下角可以非零，前提是对角块都是方阵。",
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
        "factor": "-7/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-5/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "11/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-11/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-1/2"
      }
    ]
  },
  {
    "id": 27,
    "title": "左下角零块已经就位",
    "family": "分块结构",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        2,
        7,
        -3
      ],
      [
        3,
        4,
        2,
        1
      ],
      [
        0,
        0,
        3,
        1
      ],
      [
        0,
        0,
        2,
        4
      ]
    ],
    "expected": "-20",
    "hint": "消元只需处理两个对角方块，左下零块会保持不变。",
    "note": "分块上三角是分块下三角的对称情形。",
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
        "target": 3,
        "source": 2,
        "factor": "-2/3"
      }
    ]
  },
  {
    "id": 28,
    "title": "两个方块位于反对角线",
    "family": "分块结构",
    "difficulty": "进阶",
    "matrix": [
      [
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        3,
        5
      ],
      [
        2,
        1,
        0,
        0
      ],
      [
        1,
        1,
        0,
        0
      ]
    ],
    "expected": "-1",
    "hint": "把第一、三列交换，再把第二、四列交换。",
    "note": "两个宽度为2的列块换位后，累计符号为正；不能忽略换列的符号记录。",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "col",
        "target": 0,
        "source": 2
      },
      {
        "type": "swap",
        "axis": "col",
        "target": 1,
        "source": 3
      },
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
        "target": 3,
        "source": 2,
        "factor": "-1/2"
      }
    ]
  },
  {
    "id": 29,
    "title": "五阶矩阵里的三个方块",
    "family": "分块结构",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        1,
        3,
        4,
        5
      ],
      [
        1,
        2,
        0,
        1,
        2
      ],
      [
        0,
        0,
        4,
        2,
        3
      ],
      [
        0,
        0,
        0,
        3,
        1
      ],
      [
        0,
        0,
        0,
        2,
        2
      ]
    ],
    "expected": "48",
    "hint": "对角线上依次有2×2、1×1、2×2的三个方块。",
    "note": "按方形边界分块，得到3、4、4三个行列式因子。",
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
        "target": 4,
        "source": 3,
        "factor": "-2/3"
      }
    ]
  },
  {
    "id": 30,
    "title": "只有一个零角还不够",
    "family": "分块结构",
    "difficulty": "挑战",
    "matrix": [
      [
        1,
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
        1,
        3,
        1
      ],
      [
        0,
        0,
        1,
        2
      ]
    ],
    "expected": "8",
    "hint": "第二、三行之间仍有跨块连接。沿第一列看，剩下一个三对角矩阵。",
    "note": "直接把左上与右下2×2行列式相乘得到10，是错误结果；原行列式为8。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-2/5"
      }
    ]
  },
  {
    "id": 31,
    "title": "升幂范德蒙：节点0、1、2",
    "family": "范德蒙",
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
        2
      ],
      [
        0,
        1,
        4
      ]
    ],
    "expected": "2",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 32,
    "title": "升幂范德蒙：节点间距不同",
    "family": "范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        1,
        2,
        4
      ],
      [
        1,
        4,
        16
      ]
    ],
    "expected": "6",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
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
        "factor": "-3"
      }
    ]
  },
  {
    "id": 33,
    "title": "节点跨过零的范德蒙",
    "family": "范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        -2,
        0,
        3
      ],
      [
        4,
        0,
        9
      ]
    ],
    "expected": "30",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
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
        "source": 0,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "2"
      }
    ]
  },
  {
    "id": 34,
    "title": "两个节点重合",
    "family": "范德蒙",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        1,
        2,
        1
      ],
      [
        1,
        4,
        1
      ]
    ],
    "expected": "0",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 35,
    "title": "幂次与节点都按降序排列",
    "family": "范德蒙",
    "difficulty": "挑战",
    "matrix": [
      [
        27,
        8,
        1,
        0
      ],
      [
        9,
        4,
        1,
        0
      ],
      [
        3,
        2,
        1,
        0
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "expected": "12",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 3
      },
      {
        "type": "swap",
        "axis": "row",
        "target": 1,
        "source": 2
      },
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
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
        "factor": "-9"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-27"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-19"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-6"
      }
    ]
  },
  {
    "id": 36,
    "title": "连续节点与阶乘乘积",
    "family": "范德蒙",
    "difficulty": "挑战",
    "matrix": [
      [
        64,
        27,
        8,
        1
      ],
      [
        16,
        9,
        4,
        1
      ],
      [
        4,
        3,
        2,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "expected": "12",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "swap",
        "axis": "row",
        "target": 0,
        "source": 3
      },
      {
        "type": "swap",
        "axis": "row",
        "target": 1,
        "source": 2
      },
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-16"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "-64"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-37"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-9"
      }
    ]
  },
  {
    "id": 37,
    "title": "节点沿行排列的范德蒙",
    "family": "范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        -1,
        1
      ],
      [
        1,
        1,
        1
      ],
      [
        1,
        2,
        4
      ]
    ],
    "expected": "6",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "transpose"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 38,
    "title": "五个节点的差积",
    "family": "范德蒙",
    "difficulty": "挑战",
    "matrix": [
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        2,
        3,
        4
      ],
      [
        0,
        1,
        4,
        9,
        16
      ],
      [
        0,
        1,
        8,
        27,
        64
      ],
      [
        0,
        1,
        16,
        81,
        256
      ]
    ],
    "expected": "288",
    "hint": "先找到全1的一行，再把幂次排成升序；其他列减去第一列会露出节点差。",
    "note": "升幂公式是∏ᵢ<ⱼ(xⱼ−xᵢ)。转置不变号；倒转幂次顺序必须记录交换次数。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 4,
        "source": 0,
        "factor": "-1"
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
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 2,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 2,
        "factor": "-7"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 4,
        "source": 3,
        "factor": "-6"
      }
    ]
  },
  {
    "id": 39,
    "title": "单位阵加上同一个向量的乘积",
    "family": "秩一更新",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        2,
        3
      ],
      [
        2,
        5,
        6
      ],
      [
        3,
        6,
        10
      ]
    ],
    "expected": "15",
    "hint": "利用第一列消去其他列的公共乘积部分，再汇到第一行。",
    "note": "x=(1,2,3)，det(I+xxᵀ)=1+∑xᵢ²。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 1,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 2,
        "factor": "3"
      }
    ]
  },
  {
    "id": 40,
    "title": "负分量进入平方和",
    "family": "秩一更新",
    "difficulty": "进阶",
    "matrix": [
      [
        2,
        -1,
        2
      ],
      [
        -1,
        2,
        -2
      ],
      [
        2,
        -2,
        5
      ]
    ],
    "expected": "7",
    "hint": "利用第一列消去其他列的公共乘积部分，再汇到第一行。",
    "note": "x=(1,-1,2)，det(I+xxᵀ)=1+∑xᵢ²。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 1,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 2,
        "factor": "2"
      }
    ]
  },
  {
    "id": 41,
    "title": "有零分量时少做一步",
    "family": "秩一更新",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        0,
        3
      ],
      [
        0,
        1,
        0
      ],
      [
        3,
        0,
        10
      ]
    ],
    "expected": "11",
    "hint": "利用第一列消去其他列的公共乘积部分，再汇到第一行。",
    "note": "x=(1,0,3)，det(I+xxᵀ)=1+∑xᵢ²。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 2,
        "factor": "3"
      }
    ]
  },
  {
    "id": 42,
    "title": "四维秩一更新",
    "family": "秩一更新",
    "difficulty": "挑战",
    "matrix": [
      [
        2,
        2,
        -2,
        1
      ],
      [
        2,
        5,
        -4,
        2
      ],
      [
        -2,
        -4,
        5,
        -2
      ],
      [
        1,
        2,
        -2,
        2
      ]
    ],
    "expected": "11",
    "hint": "利用第一列消去其他列的公共乘积部分，再汇到第一行。",
    "note": "x=(1,2,-2,1)，det(I+xxᵀ)=1+∑xᵢ²。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 1,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 2,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 3,
        "factor": "1"
      }
    ]
  },
  {
    "id": 43,
    "title": "对角线为5，其余都是4",
    "family": "秩一更新",
    "difficulty": "进阶",
    "matrix": [
      [
        5,
        4,
        4
      ],
      [
        4,
        5,
        4
      ],
      [
        4,
        4,
        5
      ]
    ],
    "expected": "13",
    "hint": "先让第二、三行减去第一行，抵消共同的4。",
    "note": "x=(2,2,2)，det(I+xxᵀ)=1+∑xᵢ²。",
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
        "target": 1,
        "source": 0,
        "factor": "1/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "1/5"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-4/9"
      }
    ]
  },
  {
    "id": 44,
    "title": "不同向量形成的非对称矩阵",
    "family": "秩一更新",
    "difficulty": "挑战",
    "matrix": [
      [
        3,
        4,
        6
      ],
      [
        1,
        3,
        3
      ],
      [
        -1,
        -2,
        -2
      ]
    ],
    "expected": "2",
    "hint": "利用第一列消去其他列的公共乘积部分，再汇到第一行。",
    "note": "u=(2,1,-1)，v=(1,2,3)，det(I+uvᵀ)=1+vᵀu。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-2"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-3"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 1,
        "factor": "2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 0,
        "source": 2,
        "factor": "3"
      }
    ]
  },
  {
    "id": 45,
    "title": "上三角直接读值",
    "family": "三角与逆序",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        7,
        -1,
        3
      ],
      [
        0,
        -3,
        5,
        2
      ],
      [
        0,
        0,
        4,
        9
      ],
      [
        0,
        0,
        0,
        1
      ]
    ],
    "expected": "-24",
    "hint": "只看主对角线，无需消去上方的数。",
    "note": "三角行列式等于主对角线元素之积。",
    "suggestedOps": []
  },
  {
    "id": 46,
    "title": "主对角线上的零因子",
    "family": "三角与逆序",
    "difficulty": "基础",
    "matrix": [
      [
        3,
        0,
        0
      ],
      [
        2,
        0,
        0
      ],
      [
        1,
        7,
        5
      ]
    ],
    "expected": "0",
    "hint": "这是下三角矩阵，检查中间那个对角元素。",
    "note": "出现零行不是行列式为零的唯一表现。",
    "suggestedOps": []
  },
  {
    "id": 47,
    "title": "三阶反三角的负号",
    "family": "三角与逆序",
    "difficulty": "基础",
    "matrix": [
      [
        0,
        0,
        2
      ],
      [
        0,
        3,
        1
      ],
      [
        4,
        -1,
        5
      ]
    ],
    "expected": "-24",
    "hint": "副对角线为2、3、4；完全逆序有3个逆序对。",
    "note": "反三角结构需要乘逆序符号，不能只乘三个元素。",
    "suggestedOps": []
  },
  {
    "id": 48,
    "title": "四阶反三角的正符号",
    "family": "三角与逆序",
    "difficulty": "进阶",
    "matrix": [
      [
        0,
        0,
        0,
        2
      ],
      [
        0,
        0,
        -1,
        3
      ],
      [
        0,
        4,
        1,
        2
      ],
      [
        3,
        1,
        2,
        4
      ]
    ],
    "expected": "-24",
    "hint": "四阶完全逆序有6个逆序对，排列符号为正。",
    "note": "最终结果还要保留副对角线上元素自身的负号。",
    "suggestedOps": []
  },
  {
    "id": 49,
    "title": "唯一非零排列：2、4、1、3",
    "family": "三角与逆序",
    "difficulty": "进阶",
    "matrix": [
      [
        0,
        2,
        0,
        0
      ],
      [
        0,
        0,
        0,
        3
      ],
      [
        4,
        0,
        0,
        0
      ],
      [
        0,
        0,
        5,
        0
      ]
    ],
    "expected": "-120",
    "hint": "每行只有一个非零数，且它们占据不同的列。",
    "note": "排列(2,4,1,3)有3个逆序对，所以符号为负。",
    "suggestedOps": []
  },
  {
    "id": 50,
    "title": "同样四个数，另一种排列",
    "family": "三角与逆序",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        0,
        0,
        0
      ],
      [
        0,
        0,
        3,
        0
      ],
      [
        0,
        4,
        0,
        0
      ],
      [
        0,
        0,
        0,
        5
      ]
    ],
    "expected": "-120",
    "hint": "交换第二、三列就得到对角阵。",
    "note": "一次换列会改变符号，外因子会保留这次变化。",
    "suggestedOps": []
  },
  {
    "id": 51,
    "title": "aᵢ+bⱼ：二阶的例外",
    "family": "线性相关",
    "difficulty": "进阶",
    "matrix": [
      [
        3,
        6
      ],
      [
        5,
        8
      ]
    ],
    "expected": "-6",
    "hint": "第二列减第一列，再让第二行减第一行。",
    "note": "当n=2，结果为(a₁−a₂)(b₂−b₁)，一般不等于零。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-1"
      }
    ]
  },
  {
    "id": 52,
    "title": "aᵢ+bⱼ：三阶归零",
    "family": "线性相关",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        4,
        6
      ],
      [
        2,
        5,
        7
      ],
      [
        4,
        7,
        9
      ]
    ],
    "expected": "0",
    "hint": "第二、三列都减第一列，会得到两列成比例的常数。",
    "note": "此类矩阵秩至多为2，因此n≥3时行列式为零。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
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
        "factor": "-3"
      }
    ]
  },
  {
    "id": 53,
    "title": "aᵢ+bⱼ：四阶仍然归零",
    "family": "线性相关",
    "difficulty": "进阶",
    "matrix": [
      [
        -1,
        -3,
        2,
        0
      ],
      [
        1,
        -1,
        4,
        2
      ],
      [
        4,
        2,
        7,
        5
      ],
      [
        6,
        4,
        9,
        7
      ]
    ],
    "expected": "0",
    "hint": "固定第一列作参照，让其他列逐列减去它。",
    "note": "增加阶数没有增加独立的列方向，秩仍至多为2。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 1,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-1"
      },
      {
        "type": "add",
        "axis": "col",
        "target": 3,
        "source": 0,
        "factor": "-1"
      },
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
        "source": 0,
        "factor": "4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 0,
        "factor": "6"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-5/2"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 3,
        "source": 1,
        "factor": "-7/2"
      }
    ]
  },
  {
    "id": 54,
    "title": "第三列是第一列的两倍",
    "family": "线性相关",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        3,
        2
      ],
      [
        2,
        -1,
        4
      ],
      [
        -1,
        5,
        -2
      ]
    ],
    "expected": "0",
    "hint": "第三列减去第一列的两倍。",
    "note": "成比例的列相消为零列，立即得到行列式为零。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "col",
        "target": 2,
        "source": 0,
        "factor": "-2"
      }
    ]
  },
  {
    "id": 55,
    "title": "两行成比例，但并不相同",
    "family": "线性相关",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        3,
        1
      ],
      [
        4,
        -1,
        5
      ],
      [
        6,
        9,
        3
      ]
    ],
    "expected": "0",
    "hint": "第三行减去第一行的三倍。",
    "note": "行列式为零可以由隐藏的比例关系造成，原矩阵不一定有零行。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-3"
      }
    ]
  },
  {
    "id": 56,
    "title": "不能把整个矩阵直接拆开",
    "family": "拆分辨析",
    "difficulty": "基础",
    "matrix": [
      [
        2,
        0
      ],
      [
        0,
        2
      ]
    ],
    "expected": "4",
    "hint": "令A=B=I₂。当前矩阵是A+B，先独立求出它的行列式。",
    "note": "det(A+B)=4，而det(A)+det(B)=2。行列式只对单独一行或一列线性。",
    "suggestedOps": []
  },
  {
    "id": 57,
    "title": "每行来自一对坐标",
    "family": "齐次范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        1,
        1
      ],
      [
        4,
        2,
        1
      ],
      [
        9,
        3,
        1
      ]
    ],
    "expected": "-2",
    "hint": "每行按a²、ab、b²排列；可用行变换验证成对坐标差的乘积。",
    "note": "坐标对为(1,1)、(2,1)、(3,1)。公式∏ᵢ<ⱼ(aᵢbⱼ−aⱼbᵢ)不要求bᵢ非零。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-9"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-3"
      }
    ]
  },
  {
    "id": 58,
    "title": "不用真正算出a/b",
    "family": "齐次范德蒙",
    "difficulty": "挑战",
    "matrix": [
      [
        1,
        2,
        4
      ],
      [
        4,
        2,
        1
      ],
      [
        9,
        3,
        1
      ]
    ],
    "expected": "-15",
    "hint": "每行按a²、ab、b²排列；可用行变换验证成对坐标差的乘积。",
    "note": "坐标对为(1,2)、(2,1)、(3,1)。公式∏ᵢ<ⱼ(aᵢbⱼ−aⱼbᵢ)不要求bᵢ非零。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-4"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 0,
        "factor": "-9"
      },
      {
        "type": "add",
        "axis": "row",
        "target": 2,
        "source": 1,
        "factor": "-5/2"
      }
    ]
  },
  {
    "id": 59,
    "title": "b为零时仍然成立",
    "family": "齐次范德蒙",
    "difficulty": "进阶",
    "matrix": [
      [
        1,
        0,
        0
      ],
      [
        1,
        1,
        1
      ],
      [
        0,
        0,
        1
      ]
    ],
    "expected": "1",
    "hint": "每行按a²、ab、b²排列；可用行变换验证成对坐标差的乘积。",
    "note": "坐标对为(1,0)、(1,1)、(0,1)。公式∏ᵢ<ⱼ(aᵢbⱼ−aⱼbᵢ)不要求bᵢ非零。",
    "suggestedOps": []
  },
  {
    "id": 60,
    "title": "两对坐标成比例",
    "family": "齐次范德蒙",
    "difficulty": "基础",
    "matrix": [
      [
        1,
        2,
        4
      ],
      [
        4,
        8,
        16
      ],
      [
        9,
        3,
        1
      ]
    ],
    "expected": "0",
    "hint": "第二对坐标是第一对的2倍，二次齐次项会放大4倍。",
    "note": "坐标对为(1,2)、(2,4)、(3,1)。公式∏ᵢ<ⱼ(aᵢbⱼ−aⱼbᵢ)不要求bᵢ非零。",
    "suggestedOps": [
      {
        "type": "add",
        "axis": "row",
        "target": 1,
        "source": 0,
        "factor": "-4"
      }
    ]
  },
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
  }
];
