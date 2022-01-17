// 按下add時新增文字框及轉盤等份
document.querySelector('.add').addEventListener('click', clickAdd)
function clickAdd() {
  // 新增文字框
  if (editFlag !== 1 && drawLotsFlag != 1) {
    // 編輯完成按鈕不顯示時
    let newText = document.createElement('div')
    newText.classList.add('text')
    let textNumber = document.querySelectorAll('.text')
    newText.innerHTML =
      `<div class="number">` +
      (textNumber.length + 1) +
      `</div>
      <input class="editText" type="text" name="" id="" disabled/>
      <button class="editComplete" style="display:none">編輯完成</button>
      <button class="delete">刪除</button>`

    // 將在輸入框輸入的文字加入文字框中
    newText.childNodes[2].value =
      document.querySelector('.function>input').value

    document.querySelector('.textList').appendChild(newText)

    // 新增元素
    let triangle = document.createElement('div')
    // 為元素添加名為triangle的class
    triangle.classList.add('triangle')
    // 將輸入的文字加入轉盤等份中
    triangle.innerHTML =
      `<div class="rowText">` + newText.childNodes[2].value + `</div>`
    document.querySelector('.turntableCircle').appendChild(triangle)

    // console.log(textNumber.length + 1)
    addTriangle(textNumber.length + 1)
    document.querySelector('.function>input').value = ''
  }
}

function addTriangle(part) {
  let changeNumber = document.querySelectorAll('.triangle')
  // console.log(changeNumber.length)
  let triangleNumber = document.querySelectorAll('.number')
  let rowText = document.querySelectorAll('.rowText')

  for (i = 0; i < changeNumber.length; i++) {
    if (part === 1) {
      // 設定transform
      changeNumber[i].style.transform =
        'rotate(calc(' +
        triangleNumber[i].innerHTML +
        ' * var(--transformDeg)))'
      //tan(180)怪怪的
      changeNumber[i].style.setProperty(
        '--oppositeSide',
        'calc(' + 1 + ' * var(--adjacentSide))'
      )
      changeNumber[i].style.borderTop =
        'calc(' + 2 + ' * var(--adjacentSide)) solid var(--triangleColor1)'
      changeNumber[i].style.borderLeft =
        'var(--adjacentSide) solid var(--triangleColor1)'
      changeNumber[i].style.borderRight =
        'var(--adjacentSide) solid var(--triangleColor1)'
      rowText[0].style.bottom = 'calc(var(--adjacentSide) * 1.15)'
    } else if (part === 2) {
      // 設定transform
      changeNumber[i].style.transform =
        'rotate(calc(' +
        triangleNumber[i].innerHTML +
        ' * var(--transformDeg)))'
      //tan(90)不存在
      changeNumber[i].style.setProperty(
        '--oppositeSide',
        'calc(' + 1 + ' * var(--adjacentSide))'
      )
      changeNumber[0].style.borderTop =
        'var(--adjacentSide) solid var(--triangleColor1)'
      changeNumber[0].style.borderLeft =
        'var(--adjacentSide) solid var(--triangleColor1)'
      changeNumber[0].style.borderRight =
        'var(--adjacentSide) solid var(--triangleColor1)'
      changeNumber[1].style.borderTop =
        'var(--adjacentSide) solid var(--triangleColor2)'
      changeNumber[1].style.borderLeft =
        'var(--adjacentSide) solid var(--triangleColor2)'
      changeNumber[1].style.borderRight =
        'var(--adjacentSide) solid var(--triangleColor2)'
      rowText[i].style.bottom = 'calc(var(--adjacentSide) * 0.15)'
    } else {
      // 設定transform
      changeNumber[i].style.transform =
        'rotate(calc(' +
        triangleNumber[i].innerHTML +
        ' * var(--transformDeg)))'
      //對邊
      //改變css中oppositeSide變數
      //Math.tan(逕度(or 弧度))
      changeNumber[i].style.borderLeft = 'var(--oppositeSide) solid transparent'
      changeNumber[i].style.borderRight =
        'var(--oppositeSide) solid transparent'
      changeNumber[i].style.setProperty(
        '--oppositeSide',
        'calc(' +
          Math.tan(((360 / part / 2) * Math.PI) / 180) +
          ' * var(--adjacentSide))'
      )
      rowText[i].style.bottom = 'calc(var(--adjacentSide) * 0.15)'

      // 顏色
      // 除了前三個 如果為3n+1等分最後一個3n+1不改變顏色會跟1顏色相同不方便觀看
      if (i + 1 > 3 && part % 3 === 1) {
        changeNumber[part - 1].style.borderTop =
          'var(--adjacentSide) solid var(--triangleColor2)'
      } else {
        if ((i + 1) % 3 === 1) {
          changeNumber[i].style.borderTop =
            'var(--adjacentSide) solid var(--triangleColor1)'
        } else if ((i + 1) % 3 === 2) {
          changeNumber[i].style.borderTop =
            'var(--adjacentSide) solid var(--triangleColor2)'
        } else if ((i + 1) % 3 === 0) {
          changeNumber[i].style.borderTop =
            'var(--adjacentSide) solid var(--triangleColor3)'
        }
      }
    }
    //角度
    //改變css中transformDeg變數
    // console.log('p:' + p)
    changeNumber[i].style.setProperty(
      '--transformDeg',
      'calc(360deg /' + part + ')'
    )
  }
}

// 按下delete並刪除文字框的父元素 即.text
// 目標
document.querySelector('.textList').addEventListener('click', clickDelete)
function clickDelete(e) {
  if (
    e.target.classList.contains('delete') &&
    editFlag !== 1 &&
    drawLotsFlag != 1
  ) {
    // 按下delete刪除文字框的父元素
    let deleteTriangle = document.querySelectorAll('.triangle')
    let deleteNumber = e.target.parentNode.querySelector('.number').innerHTML
    deleteTriangle[deleteNumber - 1].parentNode.removeChild(
      deleteTriangle[deleteNumber - 1]
    )
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    let number = document.querySelectorAll('.number')
    let trianglePart = number.length
    for (i = 0; i < number.length; i++) {
      // console.log(number.length)
      number[i].innerHTML = i + 1
      // console.log(number[i].innerHTML)
    }
    addTriangle(number.length)
    if (number.length <= 0) {
      document.querySelector('.turntableCircle').style.display = 'none'
      document.querySelector('.centerCircle').style.display = 'none'
    }
  }
}

// 按下文字框後出現完成按鈕 按下完成編輯按鈕後將輸入的文字加入轉盤等份上並將焦點移出文字框

// editFlag = 1,正在編輯
let editFlag = 0
document.addEventListener('click', clickText)
function clickText(e) {
  if (document.querySelectorAll('.triangle').length !== 0) {
    document.querySelector('.turntableCircle').style.display = 'block'
    document.querySelector('.centerCircle').style.display = 'block'
  }
  let editComplete = document.querySelectorAll('.editComplete')
  for (i = 0; i < editComplete.length; i++) {
    if (
      e.target === editComplete[i].parentNode.querySelector('.editText') &&
      editFlag === 0 &&
      drawLotsFlag != 1
    ) {
      editComplete[i].style.display = 'inline-block'
      editFlag = 1
      e.target.disabled = false
      e.target.focus()
    } else if (e.target === editComplete[i]) {
      document
        .querySelectorAll('.triangle')
        [
          e.target.parentNode.querySelector('.number').innerHTML - 1
        ].querySelector('.rowText').innerHTML =
        e.target.parentNode.querySelector('.editText').value
      editComplete[i].style.display = 'none'
      editFlag = 0
      e.target.parentNode.querySelector('.editText').disabled = true
    } else {
      if (editComplete[i]) {
        if (
          editComplete[i].style.display !== 'none' &&
          e.target !== editComplete[i].parentNode.querySelector('.editText')
        ) {
          // let yes = confirm('是否放棄')
          // if (yes) {
          //   editComplete[i].style.display = 'none'
          //   flag = 0
          // } else {
          //   editComplete[i].parentNode.querySelector('.editText').focus()
          //   flag = 1
          // }
          // 先以純提示點擊編輯完成 替代提示選擇是否放棄 待改進
          alert('請點選編輯完成')
          editComplete[i].parentNode.querySelector('.editText').focus()
        }
      }
    }
  }
}

// 轉盤隨機旋轉

document.querySelector('.start').addEventListener('click', clickStart)
let rotateDeg = 0
let rotateDegLast = 0
// 正在旋轉
let drawLotsFlag = 0
function clickStart() {
  if (
    editFlag !== 1 &&
    drawLotsFlag != 1 &&
    // 正在新增時不可旋轉
    document.querySelector('.function>input').value === '' &&
    document.querySelector('.turntableCircle').style.display !== 'none'
  ) {
    drawLotsFlag = 1
    document.querySelector('.function>input').disabled = true
    let turntableCircle = document.querySelector('.turntableCircle')
    let turntableCircleStyle = turntableCircle.style
    rotateDeg = rotateDegLast + 1080 + Math.floor(Math.random() * 360)
    if (
      rotateDeg % (360 / document.querySelectorAll('.triangle').length / 2) ===
        0 &&
      (rotateDeg / (360 / document.querySelectorAll('.triangle').length / 2)) %
        2 !==
        0
    ) {
      console.log(rotateDeg)
      rotateDeg = rotateDeg + 1
    }
    rotateDegLast = rotateDeg
    turntableCircleStyle.transform = 'rotate(' + rotateDeg + 'deg)'
    turntableCircleStyle.transition = 'transform 3s'
  }
}

//抽中

document
  .querySelector('.turntableCircle')
  .addEventListener('transitionend', clickPosition, false)
function clickPosition() {
  let partAll = document.querySelectorAll('.triangle')
  let turntableCircleRotate =
    document.querySelector('.turntableCircle').style.transform
  let drawLotsNumber = document.querySelectorAll('.drawLots>div')
  if (
    (turntableCircleRotate.slice(7, turntableCircleRotate.length - 4) % 360) -
      360 / partAll.length / 2 <
      0 ||
    (turntableCircleRotate.slice(7, turntableCircleRotate.length - 4) % 360) -
      360 / partAll.length / 2 >
      (360 / partAll.length) * (partAll.length - 1)
  ) {
    let drawLots = document.createElement('div')
    drawLots.innerHTML =
      `<span>` +
      (drawLotsNumber.length + 1) +
      `. ` +
      `</span>` +
      partAll[partAll.length - 1].childNodes[0].innerHTML
    document.querySelector('.drawLots').appendChild(drawLots)
  } else {
    for (i = 0; i < partAll.length; i++) {
      if (
        (turntableCircleRotate.slice(7, turntableCircleRotate.length - 4) %
          360) -
          360 / partAll.length / 2 -
          (360 / partAll.length) * i >
          0 &&
        (turntableCircleRotate.slice(7, turntableCircleRotate.length - 4) %
          360) -
          360 / partAll.length / 2 -
          (360 / partAll.length) * i <
          360 / partAll.length
      ) {
        let drawLots = document.createElement('div')
        drawLots.innerHTML =
          `<span>` +
          (drawLotsNumber.length + 1) +
          `. ` +
          `</span>` +
          partAll[partAll.length - 1 - i - 1].childNodes[0].innerHTML
        document.querySelector('.drawLots').appendChild(drawLots)
      }
    }
  }
  let drawLotsdisplay = document.querySelectorAll('.drawLots>div')
  if (drawLotsdisplay.length > 0) {
    document.querySelector('.drawLotsList').style.display = 'block'
  }

  document.querySelector('.function>input').disabled = false
  drawLotsFlag = 0
}
