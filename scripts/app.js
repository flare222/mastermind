function init() {
  // ! DOM Elements
  // Div containing instructions to be toggled on/off
  const instructions = document.querySelector('.instructions')
  // The Game Board is housed in this table
  const tbl = document.querySelector('.table')
  const tblBody = document.createElement('tbody')
  // The Hints Board is house in this div
  const hBoard = document.querySelector('.h-board')
  // The radio buttons containing the colour options to choose
  const paletteItems = document.querySelectorAll('input[name=radio]')
  // The div containing the solution (hidden to player)
  const solution = document.querySelector('.solution')
  // To click when you are ready to make a guess
  const guessBtn = document.querySelector('.guess-btn')
  // Div if you win toggles on/off
  const winner = document.querySelector('.wins')
  // To click if you wish to reset the game
  const playAgainBtn = document.querySelector('.playAgainBtn')

  // ! Game Variables
  // An array containing all of the created Game Board table rows
  const rows = []
  // An array containing all of the created beads for the Game Board
  const beads = []
  // An array containing all of the created Hint Board div rows
  const hRowArr = []
  // An array containing all of the hint cells
  const hCells = []
  // An array containing the random solution divs (hidden to player)
  const sols = []
  // A variable to hold the value of the colour selected by the player
  let colour = null
  // An array of colours for the random solution function to choose from
  const colours = ['purple-bead', 'teal-bead', 'seagreen-bead', 'blue-bead', 'coral-bead', 'yellow-bead']
  // let randomColour = (Math.floor(Math.random() * colours.length))
  // An array containing the class attributes of the guess row in play
  const checkGuess = []
  // An array containing the class attributes of the randomly generated solution
  let checkSols = []
  // An array containing the 
  const pegs = []

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
        hCells.push(hCell)
        hRow.appendChild(hCell)
      }
    } 
  } 

  generateHintsBoard()

  // ! Create Solution Grid
  Array(4 * 1).join('.').split('.').forEach(() => {
    const sol = document.createElement('div')
    sols.push(sol)
    solution.appendChild(sol)
  })

  // ! Generate a random solution (hidden from player)
  // ! Push the classes into an array which will be checked against the guess classes
  function generateSolution() {
    for (let i = 0; i < sols.length; i++) {
      const randomColour = (Math.floor(Math.random() * colours.length))
      // const classList = sols[i].getAttribute('class')
      sols[i].classList.add(colours[randomColour])
      var solsClass = sols[i].getAttribute('class')
      checkSols.push(solsClass)
    }
    // console.log('checkSols', checkSols)
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
      // Else statement to un-grey the check button if there are four with active attributes? look up disabling buttons (inbuilt method)
    })
  }

  function pushClasses() {
    for (let i = 0; i < guessRow.length; i++) {
      var guessClass = guessRow[i].getAttribute('class')
      checkGuess.push(guessClass)
    }
    // console.log('checkGuess', checkGuess)
  }

  // ! Matches the guess combination array with the solution array
  let counter = 0

  function checkMatch() {
    pushClasses()
    for (let i = 0; i < guessRow.length; i++) {
      if (checkGuess[i] === checkSols[i]) {
        console.log('black', checkGuess[i], checkSols[i])
        pegs.push('black-peg')
        counter++
        if (counter === 4) {
          winner.classList.add('winner')
        }
      } else if (checkGuess[i] !== checkSols[i] && checkSols.includes(checkGuess[i])) {
        console.log('grey', checkGuess[i], checkSols[i])
        pegs.push('grey-peg')

      } else {
        console.log('red', checkGuess[i], checkSols[i])
        pegs.push('red-peg') 
      }
    }
    // console.log(pegs)
  }

  // ! Set the pegs 
  let hCell = null

  function setPegs() {
    for (let i = 0; i < hRowArr.length; i++) {
      if (hRowArr[i].classList.contains('hints')) {
        hCell = Array.from(hRowArr[i].children)
        // console.log(hCell) 
      }
    }
  }

  // ! Hint pegs add colours
  function hintColours() {
    for (let i = 0; i < hCell.length; i++) {
      hCell[i].classList.add(pegs[i])
    }
    pegs.length = 0
  }

  // ! Move the selected row to the next one down for both the Game and Hints Board 
  function selectNextActive() {
    const selectedRow = document.querySelector('.row-selected')
    selectedRow.classList.remove('row-selected')
    selectedRow.nextElementSibling.classList.add('row-selected')
    

    const selectedHintRow = document.querySelector('.hints')
    selectedHintRow.classList.remove('hints')
    selectedHintRow.nextElementSibling.classList.add('hints')
  }


  // ! Make a guess by pressing the button to run necessary functions
  
  function guess() {
    checkSelected()
    checkMatch()
    setPegs()
    hintColours()
    selectNextActive()
    counter = 0
    checkGuess.length = 0
    console.log(checkSols)
  } 

  guessBtn.addEventListener('click', guess)

  // ! Resets Game after winning 
  // or if reset button is pressed??
  function playAgain() {
    winner.classList.remove('winner')

    for (let i = 0; i < 40; i++) {
      beads[i].setAttribute('class', 'bead')
      hCells[i].setAttribute('class', 'h-cell')
    }

    for (let i = 0; i < 10; i++) {
      hRowArr[i].setAttribute('class', 'h-row')
      rows[i].removeAttribute('class')
    }
    hRowArr[0].classList.add('hints')
    rows[0].classList.add('row-selected')

    sols.forEach(sol => {
      sol.removeAttribute('class')
    })

    checkSols = []
    generateSolution()
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