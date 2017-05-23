/**
 * This lib can only be used in client side 
 */

exports.popupCenter = (uri, w, h) => {
  const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const left = ((width / 2) - (w / 2)) + dualScreenLeft;
  const top = ((height / 2) - (h / 2)) + dualScreenTop;

  let win = window.open(uri, '_blank', 
			`width=${w},height=${h},top=${top}, left=${left},
			directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no`)
  win.focus()
}

exports.fileReader = (file, options) => {
  options = options || {};
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    reader.onload = function () {
      resolve(reader);
    };
    reader.onerror = reject;

    if (options.accept && !new RegExp(options.accept).test(file.type)) {
      reject({
        code: 400,
        note: 'wrong file type'
      });
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
}

/**
 * @param el
 * @param dist
 * @returns {boolean}
 */
exports.ifBtm = (el=window, dist=0) => {
  return el.innerHeight + el.scrollY >= document.body.scrollHeight - dist
}

/**
 * @param x
 * @param y
 * @param dom
 */
exports.smoothScroll = (x, y, dom=window) => {
  let isRoot = dom===window
  let cY = isRoot ? window.scrollY : dom.scrollTop
  let cX = isRoot ? window.scrollX : dom.scrollLeft
  let sh = dom.scrollHeight
  const dY = (cY-y)/30  //complete in .5s
  const dX = (cX-x)/30
  setTimeout(function(){
    requestAnimationFrame(fnScroll)
  }, 0)

  function fnScroll(){
    if(Math.abs(cY-y)>0.1 || Math.abs(cX-x)>0.1){
      cY-=dY
      cX-=dX
      if(isRoot) {
        dom.scrollTo(cX, cY)
      } else {
        dom.scrollTop = cY
        dom.scrollLeft = cX
      }
      requestAnimationFrame(fnScroll)
    }
  }
}