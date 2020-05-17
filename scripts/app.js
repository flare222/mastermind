function init() {
  // ! DOM Elements
  // Burger Menu button
  const burgerBtn = document.querySelector('.burger-box')
  // Burger menu content to be toggled
  const burgerContent = document.querySelector('.burger-content')
  // The div wrapping the burger elements
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
  const winner = document.querySelector('.wins')
  // Div if you lose, visibility toggles on/off
  const loser = document.querySelector('.loses')
  // To click if you wish to reset the game
  const playAgainBtns = document.querySelectorAll('.play-again-btn')
  // To close the win window and inspect the results of the game
  const closeBtns = document.querySelectorAll('.close-btn')

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

  guessBtn.disabled = true

  function toggleBurger() {
    burgerContent.classList.toggle('show')
    burgerWrap.classList.toggle('background')
  }

  burgerBtn.addEventListener('click', toggleBurger)

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
    solution.classList.add('hide-sol')
  })

  // ! Generate a random solution (hidden from player)
  // ! Push the classes into an array which will be checked against the guess classes
  function generateSolution() {
    for (let i = 0; i < sols.length; i++) {
      const randomColour = (Math.floor(Math.random() * colours.length))
      sols[i].classList.add(colours[randomColour])
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
      activeCounter++
      checkSelected()
    } 
  }

  children.forEach(() => {
    addEventListener('touchStart', setColour)
  })

  children.forEach(() => {
    addEventListener('click', setColour)
  })

  // ! Checks that we are only looking at the selected row
  // ! Populates an array containing the guess elements
  // ! Checks that the guess row contains active elements before enabling button
  let guessRow = []
  let activeCounter = 0

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


  let guessClass
  let solClass

  function pushClasses() {
    for (let i = 0; i < guessRow.length; i++) {
      guessClass = guessRow[i].getAttribute('class')
      checkGuess.push(guessClass)

      solClass = sols[i].getAttribute('class')
      checkSols.push(solClass)
    }
    // console.log('checkGuess', checkGuess)
    // console.log('checkSols', checkSols)
  }

  // ! Matches the guess combination array with the solution array
  let blkCounter = 0

  function checkMatch() {
    pushClasses()
    console.log(checkGuess)
    console.log(checkSols)
    
    for (let i = 0; i < guessRow.length; i++) {
      const guessClass = guessRow[i].getAttribute('class')
      const solClass = sols[i].getAttribute('class')
      // console.log(guessClass)
      // console.log(solClass)
      if (solClass === guessClass) {
        console.log('black', guessClass, solClass)
        pegs.push('black-peg')
        blkCounter++
        if (blkCounter === 4) {
          console.log(blkCounter)
          winner.setAttribute('class', 'winner-loser')          
          solution.classList.remove('hide-sol')
        }
      } else if (checkGuess.includes(solClass)) {
        console.log('grey', guessClass, solClass)
        pegs.unshift('grey-peg')
        const index = checkGuess.indexOf(solClass)
        // console.log(index)
        checkGuess.splice(index, 1)
        console.log(checkGuess)
      } else {
        console.log('red', guessClass, solClass)
        pegs.unshift('red-peg') 
      }
    }
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
    console.log('Row Index', rows.indexOf(selectedRow))
    if (rows.indexOf(selectedRow) === rows.length - 1) {
      // loser.classList.add('win-lose')
      loser.setAttribute('class', 'winner-loser')  
      solution.classList.remove('hide-sol')
    } else {
      selectedRow.classList.remove('row-selected')
      selectedRow.nextElementSibling.classList.add('row-selected')
  
  
      const selectedHintRow = document.querySelector('.hints')
      selectedHintRow.classList.remove('hints')
      selectedHintRow.nextElementSibling.classList.add('hints')
    }
  }


  // ! Make a guess by pressing the button to run necessary functions
  
  function guess() {
    checkMatch()
    setPegs()
    hintColours()
    selectNextActive()
    blkCounter = 0
    checkGuess.length = 0
    checkSols.length = 0
    activeCounter = 0
    guessBtn.disabled = true
    // console.log(checkSols)
  } 

  // ! Toggle Instructions
  function toggle() {
    document.querySelector('.instructions').classList.toggle('show')
    arrow.classList.toggle('symbol')
  }

  //! Event Listeners 
  h2Instructions.addEventListener('click', toggle)

  guessBtn.addEventListener('click', guess)

  // ! Resets Game after win/lose if play again or reset button is clicked
  playAgainBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      winner.classList.remove('winner-loser')
      loser.classList.remove('winner-loser')
      winner.classList.add('wins', 'show')
      loser.classList.add('loses', 'show')
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
      winner.classList.remove('winner-loser')
      loser.classList.remove('winner-loser')
      winner.classList.add('wins', 'show')
      loser.classList.add('loses', 'show')
      // alert(event.target)
    })
  })

  // children.forEach(() => {
  //   addEventListener('click', setColour)
  // })



}
window.addEventListener('DOMContentLoaded', init)