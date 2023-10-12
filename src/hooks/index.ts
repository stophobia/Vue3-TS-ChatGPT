import {Storage} from '@/libs/utils'
import {ElMessage} from 'element-plus'

// localstorage key
export function operationKey() {
  const getKey = (): string => {
    const key: string | null = Storage.get('apiKey')
    return key === null ? '' : key
  }

  const setKey = (apiKey: string) => {
    return Storage.set('apiKey', apiKey)
  }

  return {
    getKey,
    setKey,
  }
}

export const scrollToBottom = (val: any) => {
  if (!val) {
    return
  } else {
    scrollTo(0, val.scrollHeight)
  }
}

const copy = (copyText: string) => {
  navigator.clipboard.writeText(copyText).then(function () {
    ElMessage({
      message: 'コピーされました', type: 'success',
    })
  }, function (err) {
    console.error('テキストをコピーできません: ', err)
  })
}

// コピーの初期化
export const initCopy = () => {
  const copyText: any = document.getElementsByClassName('copyNode')
  let arr = Array.from(copyText)
  arr.forEach((v: any) => {
    // 要素に既に copyAction がある場合は、最初にそれを削除します
    if (v.copyAction) {
      v.removeEventListener('click', v.copyAction)
    }

    // 新しい copyAction を作成し、要素の属性に保存します。
    v.copyAction = () => {
      copy(v.nextSibling.textContent)
    }

    // 新しいリスナーを追加する
    v.addEventListener('click', v.copyAction)
  })
}

