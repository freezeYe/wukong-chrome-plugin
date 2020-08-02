const rcBtn = document.getElementById('record')
const loadBtn = document.getElementById('load')
const addBtn = document.getElementById('add-btn')
const form = document.getElementById('form')

let content = {
  host: '',
  query: ''
}
rcBtn.addEventListener('click', function(e) {
  chrome.tabs.query({active: true}, function(tabs) {
    const currentPage = tabs[0]
    const url = currentPage.url
    const [host, query] = url.split('?')
    content = {host, query}
  })
})

loadBtn.addEventListener('click', function(e) {
  const optionPage = chrome.runtime.getURL('options.html')
  window.open(optionPage)
})

addBtn.addEventListener('click', function() {
  const hostName = form['hostName'].value
  const paramName = form['paramName'].value
  chrome.storage.sync.get(['customHostCache'], function(result) {
    console.log('Value currently is ' + result.key);
  });
  // chrome.storage.sync.set({key: value}, function() {
  //   console.log('Value is set to ' + value);
  // });
})