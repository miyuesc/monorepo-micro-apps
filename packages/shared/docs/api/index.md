# API Reference

## Array

| Function | 描述 |
| ------ | ------ |
| [create](functions/create.md) | 生成指定长度数组 |
| [diff](functions/diff.md) | 数组差异项 |
| [findInTree](functions/findInTree.md) | 在树形数组中查找指定元素 |
| [flat](functions/flat.md) | 对象数组扁平化 |
| [generateLabel](functions/generateLabel.md) | 根据指定值，将指定属性名组装为字符串 |
| [partition](functions/partition.md) | 根据条件拆分数组 |
| [shuffle](functions/shuffle.md) | 随机打乱数组 |
| [sortWith](functions/sortWith.md) | 对数组进行排序并返回前 n 个元素 |
| [toMap](functions/toMap.md) | 转成对象结构 |
| [unique](functions/unique.md) | 数组去重 |

## Array
扁平化对象数组的配置参数

| Interface | 描述 |
| ------ | ------ |
| [FlatProps](interfaces/FlatProps.md) | - |

## Array
树形数组的配置参数

| Interface | 描述 |
| ------ | ------ |
| [TreeArrayProps](interfaces/TreeArrayProps.md) | - |

## Array
生成标签的配置参数

| Interface | 描述 |
| ------ | ------ |
| [GenerateLabelProps](interfaces/GenerateLabelProps.md) | - |

## Array
转成对象结构的配置参数

| Interface | 描述 |
| ------ | ------ |
| [ToMapProps](interfaces/ToMapProps.md) | - |

## Clipboard
复制文本到剪贴板

| Function | 描述 |
| ------ | ------ |
| [clipboard](functions/clipboard.md) | - |

## Colors
RGB颜色转十六进制颜色

| Function | 描述 |
| ------ | ------ |
| [rgbToHex](functions/rgbToHex.md) | - |

## Colors
十六进制颜色转RGB颜色

| Function | 描述 |
| ------ | ------ |
| [hexToRgb](functions/hexToRgb.md) | - |

## Colors
随机生成RGBA颜色

| Function | 描述 |
| ------ | ------ |
| [randomRgbaColor](functions/randomRgbaColor.md) | - |

## Colors
随机生成RGB颜色

| Function | 描述 |
| ------ | ------ |
| [randomRgbColor](functions/randomRgbColor.md) | - |

## Colors
随机生成十六进制颜色

| Function | 描述 |
| ------ | ------ |
| [randomHexColor](functions/randomHexColor.md) | - |

## Dom
* 滚动条尺寸
*

| Function | 描述 |
| ------ | ------ |
| [getScrollBarWidth](functions/getScrollBarWidth.md) | - |

## Dom
文档尺寸

| Interface | 描述 |
| ------ | ------ |
| [Size](interfaces/Size.md) | - |

## Dom
是否存在滚动条

| Function | 描述 |
| ------ | ------ |
| [isScroll](functions/isScroll.md) | - |

## Dom
获取文档整体尺寸

| Function | 描述 |
| ------ | ------ |
| [getDocumentSize](functions/getDocumentSize.md) | - |

## Dom
设置元素 transform: translate 移动

| Function | 描述 |
| ------ | ------ |
| [setTranslate](functions/setTranslate.md) | - |

## Dom Event
事件代理

| Function | 描述 |
| ------ | ------ |
| [delegate](functions/delegate.md) | - |

## Dom Event
元素事件绑定

| Function | 描述 |
| ------ | ------ |
| [bind](functions/bind.md) | - |

## Dom Event
元素事件解绑

| Function | 描述 |
| ------ | ------ |
| [unbind](functions/unbind.md) | - |

## EventEmitter

事件发布订阅

| Class | 描述 |
| ------ | ------ |
| [EventEmitter](classes/EventEmitter.md) | - |

## EventEmitter
事件发布订阅实例

| Variable | 描述 |
| ------ | ------ |
| [emitterInstance](variables/emitterInstance.md) | - |

## EventEmitter
事件监听器毁掉函数

| Interface | 描述 |
| ------ | ------ |
| [EventEmitterListener](interfaces/EventEmitterListener.md) | - |

## File
字节数转义

| Function | 描述 |
| ------ | ------ |
| [bytesToSize](functions/bytesToSize.md) | - |

## File
文件下载

| Function | 描述 |
| ------ | ------ |
| [downloadFile](functions/downloadFile.md) | - |

## LinkedList

| Type alias | 描述 |
| ------ | ------ |
| [InsertPosition](type-aliases/InsertPosition.md) | - |

## LinkedList

链表节点

| Interface | 描述 |
| ------ | ------ |
| [LinkedListNode](interfaces/LinkedListNode.md) | - |

## LinkedList

链表配置

| Interface | 描述 |
| ------ | ------ |
| [LinkedListConfig](interfaces/LinkedListConfig.md) | - |

## Math
坐标类型

| Interface | 描述 |
| ------ | ------ |
| [IPoint](interfaces/IPoint.md) | - |

## Number
数字是否在指定范围内

| Function | 描述 |
| ------ | ------ |
| [inRange](functions/inRange.md) | - |

## Number
是否是素数

| Function | 描述 |
| ------ | ------ |
| [isPrime](functions/isPrime.md) | - |

## Number
范围内随机数

| Function | 描述 |
| ------ | ------ |
| [randomNum](functions/randomNum.md) | - |

## Number
限制 num 在指定范围内的随机数

| Function | 描述 |
| ------ | ------ |
| [limitInRange](functions/limitInRange.md) | - |

## Object
判断对象是否具有指定路径的属性

| Function | 描述 |
| ------ | ------ |
| [has](functions/has.md) | - |

## Object
深拷贝

| Function | 描述 |
| ------ | ------ |
| [deepClone](functions/deepClone.md) | - |

## Object
简易合并两个对象（仅合并第一层，如果第一层是引用类型，则会浅拷贝第二个参数同源属性）

| Function | 描述 |
| ------ | ------ |
| [simpleMerge](functions/simpleMerge.md) | - |

## Object
获取一个树节点的所有子节点数组 ( 场景：将一个组织的 code 与该组织的子组织 code 合并到一个数组 )

| Function | 描述 |
| ------ | ------ |
| [flatChildrenKeywords](functions/flatChildrenKeywords.md) | - |

## Other

| Class, Interface, Type alias, Function | 描述 |
| ------ | ------ |
| [LinkedList](classes/LinkedList.md) | LinkedList 链表 |
| [Queue](classes/Queue.md) | Queue 队列 |
| [Stack](classes/Stack.md) | Stack 栈 |
| [FlatChildrenKeysProps](interfaces/FlatChildrenKeysProps.md) | - |
| [GradientColorStop](interfaces/GradientColorStop.md) | - |
| [StackConfig](interfaces/StackConfig.md) | StackConfig 栈配置 |
| [TreeNode](interfaces/TreeNode.md) | - |
| [Arrayable](type-aliases/Arrayable.md) | Array, or not yet |
| [Awaitable](type-aliases/Awaitable.md) | Promise, or maybe not |
| [Constructor](type-aliases/Constructor.md) | Constructor |
| [ElementOf](type-aliases/ElementOf.md) | Infers the element type of an array |
| [Nullable](type-aliases/Nullable.md) | Null or whatever |
| [PartitionFilter](type-aliases/PartitionFilter.md) | - |
| [calculateDistance](functions/calculateDistance.md) | 计算两点之间的距离 |
| [calculateMidpoint](functions/calculateMidpoint.md) | 计算两点之间的中点 |
| [colorStepsHelper](functions/colorStepsHelper.md) | - |
| [eLinearGradient](functions/eLinearGradient.md) | - |
| [eRadialGradient](functions/eRadialGradient.md) | - |
| [isPointInConvexPolygon](functions/isPointInConvexPolygon.md) | 判断点是否在图形内 |
| [post](functions/post.md) | - |
| [throttle](functions/throttle.md) | - |

## Queue
队列配置

| Interface | 描述 |
| ------ | ------ |
| [QueueConfig](interfaces/QueueConfig.md) | - |

## RegExp
整数部分为 [+-] 0-90小数部分为0到6位

| Function | 描述 |
| ------ | ------ |
| [isLatitude](functions/isLatitude.md) | - |

## RegExp
校验 Url

| Function | 描述 |
| ------ | ------ |
| [isUrl](functions/isUrl.md) | - |

## RegExp
校验 Url 包含协议

| Function | 描述 |
| ------ | ------ |
| [isUrlWithProtocol](functions/isUrlWithProtocol.md) | - |

## RegExp
校验 ip 地址

| Function | 描述 |
| ------ | ------ |
| [isIP](functions/isIP.md) | - |

## RegExp
校验 ip 地址和端口

| Function | 描述 |
| ------ | ------ |
| [isIPWithPort](functions/isIPWithPort.md) | - |

## RegExp
校验 子网掩码

| Function | 描述 |
| ------ | ------ |
| [isSubnetMask](functions/isSubnetMask.md) | - |

## RegExp
校验 车牌号

| Function | 描述 |
| ------ | ------ |
| [isOldEnergyLicensePlate](functions/isOldEnergyLicensePlate.md) | - |

## RegExp
校验 邮箱

| Function | 描述 |
| ------ | ------ |
| [isEmail](functions/isEmail.md) | - |

## RegExp
校验 验证新能源车牌

| Function | 描述 |
| ------ | ------ |
| [isNewEnergyLicensePlate](functions/isNewEnergyLicensePlate.md) | - |

## RegExp
校验经度

| Function | 描述 |
| ------ | ------ |
| [isLongitude](functions/isLongitude.md) | - |

## RegExp
验证固定电话号码

| Function | 描述 |
| ------ | ------ |
| [isFixedTelephone](functions/isFixedTelephone.md) | - |

## RegExp
验证是移动手机电话号码

| Function | 描述 |
| ------ | ------ |
| [isMobilePhone](functions/isMobilePhone.md) | - |

## RegExp
验证车牌号（包含新旧能源车牌）

| Function | 描述 |
| ------ | ------ |
| [isLicensePlate](functions/isLicensePlate.md) | - |

## RegRex
严格语义化版本号

| Function | 描述 |
| ------ | ------ |
| [isStrictSemanticVersion](functions/isStrictSemanticVersion.md) | - |

## RegRex
二代身份证格式

| Function | 描述 |
| ------ | ------ |
| [isIdCard](functions/isIdCard.md) | - |

## RegRex
字母、数字、下划线或中划线组成,不能以下划线或者中划线开头和结尾 复杂字符串

| Function | 描述 |
| ------ | ------ |
| [isComplexString](functions/isComplexString.md) | - |

## RegRex
完整日期格式(YYYY-MM-DD)

| Function | 描述 |
| ------ | ------ |
| [isFullDate](functions/isFullDate.md) | - |

## RegRex
标准 12 小时时间格式(hh:mm:ss)

| Function | 描述 |
| ------ | ------ |
| [isTwelveTime](functions/isTwelveTime.md) | - |

## RegRex
标准 24 小时时间格式(HH:mm:ss)

| Function | 描述 |
| ------ | ------ |
| [isTwentyFourTime](functions/isTwentyFourTime.md) | - |

## RegRex
标准化货币格式(必须包含分隔符，支持复数与小数)

| Function | 描述 |
| ------ | ------ |
| [isStandardCurrency](functions/isStandardCurrency.md) | - |

## RegRex
校验密码 严格模式

| Function | 描述 |
| ------ | ------ |
| [isStrictPassword](functions/isStrictPassword.md) | - |

## RegRex
校验简单密码, 密码长度为6-20位, 必须包含数字和字母

| Function | 描述 |
| ------ | ------ |
| [isSimplePassword](functions/isSimplePassword.md) | - |

## RegRex
语义化版本号

| Function | 描述 |
| ------ | ------ |
| [isSemanticVersion](functions/isSemanticVersion.md) | - |

## String

| Function | 描述 |
| ------ | ------ |
| [template](functions/template.md) | - |

## String
伪随机 Id

| Function | 描述 |
| ------ | ------ |
| [randomId](functions/randomId.md) | - |

## String
在指定位置插入字符串

insertString('hello world', 6, 'my ') -> 'hello my world'

| Function | 描述 |
| ------ | ------ |
| [insert](functions/insert.md) | - |

## String
多单词首字母大写

pascal('hello world')  -> 'HelloWorld'

| Function | 描述 |
| ------ | ------ |
| [pascal](functions/pascal.md) | - |

## String
将反斜杠替换为斜杠

| Function | 描述 |
| ------ | ------ |
| [slash](functions/slash.md) | - |

## String
转对象路径数组

| Function | 描述 |
| ------ | ------ |
| [toPathArray](functions/toPathArray.md) | - |

## String
转驼峰命名

camel('hello world')  -> 'helloWorld'

| Function | 描述 |
| ------ | ------ |
| [camel](functions/camel.md) | - |

## String
递增 Id

| Function | 描述 |
| ------ | ------ |
| [uniqueId](functions/uniqueId.md) | - |

## String
首字母大写

capitalize('hello')   -> 'Hello'

| Function | 描述 |
| ------ | ------ |
| [capitalize](functions/capitalize.md) | - |

## Timer

定时器

| Interface | 描述 |
| ------ | ------ |
| [CancelablePromise](interfaces/CancelablePromise.md) | - |

## Timer

防抖配置

| Interface | 描述 |
| ------ | ------ |
| [DebounceOptions](interfaces/DebounceOptions.md) | - |

## Timer
延迟

| Function | 描述 |
| ------ | ------ |
| [sleep](functions/sleep.md) | - |

## Timer
节流

| Interface | 描述 |
| ------ | ------ |
| [ThrottleOptions](interfaces/ThrottleOptions.md) | - |

## Timer
防抖

| Function | 描述 |
| ------ | ------ |
| [debounce](functions/debounce.md) | - |

## Typed
判断是否为 Date

| Function | 描述 |
| ------ | ------ |
| [isDate](functions/isDate.md) | - |

## Typed
判断是否为 Map

| Function | 描述 |
| ------ | ------ |
| [isMap](functions/isMap.md) | - |

## Typed
判断是否为 Promise

| Function | 描述 |
| ------ | ------ |
| [isPromise](functions/isPromise.md) | - |

## Typed
判断是否为 RegExp

| Function | 描述 |
| ------ | ------ |
| [isRegExp](functions/isRegExp.md) | - |

## Typed
判断是否为 Set

| Function | 描述 |
| ------ | ------ |
| [isSet](functions/isSet.md) | - |

## Typed
判断是否为 WeakMap

| Function | 描述 |
| ------ | ------ |
| [isWeakMap](functions/isWeakMap.md) | - |

## Typed
判断是否为 WeakSet

| Function | 描述 |
| ------ | ------ |
| [isWeakSet](functions/isWeakSet.md) | - |

## Typed
判断是否为 array

| Function | 描述 |
| ------ | ------ |
| [isArray](functions/isArray.md) | - |

## Typed
判断是否为 boolean

| Function | 描述 |
| ------ | ------ |
| [isBoolean](functions/isBoolean.md) | - |

## Typed
判断是否为 function

| Function | 描述 |
| ------ | ------ |
| [isFunction](functions/isFunction.md) | - |

## Typed
判断是否为 null

| Function | 描述 |
| ------ | ------ |
| [isNull](functions/isNull.md) | - |

## Typed
判断是否为 null 或 undefined

| Function | 描述 |
| ------ | ------ |
| [isNullable](functions/isNullable.md) | - |

## Typed
判断是否为 number

| Function | 描述 |
| ------ | ------ |
| [isNumber](functions/isNumber.md) | - |

## Typed
判断是否为 object 引用类型

| Function | 描述 |
| ------ | ------ |
| [isObject](functions/isObject.md) | - |

## Typed
判断是否为 string

| Function | 描述 |
| ------ | ------ |
| [isString](functions/isString.md) | - |

## Typed
判断是否为 symbol

| Function | 描述 |
| ------ | ------ |
| [isSymbol](functions/isSymbol.md) | - |

## Typed
判断是否为 undefined

| Function | 描述 |
| ------ | ------ |
| [isUndefined](functions/isUndefined.md) | - |

## Typed
判断是否为普通的 object

| Function | 描述 |
| ------ | ------ |
| [isPlainObject](functions/isPlainObject.md) | - |

## Typed
判断是否为非 null 或 undefined

| Function | 描述 |
| ------ | ------ |
| [isNoNullable](functions/isNoNullable.md) | - |

## Typed
判断是否为非空原始值

| Function | 描述 |
| ------ | ------ |
| [isPrimitive](functions/isPrimitive.md) | - |

## Typed
判断是否为非空数组

| Function | 描述 |
| ------ | ------ |
| [notEmptyArray](functions/notEmptyArray.md) | - |

## Typed
基础类型

| Type alias | 描述 |
| ------ | ------ |
| [RawType](type-aliases/RawType.md) | - |

## Typed
获取类型

| Function | 描述 |
| ------ | ------ |
| [getRawType](functions/getRawType.md) | - |

## Typed
获取类型字符串

| Function | 描述 |
| ------ | ------ |
| [toTypeString](functions/toTypeString.md) | - |
