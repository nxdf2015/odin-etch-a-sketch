

const container = document.querySelector(".grid")
const resetBtn = document.querySelector(".button__reset")
const sizeInput = document.querySelector(".button__size")
const colorElt = document.querySelector(".button__color")

function Menu(){
    this.grid = new Grid()
    this.grid.init()
    
    resetBtn.addEventListener("click", () => {
        
        this.resetGrid()
        this.grid.init()
        
    })
    
    colorElt.addEventListener("change", event => {
        console.log("color elt")
        this.color = event.target.value == "color"
        this.initGrid()
    })
    sizeInput.addEventListener("change", event => {
        
        this.size = event.target.value
        
         this.initGrid()
    })

    this.initGrid = function(){
        this.resetGrid()
         this.grid = new Grid(this.size,this.color)
         this.grid.init()
    }

    this.resetGrid = function(){
         let range = document.createRange()
        range.selectNodeContents(container)
        range.deleteContents()
    }
}



function Grid(n  = 16 , color = false , w = 690 ,h = 80 ){
    let nCell  =  n
    let width = 690
    margin = 1
    border = 1
    let colors
    this.init = function(){
         colors = new Color(color)

        container.style.width = `${5+690+ 2* nCell *  (margin+ border)}px`
        container.style.height =`${5+500+ 2* nCell * (margin+ border) }px`
        container.style.cssText += "display : flex  ; flex-wrap : wrap;"
        this.heightCell = 500/nCell
        this.widthCell = 690/nCell
        
     
        let i = 0
        cells = []
        let cell = this.createCell()
        while ( i < nCell ** 2){
             copy = cell.cloneNode(true)
             copy.addEventListener("mouseover",this.handlerCell)
             cells.push(copy)
             i++
        }
        

        this.renderGrid(cells)
    }
     
    this.handlerCell = function(event){
          
          event.target.style.background=  colors.get()
    }

    
    this.renderGrid = function(cells){
        cells.forEach(cell => container.appendChild(cell))
    }


    
    this.createCell = function(){
      cell = document.createElement("div")
      console.log(this.heightCell,this.widthCell)
      cell.style.height = `${this.heightCell}px`
      cell.style.width = `${this.widthCell}px`
      cell.style.margin = "1px"
      cell.style.background = "white"
      cell.style.border = `${border}px solid black`
     
      return cell
    }
}


function Color(black){
     

    this.get= function(){
        let color  
        if (!black) 
          color =  "black"
        else
          color = `rgb(${randomValue()},${randomValue()},${randomValue()}`
        return color
    }

    function randomValue () {
        return Math.round(Math.random() *255 )
    }
}
 

menu = new Menu()




