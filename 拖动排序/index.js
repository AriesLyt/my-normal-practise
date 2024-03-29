// /**
//  * @type { HTMLElement[] }
//  */
// const liWrap = document.querySelectorAll('.item')

// liWrap.forEach((li) => {
//     li.ondragstart = (event) => {
//         setTimeout(() => {
//             event.target.classList.add('dragging')
//         }, 0)
//     }
//     li.ondragend = () => {
//         event.target.classList.remove('dragging')
//     }
//     li.ondragenter = (event) => {
//         console.log(event.target.classList)
//         console.log(event.target === li)
//     }
// })

/**
 * @type { HTMLElement }
 */
const liWrap = document.querySelector('#list')
let draggingDom = null

liWrap.ondragstart = (e) => {
    draggingDom = e.target
    setTimeout(() => {
        e.target.classList.add('dragging')
    }, 0)
}
liWrap.ondragend = (e) => {
    e.preventDefault()
    draggingDom = null
    e.target.classList.remove('dragging')
}
liWrap.ondragenter = (e) => {
    e.preventDefault()
    if (e.target === liWrap || e.target === draggingDom) {
        return
    }
    const children = [...liWrap.children]
    const draggingIndex = children.indexOf(draggingDom)
    const targetIndex = children.indexOf(e.target)
    if (draggingIndex < targetIndex) {
        liWrap.insertBefore(draggingDom, e.target.nextElementSibling)
    } else {
        liWrap.insertBefore(draggingDom, e.target)
    }
}