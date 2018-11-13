import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Input, Icon, Spin, Tree,
} from 'choerodon-ui';
import _ from 'lodash';
import { DragDropContext } from 'react-beautiful-dnd';
import './IssueTree.scss';
import IssueTreeStore from '../../../store/project/IssueManage/IssueTreeStore';
import {
  getIssueTree, addFolder, moveFolders, copyFolders,
} from '../../../api/IssueManageApi';
import IssueTreeTitle from './IssueTreeTitle';
import IssueStore from '../../../store/project/IssueManage/IssueStore';

const { TreeNode } = Tree;
const dataList = [];
@observer
class IssueTree extends Component {
  state = {
    loading: false,
    autoExpandParent: false,
    searchValue: '',
  }

  componentDidMount() {
    this.getTree();
    document.addEventListener('keydown', this.enterMulti);
    document.addEventListener('keyup', this.leaveMulti);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterMulti);
    document.removeEventListener('keyup', this.leaveMulti);
  }

  enterMulti = (e) => {
    if (e.keyCode === 17 || e.keyCode === 93 || e.keyCode === 91 || e.keyCode === 224) {
      this.multi = true;
    }
  }

  leaveMulti = () => {
    this.multi = false;
  }

  addFolder = (item, e, type) => {
    // console.log(item, e.target.value, type);
    this.setState({
      loading: true,
    });
    addFolder({
      name: e.target.value,
      type: 'cycle',
      versionId: item.versionId,
    }).then((res) => {
      if (res.failed) {
        Choerodon.prompt('名字重复');
        IssueTreeStore.removeAdding();
      } else {
        this.getTree();
      }
      this.setState({
        loading: false,
      });
    });
  }

  callback = (item, code) => {
    switch (code) {
      case 'CLONE_FOLDER': {
        const parentKey = this.getParentKey(item.key, IssueTreeStore.getTreeData);
        IssueTreeStore.addItemByParentKey(parentKey, { ...item, ...{ key: `${parentKey}-CLONE_FOLDER`, type: 'CLONE_FOLDER' } });
        break;
      }

      case 'ADD_FOLDER': {
        IssueTreeStore.addItemByParentKey(item.key, { ...item, ...{ title: Choerodon.getMessage('新文件夹', 'New folder'), key: `${item.key}-ADD_FOLDER`, type: 'ADD_FOLDER' } });
        // 自动展开当前项
        const expandedKeys = IssueTreeStore.getExpandedKeys;
        if (expandedKeys.indexOf(item.key) === -1) {
          expandedKeys.push(item.key);
        }
        IssueTreeStore.setExpandedKeys(expandedKeys);
        break;
      }
      default: break;
    }
  }

  getParentKey = (key, tree) => key.split('-').slice(0, -1).join('-')

  getTree = () => {
    // console.log(IssueTreeStore.treeData);
    this.setState({
      loading: true,
    });

    getIssueTree().then((data) => {
      IssueTreeStore.setTreeData([{ title: '所有版本', key: '0', children: data.versions }]);
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
    }).catch(() => {
      this.setState({
        loading: false,
      });
      Choerodon.prompt('网络错误');
    });
  }

  renderTreeNodes = data => data.map((item) => {
    const {
      children, cycleCaseList, type,
    } = item;
    const key = type === 'temp' ? `${item.key}temp` : item.key;
    const { searchValue } = this.state;
    const expandedKeys = IssueTreeStore.getExpandedKeys;
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const icon = (
      <Icon
        style={{ color: '#3F51B5' }}
        type={expandedKeys.includes(item.key) ? 'folder_open2' : 'folder_open'}
      />
    );
    if (type === 'ADD_FOLDER') {
      return (
        <TreeNode
          title={(
            <div onClick={e => e.stopPropagation()} role="none">
              <Input
                defaultValue={item.title}
                autoFocus
                onBlur={(e) => {
                  this.addFolder(item, e, type);
                }}
              />
            </div>
          )}
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
          title={item.cycleId || item.versionId
            ? (
              <IssueTreeTitle
                title={title}
                data={item}
                refresh={this.getTree}
                callback={this.callback}
              />
            )
            : title}
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

  generateList = (data) => {
    // const temp = data;
    // while (temp) {
    //   dataList = dataList.concat(temp.children);
    //   if()
    // }
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i];
      const { key, title } = node;
      // 找出url上的cycleId
      // const { cycleId } = getParams(window.location.href);
      // const currentCycle = IssueTreeStore.getCurrentCycle;
      // if (!currentCycle.cycleId && Number(cycleId) === node.cycleId) {
      //   this.setExpandDefault(node);
      // } else if (currentCycle.cycleId === node.cycleId) {
      //   IssueTreeStore.setCurrentCycle(node);
      // }
      dataList.push({ key, title });
      if (node.children) {
        this.generateList(node.children, node.key);
      }
    }
  }

  onExpand = (expandedKeys) => {
    IssueTreeStore.setExpandedKeys(expandedKeys);
    this.setState({
      autoExpandParent: false,
    });
  }

  filterCycle = (value) => {
    // window.console.log(value);
    if (value !== '') {
      const expandedKeys = dataList.map((item) => {
        if (item.title.indexOf(value) > -1) {
          return this.getParentKey(item.key, IssueTreeStore.getTreeData);
        }
        return null;
      }).filter((item, i, self) => item && self.indexOf(item) === i);
      IssueTreeStore.setExpandedKeys(expandedKeys);
    }
    this.setState({
      searchValue: value,
      autoExpandParent: true,
    });
  }

  getIssuesByFolder = (selectedKeys, {
    selected, selectedNodes, node, event,
  } = {}) => {
    const { executePagination, filters } = this.state;
    const data = node.props.data;
    // console.log(data);
    // if (data.versionId) {
    if (selectedKeys) {
      // 多选过滤，因为只有文件夹可拖动，所以把其他层级和临时去掉.
      const preSelectedKeys = IssueTreeStore.getSelectedKeys;
      let filteredKeys = selectedKeys;
      const reg = /temp/g;
      const newKey = selectedKeys.slice(-1);
      if (this.multi) {
        // 增加
        if (selected) {
          filteredKeys = [...new Set(preSelectedKeys.concat(newKey))].filter(key => key.split('-').length === 4 && !reg.test(key));
        } else {
          // 减少
          filteredKeys = preSelectedKeys.filter(key => selectedKeys.includes(key));
          // preSelectedKeys.split(preSelectedKeys.indexOf(newKey), 1);
        }
        // 单击的处理
      } else if (selected) {
        filteredKeys = selectedKeys.length > 0 ? selectedKeys.slice(-1) : preSelectedKeys;
      } else {
        filteredKeys = preSelectedKeys.filter(key => !selectedKeys.includes(key));
      }
      IssueTreeStore.setSelectedKeys(filteredKeys);
    }
    IssueTreeStore.setCurrentCycle(data);
    IssueStore.loadIssues(0);
    // }
  }

  onDragStart = (source) => {
    const selectedKeys = IssueTreeStore.getSelectedKeys;
    const draggingItems = selectedKeys.map(key => IssueTreeStore.getItemByKey(key));
    const { draggableId } = source;
    const item = JSON.parse(draggableId);
    if (!_.find(draggingItems, { cycleId: item.folderId })) {
      draggingItems.push(item);
    }
    IssueTreeStore.setDraggingFolders(draggingItems);
    IssueTreeStore.setCopy(false);
  }

  onDragEnd = (result) => {
    // console.log(IssueTreeStore.isCopy);
    const { destination } = result;
    if (!destination) {
      return;
    }
    const draggingItems = IssueTreeStore.getDraggingFolders;
    const filteredItems = draggingItems.filter(item => destination.droppableId !== item.versionId);
    if (filteredItems.length > 0) {
      const data = filteredItems.map(item => ({ versionId: destination.droppableId, folderId: item.cycleId, objectVersionNumber: item.objectVersionNumber }));
      console.log(data);
      this.setState({
        loading: true,
      });
      if (IssueTreeStore.isCopy) {
        copyFolders(data, destination.droppableId).then((res) => {
          if (res.failed) {
            this.setState({
              loading: false,
            });
            Choerodon.prompt('存在同名文件夹');
            return;
          }
          this.getTree();
        }).catch((err) => {
          this.setState({
            loading: false,
          });
          Choerodon.prompt('网络错误');
        });
      } else {
        moveFolders(data).then((res) => {
          if (res.failed) {
            this.setState({
              loading: false,
            });
            Choerodon.prompt('存在同名文件夹');
            return;
          }
          this.getTree();
        }).catch((err) => {
          this.setState({
            loading: false,
          });
          Choerodon.prompt('网络错误');
        });
      }
    }


    // console.log(result);
  }

  render() {
    const { onClose } = this.props;
    const {
      autoExpandParent, loading,
    } = this.state;
    const treeData = IssueTreeStore.getTreeData;
    const expandedKeys = IssueTreeStore.getExpandedKeys;
    const selectedKeys = IssueTreeStore.getSelectedKeys;
    const currentCycle = IssueTreeStore.getCurrentCycle;
    return (
      <div className="c7ntest-IssueTree">
        <div id="template_folder_copy" style={{ display: 'none' }}>
          当前状态：
          <span style={{ fontWeight: 500 }}>复制</span>
        </div>
        <div id="template_folder_move" style={{ display: 'none' }}>
          当前状态：
          <span style={{ fontWeight: 500 }}>移动</span>
        </div>
        <div className="c7ntest-treeTop">
          <Input
            prefix={<Icon type="filter_list" style={{ color: 'black' }} />}
            placeholder="过滤"
            style={{ marginTop: 2 }}
            onChange={e => _.debounce(this.filterCycle, 200).call(null, e.target.value)}
          />
          <Icon type="close" className="c7ntest-pointer" onClick={onClose} />
        </div>

        <div
          className="c7ntest-IssueTree-tree"
        >
          <Spin spinning={loading}>
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
              <Tree
                multiple
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys}
                showIcon
                onExpand={this.onExpand}
                onSelect={this.getIssuesByFolder}
                autoExpandParent={autoExpandParent}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
            </DragDropContext>
          </Spin>
        </div>
      </div>
    );
  }
}

IssueTree.propTypes = {

};

export default IssueTree;