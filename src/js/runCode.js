import {jlib, jccWallet, jccLib} from './jingtum.js'
let print = window.console

export function execute_javascript(event, tid) {
	let code = _mdGetCode(tid);
	;(function () {
    let buffer = ""
		const
			_log = function (s) {
				print.log(s);
        if(Object.prototype.toString.call(s) === '[object Object]') {
          s = JSON.stringify(s)
        }
				buffer = buffer + s + '\n';
        if(buffer.includes('(no output)')) {
          buffer = buffer.slice(11)
        }
        _showCodeResult(event, buffer)
			},
			_warn = function (s) {
				print.warn(s);
				buffer = buffer + s + '\n';
			},
			_error = function (s) {
				print.error(s);
				buffer = buffer + s + '\n';
			},
			_console = {
				trace: _log,
				debug: _log,
				log: _log,
				info: _log,
				warn: _warn,
				error: _error
			};
      window.console = _console
      window.testKeyStore = {
        version: "1.0",
        id: "4085118690b6b24a58e8b9a2e26a15a31f2dfbd9e6280752a04af70e3a5389cc",
        contact: {},
        wallets: [
          {
            ciphertext: "29cdfe6d2b2b7bbcbfea5b6d5c165043cc84b086b65aba4386841e4484",
            mac: "2f23bf8bcb2253d79169a74594a186323fef94b0c42d4d071db119962528d7b6",
            crypto: {
              iv: "3086c27f1997601b3c43d34954dca2ed",
              cipher: "aes-128-ctr",
              kdf: "scrypt",
              kdfparams: {
                dklen: 32,
                salt: "555cd56e274acb61623c28be6ab72f421675d6480ca4a1b6aa8da765fcd79edb",
                n: 4096,
                r: 8,
                p: 1
              }
            },
            type: "swt",
            address: "jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH",
            default: true,
            alias: "默认钱包"
          }
        ]
      }
      window.require = (name) => {
        if(name === 'jingtum-lib') {
          return jlib
        } else if(name === 'jcc_wallet') {
          return jccWallet
        } else if(name === '@jccdex/jingtum-lib') {
          return jccLib
        } else {
          throw Error(`Cannot find module ${name}`)
        }
      }
		// try {
      new Function(`
      return (async function()
      {
        ${code}
      })
      `)()().catch((err) => {
        buffer = buffer + String(err);
        _showCodeResult(event, buffer, false)
      })
			if (!buffer) {
				buffer = '(no output)';
			}
      _showCodeResult(event, buffer)
		// }
		// catch (error) {
		// 	buffer = buffer + String(error);
    //   _showCodeResult(event, buffer, false)
		// }
	})();
}

export function showEdit(tid) {
  const code = document.querySelector(`#${tid}`)
  const editArea = document.createElement('textarea')
  // editArea.setAttribute('rows', 10)
  editArea.setAttribute('id', tid)
  editArea.innerHTML = code.innerHTML
  let parent = code.parentNode;
  parent.insertBefore(editArea,code);
  const editEle = code.nextElementSibling.querySelector('.code_edit')
  editEle.style.opacity = 0;
  // editEle.parentNode.removeChild(editEle)
  parent.removeChild(code)
}

export function copyCode(tid) {
  const code = document.querySelector(`#${tid}`)
  let copyText = ''
  if(code.nodeName === 'PRE') {
    copyText = code.innerText
  } else {
    copyText = code.value
  }
  navigator.clipboard.writeText(copyText).then(res => {
    const copyEle = code.nextElementSibling.querySelector('.code_copy')
    copyEle.classList.toggle('copy_success')
    setTimeout(() => {
      copyEle.classList.toggle('copy_success')
    },1000)
  }).catch(err => {
    console.log(err);
  })
}

function _mdGetCode(tid) {
  let code = document.querySelector(`#${tid}`)
  if(code.nodeName === 'PRE') {
    return code.innerText
  } else {
    return code.value
  }
}

function _showCodeResult(e, res, flag = true) {
  let codeRes = e.target.parentNode.querySelector('#code_outPut')
  if(codeRes) {
    codeRes.innerText = res
  } else {
    codeRes = document.createElement('pre')
    codeRes.setAttribute('id', 'code_outPut')
    // codeRes.classList.add('code')
    codeRes.innerText = res
    _insertAfter(codeRes, e.target)
  }
  codeRes.classList.remove('code_success')
  codeRes.classList.remove('code_error')
  if(flag) {
    codeRes.classList.add('code_success')
  } else {
    codeRes.classList.add('code_error')
  }
}

function _insertAfter(newElement,targetElement){
  let parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
      parent.appendChild(newElement);
  }else{
      parent.insertBefore(newElement,targetElement.nextSibling);
  }
}