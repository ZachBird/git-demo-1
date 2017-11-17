
/*======  用增加元素的方式画，无法连续  ====== */

// const canvas = document.querySelector('#canvas')
// let painting = false //画画状态

// //按下鼠标
// canvas.onmousedown = function(e) {
//     painting = true
//     let x = e.clientX
//     let y = e.clientY
//     let divA = document.createElement('div')
//     divA.style = `width: 6px; height: 6px; 
//     background: black; border-radius: 3px; 
//     position: absolute; left: ${x - 10}px; top: ${y + 4}px;`
//     canvas.appendChild(divA)
// }

// //鼠标移动
// canvas.onmousemove = function(e) {
//     if(painting) {
//         let x = e.clientX
//         let y = e.clientY
//         let divA = document.createElement('div')
//         divA.style = `width: 6px; height: 6px; 
//         background: black; border-radius: 3px; 
//         position: absolute; left: ${x - 10}px; top: ${y + 4}px;`
//         canvas.appendChild(divA)
//     }
// }

// //松开鼠标
// canvas.onmouseup = function(e) {
//     painting = false
// }

/*====== Canvas ======*/
const paintingArea = document.querySelector('#painting-area')
const context = paintingArea.getContext('2d')//获取二次元的上下文
const eraser = document.querySelector('#eraser')
let using = false
let lastPoint = { x: null, y: null }//存上一次画的最后一个点的位置坐标

function setSize() {
    const pageWidth = document.documentElement.clientWidth
    const pageHeight = document.documentElement.clientHeight
    paintingArea.width = pageWidth
    paintingArea.height = pageHeight
}

setSize()
window.onresize = function () {
    setSize()
}

/*====== Canvas 画各种图形 ======*/
// context.strokeStyle = 'blue'
// context.strokeRect(10, 10, 100, 100)
// context.fillStyle = 'red'
// context.fillRect(10, 10, 100, 100)

// context.clearRect(50, 50, 10, 10)

// context.fillStyle = 'lightpink'
// context.beginPath()
// context.moveTo(240, 240)
// context.lineTo(300, 240)
// context.lineTo(300, 300)
// context.fill()

/*====== Canvas 画线 ======*/

// context.beginPath()
// context.moveTo(0, 0)//起点
// context.lineTo(200, 0)//终点
// context.lineWidth = 5
// context.stroke()
// context.closePath()

function drawCircle(x, y, radius) {
    context.strockStyle = 'black'
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)//起点
    context.lineTo(x2, y2)//终点
    context.lineWidth = 6
    context.stroke()
    context.closePath()
}

let eraserEnabled = false
// pen.onclick = function(e) {

// }
// eraser.onclick = function(e) {

// }
// clear.onclick = function() {
//     context.clearRect(0, 0, xxx.width, yyy.height);
// }
eraser.onclick = function () {
    eraserEnabled = !eraserEnabled
    if (eraserEnabled) {
        eraser.textContent = '画笔'
    } else {
        eraser.textContent = '擦擦擦'
    }
}

// red.onclick = function(e) {
//     context.fillStyle = 'red'
//     context.strockStyle = 'red'
//     red.classList.add('active')
//     green.classList.remove('active')
//     blue.classList.remove('active')
// }
// green.onclick = function(e) {
//     context.fillStyle = 'green'
//     context.strockStyle = 'green'
//     green.classList.add('active')
//     red.classList.remove('active')
//     blue.classList.remove('active')
// }
// blue.onclick = function(e) {
//     context.fillStyle = 'blue'
//     context.strockStyle = 'blue'
//     blue.classList.add('active')
//     red.classList.remove('active')
//     green.classList.remove('active')
// }

// thin.onclick = function(e) {

// }
// thick.onclick = function(e) {

// }
//特性检测
if(document.body.ontouchstart !== undefined) {
    //触屏设备
    paintingArea.ontouchstart = function(e) {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (eraserEnabled) {
            using = true
            // drawCircle(x, y, 3)
            context.clearRect(x - 5, y - 5, 40, 40)
        } else {
            using = true
            lastPoint = { x: x, y: y }
        }
    }
    
    paintingArea.ontouchmove = function(e) {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (eraserEnabled) {
            if (using) {
                context.clearRect(x - 5, y - 5, 40, 40)
            }
        } else {
            if (using) {
                let newPoint = { x: x, y: y }
                drawCircle(x, y, 3)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }
    
    paintingArea.ontouchend = function(e) {
        using = false
    }
}else{
    //非触屏设备
    paintingArea.onmousedown = function (e) {
        let x = e.clientX
        let y = e.clientY
        if (eraserEnabled) {
            using = true
            // drawCircle(x, y, 3)
            context.clearRect(x - 5, y - 5, 40, 40)
        } else {
            using = true
            lastPoint = { x: x, y: y }
        }
    }
    
    paintingArea.onmousemove = function (e) {
        let x = e.clientX
        let y = e.clientY
        if (eraserEnabled) {
            if (using) {
                context.clearRect(x - 5, y - 5, 40, 40)
            }
        } else {
            if (using) {
                let newPoint = { x: x, y: y }
                drawCircle(x, y, 3)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    
    }
    
    paintingArea.onmouseup = function (e) {
        using = false
    }
}


// //手机端适配
// paintingArea.ontouchstart = function(e) {

// }

// paintingArea.ontouchmove = function(e) {

// }

// paintingArea.ontouchend = function(e) {

// }