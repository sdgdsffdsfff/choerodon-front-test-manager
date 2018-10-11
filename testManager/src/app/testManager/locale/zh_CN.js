// zh_CN.js
import { stores } from 'choerodon-front-boot';

const { AppState } = stores;
const projectName = AppState.currentMenuType.name;
// 文档地址前缀
const docServer = 'http://v0-7.choerodon.io/zh/docs';
// 界面标题描述统一管理
const pageDetail = {

  status_custom_home_title: `项目"${projectName}"的自定义状态`,
  status_custom_home_description: '下表显示可用测试执行状态，测试步骤状态。',

  // 报表
  report_content_title: `项目"${projectName}"的报表`,
  report_content_description: '两种可跟踪性报告可用：要求 -> 测试 -> 执行 -> 缺陷，缺陷 -> 执行 -> 测试 -> 。  点击您需要查看的报告类型可以查看具体的详细内容。',

  // 测试循环
  cycle_title: `项目"${projectName}"的循环摘要`,
  cycle_description: '循环摘要使用树状图查看本项目中不同版本所对应的测试情况。',
};

const zhCN = {
  ...pageDetail,
  // public
  refresh: '刷新',
  detail: '详情',
  operate: '操作',
  save: '保存',
  active: '启用',
  edit: '修改',
  create: '创建',
  cancel: '取消',
  ok: '确定',
  delete: '删除',
  clone: '克隆',
  copy: '复制',
  expand: '展开',
  fold: '折叠',
  confirm_delete: '确认删除吗？',
  confirm_deleteTip: '当你点击删除后，该条数据将被永久删除，不可恢复!',
  demand: '要求',
  test: '测试',
  step: '步骤',
  execute: '执行',
  bug: '缺陷',
  attachment: '附件',
  upload_attachment: '上传附件',
  status: '状态',
  version: '版本',
  cycle: '测试循环',
  type: '类型',
  color: '颜色',
  comment: '说明',
  name: '名称',
  day: '天',
  today: '今日',
  week: '周',
  month: '月',
  export: '导出',
  high: '高',
  medium: '中',
  low: '低',
  todo: '待处理',
  doing: '进行中',
  done: '已完成',
  next: '下一步',
  previous: '上一步',
  // 执行详情
  execute_detail: '执行详情',
  execute_cycle_execute: '测试执行',
  execute_description: '描述',
  execute_edit_fullScreen: '全屏编辑',
  execute_status: '执行状态',
  execute_assignedTo: '已指定至',
  execute_executive: '执行方',
  execute_executeTime: '执行时间',
  execute_testDetail: '测试详细信息',
  execute_executeHistory: '执行历史记录',
  // 测试步骤表格
  execute_testStep: '测试步骤',
  execute_testData: '测试数据',
  execute_expectedOutcome: '预期结果',
  execute_stepAttachment: '步骤附件',
  execute_stepStatus: '状态',
  execute_comment: '注释',
  execute_copy: '复制测试步骤',
  // 执行历史记录表格
  execute_history_oldValue: '原值',
  execute_history_newValue: '新值',
  // 编辑步骤详情侧边栏
  execute_stepDetail: '测试详细信息',
  execute_stepEditTitle: '修改步骤“{testStep}”的信息',
  execute_quickPass: '直接将执行的状态置为通过',


  // 测试摘要
  summary_title: '测试摘要',
  summary_totalTest: '总测试数量',
  summary_totalTest_tip: '测试用例总数',
  summary_totalRest: '总剩余数量',
  summary_total_tip1: '状态为',
  summary_total_tip2: '{text}',
  summary_totalRest_tip3: '的测试执行总数',
  summary_totalExexute: '总执行数量',
  summary_totalExexute_tip3: '的测试执行数',
  summary_totalNotPlan: '总未规划数量',
  summary_totalNotPlan_tip: '未添加测试执行的测试用例数量',
  summary_testSummary: '测试统计',
  summary_summaryByVersion: '按版本',
  summary_summaryByComponent: '按模块',
  summary_summaryByLabel: '按标签',
  summary_noVersion: '未规划',
  summary_noComponent: '无模块',
  summary_noLabel: '无标签',
  summary_version: '版本',
  summary_component: '模块',
  summary_label: '标签',
  summary_num: '数量',
  summary_summaryTimeLeap: '查看时段',
  summary_testCreate: '测试创建',
  summary_testExecute: '测试执行',
  summary_createNum: '创建数',
  summary_executeNum: '执行数',
  summary_testCreated: '创建测试',
  summary_testExecuted: '执行测试',
  summary_testLast: '过去',

  // 自定义状态
  status_title: '自定义状态',
  status_create: '创建状态',
  status_executeStatus: '测试执行状态',
  status_steptatus: '测试步骤状态',
  status_type: '类型',
  status_comment: '说明',
  status_color: '颜色',
  // 自定义状态侧边栏 
  status_side_content_title: `在项目“${projectName}”中创建状态`,
  status_side_edit_content_title: `编辑项目“${projectName}”中的状态`,
  status_side_content_description: '您可以创建自定义状态，包括执行状态和步骤状态。',
  status_side_edit_content_description: '您可以自定义状态，包括执行状态和步骤状态。',
  // 报表
  report_title: '报表',
  report_switch: '切换报表',
  report_dropDown_demand: '要求到缺陷',
  report_dropDown_defect: '缺陷到要求',
  report_dropDown_home: '主页',
  report_demandToDefect: '要求 -> 测试 -> 执行 -> 缺陷',
  report_defectToDemand: '缺陷 -> 执行 -> 测试 -> 要求',
  report_demandToDefect_description: '从类型字段搜索要求或缺陷，然后选择合适版本以缩小范围，最后单击“生成” 创建可跟踪性报告。',
  report_defectToDemand_description: '从类型字段搜索要求或缺陷，然后选择合适版本以缩小范围，最后单击“生成” 创建可跟踪性报告。',
  report_chooseQuestion: '选择问题',
  report_defectCount: '缺陷数',
  report_total: '总共',
  // 选择问题侧边栏
  report_select_title: '选择问题',
  report_select_content_title: `项目“${projectName}”的报表选择问题`,
  report_select_content_description: '您可以选择任意问题生成报表',
  report_select_allVersion: '所有版本',
  report_select_questionId: '测试问题ID',
  report_select_summary: '摘要',
  // 测试计划
  testPlan_name: '测试计划',
  testPlan_createStage: '添加测试阶段',
  testPlan_linkFolder: '关联文件夹',
  testPlan_createStageIn: '在测试循环“{cycleName}”中添加测试阶段',
  testPlan_EditStage_title: '编辑测试阶段',
  testPlan_EditStage: '编辑测试阶段“{cycleName}”',
  // 测试循环
  cycle_title: '测试执行',
  cycle_name: '测试循环',
  cycle_my: '我的执行',
  cycle_all: '所有执行',
  cycle_cycleName: '循环名称',
  cycle_stageName: '阶段名称',
  cycle_addCycle: '添加执行',
  cycle_build: '构建号',
  cycle_environment: '环境',
  cycle_createBy: '创建人',
  cycle_startTime: '开始时间',
  cycle_ExecuteDetail: '循环层执行数',
  cycle_endTime: '结束时间',
  cycle_totalExecute: '执行数',
  cycle_totalExecuted: '已执行数',
  cycle_comment: '描述',
  cycle_executeBy: '执行方',
  cycle_executeTime: '执行时间',
  cycle_assignedTo: '被指定人',
  // 循环树
  cycle_addFolder: '增加阶段',
  cycle_editCycle: '编辑循环',
  cycle_deleteCycle: '删除循环',
  cycle_cloneCycle: '克隆循环',
  cycle_editFolder: '编辑阶段',
  cycle_deleteFolder: '删除阶段',
  cycle_cloneFolder: '克隆阶段',
  cycle_exportCycle: '导出循环',
  cycle_exportFolder: '导出阶段',
  cycle_newFolder: '新测试阶段',
  cycle_sync: '同步',

  // 创建测试循环侧边
  cycle_create_title: '创建测试循环',
  cycle_create_content_title: `在项目“${projectName}”中创建测试循环`,
  cycle_create_content_description: '您可以在一个版本中创建一个测试循环。',
  // 创建执行侧边
  cycle_createExecute_title: '添加测试执行',
  cycle_createExecute_content_title: '添加测试执行到{type}“{title}”',
  cycle_createExecute_content_description: '您可以在目标版本创建多个测试执行，可以从问题或已有执行创建。',
  cycle_createExecute_createFromQuestion: '从问题添加',
  cycle_createExecute_createFromCycle: '从循环添加',
  cycle_createExecute_testQuestion: '测试问题',
  cycle_createExecute_me: '我',
  cycle_createExecute_others: '其他人',
  cycle_createExecute_selectAssign: '选择指派人',
  cycle_createExecute_folder: '测试步骤',
  cycle_createExecute_assigned: '被指定人',
  cycle_createExecute_filter: '筛选器',
  cycle_createExecute_priority: '优先级',
  cycle_createExecute_executeStatus: '测试执行状态',
  cycle_createExecute_component: '模块',
  cycle_createExecute_label: '标签',
  cycle_createExecute_hasDefects: '是否具有相关缺陷',
  cycle_createExecute_yes: '是',
  cycle_createExecute_no: '否',
  cycle_createExecute_defectStatus: '缺陷状态',


  // 测试用例管理
  issue_name: '测试用例管理',
  issue_noIssueTitle: '根据当前搜索条件没有查询到问题',
  issue_noIssueDescription: '尝试修改您的过滤选项或者在下面创建新的问题',
  issue_createTestIssue: '创建测试用例',
  issue_filterTestIssue: '过滤表',
  issue_issueTotal: '共{total}条任务',
  issue_issueSort: '排序',
  issue_issueSortByName: '问题名称',
  issue_issueSortByType: '问题类型',
  issue_issueSortByPriority: '问题优先级',
  issue_issueSortByStatus: '问题状态',
  issue_issueSortByPerson: '经办人',
  issue_issueFilterByNum: '编号',
  issue_issueFilterBySummary: '概要',
  issue_issueFilterByPriority: '优先级',
  issue_issueFilterByStatus: '状态',
  issue_issueCreate: '创建测试用例',
  issue_whatToDo: '需要做什么',
  issue_issueType: '任务类型:   {type}',
  issue_issueNum: '任务编号:   {num}',
  issue_issueSummary: '任务概要:   {summary}',
  issue_issueReport: '任务报告人:   {report}',
  issue_issueAssign: '任务经办人:   {assign}',
  issue_issueStatus: '任务状态:   {status}',
  issue_issuePriority: '任务优先级:   {priority}',
  issue_issueReportTo: '报告给',
  issue_issueUpdateOn: '更新于',
  issue_issueCreateAt: '创建于',
  issue_repository: '用例仓库',
  issue_folder: '文件夹',
  // 创建测试用例侧边栏
  issue_create_name: '创建测试用例',
  issue_create_title: `在项目“${projectName}”中创建测试用例`,
  issue_create_content_description: '请在下面输入测试用例的详细信息，包含详细描述、人员信息、版本信息、进度预估、优先级等等。您可以通过丰富的任务描述帮助相关人员更快更全面的理解任务，同时更好的把控问题进度。',
  issue_create_content_epic: '史诗',
  issue_create_content_sprint: '冲刺',
  issue_create_content_version: '版本',
  // 编辑详情侧边栏
  issue_edit_hide: '隐藏详情',
  issue_edit_planTime: '预估时间',
  issue_edit_executeTest: '执行测试',
  issue_edit_version: '影响的版本',
  issue_edit_timeFollow: '时间跟踪',
  issue_edit_registrationWork: '登记工作',
  issue_edit_person: '人员',
  issue_edit_reporter: '报告人',
  issue_edit_assignToMe: '指派给我',
  issue_edit_manager: '经办人',
  issue_edit_date: '日期',
  issue_edit_createDate: '创建时间',
  issue_edit_updateDate: '更新时间',
  issue_edit_testDetail: '测试详细信息',
  issue_edit_addTestDetail: '添加测试信息',
  issue_edit_comment: '评论',
  issue_edit_addComment: '添加评论',
  issue_edit_workLog: '工作日志',
  issue_edit_addWworkLog: '登记工作日志',
  issue_edit_copyIssue: '复制用例',
  issue_edit_activeLog: '活动日志',
  issue_edit_linkIssue: '问题链接',
  issue_edit_addLinkIssue: '创建链接',
  // 创建测试步骤
  issue_createStep_title: '添加测试详细信息',
  issue_createStep_content_title: '在用例“{issueName}”中创建测试步骤',
  issue_createStep_content_description: '您可以创建任意个测试步骤。',
  // 执行测试侧边栏
  issue_executeTest_content_title: '在测试“{issueName}”中执行测试',
  issue_executeTest_content_description: '将测试用例添加到测试循环或文件夹中，构成一次测试执行。',
  // 拷贝issue
  issue_copy_title: '复制问题{issueNum}',
  issue_copy_copySprint: '是否复制冲刺',
  issue_copy_copyLinkIssue: '是否复制关联任务',
  // 创建链接任务
  issue_create_link_title: '创建链接',
  issue_create_link_content_title: '对问题创建链接',
  issue_create_link_content_description: '请在下面输入相关任务的基本信息，包括所要创建的关系（复制、阻塞、关联、破坏、被复制、被阻塞、被破坏等）以及所要关联的问题（支持多选）。',
  issue_create_link_content_create_relation: '关系',
  issue_create_link_content_create_question: '问题',
  // 登记工作日志
  issue_worklog_title: '登记工作日志',
  issue_worklog_content_title: '登记"{issueNum}"的工作日志',
  issue_worklog_content_description: '您可以在这里记录您的工作，花费的时间会在关联问题中预估时间进行扣减，以便更精确地计算问题进度和提升工作效率。',
  issue_worklog_time: '耗费时间*',
  issue_worklog_workTime: '工作日期*',
  issue_worklog_lastTime: '剩余的估计',
  issue_worklog_autoAdjust: '自动调整',
  issue_worklog_withoutTime: '不设置预估时间',
  issue_worklog_setTo: '设置为',
  issue_worklog_reduce: '缩减',
  issue_worklog_workDescription: '工作说明',
  // 编辑测试步骤
  issue_edit_step_title: '测试详细信息',
  issue_edit_step_content_title: '编辑步骤“{testStep}”的详细信息',
  issue_edit_step_content_description: '您可以编辑测试步骤的详细信息。',
  // 
  issue_create_bug: '新建缺陷',
  // issue树
  issue_tree_rename: '重命名',
  issue_tree_delete: '删除',
  issue_tree_copy: '复制',
  issue_tree_paste: '粘贴',
  // dashboard
  dashboard_issue: '测试用例管理',
  dashboard_cycle: '测试循环',
  dashboard_execute: '执行测试',
  dashboard_report: '测试报告',
  // 自动化测试
  autotest_header_title: '自动化测试',
  'autotest.title': '在项目“{name}”中创建自动化测试',
  'autotest.description': '您可以在此页面选择测试框架，测试应用以及测试应用的版本，修改配置以创建自动化测试。',
  autoteststep_one_title: '选择测试实例',
  autoteststep_one_description: '您可以在此页面选择测试框架，测试应用以及测试应用的版本。',
  autoteststep_one_app: '选择应用',
  autoteststep_one_version_title: '选择应用版本',
  autoteststep_one_version: '应用版本',
  autotestapp_add: '打开应用列表',
  autoteststep_two_title: '修改配置信息',
  autoteststep_three_title: '确认信息并执行',
  // 测试列表页面
  autotestlist_title: '测试记录',
  autotestlist_content_title: `项目“${projectName}”的测试记录`,
  autotestlist_content_description: '测试记录保存了自动化测试的所有记录',
};

export default zhCN;
