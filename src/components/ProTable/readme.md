# ProTable 高级表格

> antd iview 都有类似的封装，但是 elementui 没有，所有我在他基础上封装一个简单的

## API

| 属性          | 描述                                                                                                                    | 类型                                                                        | 默认值 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------ |
| rowKey        | 表格行的 key 某些情况下需要，参考 el-table                                                                              | String                                                                      | -      |
| search        | 搜索栏表单配置项，默认 true 时会根据 columns 自动生成，设置 false 时将不显示，通过 Object 设置其他细节                  | Object，Boolean                                                             | true   |
| request       | 获取表格数据的函数，在查询 重置 分页等更新数据的情况会触发                                                              | Function：(current, pageSize, ...params) => ({tableData, pageCount, total}) | 必填项 |
| columns       | 列配置                                                                                                                  | Array                                                                       | 必填项 |
| manualRequest | 是否需要手动触发首次请求, 配置为 true 时不要隐藏搜索表单，false 时自动触发                                              | Boolean                                                                     | false  |
| toolBar       | 工具栏配置，为 null 或者 false 时不开启，使用 Object 传入按钮列表和其他细节，也可以设置为 true 并使用插槽 tool-bar      | Object，Boolean                                                             | null   |
| batchBar      | 批量操作配置，为 null 或者 false 时不开启，使用 Object 传入按钮列表和其他细节，也可以设置为 true 并使用插槽 batch-bar   | Object，Boolean                                                             | null   |
| actions       | table 操作栏配置，为 null 或者 false 时不开启，使用 Object 传入按钮列表和其他细节，也可以设置为 true 并使用插槽 actions | Object，Boolean                                                             | null   |
| pagination    | 分页配置 为 null 或者 false 时不开启，使用 Object 传入其他细节                                                          | Object，Boolean                                                             | true   |

## search Object

| 属性       | 描述                                                 | 类型   | 默认值 |
| ---------- | ---------------------------------------------------- | ------ | ------ |
| searchText | 查询按钮文字                                         | String | 查 询  |
| resetText  | 重置按钮文字                                         | String | 重 置  |
| rules      | 查询表单验证规则，一般不需要，除非你需要验证查询条件 | Object | -      |

## columns 列

| 属性         | 描述                                                                 | 类型    | 默认值 |
| ------------ | -------------------------------------------------------------------- | ------- | ------ |
| key          | 字段属性值，也被用于 v-for 中的 key，所以不能重复                    | String  | 必填项 |
| title        | 被用于表格标题和 form-item 的 label                                  | String  | -      |
| type         | 字段类型，用来确定表格和表单的表现形式，可选值 index，select         | String  | -      |
| options      | type 为 select 时，选项列表，格式为：[{value:'',label:''},...]       | Array   | []     |
| dict         | type 为 select 时，可选择字典，比 options 优先级高                   | String  | -      |
| showInSearch | 是否出现在搜索栏表单中                                               | boolean | false  |
| width        | 表格中的列宽，参考：el-table-column                                  | -       | -      |
| minWidth     | 表格中的列最小宽度，参考：el-table-column                            | -       | -      |
| fixed        | 列是否固定在左侧或者右侧，true 表示固定在左侧，参考：el-table-column | -       | -      |

## toolBar Object

| 属性    | 描述                                                                | 类型   | 默认值 |
| ------- | ------------------------------------------------------------------- | ------ | ------ |
| butList | 按钮列表，详情参考 butList，onClick 参数为                          | Array  | -      |
| size    | 批量设置工具栏中的按钮大小，参考：el-button ，权重比 butList 中的小 | String | small  |

## batchBar Object

| 属性                  | 描述                                                                | 类型    | 默认值 |
| --------------------- | ------------------------------------------------------------------- | ------- | ------ |
| butList               | 按钮列表，详情参考 butList，onClick 参数为                          | Array   | -      |
| size                  | 批量设置工具栏中的按钮大小，参考：el-button ，权重比 butList 中的小 | String  | small  |
| reserveSelection      | 在数据更新之后保留之前选中的数据，参考：el-table                    | Boolean | false  |
| selectOnIndeterminate | 参考：el-table-column                                               | -       | true   |
| selectable            | 多选禁用 参考：el-table-column                                      | -       | -      |

## actions Object

| 属性      | 描述                                                                | 类型   | 默认值 |
| --------- | ------------------------------------------------------------------- | ------ | ------ |
| labelText | 操作栏 label                                                        | String | 操作   |
| width     | 操作栏宽度，参考：el-table-column                                   | -      | -      |
| minWidth  | 操作栏最小宽度，参考：el-table-column                               | -      | -      |
| fixed     | 操作栏列是否固定在左侧或者右侧，参考：el-table-column               | -      | right  |
| butList   | 按钮列表，详情参考 butList，onClick 参数为                          | Array  | -      |
| size      | 批量设置工具栏中的按钮大小，参考：el-button ，权重比 butList 中的小 | String | small  |

## butList 项

| 属性     | 描述                                     | 类型     | 默认值 |
| -------- | ---------------------------------------- | -------- | ------ |
| text     | 按钮文本                                 | String   | -      |
| onClick  | 点击时触发的函数，函数参数请参考具体文档 | Function | -      |
| 【其他】 | 其他 el-button 的参数                    |          |        |

## pagination Object

| 属性       | 描述                                              | 类型    | 默认值 |
| ---------- | ------------------------------------------------- | ------- | ------ |
| pageSize   | 初始化页大小                                      | Number  | 10     |
| background | 参考 el-pagination                                | Boolean | true   |
| layout     | 参考 el-pagination                                | -       | -      |
| pageSizes  | 每页显示个数选择器的选项设置， 参考 el-pagination | -       | -      |
| textAlign  | 水平对齐方式                                      | String  | right  |
