

const container = document.querySelector(".grid")
const resetBtn = document.querySelector(".button__reset")
const sizeInput = document.querySelector(".button__size")
const colorElt = document.querySelector(".button__color")

const color_border =  "b1c9ce"

function App(){
    this.grid = new Grid()
    this.grid.init()
    
    resetBtn.addEventListener("click", () => {
        
        this.resetGrid()
        this.grid.init()
        
    })
    
    colorElt.addEventListener("change", event => {
       
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
    let width = w
    let height = window.innerHeight * 0.8
    margin = 0
    border = 1
    let colors
    this.init = function(){
         colors = new Color(color)  
        let widthCells = width - 2* nCell *  (margin+ border)
        let heightCells = height - 2* nCell *  (margin+ border)
        
        container.style.width = `${width}px`
        container.style.height =`${height}500`
        container.style.cssText += "display : flex  ; flex-wrap : wrap;"
        this.heightCell = heightCells/nCell
        this.widthCell = widthCells/nCell
        
     
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
        let cell = event.target
          if (color && cell.dataset.color ){            
             cell.style.background = colors.getDark(cell.dataset.color,getRGB(cell.style.background))
             cell.dataset.color= parseInt(cell.dataset.color)+1
          }
          else {
               cell.dataset.color = 1
               cell.style.background=  colors.get()
          }
         
    }

    
    this.renderGrid = function(cells){
        cells.forEach(cell => container.appendChild(cell))
    }


    
    this.createCell = function(){
      cell = document.createElement("div")      
      cell.style.height = `${this.heightCell}px`
      cell.style.width = `${this.widthCell}px`
      cell.style.margin = margin
      cell.style.background = "white"
      cell.style.border = `${border}px solid  #${color_border}`
     
      return cell
    }
}

function getRGB(color){
    
    rgb =/rgb\((?<r>\d+)\s?,\s?(?<g>\d+)\s?,\s?(?<b>\d+)\)/g
     
    result = rgb.exec(color)
    
    return result.groups
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

    this.getDark=function(id,colors){        
       result = Object.keys(colors).map(c => { return   (id >= 12) ?  0 : colors[c]  - colors[c] / (12 - +id) } ).join(",")
      
       return `rgb(${result}`
    }

    function randomValue () {
        return Math.round(Math.random() *255 )
    }
}
 

app = new App()




