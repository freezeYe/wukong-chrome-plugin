const rcBtn = document.getElementById('record')
const loadBtn = document.getElementById('load')

rcBtn.addEventListener('click', function(e) {
  chrome.tabs.query({active: true}, function(tabs) {
    const currentPage = tabs[0]
    const url = currentPage.url
    console.log(url)
  })
})

loadBtn.addEventListener('click', function(e) {
  const optionPage = chrome.runtime.getURL('options.html')
  window.open(optionPage)
})