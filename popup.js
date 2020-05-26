let changeColor = document.getElementById('changeColor');
let jump = document.getElementById('jump')

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log('tabs', tabs)
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
});

jump.onclick = function() {
  chrome.tabs.query({'active': true}, function(tabs) {
    console.log(tabs)
    chrome.tabs.update(tabs[0].id, {url: 'http://www.baidu.com'});
  });
}