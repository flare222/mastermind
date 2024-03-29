function init() {
  // ! DOM Elements
  // Burger Menu button
  const burgerBtn = document.querySelector('.burger-box')
  // Burger menu content to be toggled
  const burgerContent = document.querySelector('.burger-content')
  // The div wrapping the burger elements which changes bg colour
  const burgerWrap = document.querySelector('.burger-wrap')
  // The h2 element is clicked to toggle the instructions
  const h2Instructions = document.querySelector('.h2')
  // Up and down arrow symbol animates when instructions are toggled
  const arrow = document.querySelector('#arrow')
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
  // Div if you win, visibility toggles on/off
  const winner = document.querySelector('#winner')
  // Div if you lose, visibility toggles on/off
  const loser = document.querySelector('#loser')
  // To click if you wish to reset the game
  const playAgainBtns = document.querySelectorAll('.play-again-btn')
  // To close the win window and inspect the results of the game
  const closeBtns = document.querySelectorAll('.close-btn')

  // ! Variables
  // Use touchscreen or mouse to click
  const clickEvent = ('ontouchstart' in window ? 'touchend' : 'click')
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
  // A variable to hold the value of the colour selected by the player from the palette
  let colour = ''
  // An array of colours for the random solution function to choose from
  const colours = ['purple-bead', 'teal-bead', 'seagreen-bead', 'blue-bead', 'coral-bead', 'yellow-bead']
  // An array containing the elements from the selected row
  let guessRow = []
  // A counter for the beads that have the active attribute added
  let activeCounter = 0
  // A variable to hold the item class before pushing to the checkguess array
  let guessClass
  // An array containing the class attributes of the guess row in play
  const checkGuess = []
  // A variable to hold the item class before pushing to the checkSols array
  let solClass
  // An array containing the class attributes of the randomly generated solution
  let checkSols = []
  // An array containing the peg classes 
  let pegs = []
  // Counts how many black pegs there are to determine the winner
  let blkCounter = 0

  // ! Click the burger menu to toggle the content
  function toggleBurger() {
    burgerContent.classList.toggle('show')
    burgerWrap.classList.toggle('background')
  }

  // ! Toggle Instructions
  function toggle() {
    document.querySelector('.instructions').classList.toggle('show')
    arrow.classList.toggle('symbol')
  }

  // ! The button to make a guess is initially disabled
  guessBtn.disabled = true

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
    }
    // put the <tbody> inside the <table>
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
    solution.classList.add('hide-sol')
  })

  // ! Generate a random solution (hidden from player)
  function generateSolution() {
    for (let i = 0; i < sols.length; i++) {
      const randomColour = (Math.floor(Math.random() * colours.length))
      sols[i].classList.add(colours[randomColour])
    }
  }

  generateSolution()

  // ! Choose Colour from palette to use in the player guess
  function chooseColour(e) {
    if (e.target.classList.contains('radio')) { 
      colour = e.target.value 
    }
  }

  // ! Set chosen colours in the selected row only of the game board
  // Selects all of the td elements created in the generateTable function
  const children = document.querySelectorAll('.bead')

  function setColour(e) {
    if (colour !== '' && e.target.parentNode.classList.contains('row-selected')) {
      e.target.setAttribute('class', colour)
      e.target.setAttribute('active','true')
      activeCounter++
      checkSelected()
    } 
  }
  
  // ! Creates an array containing the guess elements from the selected row only
  // ! Checks that the guess row contains 4 active elements before enabling the guess button
  function checkSelected() {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].classList.contains('row-selected')) {
        guessRow = Array.from(rows[i].children)
      }
    }
    guessRow.every((guess) => {
      if (guess.hasAttribute('active') && activeCounter === 4) {
        guessBtn.disabled = false
      }
    })
  }

  // ! Pushes the classes from both the solution and the selected row of guesses
  function pushClasses() {
    for (let i = 0; i < guessRow.length; i++) {
      guessClass = guessRow[i].getAttribute('class')
      checkGuess.push(guessClass)

      solClass = sols[i].getAttribute('class')
      checkSols.push(solClass)
    }
  }
  
  // ! Matches the guess classes array with the solution classes array
  // ! Pushes the corresponding hint classes to the pegs array
  function checkMatch() {
    pegs = ["red-peg", "red-peg", "red-peg", "red-peg"]

    // First checks for any matches resulting in a black peg
    for (let i = 0; i < checkGuess.length; i++) {
      if (checkSols[i] === checkGuess[i]) {
        // Find the index of the matching guess
        const index = checkSols.indexOf(checkGuess[i])
        // Change the value of at the matching guess index in the arrays so it won't give a grey match
        checkSols[index] = "sols-match"
        checkGuess[index] = "guess-match"
        pegs.push('black-peg')
        pegs.shift()
        blkCounter++
        // If all 4 guesses are correct, we have a winner
        if (blkCounter === 4) {
          winner.showModal()         
          solution.classList.remove('hide-sol')
        }
      } 
  }
  // Next, checks for colour matches in the wrong location
  for (let i = 0; i < checkGuess.length; i++) {
    if (checkSols.includes(checkGuess[i])) {
      const index = checkSols.indexOf(checkGuess[i])
      checkSols[index] = "grey"
      pegs.push('grey-peg')
      pegs.shift()
    }
  }
}

  // ! Creates an array of the children elements in the correct hint board row
  // An array containing each cell created in the generateHintsBoard function of the correct hint board row
  let hCell = null

  function setPegs() {
    for (let i = 0; i < hRowArr.length; i++) {
      if (hRowArr[i].classList.contains('hints')) {
        hCell = Array.from(hRowArr[i].children)
      }
    }
  }

  // ! Set the determined peg classes into the cells of the correct hint board row 
  function hintColours() {
    for (let i = 0; i < hCell.length; i++) {
      hCell[i].classList.add(pegs[i])
    }
    pegs.length = 0
  }

  // ! Move the selected row to the next one down for both the Game and Hints Board 
  // ! If it's the last row in the board, the game will end
  function selectNextActive() {
    const selectedRow = document.querySelector('.row-selected')
    if (rows.indexOf(selectedRow) === rows.length - 1) {
      loser.showModal() 
      solution.classList.remove('hide-sol')
    } else {
      selectedRow.classList.remove('row-selected')
      selectedRow.nextElementSibling.classList.add('row-selected')
  
      const selectedHintRow = document.querySelector('.hints')
      selectedHintRow.classList.remove('hints')
      selectedHintRow.nextElementSibling.classList.add('hints')
    }
  }

  // ! Make a guess by pressing the checkGuess button to run necessary functions
  function guess() {
    pushClasses()
    checkMatch()
    setPegs()
    hintColours()
    selectNextActive()
    blkCounter = 0
    checkGuess.length = 0
    checkSols.length = 0
    activeCounter = 0
    guessBtn.disabled = true
  } 

  //! Event Listeners 
  burgerBtn.addEventListener('click', toggleBurger)

  h2Instructions.addEventListener('click', toggle)

  paletteItems.forEach((colour) => {
    colour.addEventListener('click', chooseColour)
  })

  children.forEach((child) => {
    child.addEventListener(clickEvent, setColour)
  })

  guessBtn.addEventListener('click', guess)

  // ! Resets Game after win/lose if play again or reset button is clicked
  playAgainBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      winner.close()
      loser.close()
      solution.classList.add('hide-sol')
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
      guessBtn.disabled = true
      checkSols = []
      generateSolution()
    })
  })

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      winner.close()
      loser.close()
    })
  })

}
window.addEventListener('DOMContentLoaded', init)

// TODO A bug at guess 7 - the button doesn't ungrey and you can't proceed (can't replicate Feb2020, can't replicate May 2023)
// TODO if you click a guess peg more than once it adds to the activeCounter (Nov 2021)
// TODO a guess correct on the last row results in a lose pop up window (Nov 2021)