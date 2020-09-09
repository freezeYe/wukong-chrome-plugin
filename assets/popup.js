/* eslint-disable no-unused-vars */
const loadBtn = document.getElementById('load-btn');
const addBtn = document.getElementById('add-btn');
const form = document.getElementById('form');

loadBtn.addEventListener('click', () => {
  const optionPage = chrome.runtime.getURL('options.html');
  window.open(optionPage);
});

addBtn.addEventListener('click', () => {
  const hostName = form.hostValue.value;
  const pathName = form.pathValue.value;
  const queryName = form.queryValue.value;
  chrome.tabs.query({ active: true }, (tabs) => {
    const [currentPage] = tabs;
    console.log(currentPage, currentPage.url);
    const { url } = currentPage;
    const [host, query] = url.split('?');
    const content = { host, query };
  });

  chrome.storage.sync.get(['wukongCache'], (result) => {
    console.log(`Value currently is ${result.key}`);
  });

  // chrome.storage.sync.set({key: value}, function() {
  //   console.log('Value is set to ' + value);
  // });
});
