function init() {

  const grid = document.querySelector('.grid')
  const squares = []
  const solution = document.querySelector('.solution')
  const sols = []
  // const sol = document.querySelector('sol-item')
  const randomSol = (Math.floor(Math.random() * sols.length))
  
  const width = 4
  const height = 10
  const colours = ['purple-bead', 'teal-bead', 'seagreen-bead', 'blue-bead', 'coral-bead', 'yellow-bead']
  let randomColour = (Math.floor(Math.random() * colours.length))

  // ! Game Grid
  Array(width * height).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  // ! Solution Grid
  Array(width * 1).join('.').split('.').forEach(() => {
    const sol = document.createElement('div')
    sol.classList.add('sol-item')
    sols.push(sol)
    solution.appendChild(sol)
  })

  console.log(colours[randomColour])
  console.log(randomSol)

  function generateSolution() {
    for (let i = 0; i < sols.length; i++) {
      randomColour = (Math.floor(Math.random() * colours.length))
      sols[i].classList.add(colours[randomColour])
    }
  }

  generateSolution()

}
window.addEventListener('DOMContentLoaded', init)