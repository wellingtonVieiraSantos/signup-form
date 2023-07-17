const icons = Array.from(document.querySelectorAll('.icon-password'))
const passwords = Array.from(document.querySelectorAll('.password-input'))
const formSend = document.querySelector('.form-send')
const dialog = document.querySelector('.welcome')
const spanName = document.querySelector('.nick-name')
const closeBtn = document.querySelector('.welcome > .wrapper-dialog > button')

const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirmPassword')

const errorName = document.querySelector('.error-name')
const errorEmail = document.querySelector('.error-email')
const errorPassword = document.querySelector('.error-password')
const errorConfirmPassword = document.querySelector('.error-confirmPassword')

const divRulesPass = document.querySelector('.div-rules-pass')
const divRulesConfirmPass = document.querySelector('.div-rules-confirmPass')

const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput]
const errors = [errorName, errorEmail, errorPassword, errorConfirmPassword]

function validaInput(name, error){
    if(!name)error.innerText = 'required field'
    setTimeout(()=>{
        error.innerText = ''
    }, 2000)
}

//toggle class valid for empty input
inputs.forEach(input =>{
    input.addEventListener('keyup', () =>{
        input.value === '' ? input.classList.remove('valid') : input.classList.add('valid')
    })
})

const rules = [
    {
        'text':'at least 8 characters.',
        'regex': /^.{8,}$/
    },
    {
        'text':'at least one uppercase letter.',
        'regex': /[A-Z]/
    },
    {
        'text':'at least one lowercase letter.',
        'regex': /[a-z]/
    },
    {
        'text':'at least one special character.',
        'regex': /[\W_]/
    },
]

const createElement = (elemento, msg = null) =>{
    const elementDom = document.createElement(`${elemento}`)
    elementDom.innerText = msg
    return elementDom
}

//toggle input type password/text
icons.map(icon => {
    icon.addEventListener('click', ()=>{

        icon.innerText = icon.innerText.includes('visibility_off') ? 'visibility' : 'visibility_off'

        icon.nextElementSibling.type = icon.nextElementSibling.type === 'password' ? 'text' : 'password'
    })
})

//setting rules for password and confirmPassword
passwords.map((password, index) => {
    
    const ul = createElement('ul')

    switch (index){ 
        case 0:
            for(let i = 0; i < rules.length; i++){  
                const li = createElement('li', rules[i].text)   
                ul.appendChild(li)
            }
            divRulesPass.appendChild(ul)
            break
        case 1:
            const li = createElement('li', 'passwords must match.')
            ul.appendChild(li)
            divRulesConfirmPass.appendChild(ul)
    }
})

//sending form with validation
formSend.addEventListener('submit', e => {
    e.preventDefault()
    
    if(!nameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value){
        validaInput(nameInput.value, errorName)
        validaInput(emailInput.value, errorEmail)
        validaInput(passwordInput.value, errorPassword)
        validaInput(confirmPasswordInput.value, errorConfirmPassword)
        return

    }else if(!validatePasssword(passwordInput.value)){
        errorPassword.innerText = 'Password not allowed'
        setTimeout(()=>{
            errorPassword.innerText = ''
        }, 2000)
        return

    }else if(passwordInput.value !== confirmPasswordInput.value){
        console.log('passwords deve ser iguais');
        errorConfirmPassword.innerText = 'password must match'
        setTimeout(()=>{
            errorConfirmPassword.innerText = ''
        }, 2000)
        return

    }else if(!validateEmail(emailInput.value)){
        errorEmail.innerText = 'invalid format - ex: test@testing.com'
        return

    }else if(validateEmail(emailInput.value)){
        const dataForm = {
            'name': nameInput.value,
            'email': emailInput.value,
            'password': passwordInput.value
        }
        
        console.log(dataForm);
        spanName.innerText = nameInput.value

        inputs.forEach(input =>{
            input.value = ''
            document.querySelector('.div-rules-confirmPass > ul > li').style.textDecoration = 'none'
            Array.from(document.querySelectorAll('.div-rules-pass > ul > li')).forEach(li =>{
                li.style.textDecoration = 'none'
            })
        })

        dialog.showModal()
       
    }else{
        console.log('Unexpected error!');
    }

    //reseting errors msg
    errors.forEach(error =>{
        error.innerText = ''
    })

    //reseting class valid for inputs
    inputs.forEach(input=>{
        input.classList.remove('valid')
    })
})

closeBtn.addEventListener('click', ()=>{
    dialog.close()
})

//validating input email with keyup
emailInput.addEventListener('keyup', ()=>{
    if(!validateEmail(emailInput.value))
    errorEmail.innerText = 'invalid format - ex: test@testing.com'
    else errorEmail.innerText = ''
})

//validating confirm password
confirmPasswordInput.addEventListener('keyup', ()=>{
    const li = document.querySelector('.div-rules-confirmPass > ul > li')
    if(passwordInput.value && confirmPasswordInput.value)
    li.style.textDecoration = passwordInput.value === confirmPasswordInput.value ? 'line-through': 'none'
    else li.style.textDecoration = 'none'
})

const validateEmail = (email) =>{
   const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z]+(\.[a-z]+)?$/
    return isValidEmail.test(email)
}

const validatePasssword = (password) => {
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/
    return isValidPassword.test(password)
}

//functions to validate password rules individually
const validateRuleOne = (data) =>{
    const isValidRule = rules[0].regex
    return isValidRule.test(data) 
}
const validateRuleTwo = (data) =>{
    const isValidRule = rules[1].regex
    return isValidRule.test(data)    
}
const validateRuleTree = (data) =>{
    const isValidRule = rules[2].regex
    return isValidRule.test(data)    
}
const validateRuleFour = (data) =>{
    const isValidRule = rules[3].regex
    return isValidRule.test(data)    
}

//validating rules in real-time
passwordInput.addEventListener('keyup', (e)=>{
    const li = Array.from(document.querySelectorAll('.div-rules-pass > ul > li'))
  
    li[0].style.textDecoration = validateRuleOne(e.target.value) ? 'line-through': 'none'
    li[1].style.textDecoration = validateRuleTwo(e.target.value) ? 'line-through': 'none'
    li[2].style.textDecoration = validateRuleTree(e.target.value) ? 'line-through': 'none'
    li[3].style.textDecoration = validateRuleFour(e.target.value) ? 'line-through': 'none'
})

