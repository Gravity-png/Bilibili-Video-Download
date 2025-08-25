import lodash from 'lodash'
import protobuf from 'protobufjs/light'

export const proto = {
  nested: {
    DmWebViewReply: {
      fields: {
        state: {
          type: 'int32',
          id: 1
        },
        text: {
          type: 'string',
          id: 2
        },
        textSide: {
          type: 'string',
          id: 3
        },
        dmSge: {
          type: 'DmSegConfig',
          id: 4
        },
        flag: {
          type: 'DanmakuFlagConfig',
          id: 5
        },
        specialDms: {
          rule: 'repeated',
          type: 'string',
          id: 6
        },
        checkBox: {
          type: 'bool',
          id: 7
        },
        count: {
          type: 'int64',
          id: 8
        },
        commandDms: {
          rule: 'repeated',
          type: 'CommandDm',
          id: 9
        },
        dmSetting: {
          type: 'DanmuWebPlayerConfig',
          id: 10
        }
      }
    },
    CommandDm: {
      fields: {
        id: {
          type: 'int64',
          id: 1
        },
        oid: {
          type: 'int64',
          id: 2
        },
        mid: {
          type: 'int64',
          id: 3
        },
        command: {
          type: 'string',
          id: 4
        },
        content: {
          type: 'string',
          id: 5
        },
        progress: {
          type: 'int32',
          id: 6
        },
        ctime: {
          type: 'string',
          id: 7
        },
        mtime: {
          type: 'string',
          id: 8
        },
        extra: {
          type: 'string',
          id: 9
        },
        idStr: {
          type: 'string',
          id: 10
        }
      }
    },
    DmSegConfig: {
      fields: {
        pageSize: {
          type: 'int64',
          id: 1
        },
        total: {
          type: 'int64',
          id: 2
        }
      }
    },
    DanmakuFlagConfig: {
      fields: {
        recFlag: {
          type: 'int32',
          id: 1
        },
        recText: {
          type: 'string',
          id: 2
        },
        recSwitch: {
          type: 'int32',
          id: 3
        }
      }
    },
    DmSegMobileReply: {
      fields: {
        elems: {
          rule: 'repeated',
          type: 'DanmakuElem',
          id: 1
        }
      }
    },
    DanmakuElem: {
      fields: {
        id: {
          type: 'int64',
          id: 1
        },
        progress: {
          type: 'int32',
          id: 2
        },
        mode: {
          type: 'int32',
          id: 3
        },
        fontsize: {
          type: 'int32',
          id: 4
        },
        color: {
          type: 'uint32',
          id: 5
        },
        midHash: {
          type: 'string',
          id: 6
        },
        content: {
          type: 'string',
          id: 7
        },
        ctime: {
          type: 'int64',
          id: 8
        },
        weight: {
          type: 'int32',
          id: 9
        },
        action: {
          type: 'string',
          id: 10
        },
        pool: {
          type: 'int32',
          id: 11
        },
        idStr: {
          type: 'string',
          id: 12
        },
        attr: {
          type: 'int32',
          id: 13
        }
      }
    },
    DanmuWebPlayerConfig: {
      fields: {
        dmSwitch: {
          type: 'bool',
          id: 1
        },
        aiSwitch: {
          type: 'bool',
          id: 2
        },
        aiLevel: {
          type: 'int32',
          id: 3
        },
        blocktop: {
          type: 'bool',
          id: 4
        },
        blockscroll: {
          type: 'bool',
          id: 5
        },
        blockbottom: {
          type: 'bool',
          id: 6
        },
        blockcolor: {
          type: 'bool',
          id: 7
        },
        blockspecial: {
          type: 'bool',
          id: 8
        },
        preventshade: {
          type: 'bool',
          id: 9
        },
        dmask: {
          type: 'bool',
          id: 10
        },
        opacity: {
          type: 'float',
          id: 11
        },
        dmarea: {
          type: 'int32',
          id: 12
        },
        speedplus: {
          type: 'float',
          id: 13
        },
        fontsize: {
          type: 'float',
          id: 14
        },
        screensync: {
          type: 'bool',
          id: 15
        },
        speedsync: {
          type: 'bool',
          id: 16
        },
        fontfamily: {
          type: 'string',
          id: 17
        },
        bold: {
          type: 'bool',
          id: 18
        },
        fontborder: {
          type: 'int32',
          id: 19
        },
        drawType: {
          type: 'string',
          id: 20
        }
      }
    }
  }
}
const decode = lodash.curry(async (type: string, buffer: Buffer) => {
  const root = protobuf.Root.fromJSON(proto)
  const reply = root.lookupType(type)
  // webpack://bilibilivideodownload-fork/./node_modules/protobufjs/src/reader.js?e5c5
  // index out of range:
  // TODO: error index out of range: 3 + 99 > 39
  const message = reply.decode(buffer)
  // nodejs 与 浏览器端 protobuf解析不一致
  return reply.toObject(message, {
    longs: Number // int64/uint64 转字符串
    // enums: String, // 可选：枚举转字符串
    // bytes: String // 可选：bytes 转 base64
  })
})
export const decodeDanmakuSegment = decode('DmSegMobileReply')
export const decodeDanmakuView = decode('DmWebViewReply')
