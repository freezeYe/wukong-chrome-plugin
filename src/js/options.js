const hostContainer = document.getElementById('host');
const pathContainer = document.getElementById('path');
const queryContainer = document.getElementById('query');

chrome.storage.sync.get(['__wukongCache'], (result) => {
  const { __wukongCache = {} } = result;
  const { hostMap, pathMap, queryMap } = __wukongCache;
  let hostHtml = '';
  let pathHtml = '';
  let queryHtml = '';
  Object.keys(hostMap).forEach((hostKey) => {
    hostHtml += `<li>${hostMap[hostKey]}: ${hostKey}</li>`;
  });
  Object.keys(pathMap).forEach((pathKey) => {
    pathHtml += `<li>${pathMap[pathKey]}: ${pathKey}</li>`;
  });
  Object.keys(queryMap).forEach((querykey) => {
    queryHtml += `<li>${queryMap[querykey]}: ${querykey}</li>`;
  });

  hostContainer.innerHTML = hostHtml;
  pathContainer.innerHTML = pathHtml;
  queryContainer.innerHTML = queryHtml;
});
