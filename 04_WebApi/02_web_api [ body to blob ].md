// Current blob size limit is around 500MB for browsers
var downloadResource = function (url, filename) {
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
    headers: new Headers({
      'Origin': location.origin
    }),
    mode: 'cors'
  })
  .then(response => response.blob())
  .then(blob => {
    let blobUrl = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = filename;
    a.href = blobUrl;
    a.click();

  })
  .catch(e => console.error(e));
}
