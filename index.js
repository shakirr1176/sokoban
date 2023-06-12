class Sokoban{
    constructor(){
        this.gameplay = true
        this.appendRowCol = true
        this.faze = true
        this.prevent = true
        this.stageNum = 0
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

        this.stagelevel  = this.stages.length
        this.declare()
        this.draw()
    }
    
    declare(){
        this.container = document.querySelector('.container')

        this.nextBtn = document.querySelector('.next-level')
        this.level = document.querySelector('.level')
        this.restart = document.querySelector('.restart')
        this.levelNum = document.querySelector('.levelNumber')
        this.resetbtn = document.querySelector('.resetbtn')
        this.addStage = document.querySelector('.add-stage')
        this.createStage = document.querySelector('.createStage')
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

        this.addNewStages()

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

            if($this.newObj.headArr.length != 0 && $this.newObj.boxArr.length != 0 && $this.newObj.targetArr && $this.newObj.pathArr.length != 0){
                $this.newObj.col = Number($this.stageCol.value)
                $this.newObj.row = Number($this.stageRow.value)

                $this.stages.splice($this.stagelevel,0,$this.newObj)
                $this.container.innerHTML = ''
                $this.stages
                $this.stage()
                $this.declare()

                $this.intialvalue($this)


            }else{
                alert('provide all element')
            }
        })
    }
    
    stage(){
        if(this.stages[this.stageNum] && this.stages.length != 0){
            let kl = this.stages[this.stageNum]
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

            for(let i=0; i<kl.pathArr.length; i++){
                if(allDiv[kl.pathArr[i]]){
                    allDiv[kl.pathArr[i]].classList.add('path')
                }else{
                    pathNum++
                    pathMSGShow = 'path path is out of the ground. Please fix path position'
                }
            }

            if(pathNum>0){
                console.log(pathNum + ' ' + pathMSGShow);
            }

            let boxMSGShow;
            let boxNum = 0
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
                    boxMSGShow = 'box is not in right place. Please fix box position'
                }
            }

            if(boxNum>0){
                console.log(boxNum+ ' ' + boxMSGShow);
            }

            let targetMSGShow;
            let targetNum = 0

            for(let i=0; i<kl.targetArr.length; i++){
                if(
                    allDiv[kl.targetArr[i]]&&
                    allDiv[kl.targetArr[i]].innerHTML == '' && 
                    allDiv[kl.targetArr[i]].classList.contains('allDiv') && 
                    allDiv[kl.targetArr[i]].classList.contains('path')
                ){
                    allDiv[kl.targetArr[i]].classList.add('path','ballon')
                }else{
                    targetNum++
                    targetMSGShow = 'Target is not in right position. Please fix this first.'
                }
            }

            if(targetNum>0){
                console.log(targetNum+ ' ' + targetMSGShow);
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
            console.log('player is not in path');
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
            
            if(box.parentElement.classList.contains('ballon')){
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

        $this.createStage.classList.add('hidden')
        $this.newObj.pathArr = []
        $this.newObj.headArr = []
        $this.newObj.targetArr = []
        $this.newObj.boxArr = []
        $this.giveLevel.innerHTML = ''
        
        $this.gameplay = true
        $this.appendRowCol = true

    }

    bringNewStage(){
        let $this = this
        this.createBtn.addEventListener('click',function(){

            $this.createStage.classList.remove('hidden')
            $this.giveLevel.innerHTML = ''
            let firstmyOption = document.createElement('option' )
            firstmyOption.innerHTML = 'Select level'
            $this.giveLevel.append(firstmyOption)

            for(let i=0; i<$this.stages.length+1; i++){
                let myOption = document.createElement('option')
                myOption.value = i
                myOption.innerHTML = i
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
        this.AddRowCOl.addEventListener('click',function(){

            $this.ground.innerHTML = ''

            $this.newObj.pathArr = []
            $this.newObj.headArr = []
            $this.newObj.targetArr = []
            $this.newObj.boxArr = []

            if($this.stageCol.value < $this.stageCol.min){
                $this.stageCol.value = $this.stageCol.min
            }

            if($this.stageCol.value > $this.stageCol.max || $this.stageCol.value >= 100){
                $this.stageCol.value = $this.stageCol.max
            }

            if($this.stageRow.value < $this.stageRow.min){
                $this.stageRow.value = $this.stageRow.min
            }

            if($this.stageRow.value > $this.stageRow.max || $this.stageRow.value >= 100){
                $this.stageRow.value = $this.stageRow.max
            }

            $this.ground.style.gridTemplateColumns = 'repeat('+ $this.stageCol.value +',40px)'
            
            $this.ground.style.gridTemplateRows = 'repeat('+ $this.stageRow.value +',40px)'

            for (let i = 0; i < ($this.stageCol.value*$this.stageRow.value); i++){
                let allDivs = document.createElement('div')
                allDivs.className = 'Divs'
                $this.ground.append(allDivs)
            }

            for(let i=0; i<allDivs.length; i++){
                allDivs[i].addEventListener('click',function(){
                   if($this.faze){
                    allDivs[i].classList.add('path') 
                    $this.newObj.pathArr.push(i)
                   }
                })
            }

            for(let j=0; j<allDivs.length; j++){
                document.querySelector('.removeAll').addEventListener('click',function(){
                    allDivs[j].className = 'Divs'
                    $this.newObj.pathArr = []
                    $this.newObj.headArr = []
                    $this.newObj.targetArr = []
                    $this.newObj.boxArr = []
                })
            }
        })

        $this.giveLevel.addEventListener('change',function(event){
            $this.stagelevel = event.target.value
            if(event.target.value == 'none'){
                $this.stagelevel = $this.stages.length
            }
        })
       
        let allDivs = document.getElementsByClassName('Divs')
            $this.yourChoose.addEventListener('change',function(e){
                $this.faze = false
                    for(let j =0; j<allDivs.length; j++){
                        allDivs[j].addEventListener('click',function(){
                                    if(e.target.value != 'box' || e.target.value != 'target' || e.target.value != 'player'){
                                        if(e.target.value == 'path'){
                                            allDivs[j].classList.add('path')
                                            if(!$this.newObj.pathArr.includes(j)){
                                                $this.newObj.pathArr.push(j)
                                            }
                                        }
                                    }
                                    
                                    if(allDivs[j].classList.contains('path')){
                                        if(e.target.value == 'box'){
                                            if(!allDivs[j].classList.contains('ballons','player')){
                                                allDivs[j].classList.add('box','path')
                                                if(!$this.newObj.boxArr.includes(j)){
                                                    $this.newObj.boxArr.push(j)
                                                }
                                            }
                                            
                                         }
             
                                         if(e.target.value == 'target'){
                                             if(!allDivs[j].classList.contains('box','player')){
                                                allDivs[j].classList.add('ballons','path')
                                                if(!$this.newObj.targetArr.includes(j)){
                                                    $this.newObj.targetArr.push(j)
                                                 }
                                             }
                                             
                                         }
        
                                          if(e.target.value == 'player'){
                                           if($this.newObj.headArr.length < 1){
                                                if(allDivs[j].classList.contains('path')){
                                                    if(!allDivs[j].classList.contains('box','ballons')){
                                                        allDivs[j].classList.add('player','path')
                                                        if(!$this.newObj.headArr.includes(j)){
                                                            $this.newObj.headArr.push(j)
                                                           }
                                                    }
                                                }
                                            }
                                         }
                                    }
                                })
                            }
                    })

            $this.yourChooseRemove.addEventListener('change',function(e){
                for(let j =0; j<allDivs.length; j++){
                    allDivs[j].addEventListener('click',function(){
                                if(e.target.value == 'path'){
                                    if(allDivs[j].classList.contains('path')){
                                        allDivs[j].classList.remove('path') 
                                    if($this.newObj.pathArr.includes(j)){
                                        let ind = $this.newObj.pathArr.indexOf(j)
                                        $this.newObj.pathArr.splice(ind,1)
                                    }
                                    }
                                }
                                if(allDivs[j].classList.contains('path')){
                                    if(e.target.value == 'box'){
                                    if(allDivs[j].classList.contains('box')){
                                        allDivs[j].classList.remove('box')
                                        if($this.newObj.boxArr.includes(j)){
                                            let ind = $this.newObj.boxArr.indexOf(j)
                                            $this.newObj.boxArr.splice(ind,1)
                                        }
                                    }
                                     }
            
                                     if(e.target.value == 'target'){
                                         if(allDivs[j].classList.contains('ballons')){
                                            allDivs[j].classList.remove('ballons')
                                            if($this.newObj.targetArr.includes(j)){
                                               let ind = $this.newObj.targetArr.indexOf(j)
                                               $this.newObj.targetArr.splice(ind,1)
                                            }
                                         }
                                     }
    
                                      if(e.target.value == 'player'){
                                            if(allDivs[j].classList.contains('player')){
                                                allDivs[j].classList.remove('player')
                                             if($this.newObj.headArr.includes(j)){
                                                let ind = $this.newObj.headArr.indexOf(j)
                                                $this.newObj.headArr.splice(ind,1)
                                             }
                                            }
                                     }
                                }
                            
                            })
                        }
        
                   
                })
    }

 

    winResult(){
        let ballon = document.querySelectorAll('.ballon')
        let count = 0
        for(let i=0; i<ballon.length; i++){
            if(ballon[i].innerHTML != '' && ballon[i].children[0] != this.headImg){
                count++
            }
        }

        if(count == ballon.length){
            this.level.classList.remove('hidden')
            // console.log(this.levelNum);
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
