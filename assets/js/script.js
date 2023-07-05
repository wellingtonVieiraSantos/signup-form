const icon = Array.from(document.querySelectorAll('.icon-password'))
const password = Array.from(document.querySelectorAll('.password-input'))

const rules = [
    'at least 8 characters.',
    'at least one uppercase letter.',
    'at least one lowercase letter.',
    'at least one special character.',
    'Passwords must match.'
]

const createElementDom = (elemento, msg = null) =>{
    const elementoDom = document.createElement(`${elemento}`)
    elementoDom.innerText = msg
    return elementoDom
}

icon.map(i => {
    i.addEventListener('click', ()=>{

        i.innerText = i.innerText.includes('visibility_off') ? 'visibility' : 'visibility_off'

        i.innerText.includes('visibility_off') ? 
        i.nextElementSibling.setAttribute('type', 'password') :
        i.nextElementSibling.setAttribute('type', 'text')
    })
})

password.map(pass => {

    const popUp = createElementDom('div')
    const h2 = createElementDom('h2', 'It must contain.')
    const ul = createElementDom('ul')

    for(let i = 0; i < rules.length; i++){  
        const li = createElementDom('li', rules[i])    
        ul.appendChild(li)
    }

    popUp.classList.add('pop-up')
    popUp.appendChild(h2)
    popUp.appendChild(ul)

    const divPass = pass.parentNode
    divPass.appendChild(popUp)

    pass.addEventListener('focus', () => {
        popUp.style.display = 'block'
        pass.nextElementSibling.nextElementSibling.style.display = 'block'
    })

    pass.addEventListener('blur', () =>{
        popUp.style.display = 'none'
        pass.nextElementSibling.nextElementSibling.style.display = 'none'
    })
})


