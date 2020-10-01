/* eslint-disable no-unused-vars */
const loadBtn = document.getElementById('load-btn');
const addBtn = document.getElementById('add-btn');
const form = document.getElementById('form');
const linkp = document.getElementById('link-show');
const reminder = document.getElementById('reminder');
const loadContainer = document.getElementById('load-container');

// storage 缓存键
const CACHED_KEY = '__wukongCache'
let link = '';
// 项目初始化，绑定相关事件
const init = () => {
  chrome.tabs.query({ active: true }, (tabs) => {
    const [currentPage] = tabs;
    const { url } = currentPage;
    link = url;
    linkp.innerText = url;
  });
  initInSavePage(link);
};

// 保存链接
function saveLink(link) {
  // 命名字段
  const hostName = form.hostValue.value;
  const pathName = form.pathValue.value;
  const queryName = form.queryValue.value;
  if (!hostName && !pathName && !queryName) {
    reminder.innerText = '参数不能全部为空!';
    reminder.style.color = 'red';
    return;
  }
  // 链接字段值
  const [href, query = ''] = link.split('?');
  const args = href.split('/');
  const host = args.slice(0, 3).join('/');
  const path = args.slice(3).join('/');

  chrome.storage.sync.get([CACHED_KEY], (result) => {
    const json = result[CACHED_KEY] || {};
    const { hostMap = {}, pathMap = {}, queryMap = {} } = json;
    if (hostName) hostMap[host] = hostName;
    if (pathName) pathMap[path] = pathName;
    if (queryName) queryMap[query] = queryName;

    json.hostMap = hostMap;
    json.pathMap = pathMap;
    json.queryMap = queryMap;
    chrome.storage.sync.set({ [CACHED_KEY]: json });
    reminder.innerText = '保存成功!';
    reminder.style.color = 'green';
    setTimeout(() => {
      reminder.innerText = '';
    }, 2000);
  });
}

// 加载记录列表
function loadStored() {
  let count = 0;
  const childrenWrapper = (key, value, name) => {
    const id = name + count;
    count += 1;
    return `<li><input class="radio" type="radio" id=${id} name=${name} value=${key}><label for=${id}>${value}</label></input></li>`;
  };
  chrome.storage.sync.get(['__wukongCache'], (result) => {
    const hostContainer = document.getElementById('host-list');
    const pathContainer = document.getElementById('path-list');
    const queryContainer = document.getElementById('query-list');
    const { __wukongCache = {} } = result;
    const { hostMap, pathMap, queryMap } = __wukongCache;
    let hostHtml = '';
    let pathHtml = '';
    let queryHtml = '';
    Object.keys(hostMap).forEach((hostKey) => {
      hostHtml += childrenWrapper(hostKey, hostMap[hostKey], 'hostValue');
    });
    Object.keys(pathMap).forEach((pathKey) => {
      pathHtml += childrenWrapper(pathKey, pathMap[pathKey], 'pathValue');
    });
    Object.keys(queryMap).forEach((querykey) => {
      queryHtml += childrenWrapper(querykey, queryMap[querykey], 'queryValue');
    });
    hostContainer.innerHTML = `${hostHtml}`;
    pathContainer.innerHTML = `${pathHtml}`;
    queryContainer.innerHTML = `${queryHtml}`;

    initInListPage();
  });
}

// 页面加载
function loadPage() {
  const getCheckdValue = (name) => {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
  };
  const hostValue = getCheckdValue('hostValue');
  const pathValue = getCheckdValue('pathValue');
  const queryValue = getCheckdValue('queryValue');
  if (!hostValue) {
    reminder.style.color = 'red';
    reminder.innerText = '请选择域名!';
    return;
  }
  let link = hostValue;
  if (pathValue) link += `/${pathValue}`;
  if (queryValue) link += `?${queryValue}`;
  window.open(link);
}

// 编辑页事件绑定
function initInSavePage() {
  reminder.innerText = '';
  addBtn.innerText = '保存';
  form.style.display = 'block';
  loadContainer.style.display = 'none';
  linkp.style.display = 'block'
  loadBtn.onclick = loadStored;
  addBtn.onclick = saveLink;
}

// 列表页事件绑定
function initInListPage() {
  reminder.innerText = '';
  addBtn.innerText = '返回';
  form.style.display = 'none';
  loadContainer.style.display = 'block';
  linkp.style.display = 'none'
  loadBtn.onclick = loadPage;
  addBtn.onclick = initInSavePage;
}

init();
