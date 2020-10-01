const hostContainer = document.getElementById('host');
const pathContainer = document.getElementById('path');
const queryContainer = document.getElementById('query');

function init() {
  chrome.storage.sync.get(['__wukongCache'], (result) => {
    const { __wukongCache = {} } = result;
    const { hostMap, pathMap, queryMap } = __wukongCache;
    blockGen(hostMap, hostContainer)
    blockGen(pathMap, pathContainer)
    blockGen(queryMap, queryContainer)
  });
}

// 根据数据生成对应区块
function blockGen(data, container) {
  let tbody = ''
  const thead = `<thead><tr><th>名称</th><th>值</th><th>操作</th></tr></thead>`
  Object.keys(data).forEach((key) => {
    tbody += `<tr>
      <td>${data[key]}</td>
      <td>${key}</td>
      <td class="delete">删除</td>
    </tr>`;
  });
  tbody = `<tbody>${tbody}</tbody>`
  container.append(str2cell(thead))
  container.append(str2cell(tbody))
}

// 字符串转dom
function str2cell(str) {
  const table = document.createElement('table')
  table.innerHTML = str
  return table.firstChild
}

init()