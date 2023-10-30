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
		try {
      new Function(`
      return (function()
      {
        ${code}
      })
      `)()()
			if (!buffer) {
				buffer = '(no output)';
			}
      _showCodeResult(event, buffer)
		}
		catch (error) {
			buffer = buffer + String(error);
      _showCodeResult(event, buffer, false)
		}
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