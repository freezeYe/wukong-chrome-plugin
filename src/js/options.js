const hostContainer = document.getElementById('host');
const pathContainer = document.getElementById('path');
const queryContainer = document.getElementById('query');

// storage 缓存键
const CACHED_KEY = '__wukongCache';
function init() {
  chrome.storage.sync.get([CACHED_KEY], (result) => {
    const { __wukongCache = {} } = result;
    const { hostMap, pathMap, queryMap } = __wukongCache;
    blockGen(hostMap, hostContainer, 'hostMap');
    blockGen(pathMap, pathContainer, 'pathMap');
    blockGen(queryMap, queryContainer, 'queryMap');
  });
}

// 根据数据生成对应区块
function blockGen(data, container, type) {
  let tbody = '';
  let thead = '<thead><tr><th>名称</th><th>值</th><th>操作</th></tr></thead>';
  Object.keys(data).forEach((key) => {
    tbody += `<tr>
      <td>${data[key]}</td>
      <td>${key}</td>
      <td class="delete" data-key=${key} >删除</td>
    </tr>`;
  });
  tbody = `<tbody>${tbody}</tbody>`;
  tbody = str2cell(tbody);
  thead = str2cell(thead);
  tbody.addEventListener('click', (e) => {
    if (e.target.innerText === '删除') {
      const r = confirm('确认删除该条记录?');
      if (r) deleteItem(e, type);
    }
  });
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
  container.append(thead);
  container.append(tbody);
}

// 字符串转dom
function str2cell(str) {
  const table = document.createElement('table');
  table.innerHTML = str;
  return table.firstChild;
}

// 删除元素
function deleteItem(e, type) {
  const { target } = e;
  const deleteKey = target.dataset.key;
  chrome.storage.sync.get(['__wukongCache'], (result) => {
    const { __wukongCache = {} } = result;
    const { [type]: data } = __wukongCache;
    Reflect.deleteProperty(data, deleteKey);
    chrome.storage.sync.set({ [CACHED_KEY]: __wukongCache }, init);
  });
}

init();
