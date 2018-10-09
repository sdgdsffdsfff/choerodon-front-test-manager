// 文档地址前缀
import { stores } from 'choerodon-front-boot';

const { AppState } = stores;
const projectName = AppState.currentMenuType.name;
const docServer = 'http://v0-7.choerodon.io/zh/docs';
// 界面标题描述统一管理
const pageDetail = {
  status_custom_home_title: `Custom status of project "${projectName}"`,
  status_custom_home_description: 'The table below shows the available test execution status, test step status.',
  // 报表
  report_content_title: `Reports of project "${projectName}"`,
  report_content_description: 'There are two kinks of report：demand -> test -> execute -> defect，defect -> execute -> test -> demand 。  Click to choose whick kind of report you want to see。',

  // 测试循环
  cycle_title: `Cycle of project "${projectName}"`,
  cycle_description: 'The cycle summary uses the tree view to view the test cases corresponding to different version in this project.',
};
const enUS = {
  ...pageDetail,
  // public
  edit: 'Edit',
  create: 'Create',
  detail: 'Detail',
  save: 'Save',
  active: 'Active',
  stoped: 'Stopped',
  refresh: 'Refresh',
  operate: 'Operate',
  cancel: 'Cancel',
  ok: 'Ok',
  delete: 'Delete',
  clone: 'Clone',
  copy: 'Copy',
  expand: 'Expand',
  fold: 'Fold',
  confirm_delete: 'Confirm delete',
  confirm_deleteTip: 'When you click delete, after which the data will be permanently deleted and irreversible!',
  demand: 'Demand',
  test: 'Test',
  step: 'Test Step',
  execute: 'Exexute',
  bug: 'Defects',
  attachment: 'Attachment',
  upload_attachment: 'Upload attachment',
  status: 'Status',
  version: 'Version',
  cycle: 'Cycle',
  type: 'Type',
  color: 'Color',
  comment: 'Description',
  name: 'Name',
  day: 'days',
  today: 'today',
  week: 'week',
  month: 'month',
  export: 'export',
  high: 'high',
  medium: 'medium',
  low: 'low',
  todo: 'todo',
  doing: 'doing',
  done: 'done',
  // 测试执行
  execute_detail: 'Execution details',
  execute_cycle_execute: 'Test execution',
  execute_description: 'Description',
  execute_edit_fullScreen: 'Edit fullScreen',
  execute_status: 'Execute status',
  execute_assignedTo: 'Assigned to',
  execute_executive: 'Executive',
  execute_executeTime: 'Execute time',
  execute_testDetail: 'Test detail',
  execute_executeHistory: 'Execute history',
  // 测试步骤表格
  execute_testStep: 'Execute Step',
  execute_testData: 'Test Data',
  execute_expectedOutcome: 'Expected outcome',
  execute_stepAttachment: 'Step attachment', 
  execute_stepStatus: 'Status',
  execute_comment: 'Comment',    
  execute_copy: 'Copy test step',
  // 执行历史记录表格
  execute_history_oldValue: 'Old value',
  execute_history_newValue: 'New value',  
  // 编辑步骤详情侧边栏
  execute_stepDetail: 'Step detail',
  execute_stepEditTitle: 'Edit the info of test step“{testStep}”',
  execute_quickPass: 'Pass the execute',
  // 测试摘要
  summary_title: 'Test Summary',
  summary_totalTest: 'Total Tests',
  summary_totalTest_tip: 'Total number of test cases',
  summary_totalRest: 'Total Rests',
  summary_total_tip1: 'Total number of test executions with status ',
  summary_total_tip2: '{text}',
  // summary_totalRest_tip: 'Total number of test executions with status "not executed"',
  summary_totalRest_tip3: '',
  summary_totalExexute: 'Total Execute',
  // summary_totalExexute_tip: 'Number of test executions other than "not executed"',
  summary_totalExexute_tip3: '',
  summary_totalNotPlan: 'Not Plan',
  summary_totalNotPlan_tip: 'Number of test cases without test execution added',
  summary_testSummary: 'Test Summary',
  summary_summaryByVersion: 'By Version',
  summary_summaryByComponent: 'By Component',  
  summary_summaryByLabel: 'By Label',
  summary_noVersion: 'Not Plan',
  summary_noComponent: 'No Component',
  summary_noLabel: 'No Label',
  summary_version: 'Version',
  summary_component: 'Component',
  summary_label: 'Label',
  summary_num: 'Number',
  summary_summaryTimeLeap: 'View Period',
  summary_testCreate: 'Test Create',
  summary_testExecute: 'Test Execute',
  summary_createNum: 'Created',
  summary_executeNum: 'Executed',
  summary_testCreated: 'Test Created',
  summary_testExecuted: 'Test Executed',
  summary_testLast: 'Last',

  // 自定义状态
  status_title: 'Custom Status',
  status_create: 'Create Status',
  status_executeStatus: 'Execute Status',
  status_steptatus: 'Step Status',
  status_type: 'Type',
  status_comment: 'Comment',
  status_color: 'Color',
  // 自定义状态侧边栏 
  status_side_content_title: `Create status in project “${projectName}”`,
  status_side_edit_content_title: `Edit status in project “${projectName}”`,
  status_side_content_description: 'You can create status which includes execute status and step status.',
  status_side_edit_content_description: 'You can edit the status in project.',
  // 报表
  report_title: 'All reports',
  report_switch: 'Switch report',
  report_dropDown_demand: 'demand to defect',
  report_dropDown_defect: 'defect to demand',
  report_dropDown_home: 'home',
  report_demandToDefect: 'demand -> test -> execute -> defect', 
  report_defectToDemand: 'defect -> execute -> test -> demand',
  report_demandToDefect_description: 'Search for requirements or defects from the Type field, then select the appropriate version to narrow the scope, and finally click Generate to create a traceability report.',
  report_defectToDemand_description: 'Search for requirements or defects from the Type field, then select the appropriate version to narrow the scope, and finally click Generate to create a traceability report.',
  report_chooseQuestion: 'choose question',
  report_defectCount: 'Defect count',
  report_total: 'Total',
  // 选择问题侧边栏
  report_select_title: 'Choose questions',
  report_select_content_title: `Choose questions from project “${projectName}”`,
  report_select_content_description: 'You can choose any questions to generate report',
  report_select_allVersion: 'All versions',
  report_select_questionId: 'test question ID',
  report_select_summary: 'summary',
  // 测试计划
  testPlan_name: 'test plan',
  testPlan_createStage: 'add test stage',
  testPlan_linkFolder: 'link folder',
  testPlan_createStageIn: 'add test stage in cycle “{cycleName}”',
  testPlan_EditStage_title: 'EditStage',
  testPlan_EditStage: 'edit stage “{cycleName}”',
  // 测试执行
  cycle_title: 'Test Execute',
  cycle_name: 'Test cycle',
  cycle_my: 'my cycles',
  cycle_all: 'all cycles',
  cycle_cycleName: 'Cycle name',
  cycle_stageName: 'Stage name',
  cycle_addCycle: 'create execute',
  cycle_build: 'Build',
  cycle_environment: 'Environment',
  cycle_createBy: 'Created by',
  cycle_startTime: 'Started on',
  cycle_ExecuteDetail: 'Cycle Execute',
  cycle_endTime: 'Ended on',
  cycle_totalExecute: 'Total Execute',
  cycle_totalExecuted: 'Total Executed',
  cycle_comment: 'Description',
  cycle_executeBy: 'Execute by',
  cycle_executeTime: 'Execute time',
  cycle_assignedTo: 'Assigned to',
  // 循环树
  cycle_addFolder: 'Add stage',
  cycle_editCycle: 'Edit cycle',
  cycle_deleteCycle: 'Delete cycle',
  cycle_cloneCycle: 'Clone cycle',
  cycle_editFolder: 'Edit stage',
  cycle_deleteFolder: 'Delete stage',
  cycle_cloneFolder: 'Clone stage',
  cycle_exportCycle: 'Export cycle',
  cycle_exportFolder: 'Export stage',
  cycle_newFolder: 'New stage',
  cycle_sync: 'sync',
  // 创建测试循环侧边
  cycle_create_title: 'Create cycle',
  cycle_create_content_title: `Create cycle in project “${projectName}”`,
  cycle_create_content_description: 'You can create cycles in a version.',
  // 创建执行侧边
  cycle_createExecute_title: 'Create cycle execute',
  cycle_createExecute_content_title: 'Add cycle execute to {type} “{title}”',
  cycle_createExecute_content_description: 'You can create executes to a version',
  cycle_createExecute_createFromQuestion: 'Create from question',
  cycle_createExecute_createFromCycle: 'Create from cycle',
  cycle_createExecute_testQuestion: 'Test questions',
  cycle_createExecute_me: 'Me',
  cycle_createExecute_others: 'Others',
  cycle_createExecute_selectAssign: 'Choose assign',
  cycle_createExecute_folder: 'Stage',
  cycle_createExecute_assigned: 'Assigned to',
  cycle_createExecute_filter: 'Filters',
  cycle_createExecute_priority: 'Priority',
  cycle_createExecute_executeStatus: 'Execute status',
  cycle_createExecute_component: 'Components',
  cycle_createExecute_label: 'Labels',
  cycle_createExecute_hasDefects: 'Has defects ?',
  cycle_createExecute_yes: 'Yes',
  cycle_createExecute_no: 'No',
  cycle_createExecute_defectStatus: 'Defect status',

  // 测试用例管理
  issue_name: 'Test issue management',
  issue_noIssueTitle: 'No issues were found based on current search criteria',
  issue_noIssueDescription: 'Try modifying your filtering options or creating a new issue below',
  issue_createTestIssue: 'Create test issue',
  issue_filterTestIssue: 'Filter',
  issue_issueTotal: '{total} issues in total',
  issue_issueSort: 'Sort',
  issue_issueSortByName: 'Issue name',
  issue_issueSortByType: 'Issue type',
  issue_issueSortByPriority: 'Issue priority',
  issue_issueSortByStatus: 'Issue status',
  issue_issueSortByPerson: 'Issue manager',
  issue_issueFilterByNum: 'ID',
  issue_issueFilterBySummary: 'Summary',
  issue_issueFilterByPriority: 'Priority',
  issue_issueFilterByStatus: 'Status',
  issue_issueCreate: 'Create test issue',
  issue_whatToDo: 'What to do',
  issue_issueType: 'Issue type:   {type}',
  issue_issueNum: 'Issue Number:   {num}',
  issue_issueSummary: 'Issue summary:   {summary}',
  issue_issueReport: 'Issue reporter:   {report}',
  issue_issueAssign: 'Issue manager:   {assign}',
  issue_issueStatus: 'Issue status:   {status}',
  issue_issuePriority: 'Issue priority:   {priority}',
  issue_issueReportTo: 'Report to',
  issue_issueUpdateOn: 'Update on',
  issue_issueCreateAt: 'Create on',
  issue_repository: 'issue repository',
  issue_folder: 'folder',
  // 创建测试用例侧边栏
  issue_create_name: 'Create test issue',
  issue_create_title: `Create test issue in project “${projectName}”`,
  issue_create_content_description: 'Please enter the details of the test case below, including detailed descriptions, personnel information, version information, progress estimates, priorities, and more. You can help people understand tasks faster and more comprehensively through rich task descriptions, and better control the progress of problems.',
  issue_create_content_epic: 'Epic',
  issue_create_content_sprint: 'Sprint',
  issue_create_content_version: 'Version',
  // 编辑详情侧边栏
  issue_edit_hide: 'Hide detail',
  issue_edit_planTime: 'Estimated time',
  issue_edit_executeTest: 'Execute test',
  issue_edit_version: 'Affected version',
  issue_edit_timeFollow: 'Time tracking',
  issue_edit_registrationWork: 'Registration work',
  issue_edit_person: 'Personnel',
  issue_edit_reporter: 'Reporter',
  issue_edit_assignToMe: 'Assign to me',
  issue_edit_manager: 'Manager',
  issue_edit_date: 'Date',
  issue_edit_createDate: 'Create at',
  issue_edit_updateDate: 'Update at',
  issue_edit_testDetail: 'Test detail',
  issue_edit_addTestDetail: 'Create test detail',
  issue_edit_comment: 'Comment',
  issue_edit_addComment: 'Add comment',
  issue_edit_workLog: 'Work log',
  issue_edit_addWworkLog: 'Registration work log',
  issue_edit_copyIssue: 'Copy issue',
  issue_edit_activeLog: 'Activity log',
  issue_edit_linkIssue: 'Linked Issue',
  issue_edit_addLinkIssue: 'Add link issue',
  // 创建测试步骤
  issue_createStep_title: 'Add test detail',
  issue_createStep_content_title: 'Create test dedail in issue “{issueName}”',
  issue_createStep_content_description: 'You can create any number of test steps.',
  // 执行测试侧边栏
  issue_executeTest_content_title: 'Execute test in issue “{issueName}”',
  issue_executeTest_content_description: 'Add test cases to a test loop or folder to form a test execution.',
  // 拷贝issue
  issue_copy_title: 'Copy issue {issueNum}',
  issue_copy_copySprint: 'Copy sprint ?',
  issue_copy_copyLinkIssue: 'Copy linked issue ?',
  // 创建链接任务
  issue_create_link_title: 'Create link',
  issue_create_link_content_title: 'Create link for issue',
  issue_create_link_content_description: 'Enter the basic information about the task below, including the relationship you want to create (copy, block, associate, destroy, be copied, blocked, broken, etc.) and the problem you want to associate (support multiple choices).',
  issue_create_link_content_create_relation: 'Relation',
  issue_create_link_content_create_question: 'Issue',
  // 登记工作日志
  issue_worklog_title: 'Registration work log',
  issue_worklog_content_title: 'Registration work log for "{issueNum}"',
  issue_worklog_content_description: 'You can record your work here, and the time spent will be deducted from the estimated time in the associated problem to more accurately calculate the progress of the problem and improve work efficiency.',
  issue_worklog_time: 'Waste time*',
  issue_worklog_workTime: 'Work date*',
  issue_worklog_lastTime: 'Remaining estimate',
  issue_worklog_autoAdjust: 'Auto adjust',
  issue_worklog_withoutTime: "Don't set estimate",
  issue_worklog_setTo: 'Set to',
  issue_worklog_reduce: 'Reduce',
  issue_worklog_workDescription: 'Work description',
  // 编辑测试步骤
  issue_edit_step_title: 'Test detail',
  issue_edit_step_content_title: 'Edit detail of test step“{testStep}”',
  issue_edit_step_content_description: 'You can edit the details of the test steps.',
  // 
  issue_create_bug: 'Create bug',
  // issue树
  issue_tree_rename: 'rename',
  issue_tree_delete: 'delete',
  issue_tree_copy: 'copy',
  issue_tree_paste: 'paste',
  // dashboard
  dashboard_issue: '测试用例管理',
  dashboard_cycle: '测试循环',
  dashboard_execute: '执行测试',
  dashboard_report: '测试报告',
};
export default enUS;
