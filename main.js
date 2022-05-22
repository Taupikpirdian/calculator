/*========================================
  Project Name: PureCalc
  Version: 1.0
  Author: Kalpesh Singh
  Inspired From: dribbble.com/oneMoreArray =======================================*/
  function blinker() {
    $('.blink-me').fadeOut(200);
    $('.blink-me').fadeIn(200);
}
setInterval(blinker, 500);

class Calculator {
    constructor(previousOperantTextElement, currentOperantTextElement){
        this.previousOperantTextElement = previousOperantTextElement
        this.currentOperantTextElement = currentOperantTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        $('.calc-typed').html(`<span class="blink-me">_</span>`)
        $('.calc-operation').html('')
    }

    appendNumber(number){
        // jika click . dan sebelumnya pernah click ., maka code di bawahnya tidak akan dijalankan
        if((number === '.') && this.currentOperand.includes('.')) {
            return
        } 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            case '%':
                computation = prev % current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    manipulate(){
        this.currentOperand
        if(this.currentOperand < 0){
            this.currentOperand = Math.abs(this.currentOperand)
        }else{
            this.currentOperand = -Math.abs(this.currentOperand)
        }

        console.log(this.currentOperand)
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    updateDisplay(){
        $('.calc-typed').html(this.currentOperand);
        if(this.operation != null){
            $('.calc-operation').html(
                `${this.previousOperand} ${this.operation} ${this.currentOperand}`
            );
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButtons = document.querySelectorAll('[data-equals]')
const clearButtons = document.querySelectorAll('[data-clear]')
const deleteButtons = document.querySelectorAll('[data-delete]')
const manipulateButtons = document.querySelectorAll('[data-manipulate]')

const previousOperantTextElement = document.querySelectorAll('[data-previous-operand]')
const currentOperantTextElement = document.querySelectorAll('[data-current-operand]')
const calculator = new Calculator(previousOperantTextElement, currentOperantTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

clearButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute()
        calculator.updateDisplay()
    })
})

manipulateButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.manipulate()
        calculator.updateDisplay()
    })
})

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.delete()
        calculator.updateDisplay()
    })
})