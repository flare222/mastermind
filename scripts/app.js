function init() {

  const instructions = document.querySelector('.instructions')
  const tbl = document.querySelector('.table')
  const tblBody = document.createElement('tbody')
  const solution = document.querySelector('.solution')
  const sols = []
  const paletteItems = document.querySelectorAll('input[name=radio]')

  const colours = ['purple-bead', 'teal-bead', 'seagreen-bead', 'blue-bead', 'coral-bead', 'yellow-bead']
  let randomColour = (Math.floor(Math.random() * colours.length))

  // ! Create Game Board
  function generateTable() {
    // creating all cells
    for (let i = 0; i < 10; i++) {
      // creates a table row
      const row = document.createElement('tr')

      for (let j = 0; j < 4; j++) {
        // creates a cell
        const cell = document.createElement('td')
        cell.classList.add('bead')
        row.appendChild(cell)
      }
      // add the row to the end of the table body
      tblBody.appendChild(row)
      tblBody.firstChild.classList.add('row-selected')
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody)
  }

  generateTable()

  // ! Solution Grid
  Array(4 * 1).join('.').split('.').forEach(() => {
    const sol = document.createElement('div')
    sol.classList.add('sol-item')
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
  function chooseColour() {
    for (let i = 0; i < paletteItems.length; i++)  {
      if (paletteItems[i].checked) {
        paletteItems[i].checked = false
        const colour = paletteItems[i].value
        console.log(colour)
        console.log(paletteItems[i].checked)
      }
    }
  }
  
  paletteItems.forEach(() => {
    addEventListener('click', chooseColour)
  })
  
  console.log(paletteItems)

  // ! Change Colours in guess row

  

  // ! Make a guess
  function guess() {
    //click on a tick button to confirm the colour combination
    //move the selected class to the next row
  }

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