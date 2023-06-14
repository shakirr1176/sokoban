class Sokoban{
    constructor(){
        this.gameplay = true
        this.appendRowCol = true
        this.faze = true
        this.prevent = true
        this.addRowColumn = false
        this.stageNum = 0
        this.activeBox = ''
        this.rowColumnMinMax = {
            col: {
                min:10,
                max:20
            },
            row: {
                min:8,
                max:12
            }
        }
        this.stages = [
            
            // stage1
            {
                'row' : 9,
                'col' : 8,
                'pathArr' : [11,12,13,17,18,19,21,27,29,33,37,41,43,44,45,50,54,57,58,59,60,61,62,20,28,36,51,52,53,49],
                'boxArr' : [20,28,36,51,52,53,49],
                'headArr' : [18],
                'targetArr' : [17,33,44,54,60]
            },
            
            // stage2
            {
                'row' : 9,
                'col' : 11,
                'pathArr' : [14,15,16,17,26,27,28,22,23,36,37,38,39,40,41,42,53,64,75,86,33,44,45,46,49,59,60,61,57,68,79,67,78,80,30,31,29,34,35,48,50,25,81,82,83,84,85],
                'boxArr' : [34,35,48,50,25],
                'headArr' : [44],
                'targetArr' : [81,82,83,84,85]
            },
            
            // stage3
            {
                'row': 9,
                'col': 10,
                'pathArr': [13, 14, 15, 17, 18, 23, 32, 42, 51, 61, 62, 63, 53, 52, 33, 28, 38, 58, 68, 78, 77, 66, 65, 67, 57, 47, 37, 27, 26, 24, 34, 35, 36, 36, 36, 55, 56, 45, 25, 54],
                'boxArr': [34, 25, 45, 57, 37, 54],
                'headArr': [77],
                'targetArr': [17, 27, 26, 28, 38],
            },

            // stage4
            {
                'row': 10,
                'col': 18,
                'pathArr': [42,43,44,45,46,60,77,95,114,115,97,79,78,96,80,81,99,117,64,65,66,67,85,102,84,83,82,100,101,119,120,118],
                'boxArr': [60,80,101,84],
                'headArr': [78],
                'targetArr': [96,97,115,114]
            },

            // stage5
            {
                'row' : 11,
                'col' : 18,
                'pathArr' : [24,25,26,42,43,44,60,61,61,62,78,79,80,81,76,77,94,112,130,127,128,129,109,110,111,96,114,132,150,168,169,170,171,172,136,154,133,134,135,99,117,137,138,139,140,141,142,156,158,157,159,160,63,122,123,124,131,121],
                'boxArr' : [130,42,62,99,150,128],
                'headArr' : [156],
                'targetArr' : [123,124,141,142,159,160]
            },  
            
            // stage6
            {
                "row": 10,
                "col": 18,
                "pathArr": [37,55,39,40,41,42,60,78,96,114,56,57,133,134,135,97,98,115,25,26,28,29,30,31,32,51,69,87,105,123,141,140,139,119,100,64,46,44,43,61,62,79,50,121,103,102,101,67,66,65,45,38,80,116,47,83,82,120,85,86,68,104,122,49,74,75,92,93,111,110,128,129,130,131,113,95,94],
                "boxArr": [38,80,116,47,83,82,120,85,86,68,104,122,49],
                "headArr": [45],
                "targetArr": [74,75,92,93,111,110,128,129,130,131,113,95,94]
            },
        ]

        this.stagelevel  = 0

        this.declare()
        this.addNewStages()
        this.draw()
    }
    
    declare(){
        this.container = document.querySelector('.container')
        this.stageDivision = document.querySelector('.stage-division')
        this.createStage = document.querySelector('.createStage')
        this.stageNumber = document.querySelector('.stage-number')

        this.nextBtn = document.querySelector('.next-level')
        this.level = document.querySelector('.level')
        this.restart = document.querySelector('.restart')
        this.levelNum = document.querySelector('.levelNumber')
        this.resetbtn = document.querySelector('.resetbtn')
        this.addStage = document.querySelector('.add-stage')
        this.createBtn = document.querySelector('.createBtn')
        this.stageRow = document.querySelector('.stageRow')
        this.stageCol = document.querySelector('.stageCol')
        this.ground = document.querySelector('.ground')
        this.AddRowCOl = document.querySelector('.AddRowCOl')
        this.yourChoose = document.querySelector('.yourChoose')
        this.yourChooseRemove = document.querySelector('.yourChooseRemove')
        this.giveLevel = document.querySelector('.slectLevel')

        this.newObj = {
            row : this.stageRow.value,
            col : this.stageCol.value,
            pathArr : [],
            boxArr : [],
            headArr : [],
            targetArr : []
        }

        this.stage()
        
        this.headImg = document.querySelector('.head')
        this.allBox = this.container.querySelectorAll('.box')
        this.allDiv = document.getElementsByClassName('allDiv') 
        this.col = +this.container.getAttribute('stepY')
        this.currentPosition = this.stages[this.stageNum].headArr[0]
    }
    
    draw(){
        this.bringNewStage()
        this.addRowCol()
        this.addingElement()
        this.removeElement()
        
        this.nextLevel()
        this.restartStage()
        this.reset()
        let $this = this
        document.onkeydown = function (event) {
            if($this.gameplay && $this.prevent){
                switch (event.key) {
                    case "ArrowRight":
                      $this.moveHead(1)
                    break;
  
                    case "ArrowLeft":
                      $this.moveHead(-1)
                    break;
  
                    case "ArrowDown":
                      $this.moveHead($this.col)
                    break;
                 
                    case "ArrowUp":
                      $this.moveHead(-$this.col)
                    break;
              }
            }
         }
    }

    addNewStages(){
        let $this = this
        this.addStage.addEventListener('click',function(){
            if($this.newObj.headArr.length > 0 && $this.newObj.boxArr.length > 0 && $this.newObj.targetArr.length > 0 && $this.newObj.pathArr.length > 0){
                $this.newObj.col = Number($this.stageCol.value)
                $this.newObj.row = Number($this.stageRow.value)
                $this.stages.splice($this.stagelevel,0,$this.newObj)
                $this.container.innerHTML = ''
                $this.stage()
                $this.declare()
                $this.intialvalue($this)
                
            }else{
                alert('Please provide all element')
            }
        })
    }
    
    stage(){
        if(this.stages[this.stageNum] && this.stages.length != 0){
            let kl = this.stages[this.stageNum]
            this.stageNumber.innerHTML = this.stageNum+1
            this.container = document.querySelector('.container')
            this.container.innerHTML = ''
            this.container.style.gridTemplateColumns = `repeat(${kl.col},40px)`
            this.container.style.gridTemplateRows = `repeat(${kl.row},40px)`
            this.container.setAttribute('stepY',kl.col)

            for (let i = 0; i < (kl.col*kl.row); i++){
                let allDiv = document.createElement('div')
                allDiv.className = 'allDiv'
                this.container.append(allDiv)
            }

            let allDiv = document.querySelectorAll('.allDiv')
            

            let pathMSGShow;
            let pathNum = 0
            let wrongPathIndex = []

            for(let i=0; i<kl.pathArr.length; i++){
                if(allDiv[kl.pathArr[i]]){
                    allDiv[kl.pathArr[i]].classList.add('path')
                }else{
                    pathNum++
                    wrongPathIndex.push(kl.pathArr[i])
                    pathMSGShow = 'path is out of the ground. Please fix path position'
                }
            }

            if(pathNum>0){
                console.warn(
                    {
                        errorMsg: pathNum + ' ' + pathMSGShow,
                        stage: (this.stageNum+1),
                        totalPAth: pathNum,
                        wrongPathIndex: wrongPathIndex
                    }
                );
            }

            let boxMSGShow;
            let boxNum = 0
            let wrongBoxIndex = []

            for(let i=0; i<kl.boxArr.length; i++){
            let box = document.createElement('img')
            box.setAttribute('src','box.jpg')
            box.className = 'box'

                if(
                    allDiv[kl.boxArr[i]]&&
                    allDiv[kl.boxArr[i]].innerHTML == '' && 
                    allDiv[kl.boxArr[i]].classList.contains('allDiv') && 
                    allDiv[kl.boxArr[i]].classList.contains('path')){

                    allDiv[kl.boxArr[i]].append(box)
                }else{
                    boxNum++
                    wrongBoxIndex.push(kl.boxArr[i])
                    boxMSGShow = 'box is not in right place. Please fix box position'
                }
            }

            if(boxNum>0){
                console.warn(
                    {
                        errorMsg: boxNum + ' ' + boxMSGShow,
                        stage: (this.stageNum+1),
                        totalBox: boxNum,
                        wrongBoxIndex: wrongBoxIndex
                    }
                );
            }

            let targetMSGShow;
            let targetNum = 0
            let wrongTargetIndex = [];

            for(let i=0; i<kl.targetArr.length; i++){
                if(
                    allDiv[kl.targetArr[i]]&&
                    allDiv[kl.targetArr[i]].innerHTML == '' && 
                    allDiv[kl.targetArr[i]].classList.contains('allDiv') && 
                    allDiv[kl.targetArr[i]].classList.contains('path')
                ){
                    allDiv[kl.targetArr[i]].classList.add('path','target')
                }else{
                    targetNum++
                    wrongTargetIndex.push(kl.targetArr[i])
                    targetMSGShow = 'Target is not in right position. Please fix this first.'
                }
            }

            if(targetNum>0){
                console.warn(
                    {
                        errorMsg: targetNum + ' ' + targetMSGShow,
                        stage: (this.stageNum+1),
                        totalTarget: targetNum,
                        wrongTargetIndex: wrongTargetIndex
                    }
                );
            }


        let headImg = document.createElement('img')
        headImg.setAttribute('src','head.svg')
        headImg.className = 'head'

        if(
            allDiv[kl.headArr] &&
            allDiv[kl.headArr].innerHTML == '' &&
            allDiv[kl.headArr].classList.contains('allDiv') && 
            allDiv[kl.headArr].classList.contains('path')
        ){
            allDiv[kl.headArr].append(headImg)
        }else{
            console.warn('player is not in path');
        }
    }
}

    moveHead(cal){
        for (let i = 0; i < this.allBox.length; i++) {
            const box = this.allBox[i];
            if(this.allDiv[this.currentPosition+cal].children[0] == box && this.allDiv[this.currentPosition+cal*2].classList.contains('path')){
                box.parentElement.classList.add('path')
                this.allDiv[this.currentPosition+cal*2].append(box)
            }else{
                box.parentElement.classList.remove('path')
            }
            
            if(box.parentElement.classList.contains('target')){
                box.setAttribute('src','box2.png')
            }else{
                box.setAttribute('src','box.jpg')
            }
        }

       if(this.allDiv[this.currentPosition+cal].classList.contains('path')){
        this.currentPosition = this.currentPosition+cal 
        this.allDiv[this.currentPosition].append(this.headImg)
       }
       this.winResult(this.headImg)
    }

    nextLevel(){
        let $this = this
            $this.nextBtn.addEventListener('click',function(){
                $this.level.classList.add('hidden')
                $this.stageNum++
                $this.stages
                $this.declare()
            })
    }

    restartStage(){
        let $this = this
            $this.restart.addEventListener('click',function(){
                if($this.prevent){
                    $this.container.innerHTML = ''
                    $this.stage()
                    $this.declare()
                }
            })
    }

    reset(){
        this.resetbtn.addEventListener('click',function(){
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);
        })
    }



    intialvalue($this){
        
        $this.ground.innerHTML = ''
        $this.ground.style = null
        $this.ground.classList.remove('cursor-cell')


        $this.createStage.classList.add('hidden')
        $this.stageDivision.classList.remove('hidden')
        $this.newObj.pathArr = []
        $this.newObj.headArr = []
        $this.newObj.targetArr = []
        $this.newObj.boxArr = []
        $this.giveLevel.innerHTML = ''
        
        $this.gameplay = true
        $this.appendRowCol = true
        $this.addRowColumn = false
        $this.faze = false


        let addBtn = document.querySelectorAll('.addBtn')
            $this.activeBox = ''
            addBtn.forEach(el=>{
                el.classList.remove('active')
            })

    }


    resetFunc($this){
            $this.addRowColumn = false
            $this.faze = true   
            $this.ground.innerHTML = ''

            $this.newObj.pathArr = []
            $this.newObj.headArr = []
            $this.newObj.targetArr = []
            $this.newObj.boxArr = []

            let addBtn = document.querySelectorAll('.addBtn')
            $this.activeBox = ''
            addBtn.forEach(el=>{
                el.classList.remove('active')
            })
    }

    bringNewStage(){
        let $this = this
        this.createBtn.addEventListener('click',function(){

            $this.createStage.classList.remove('hidden')
            $this.stageDivision.classList.add('hidden')

            $this.giveLevel.innerHTML = ''
            let firstmyOption = document.createElement('option' )
            firstmyOption.innerHTML = 'Select level'
            $this.giveLevel.append(firstmyOption)

            for(let i=0; i<$this.stages.length+1; i++){
                let myOption = document.createElement('option')
                myOption.value = i+1
                myOption.innerHTML = i+1
                myOption.className = 'myOption'
                $this.giveLevel.append(myOption)
            }

            document.querySelector('.cancel').addEventListener('click',function(){
                $this.intialvalue($this)
            })

            $this.gameplay = false
        })
    }
    
    addRowCol(){
        let $this = this
        let stageColStore;
        let stageRowStore;
        this.AddRowCOl.addEventListener('click',function(){
            $this.resetFunc($this)

            $this.addRowColumn = true;
            $this.ground.classList.add('cursor-cell')

            stageColStore = $this.stageCol.value
            stageRowStore = $this.stageRow.value

            if(stageColStore < $this.rowColumnMinMax.col.min){
                stageColStore = $this.rowColumnMinMax.col.min
            }

            if(stageColStore > $this.rowColumnMinMax.col.max || stageColStore >= 100){
                stageColStore = $this.rowColumnMinMax.col.max
            }

            if(stageRowStore < $this.rowColumnMinMax.row.min){
                stageRowStore = $this.rowColumnMinMax.row.min
            }

            if(stageRowStore > $this.rowColumnMinMax.col.max || stageRowStore >= 100){
                stageRowStore = $this.rowColumnMinMax.col.max
            }

             $this.stageCol.value = stageColStore 
             $this.stageRow.value = stageRowStore


            $this.ground.style.gridTemplateColumns = 'repeat('+ stageColStore +',40px)'
            
            $this.ground.style.gridTemplateRows = 'repeat('+ stageRowStore +',40px)'

            for (let i = 0; i < (stageColStore*stageRowStore); i++){
                let allDivs = document.createElement('div')
                allDivs.className = 'Divs'
                $this.ground.append(allDivs)
            }
            // in here
        })
        
        $this.giveLevel.addEventListener('change',function(event){
            $this.stagelevel = $this.giveLevel.value-1
        })
    }

    removeElement(){
        let $this = this

        document.querySelector('.removeAll').addEventListener('click',function(){
            $this.resetFunc($this)
        })

        document.addEventListener('click',function(e){
            if(e.target.closest('.cross') && $this.addRowColumn){
                
                
                let allDivs = document.querySelectorAll('.Divs')

                let singleCrossBtn = e.target.closest('.cross')
                let indexOfDiv = Array.from(allDivs).indexOf(singleCrossBtn.parentElement)

                function removeFunc(elementArray,element){
                    if(singleCrossBtn.parentElement && singleCrossBtn.parentElement.classList.contains(element)){
                        singleCrossBtn.parentElement.classList.remove(element);
                        singleCrossBtn.parentElement.innerHTML = ''

                        if(elementArray.includes(indexOfDiv)){
                            let ind = elementArray.indexOf(indexOfDiv)
                            elementArray.splice(ind,1)
                        }
                    }
                }

                removeFunc($this.newObj.boxArr,'box')
                removeFunc($this.newObj.headArr,'player')
                removeFunc($this.newObj.targetArr,'target')

            }
        })
    }


    addingElement(){
        let $this = this
                
        document.addEventListener('click',(e)=>{

            if(e.target.closest('.Divs') && $this.addRowColumn){

                let allDivs = document.querySelectorAll('.Divs')

                let Divs = e.target.closest('.Divs')
                let indexOfDiv = Array.from(allDivs).indexOf(Divs)
                
                // toggle path
                if($this.faze){
                        if(!Divs.classList.contains('box')&&
                            !Divs.classList.contains('player')&&
                            !Divs.classList.contains('target')
                        ){
                            Divs.classList.toggle('path')
                            if(Divs.classList.contains('path')){
                                $this.newObj.pathArr.push(indexOfDiv)
                            }else{
                                let inxOfPath = $this.newObj.pathArr.indexOf(indexOfDiv)
                                $this.newObj.pathArr.splice(inxOfPath,1)
                            }
                        }
                    }

                    function elementSetup(elementArray, element){
                        if(
                            !Divs.classList.contains('box')&&
                            !Divs.classList.contains('player')&&
                            !Divs.classList.contains('target')
                        ){
                            Divs.classList.add(element)
                            let cross = document.createElement('div')
                            cross.className = 'cross'
                            cross.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          `
                          Divs.append(cross)

                            if(!elementArray.includes(indexOfDiv)){
                                elementArray.push(indexOfDiv)
                            }
                        }
                    }

                //    addElement
                if($this.faze == false && Divs.classList.contains('path')){

                    if($this.activeBox == 'box'){
                        elementSetup($this.newObj.boxArr, 'box')
                    }

                    if($this.activeBox == 'target'){
                        elementSetup($this.newObj.targetArr, 'target')
                    }

                    if($this.activeBox == 'player'){
                        if($this.newObj.headArr.length < 1){
                            elementSetup($this.newObj.headArr, 'player')
                        }
                    }
                }

            }
        })

            // add elemnt active

            let addBtn = document.querySelectorAll('.addBtn')
            
            addBtn.forEach((el,inx)=>{
                el.addEventListener('click',()=>{

                    // let allDivs = document.querySelectorAll('.Divs')

                    if($this.addRowColumn == true){ 

                        for (let k = 0; k < addBtn.length; k++) {
                            if(inx != k){
                                addBtn[k].classList.remove('active')
                            }
                        }
    
                        el.classList.toggle('active')
                        if(el.classList.contains('active')){
                            $this.activeBox = el.innerHTML
                            $this.faze = false
                            $this.ground.classList.remove('cursor-cell')
                        }else{
                            
                            $this.ground.classList.add('cursor-cell')
                            $this.faze = true
                            $this.activeBox = ''
                        }
                    }

                    function moveElement(elmnt){
                        if($this.activeBox == elmnt){
                            let imgDiv = document.createElement('div')
                            imgDiv.className = `hover-img ${elmnt}Div`
                            $this.ground.prepend(imgDiv)
                            $this.ground.addEventListener('mousemove', function(e){
                                let xAxis = e.pageX
                                let yAxis = e.pageY
    
                                imgDiv.style.top = yAxis + 'px'
                                imgDiv.style.left = xAxis + 'px'
                            })
                        }else{
                            if(document.querySelector(`.${elmnt}Div`)){
                                document.querySelector(`.${elmnt}Div`).remove()
                            }
                        }
                    }

                    moveElement('box')
                    moveElement('target')
                    moveElement('player')

                })
            })
    }

    winResult(){
        let target = document.querySelectorAll('.target')
        let count = 0
        for(let i=0; i<target.length; i++){
            if(target[i].innerHTML != '' && target[i].children[0] != this.headImg){
                count++
            }
        }

        if(count == target.length){
            this.level.classList.remove('hidden')
            if(this.stages[this.stageNum+2]){
                this.levelNum.innerHTML = this.stageNum+2
            }else{
                this.level.innerHTML = 'game over'
                this.prevent = false
            }
        }
    }
}

let sokoban = new Sokoban()