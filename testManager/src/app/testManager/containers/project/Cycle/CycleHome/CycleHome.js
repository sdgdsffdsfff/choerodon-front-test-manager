
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Page, Header, Content, stores } from 'choerodon-front-boot';
import { Tooltip, Table, Button, Icon, Input, Tree, Spin, Modal } from 'choerodon-ui';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import './CycleHome.scss';
import { getCycles, deleteExecute, getCycleById, editCycleExecute, clone, addFolder, getStatusList } from '../../../../api/cycleApi';
import { TreeTitle, CreateCycle, EditCycle, CreateCycleExecute, ShowCycleData } from '../../../../components/CycleComponent';
import DragTable from '../../../../components/DragTable';
import { RichTextShow } from '../../../../components/CommonComponent';
import { delta2Html, delta2Text, issueLink } from '../../../../common/utils';
import CycleStore from '../../../../store/project/cycle/CycleStore';


const { AppState } = stores;
const { confirm } = Modal;
const styles = {
  statusOption: {
    width: 60,
    textAlign: 'center',
    borderRadius: '100px',
    display: 'inline-block',
    color: 'white',
  },
};

const dataList = [];

const TreeNode = Tree.TreeNode;

@observer
class CycleHome extends Component {
  state = {
    CreateCycleExecuteVisible: false,
    CreateCycleVisible: false,
    EditCycleVisible: false,
    loading: true,
    leftVisible: true,
    rightLoading: false,
    sideVisible: false,
    testList: [],
    // currentCycle: {},
    currentEditValue: {},
    autoExpandParent: true,
    searchValue: '',
    executePagination: {
      current: 1,
      total: 0,
      pageSize: 5,
    },
    statusList: [],
  };
  componentDidMount() {
    this.refresh();
  }

  onExpand = (expandedKeys) => {
    CycleStore.setExpandedKeys(expandedKeys);
    this.setState({
      autoExpandParent: false,
    });
  }
  onDragEnd = (sourceIndex, targetIndex) => {
    let lastRank = null;
    let nextRank = null;
    const { testList } = this.state;
    if (sourceIndex < targetIndex) {
      lastRank = testList[targetIndex].rank;
      nextRank = testList[targetIndex + 1] ? testList[targetIndex + 1].rank : null;
    } else if (sourceIndex > targetIndex) {
      lastRank = testList[targetIndex - 1] ? testList[targetIndex - 1].rank : null;
      nextRank = testList[targetIndex].rank;
    }
    window.console.log(sourceIndex, targetIndex, lastRank, nextRank);
    const source = testList[sourceIndex];
    const temp = { ...source };
    delete temp.defects;
    delete temp.caseAttachment;
    delete temp.testCycleCaseStepES;
    delete temp.issueInfosDTO;
    this.setState({ rightLoading: true });
    editCycleExecute({
      ...temp,
      ...{
        lastRank,
        nextRank,
      },
    }).then((res) => {
      const { executePagination } = this.state;
      const currentCycle = CycleStore.getCurrentCycle;
      getCycleById({
        page: executePagination.current - 1,
        size: executePagination.pageSize,
      }, currentCycle.cycleId).then((cycle) => {
        this.setState({
          rightLoading: false,
          testList: cycle.content,
          executePagination: {
            current: executePagination.current,
            pageSize: executePagination.pageSize,
            total: cycle.totalElements,
          },
        });
        // window.console.log(cycle);
      });
    });
  }
  getParentKey = (key, tree) => key.split('-').slice(0, -1).join('-')
  loadCycle = (selectedKeys, { selected, selectedNodes, node, event }, flag) => {
    // window.console.log(selectedNodes, node, event);
    CycleStore.setSelectedKeys(selectedKeys);
    const { data } = node.props;
    const { executePagination } = this.state;
    if (data.cycleId) {
      if (!flag) {
        this.setState({
          rightLoading: true,
          // currentCycle: data,
        });
      }

      CycleStore.setCurrentCycle(data);
      // window.console.log(data);
      getStatusList('CYCLE_CASE').then((statusList) => {
        this.setState({ statusList });
      });
      getCycleById({
        page: executePagination.current - 1,
        size: executePagination.pageSize,
      }, data.cycleId).then((cycle) => {
        this.setState({
          rightLoading: false,
          testList: cycle.content,
          executePagination: {
            current: executePagination.current,
            pageSize: executePagination.pageSize,
            total: cycle.totalElements,
          },
        });
        // window.console.log(cycle);
      });
    }
  }


  generateList = (data) => {
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i];
      const { key, title } = node;
      dataList.push({ key, title });
      if (node.children) {
        this.generateList(node.children, node.key);
      }
    }
  }
  deleteExecute = (record) => {
    const that = this;
    const { executeId, cycleId } = record;
    const { executePagination } = this.state;
    confirm({
      width: 560,
      title: Choerodon.getMessage('确认删除吗?', 'Confirm delete'),
      content: <div style={{ marginBottom: 32 }}>
        {Choerodon.getMessage('当你点击删除后，该条数据将被永久删除，不可恢复!', 'When you click delete, after which the data will be permanently deleted and irreversible!')}
      </div>,
      onOk() {
        that.setState({
          rightLoading: true,
        });
        deleteExecute(executeId)
          .then((res) => {
            that.refresh();
          }).catch(() => {
            Choerodon.prompt('网络异常');
            that.setState({
              rightLoading: false,
            });
          });
      },
      onCancel() { },
      okText: '删除',
      okType: 'danger',
    });
  }
  refresh = () => {
    this.setState({
      loading: true,
    });
    getCycles().then((data) => {
      CycleStore.setTreeData([{ title: '所有版本', key: '0', children: data.versions }]);
      this.setState({
        // treeData: [
        //   { title: '所有版本', key: '0', children: data.versions },
        // ],
        loading: false,
      });
      this.generateList([
        { title: '所有版本', key: '0', children: data.versions },
      ]);
      // window.console.log(dataList);
    });
    // 如果选中了项，就刷新table数据
    const currentCycle = CycleStore.getCurrentCycle;
    const selectedKeys = CycleStore.getSelectedKeys;
    if (currentCycle.cycleId) {
      this.loadCycle(selectedKeys, { node: { props: { data: currentCycle } } }, true);
    }
  }
  filterCycle = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return this.getParentKey(item.key, CycleStore.getTreeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    CycleStore.setExpandedKeys(expandedKeys);
    this.setState({
      searchValue: value,
      autoExpandParent: true,
    });
  }
  callback = (item, code) => {
    switch (code) {
      case 'CLONE_FOLDER': {
        const parentKey = this.getParentKey(item.key, CycleStore.getTreeData);
        CycleStore.addItemByParentKey(parentKey, { ...item, ...{ key: `${parentKey}-CLONE_FOLDER`, type: 'CLONE_FOLDER' } });
        break;
      }
      case 'CLONE_CYCLE': {
        const parentKey = this.getParentKey(item.key, CycleStore.getTreeData);
        CycleStore.addItemByParentKey(parentKey, { ...item, ...{ key: `${parentKey}-CLONE_CYCLE`, type: 'CLONE_CYCLE' } });
        break;
      }
      case 'ADD_FOLDER': {
        CycleStore.addItemByParentKey(item.key, { ...item, ...{ title: Choerodon.getMessage('新文件夹', 'New folder'), key: `${item.key}-ADD_FOLDER`, type: 'ADD_FOLDER' } });
        // 自动展开当前项
        const expandedKeys = CycleStore.getExpandedKeys;
        if (expandedKeys.indexOf(item.key) === -1) {
          expandedKeys.push(item.key);
        }
        CycleStore.setExpandedKeys(expandedKeys);
        break;
      }
      case 'EDIT_CYCLE': {
        this.setState({
          EditCycleVisible: true,
          currentEditValue: item,
        });
        break;
      }
      default: break;
    }
  }

  Clone = (item, e, type) => {
    const { value } = e.target;
    // window.console.log(item, value);
    // e.target.focus();
    if (value === item.title) {
      Choerodon.prompt('请更改名字');
      CycleStore.removeAdding();
    } else {
      this.setState({
        loading: true,
      });
      clone(item.cycleId, { cycleName: value }, type).then((data) => {
        this.setState({
          loading: false,
        });
        if (data.failed) {
          Choerodon.prompt('名字重复');          
          CycleStore.removeAdding();
        } else {          
          this.refresh();
        }
      }).catch(() => {
        Choerodon.prompt('网络出错');
        this.setState({
          loading: false,
        });
        CycleStore.removeAdding();
      });
    }
  }
  addFolder = (item, e, type) => {
    const { value } = e.target;
    this.setState({
      loading: true,
    });
    // window.console.log(this.state.currentCycle);

    addFolder({
      type: 'folder',
      cycleName: value,
      parentCycleId: item.cycleId,
      versionId: item.versionId,
    }).then((data) => {
      if (data.failed) {
        Choerodon.prompt('名字重复');
        this.setState({
          loading: false,
        });
        CycleStore.removeAdding();
      } else {
        this.setState({
          loading: false,
        });
        this.refresh();
      }
    }).catch(() => {
      Choerodon.prompt('网络出错');
      this.setState({
        loading: false,
      });
      CycleStore.removeAdding();
    });
  }

  handleExecuteTableChange = (pagination, filters, sorter) => {
    window.console.log(pagination, filters, sorter);
    if (pagination.current) {
      this.setState({
        rightLoading: true,
        executePagination: pagination,
      });
      const currentCycle = CycleStore.getCurrentCycle;
      getCycleById({
        size: pagination.pageSize,
        page: pagination.current - 1,
      }, currentCycle.cycleId, filters).then((cycle) => {
        this.setState({
          rightLoading: false,
          testList: cycle.content,
          executePagination: {
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: cycle.totalElements,
          },
        });
        // window.console.log(cycle);
      });
    }
  }
  renderTreeNodes = data => data.map((item) => {
    const { children, key, cycleCaseList, type } = item;
    const { searchValue } = this.state;
    const expandedKeys = CycleStore.getExpandedKeys;
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const icon = (<Icon
      style={{ color: '#00A48D' }}
      type={expandedKeys.includes(item.key) ? 'folder_open2' : 'folder_open'}
    />);
    if (type === 'CLONE_FOLDER' || type === 'CLONE_CYCLE') {
      return (
        <TreeNode
          title={
            <div onClick={e => e.stopPropagation()} role="none">
              <Input
                defaultValue={item.title}
                autoFocus
                onBlur={(e) => {
                  this.Clone(item, e, type);
                }}
              />
            </div>
          }
          icon={icon}
          data={item}
        />);
    } else if (type === 'ADD_FOLDER') {
      return (
        <TreeNode
          title={
            <div onClick={e => e.stopPropagation()} role="none">
              <Input
                defaultValue={item.title}
                autoFocus
                onBlur={(e) => {
                  this.addFolder(item, e, type);
                }}
              />
            </div>
          }
          icon={icon}
          data={item}
        />);
    } else if (children) {
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      return (
        <TreeNode
          title={item.cycleId ?
            <TreeTitle
              refresh={this.refresh}
              callback={this.callback}
              text={item.title}
              key={key}
              data={item}
              title={title}
              processBar={cycleCaseList}
            /> : title}
          key={key}
          data={item}
          showIcon
          icon={icon}
        >
          {this.renderTreeNodes(children)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        icon={icon}
        {...item}
        data={item}
      />);
  });

  render() {
    const { CreateCycleExecuteVisible, CreateCycleVisible, EditCycleVisible,
      loading, currentEditValue, testList, rightLoading,
      searchValue,
      autoExpandParent,
      executePagination,
      statusList,
    } = this.state;
    const treeData = CycleStore.getTreeData;
    const expandedKeys = CycleStore.getExpandedKeys;
    const selectedKeys = CycleStore.getSelectedKeys;
    const currentCycle = CycleStore.getCurrentCycle;
    const { cycleId, title } = currentCycle;
    const prefix = <Icon type="filter_list" />;
    const that = this;

    const columns = [{
      title: 'ID',
      dataIndex: 'issueName',
      key: 'issueName', 
      flex: 1,
      // filters: [],
      // onFilter: (value, record) => 
      //   record.issueInfosDTO && record.issueInfosDTO.issueName.indexOf(value) === 0,  
      render(issueId, record) {
        const { issueInfosDTO } = record;
        return (
          <Tooltip title={issueInfosDTO && issueInfosDTO.issueName}>
            <Link
              style={{
                width: 100,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
              to={issueLink(issueInfosDTO && issueInfosDTO.issueId)}
              target="_blank"
            >
              {issueInfosDTO && issueInfosDTO.issueName}
            </Link>
          </Tooltip>         
        );
      },
    }, {
      title: <FormattedMessage id="status" />,
      dataIndex: 'executionStatus',
      key: 'executionStatus',
      filters: statusList.map(status => ({ text: status.statusName, value: status.statusId })),
      // onFilter: (value, record) => record.executionStatus === value,  
      flex: 1,
      render(executionStatus) {
        const statusColor = _.find(statusList, { statusId: executionStatus }) ?
          _.find(statusList, { statusId: executionStatus }).statusColor : '';
        return (<div style={{ ...styles.statusOption, ...{ background: statusColor } }}>
          {_.find(statusList, { statusId: executionStatus }) &&
            _.find(statusList, { statusId: executionStatus }).statusName}
        </div>);
      },
    }, {
      title: <FormattedMessage id="cycle_comment" />,
      dataIndex: 'comment',
      key: 'comment',
      filters: [],
      flex: 1,
      render(comment) {
        return (
          <Tooltip title={<RichTextShow data={delta2Html(comment)} />}>
            <div
              title={delta2Text(comment)}
              style={{
                width: 65,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {delta2Text(comment)}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: <FormattedMessage id="bug" />,
      dataIndex: 'defects',
      key: 'defects',
      flex: 1,
      render: defects =>
        (<Tooltip 
          placement="topLeft"
          title={
            <div>
              {defects.map((defect, i) => (
                <div style={{
                  fontSize: '13px',
                  color: 'white',
                }}
                >                  
                  {defect.issueInfosDTO.issueName}
                </div>))}
            </div>}
        >
          {defects.map((defect, i) => defect.issueInfosDTO.issueName).join(',')}
        </Tooltip>),
    },
    // {
    //   title: '模块',
    //   dataIndex: 'assignedTo',
    //   key: 'assignedTo',
    // }, 
    // {
    //   title: '标签',
    //   dataIndex: 'statusName',
    //   key: 'statusName',
    // }, 
    {
      title: <FormattedMessage id="cycle_executeBy" />,
      dataIndex: 'assignedUserRealName',
      key: 'assignedUserRealName',
      flex: 1,
      render(assignedUserRealName) {
        return (<div style={{
          // width: 85, 
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {assignedUserRealName}
        </div>);
      },
      // render(assignedUserRealName, record) {
      //   const { assignedUserJobNumber } = record;
      //   return (<div style={{ width: 100 }}>
      //     {assignedUserRealName ? (
      //       <div style={{ display: 'flex', alignItems: 'center' }}>
      //         <span className="c7n-avatar">
      //           {assignedUserRealName.slice(0, 1)}
      //         </span>
      //         <span style={{ overflow: 'hidden', 
      // whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
      //           {`${assignedUserJobNumber} ${assignedUserRealName}`}
      //         </span>
      //       </div>
      //     ) : '无'}
      //   </div>);
      // },
    }, {
      title: <FormattedMessage id="cycle_executeTime" />,
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
      flex: 1,
      render(lastUpdateDate) {
        return (<div style={{
          width: 85,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {lastUpdateDate && moment(lastUpdateDate).format('D/MMMM/YY')}
        </div>);
      },
    }, {
      title: <FormattedMessage id="cycle_assignedTo" />,
      dataIndex: 'reporterRealName',
      key: 'reporterRealName',
      flex: 1,
      render(reporterRealName) {
        return (<div style={{
          width: 60,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        >
          {reporterRealName}
        </div>);
      },
      // render(reporterRealName, record) {
      //   const { reporterJobNumber } = record;
      //   return (<div style={{ width: 100 }}>
      //     {reporterRealName ? (
      //       <div style={{ display: 'flex', alignItems: 'center' }}>
      //         <span className="c7n-avatar">
      //           {reporterRealName.slice(0, 1)}
      //         </span>
      //         <span style={{ overflow: 'hidden',
      //  whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
      //           {`${reporterJobNumber} ${reporterRealName}`}
      //         </span>
      //       </div>
      //     ) : '无'}
      //   </div>);
      // },
    }, {
      title: '',
      key: 'action',
      flex: 1,
      render(text, record) {
        return (
          record.projectId !== 0 &&
          <div style={{ display: 'flex' }}>
            <Icon
              type="explicit2"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const { history } = that.props;
                const urlParams = AppState.currentMenuType;
                history.push(`/testManager/Cycle/execute/${record.executeId}?type=${urlParams.type}&id=${urlParams.id}&name=${urlParams.name}`);
              }}
            />
            <Icon
              type="delete_forever"
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={() => {
                that.deleteExecute(record);
              }}
            />
          </div>
        );
      },
    }];
    return (
      <Page className="c7n-cycle">
        <Header title={<FormattedMessage id="cycle_name" />}>
          <Button onClick={this.refresh}>
            <Icon type="autorenew icon" />
            <span>
              <FormattedMessage id="refresh" />
            </span>
          </Button>
        </Header>
        <Content
          title={<FormattedMessage id="cycle_title" />}
          description={<FormattedMessage id="cycle_description" />}
        >
          <Spin spinning={loading}>
            <CreateCycleExecute
              data={currentCycle}
              rank={testList.slice(-1)[0] && testList.slice(-1)[0].rank}
              visible={CreateCycleExecuteVisible}
              onCancel={() => { this.setState({ CreateCycleExecuteVisible: false }); }}
              onOk={() => {
                this.setState({
                  CreateCycleExecuteVisible: false,
                  rightLoading: true,
                });
                // window.console.log(data);
                getStatusList('CYCLE_CASE').then((List) => {
                  this.setState({ statusList: List });
                });
                this.refresh();
                // getCycleById({
                //   page: executePagination.current - 1,
                //   size: executePagination.pageSize,
                // }, currentCycle.cycleId).then((cycle) => {
                //   this.setState({
                //     rightLoading: false,
                //     testList: cycle.content,
                //     executePagination: {
                //       current: executePagination.current,
                //       pageSize: executePagination.pageSize,
                //       total: cycle.totalElements,
                //     },
                //   });
                //   // window.console.log(cycle);
                // });
              }}
            />
            <CreateCycle
              visible={CreateCycleVisible}
              onCancel={() => { this.setState({ CreateCycleVisible: false }); }}
              onOk={() => { this.setState({ CreateCycleVisible: false }); this.refresh(); }}
            />
            <EditCycle
              visible={EditCycleVisible}
              initialValue={currentEditValue}
              onCancel={() => { this.setState({ EditCycleVisible: false }); }}
              onOk={() => { this.setState({ EditCycleVisible: false }); this.refresh(); }}
            />

            <div className="c7n-cycleHome">
              <div className={this.state.sideVisible ? 'c7n-ch-side' : 'c7n-ch-hidden'}>
                <div className="c7n-chs-button">
                  <div
                    role="none"
                    className="c7n-cycleHome-button"
                    onClick={() => {
                      this.setState({
                        leftVisible: true,
                        sideVisible: false,
                      });
                    }}
                  >
                    <Icon type="navigate_next" />
                  </div>
                </div>
                <div className="c7n-chs-bar">
                  {this.state.versionVisible ? '' : (
                    <p
                      role="none"
                      onClick={() => {
                        this.setState({
                          leftVisible: true,
                          sideVisible: false,
                        });
                      }}
                    ><FormattedMessage id="cycle_name" />
                    </p>
                  )}
                </div>
              </div>
              <div className={this.state.leftVisible ? 'c7n-ch-left' : 'c7n-ch-hidden'}>
                <div className="c7n-chl-head">
                  <div className="c7n-chlh-search">
                    <Input prefix={prefix} placeholder="&nbsp;过滤" onChange={this.filterCycle} />
                  </div>
                  <div className="c7n-chlh-button">
                    <div
                      role="none"
                      className="c7n-cycleHome-button"
                      onClick={() => {
                        this.setState({
                          leftVisible: false,
                          sideVisible: true,
                        });
                      }}
                    >
                      <Icon type="navigate_before" />
                    </div>
                    <div
                      role="none"
                      className="c7n-cycleHome-button"
                    >
                      <Icon
                        type="add"
                        onClick={() => {
                          this.setState({
                            CreateCycleVisible: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="c7n-chlh-tree">
                  <Tree
                    selectedKeys={selectedKeys}
                    expandedKeys={expandedKeys}
                    showIcon
                    onExpand={this.onExpand}
                    onSelect={this.loadCycle}
                    autoExpandParent={autoExpandParent}
                  >
                    {this.renderTreeNodes(treeData)}
                  </Tree>
                </div>
              </div>
              <div style={{ width: 1, background: 'rgba(0,0,0,0.26)' }} />
              {cycleId && <div className="c7n-ch-right" >
                <div style={{ display: 'flex' }}>
                  <div>
                    <FormattedMessage id="cycle_cycleName" />
                    ：<span style={{ color: '#3F51B5' }}>{title}</span>
                  </div>
                  <div style={{ flex: 1, visiblity: 'hidden' }} />
                  <div>
                    <Button
                      style={{ color: '#3f51b5', marginRight: '-15px' }}
                      onClick={() => {
                        this.setState({ CreateCycleExecuteVisible: true });
                      }}
                    >
                      <Icon type="playlist_add" />
                      <span>
                        <FormattedMessage id="cycle_addCycle" />
                      </span>
                    </Button>
                  </div>
                </div>
                <ShowCycleData data={currentCycle} />
                {/* <Table
                  pagination={executePagination}
                  loading={rightLoading}
                  columns={columns}
                  dataSource={testList}
                  onChange={this.handleExecuteTableChange}
                /> */}
                <div id="test" />
                <DragTable
                  pagination={executePagination}
                  loading={rightLoading}
                  onChange={this.handleExecuteTableChange}
                  dataSource={testList}
                  columns={columns}
                  onDragEnd={this.onDragEnd}
                />
              </div>}
            </div>
          </Spin>
        </Content>
      </Page>
    );
  }
}

export default CycleHome;

