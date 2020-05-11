function init() {

  const instructions = document.querySelector('.instructions')
  const tbl = document.querySelector('.table')
  const tblBody = document.createElement('tbody')
  const rows = []
  const beads = []
  const hBoard = document.querySelector('.h-board')
  const hRowArr = []
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
      hRowArr.push(hRow)
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

  // ! Checks that we are only looking at the selected row
  // ! Populates an array containing the guess elements
  // ! Alerts if the guess row is not populated with four colours
  let guessRow = []

  function checkSelected() {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].classList.contains('row-selected')) {
        guessRow = Array.from(rows[i].children)
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

  // ! Pushes the classes from the guess into an array
  // ! Pushes the classes from the solution into an array
  //   The solutions one should be done at creation so code is not duplicated for no reason.  Only one solution per game.
  let checkGuess = []
  let checkSols = []
  const pegs = []

  function pushClasses() {
    for (let i = 0; i < guessRow.length; i++) {
      var guessClass = guessRow[i].getAttribute('class')
      var solsClass = sols[i].getAttribute('class')
      checkGuess.push(guessClass)
      checkSols.push(solsClass)
    }
    // console.log('checkSols', checkSols)
    // console.log('checkGuess', checkGuess)
  }

  // ! Matches the guess combination array with the solution array
  function checkMatch() {
    for (let i = 0; i < guessRow.length; i++) {
      if (checkGuess[i] === checkSols[i]) {
        // console.log('black', checkGuess[i], checkSols[i])
        pegs.push('black-peg')
      } else if (checkGuess[i] !== checkSols[i] && checkSols.includes(checkGuess[i])) {
        // console.log('white', checkGuess[i], checkSols[i])
        pegs.push('grey-peg')
      } else {
        // console.log('X', checkGuess[i])
        pegs.push('red-peg') 
      }
    }
    pegs.forEach(peg => {
      if (peg === 'black-peg') {
        winner.classList.add('winner')
      }
    })
    console.log(pegs)
  }

  // ! Set the pegs 
  let hCell = null

  function setPegs() {
    for (let i = 0; i < hRowArr.length; i++) {
      if (hRowArr[i].classList.contains('hints')) {
        hCell = Array.from(hRowArr[i].children)
        console.log(hCell)

        hCell.forEach(cell => {
          // cell.classList.add(pegs[i++])
          cell.setAttribute('class', pegs[i++])
        }) 
      }
    }
    pegs.length = 0
    // console.log(pegs)
  }

  // ! Move the selected row to the next one down for game board and hints
  const selectedRow = document.querySelector('.row-selected')
  const selectedHintRow = document.querySelector('.hints')

  function selectNextActive() {
    selectedRow.classList.remove('row-selected')
    selectedRow.nextElementSibling.classList.add('row-selected')

    selectedHintRow.classList.remove('hints')
    selectedHintRow.nextElementSibling.classList.add('hints')
  }


  // ! Make a guess by pressing the button to run necessary functions
  
  function guess() {
    checkSelected()
    pushClasses()
    checkMatch()
    setPegs()

    selectNextActive()
  } 

  guessBtn.addEventListener('click', guess)

  // ! Resets Game after winning 
  // or if reset button is pressed??
  function playAgain() {
    winner.classList.remove('winner')

    beads.forEach(bead => {
      bead.setAttribute('class', 'bead')
    })

    sols.forEach(sol => {
      sol.removeAttribute('class')
      // sol.classList.remove(...colours)
    })

    console.log(hCell)
    hCell.forEach(cell => {
      cell.setAttribute('class', 'h-cell')
    })

    // rows contains the trs
    rows.forEach(row => {
      row.removeAttribute('class')
    })
    rows[0].classList.add('row-selected')
    console.log(rows)
    
    // selectedHintRow

    generateSolution()
    guessRow = []
    sols = []
    checkGuess = []
    checkSols = []
    hCell = []
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