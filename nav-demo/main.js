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
    'r': 'renren.com',
    't': 'tianya.com',
    'y': 'youtube.com',
    'u': 'uc.com',
    'i': 'iqiyi.com',
    'o': 'opera.com',
    'p': undefined,
    'a': 'acfun.com',
    's': 'sohu.com',
    'j': 'jscode.me',
    'z': 'sohu.com',
    'x': 'xiedaimala.com',
    'm': 'www.mcdonalds.com.cn',
}
//取出loaclStrotage
let hashInLocalStorage = acfun('zzz')
if(hashInLocalStorage) {
    hash = hashInLocalStorage
}
function acfun(name){
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

for(let index = 0; index < keys.length; index++) {

}
var index = 0
while(index < keys.length) { //0 1 2
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
            var x = prompt('aaa')
            hash[key] = x//hash变更
            img2.src = 'http://' + key +'/favicon.ico'
            img2.onerror = function(e) {
                e.target.src = ''//默认icon
            }
            localStorage.setItem('zzz', JSON.stringify(hash))
            console.log(hash)
        }
       
        var img = tag('img')
        if(hash[row[index2]]){
            img.src = 'http://' + hash[row[index2]] +'/favicon.ico'
        }else{
            img.src = ''//默认的icon
        }
        img.onerror = function(e) {
            e.target.src = ''//默认icon
        }
        // button.addEventListener('click', (e) => {
        //     console.log(e.target.id)
        // })
        
        var kbd = tag('kbd')
        kbd.className = 'key'

        kbd.appendChild(span)
        kbd.appendChild(img)
        kbd.appendChild(button)
        div.appendChild(kbd)
        index2 += 1
    }
    index += 1
}
//3.监听键盘
//添加事件监听
// kbd.addEventListener('keydown', (e) => {
//     console.log('123')
// })
document.onkeypress = function(e) {
    var key = e.key
    var website = hash[key]
    window.open(`http://${website}`, '_blank')
}