function init() {

  const instructions = document.querySelector('.instructions')
  const tbl = document.querySelector('.table')
  const tblBody = document.createElement('tbody')
  const rows = []
  const beads = []
  const hBoard = document.querySelector('.h-board')
  const paletteItems = document.querySelectorAll('input[name=radio]')
  const solution = document.querySelector('.solution')
  let sols = []
  const guessBtn = document.querySelector('.guess-btn')
  const playAgainBtn = document.querySelector('.playAgainBtn')
  let colour = null
  const colours = ['purple-bead', 'teal-bead', 'seagreen-bead', 'blue-bead', 'coral-bead', 'yellow-bead']
  let randomColour = (Math.floor(Math.random() * colours.length))
  const winner = document.querySelector('.wins')

  

  // ! Create Game Board
  function generateTable() {
    // creates 10 table rows
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('tr')
      rows.push(row)
      // creates 4 cells per row
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement('td')
        cell.classList.add('bead')
        beads.push(cell)
        row.appendChild(cell)
      }
      // add the row to the end of the table body
      tblBody.appendChild(row)
      tblBody.firstChild.classList.add('row-selected')
      // tblBody.firstChild.id = 'row-selected'
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
  }

  generateTable()

  // ! Create Hints Board
  function generateHintsBoard() {
    for (let i = 0; i < 10; i++) {
      const hRow = document.createElement('div')
      hRow.classList.add('h-row')
      hBoard.appendChild(hRow)
      hBoard.firstChild.classList.add('hints')
      for (let j = 0; j < 4; j++) {
        const hCell = document.createElement('div')
        hCell.classList.add('h-cell')
        hRow.appendChild(hCell)
      }
    } 
  } 

  generateHintsBoard()

  // ! Create Solution Grid
  Array(4 * 1).join('.').split('.').forEach(() => {
    const sol = document.createElement('div')
    // sol.classList.add('sol-item', 'bead')
    sols.push(sol)
    solution.appendChild(sol)
  })

  function generateSolution() {
    for (let i = 0; i < sols.length; i++) {
      randomColour = (Math.floor(Math.random() * colours.length))
      sols[i].classList.add(colours[randomColour])
    }
  }

  generateSolution()

  // ! Choose Colour from palette
  function chooseColour(e) {
    if (e.target.classList.contains('radio')) { 
      colour = e.target.value 
      // console.log(colour) 
    }
  }
  
  paletteItems.forEach(() => {
    addEventListener('click', chooseColour)
  })

  // ! Set Colours in guess row
  const children = document.querySelectorAll('.bead')

  function setColour(e) {
    if (e.target.parentNode.classList.contains('row-selected')) {
      switch (colour) {
        case 'purple':
          e.target.setAttribute('class','purple-bead')
          e.target.setAttribute('active','true')
          break
        case 'blue':
          e.target.setAttribute('class','blue-bead')
          e.target.setAttribute('active','true')
          break
        case 'coral':
          e.target.setAttribute('class','coral-bead')
          e.target.setAttribute('active','true')
          break
        case 'teal':
          e.target.setAttribute('class','teal-bead')
          e.target.setAttribute('active','true')
          break
        case 'yellow':
          e.target.setAttribute('class','yellow-bead')
          e.target.setAttribute('active','true')
          break
        case 'seagreen':
          e.target.setAttribute('class','seagreen-bead')
          e.target.setAttribute('active','true')
          break  
      }
    } 
  }

  children.forEach(() => {
    addEventListener('click', setColour)
  })
 
  // ! Make a guess
  // Loop through each row
  // If class is 'row-selected'
  // Loop through the beads in that row and make an array containing the guess
  
  let guessRow = []

  
  // ! Checks that we are only looking at the selected row
  // ! Populates an array containing the guess elements
  // ! Alerts if the guess row is not populated with four colours
  function checkSelected() {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].classList.contains('row-selected')) {
        guessRow = Array.from(rows[i].children)
        // console.log(guessRow)
      }
    }
    guessRow.forEach((guess) => {
      if (!guess.hasAttribute('active')) {
        guessRow.length = 0
        alert('Please choose 4 colours')
      }
      // Else statement to un-grey the check button if there are four with active attributes?
    })
  }

  // ! Matches the guess combination array with the solution array
  let checkGuess = []
  let checkSols = []
  // const hCell = document.querySelectorAll('.h-cell')
  const pegs = []

  function pushClasses() {
    for (let i = 0; i < guessRow.length; i++) {
      var guessClass = guessRow[i].getAttribute('class')
      var solsClass = sols[i].getAttribute('class')
      checkGuess.push(guessClass)
      checkSols.push(solsClass)
    }
    console.log('checkSols', checkSols)
    console.log('checkGuess', checkGuess)
  }

  function checkBlack() {
    for (let i = 0; i < guessRow.length; i++) {
      if (checkGuess[i] === checkSols[i]) {
        console.log('black', checkGuess[i], checkSols[i])
        pegs.push('black-peg')
      } else if (checkGuess[i] !== checkSols[i] && checkSols.includes(checkGuess[i])) {
        console.log('white', checkGuess[i], checkSols[i])
        pegs.push('white-peg')
      } else {
        console.log('X', checkGuess[i])
        pegs.push('X') 
      }
    }
    console.log(pegs)
  }
  // function checkWinner() {
  //   for (let i = 0; i < guessRow.length; i++) {
  //     var guessClass = guessRow[i].getAttribute('class')
  //     var solsClass = sols[i].getAttribute('class')
  //     checkGuess.push(guessClass)
  //     checkSols.push(solsClass)
  //     console.log('checkSols', checkSols)
  //     console.log('checkGuess', checkGuess)

  //     if (guessClass === solsClass) {
  //       console.log('black', guessClass)
  //       pegs.push('black-peg')
  //     } else if (checkGuess.length === 4 && checkSols.length === 4) {
  //       checkGuess.forEach((guess) => {
  //         if (guess !== solsClass && checkSols.includes(guess)) {
  //           console.log('white', guess, solsClass)
  //           pegs.push('white-peg') 
  //         } else {
  //           console.log('X', guess)
  //           pegs.push('X') 
  //         }
  //       }
  //       )
  //     }
  //   }
  //   console.log(pegs)
  // }
  

  
  function guess() {
    checkSelected()
    pushClasses()
    checkBlack()
    // checkWinner()
    const selectedRow = document.querySelector('.row-selected')
    selectedRow.classList.remove('row-selected')
    selectedRow.nextElementSibling.classList.add('row-selected')

  } 

  guessBtn.addEventListener('click', guess)

  // ! Reset Game 
  function playAgain() {
    winner.classList.remove('winner')
    beads.forEach((bead) => {
      bead.classList.remove(...colours)
      bead.classList.add('bead')
      bead.removeAttribute('active')
    })

    sols.forEach((sol) => {
      sol.classList.remove(...colours)
    })
    generateSolution()
    guessRow = []
    sols = []
    checkGuess = []
    checkSols = []
    console.log(guessRow, sols)
    console.log(checkGuess, checkSols)
  }

  playAgainBtn.addEventListener('click', playAgain)

  // ! Toggle Instructions
  function toggle() {
    document.querySelector('.instructions').classList.toggle('show')
  }

  //! Event Listeners 

  instructions.onclick = function() {
    toggle()
  }

}
window.addEventListener('DOMContentLoaded', init)




// ! Create Game Board
// const grid = document.querySelector('.grid')
// const rows = []
// const beads = []
// const width = 1
// const height = 10

// Array(width * height).join('.').split('.').forEach(() => {
//   const row = document.createElement('div')
//   row.classList.add('row')
//   rows.push(row)
//   grid.appendChild(row)
    
// })