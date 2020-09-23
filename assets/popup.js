/* eslint-disable no-unused-vars */
const loadBtn = document.getElementById('load-btn');
const addBtn = document.getElementById('add-btn');
const form = document.getElementById('form');
const linkp = document.getElementById('link-show');
const reminder = document.getElementById('reminder');

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

    if (!hostName && !pathName && !queryName) {
      reminder.innerText = '参数不能全部为空!';
      reminder.style.display = 'block';
      reminder.style.color = 'red';
      return;
    }

    // 链接字段值
    const [href, query = ''] = link.split('?');
    const args = href.split('/');
    const host = args.slice(0, 3).join('/');
    const path = args.slice(3).join('/');

    // 存储key
    const key = '__wukongCache';
    chrome.storage.sync.get([key], (result) => {
      const json = result[key] || {};
      const { hostMap = {}, pathMap = {}, queryMap = {} } = json;
      hostMap[host] = hostName;
      pathMap[path] = pathName;
      queryMap[query] = queryName;

      json.hostMap = hostMap;
      json.pathMap = pathMap;
      json.queryMap = queryMap;
      chrome.storage.sync.set({ [key]: json });
      reminder.innerText = '保存成功!';
      reminder.style.color = 'green';
      reminder.style.display = 'block';
      setTimeout(() => {
        reminder.style.display = 'none';
      }, 2000);
    });
  });
};

init();
