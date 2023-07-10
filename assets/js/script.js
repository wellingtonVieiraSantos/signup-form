const icons = Array.from(document.querySelectorAll('.icon-password'))
const passwords = Array.from(document.querySelectorAll('.password-input'))
const formSend = document.querySelector('.form-send')

const rules = [
    'at least 8 characters.',
    'at least one uppercase letter.',
    'at least one lowercase letter.',
    'at least one special character.',
    'passwords must match.'
]

const createElementDom = (elemento, msg = null) =>{
    const elementoDom = document.createElement(`${elemento}`)
    elementoDom.innerText = msg
    return elementoDom
}

//toggle input type password/text
icons.map(icon => {
    icon.addEventListener('click', ()=>{

        icon.innerText = icon.innerText.includes('visibility_off') ? 'visibility' : 'visibility_off'

        icon.nextElementSibling.type = icon.nextElementSibling.type === 'password' ? 'text' : 'password'
    })
})

//create rules for password
passwords.map((password, index) => {
    const divRules = createElementDom('div')
    divRules.classList.add('div-rules')
    
    const ul = createElementDom('ul')

    switch (index){ 
        case 0:
            for(let i = 0; i < rules.length - 1; i++){  
                const li = createElementDom('li', rules[i])   
                ul.appendChild(li)
            }
            break
        case 1:
            const li = createElementDom('li', rules[rules.length - 1])
            ul.appendChild(li)
    }
        
    divRules.appendChild(ul)

    const parent = password.parentNode.parentNode
    parent.insertBefore(divRules, password.parentNode.nextSibling)
})

formSend.addEventListener('submit', e => {
    e.preventDefault()

    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const confirmPassword = document.querySelector('#confirmPassword').value

    const dataForm = {
        name,
        email,
        password
    }

    console.log(dataForm);
})