function init() {

  const instructions = document.querySelector('.instructions')
  const tbl = document.querySelector('.table')
  const tblBody = document.createElement('tbody')
  const rows = []
  const beads = []
  const hBoard = document.querySelector('.h-board')
  const paletteItems = document.querySelectorAll('input[name=radio]')
  const solution = document.querySelector('.solution')
  const sols = []
  const button = document.querySelector('button')
  let colour = null
  const colours = ['purple-bead', 'teal-bead', 'seagreen-bead', 'blue-bead', 'coral-bead', 'yellow-bead']
  let randomColour = (Math.floor(Math.random() * colours.length))

  

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
      tblBody.firstChild.id = 'row-selected'
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
    sol.classList.add('sol-item', 'bead')
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
    if (e.target.classList.contains('bead')) {
      switch (colour) {
        case 'purple':
          e.target.classList.remove('blue-bead', 'coral-bead', 'teal-bead', 'yellow-bead', 'seagreen-bead')
          e.target.classList.add('purple-bead')
          break
        case 'blue':
          e.target.classList.remove('purple-bead', 'coral-bead', 'teal-bead', 'yellow-bead', 'seagreen-bead')
          e.target.classList.add('blue-bead')
          break
        case 'coral':
          e.target.classList.remove('purple-bead', 'blue-bead', 'teal-bead', 'yellow-bead', 'seagreen-bead')
          e.target.classList.add('coral-bead')
          break
        case 'teal':
          e.target.classList.remove('purple-bead', 'coral-bead', 'blue-bead', 'yellow-bead', 'seagreen-bead')
          e.target.classList.add('teal-bead')
          break
        case 'yellow':
          e.target.classList.remove('purple-bead', 'coral-bead', 'blue-bead', 'teal-bead', 'seagreen-bead')
          e.target.classList.add('yellow-bead')
          break
        case 'seagreen':
          e.target.classList.remove('purple-bead', 'coral-bead', 'blue-bead', 'yellow-bead', 'teal-bead')
          e.target.classList.add('seagreen-bead')
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
  // Loop through the beads in that row 
  // check colours match with solution
  // move the selected class to the next row
  
  let guessRow = null
  const guessArr = []
  
  // ! Checks that we are only looking at one row of four beads at a time
  function checkSelected() {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].classList.contains('row-selected')) {
        guessRow = Array.from(rows[i].children)
      }
    }
  }

  // ! Populates an array with the guess combination
  function populateGuess() {
    for (let i = 0; i < guessRow.length; i++) {
      // console.log(guessRow[i])
      for (let j = 0; j < colours.length; j++) {
        if (guessRow[i].classList.contains(colours[j])) {
          // console.log('match')
          guessArr.push(guessRow[i])
          // console.log(guessArr)
        }
      } 
    }
    if (guessArr.length < 4) {
      guessArr.length = 0
      alert('Please choose 4 colours')
    }
  }

  // ! Matches the guess combination array with the solution array
  function colourMatch() {
    guessArr.every(i => sols.includes(i)) ? console.log('match') : console.log('non-match')
    
  }
  
  function guess() {
    checkSelected()
    populateGuess
    colourMatch()
  }
  //  

  button.addEventListener('click', guess)

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