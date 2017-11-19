//1.初始化数据
let keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ], 
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ],
]
let hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    'e': 'ele.me',
    'r': 'reactjs.org',
    't': 'taobao.com',
    'y': 'youtube.com',
    'i': 'iconfont.cn',
    'o': 'opera.com',
    'a': 'acfun.cn',
    's': 'sohu.com',
    'd': 'douyu.tv',
    'j': 'jscode.me',
    'z': 'sohu.com',
    'x': 'xiedaimala.com',
    'b': 'bilibili.tv',
    'm': 'www.mcdonalds.com.cn',
}
//取出loaclStrotage
let hashInLocalStorage = getLocalStorage('websitesInfo')
if(hashInLocalStorage) {
    hash = hashInLocalStorage
}
function getLocalStorage(name){
   return JSON.parse(localStorage.getItem(name) || 'null')
}
//2. 生成键盘
//操作DOM树
function tag(tagName, attrbutes) {
    let element = document.createElement(tagName)
    for(let key in attrbutes) {
        element.key = attrbutes.key
    }
    return element
}

for(let index = 0; index < keys.length; index++) {// 0, 1, 2
    var div = tag('div', {className: 'row'})
    div.className = 'row'
    kbdWrap.appendChild(div)
    var row = keys[index]//第一个数组 第二个数组 第三个数组
    var index2 = 0
    while(index2 < row.length){// 0-9 0-8 0-6
        var span = tag('span')
        span.textContent = row[index2]
        span.className = 'text'

        var button = tag('button')
        button.textContent = '编辑'
        button.id = row[index2]
        button.onclick = function(e) {
            var button2 = e.target
            var img2 = button2.previousSibling //拿到前一个节点
            var key = e.target.id
            var newURL = prompt('输入变更的网址')
            if(newURL) {
                hash[key] = newURL//hash变更
                window.event? window.event.cancelBubble = true : e.stopPropagation()//阻止冒泡
                location.reload()//刷新页面
            }else{
                e.preventDefault()
                window.event? window.event.cancelBubble = true : e.stopPropagation()
            }
            img2.src = 'http://' + key + '/favicon.ico'
            img2.onerror = function(e) {
                e.target.src = '../images/eye.png'//默认icon
            }
            localStorage.setItem('websitesInfo', JSON.stringify(hash))
        }
       
        var img = tag('img')
        if(hash[row[index2]]){
            img.src = 'http://' + hash[row[index2]] +'/favicon.ico' ? '//' + hash[row[index2]] +'/favicon.ico' : null
        }else{
            img.src = '../images/eye.png'//默认的icon
        }
        img.onerror = function(e) {
            e.target.src = '../images/eye.png'//默认icon
        }
        // button.addEventListener('click', (e) => {
        //     console.log(e.target.id)
        // })

        var kbd = tag('kbd')
        kbd.className = 'key'
        kbd.id = row[index2]
        kbd.addEventListener('click', e => {
            let key = e.srcElement.id
            let website = hash[key]
            if(website){
                window.open(`http://${website}`, '_blank')
            }else{
                alert('This key not set URL yet')
            }
        })
        kbd.appendChild(span)
        kbd.appendChild(img)
        kbd.appendChild(button)
        div.appendChild(kbd)
        index2 += 1
    }
}
//3.监听键盘
//添加事件监听
// kbd.addEventListener('keydown', (e) => {
//     console.log('123')
// })
document.onkeypress = function(e) {
    let key = e.key
    let website = hash[key]
    if(website){
        window.open(`http://${website}`, '_blank')
    }else{
        alert('This key not set URL yet')
    }
}
