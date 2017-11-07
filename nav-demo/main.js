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
hashInLocalStorage = JSON.parse(localStorage.getItem('zzz') || 'null')
if(hashInLocalStorage) {
    hash = hashInLocalStorage
}
//操作DOM树
index = 0
while(index < keys.length) {
    div1 = document.createElement('div')
    kbdWrap.appendChild(div1)
    row = keys[index]
    index2 = 0
    while(index2 < row.length){
        kbd = document.createElement('kbd')
        kbd.textContent = row[index2]
        button = document.createElement('button')
        button.textContent = '编辑'
        button.id = row[index2]
        button.addEventListener('click', (e) => {
            console.log(e.target.id)
        })
        button.onclick = function(e) {
            key = e.target.id
            x = prompt('aaa')
            hash[key] = x
            localStorage.setItem('zzz', JSON.stringify(hash))
            console.log(hash)
        }
        kbd.appendChild(button)
        div1.appendChild(kbd)
        index2 += 1
    }
    index += 1
}
//添加事件监听
kbd.addEventListener('keydown', (e) => {
    console.log('123')
})
document.onkeypress = function(e) {
    key = e.key
    website = hash[key]
    window.open(`http://${website}`, '_blank')
}