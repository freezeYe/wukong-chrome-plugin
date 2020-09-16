/* eslint-disable no-unused-vars */
const loadBtn = document.getElementById('load-btn');
const addBtn = document.getElementById('add-btn');
const form = document.getElementById('form');
const linkp = document.getElementById('link-show');

const init = () => {
  let link = '';
  chrome.tabs.query({ active: true }, (tabs) => {
    const [currentPage] = tabs;
    console.log(currentPage, currentPage.url);
    const { url } = currentPage;
    link = url;
    linkp.innerText = url;
  });

  loadBtn.addEventListener('click', () => {
    const optionPage = chrome.runtime.getURL('options.html');
    window.open(optionPage);
  });

  addBtn.addEventListener('click', () => {
    // 命名字段
    const hostName = form.hostValue.value;
    const pathName = form.pathValue.value;
    const queryName = form.queryValue.value;

    // 链接字段值
    const [href, query = ''] = link.split('?');
    const args = href.split('/')
    const host = args.slice(0, 3).join('/')
    const path = args.slice(3).join('/')

    // 存储key
    const key = '__wukongCache'
    chrome.storage.sync.get([key], (result) => {
      const json = result[key] || {}
      const {hostMap = {}, pathMap = {}, queryMap = {}} = json
      hostMap[host] = hostName
      pathMap[path] = pathName
      queryMap[query] = queryName

      json.hostMap = hostMap
      json.pathMap = pathMap
      json.queryMap = queryMap
      chrome.storage.sync.set({[key]: json})
    });
  });
};

init();
