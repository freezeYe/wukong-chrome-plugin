const loadBtn = document.getElementById('load-btn')
const addBtn = document.getElementById('add-btn')
const form = document.getElementById('form')

loadBtn.addEventListener('click', function(e) {
  const optionPage = chrome.runtime.getURL('options.html')
  window.open(optionPage)
})

addBtn.addEventListener('click', function() {

  const hostName = form['hostValue'].value
  const pathName = form['pathValue'].value
  const queryName = form['queryValue'].value
  chrome.tabs.query({active: true}, function(tabs) {
    const currentPage = tabs[0]
    console.log(currentPage, currentPage.url)
    const url = currentPage.url
    const [host, query] = url.split('?')
    const content = {host, query}
  })
  
  chrome.storage.sync.get(['wukongCache'], function(result) {
    console.log('Value currently is ' + result.key);
  });

  // chrome.storage.sync.set({key: value}, function() {
  //   console.log('Value is set to ' + value);
  // });
})