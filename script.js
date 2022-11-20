const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', ev => {
    if (ev.code.toLowerCase() === 'space') {
        ev.preventDefault()
        setRandomColors()
    }
})

document.querySelector('.expl').onclick = function() {
    setRandomColors()
}


document.addEventListener('click', ev => {
    const type = ev.target.dataset.type

    if (type === 'lock') {
        const node = ev.target.tagName.toLowerCase() === 'i'
        ? ev.target : ev.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }
    else if (type === 'copy') {
        copyToClipboard(ev.target.textContent)
        ev.target.classList.add('bla');
        setTimeout(() => ev.target.classList.remove('bla'), 1000)

    }
    
})

function copyToClipboard (text) {
   return navigator.clipboard.writeText(text)
}

function genRandColor () {
    return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach ((el, index) => {
        const isLocked = el.querySelector('i').classList.contains('fa-lock');
        const text = el.querySelector('h2');
        // const color = genRandColor();

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial 
        ? colors[index]
            ? colors[index]
            : genRandColor()
         : genRandColor();

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color;
        el.style.backgroundColor = color;
    })
    updateColorsHash(colors)
}

function updateColorsHash(colors =[]) {
    document.location.hash = colors.map(col => {
        return col.substring(1)
    }).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1 ) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => 
            '#' + color)
    }
    return []
}

setRandomColors(true)



