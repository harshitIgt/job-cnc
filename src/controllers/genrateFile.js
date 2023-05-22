const  fs = require('fs')
const vm = require('vm')
const path = require('path')
const { StatusCodes }= require('http-status-codes')

const functions = async function(req, res) {
    try{
        let functionCode
         if( req.file ){
            functionCode = req.file.buffer.toString('utf8');
         }else{
            functionCode = req.body
         }
        const funcFile = `functions.js`

        const context = vm.createContext({})
        const mergedContext = { context, myModule: require('../utils/helper')};
        //vm.runInNewContext(functionCode, mergedContext)

        fs.truncate(funcFile, 0, function(err) {
            if (err) throw err;
        });

        const file = fs.createWriteStream(funcFile)
        
        
       // const replaceWord = ` require('./src/utils/helper')`
       // let resultString = functionCode.replace('myModule', replaceWord)
       let resultString = ` require('./src/utils/helper')\n` + functionCode
        resultString += `\nmodule.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onMovement, onParameter, onRapid, onCycle, onCycleEnd, onCyclePoint}`
        file.write(resultString)

        setTimeout(()=>{
            let err = `file uploading successfully`
            res.status(StatusCodes.OK).render('index.ejs', {err})
        },3500)
        
    }catch(error){
        let err = error.message
        res.status(StatusCodes.BAD_REQUEST).render({err})
    }
}

const actions = async function(req,res) {
    try{
        const actionCode = req.body.message

        const filename = 'action.js'
        const outputFile = path.join(__dirname, '../../output.nc')
        const funcFile = path.join(__dirname, '../../functions.js')
        const srcFile = path.join(__dirname, '../../action.js')
        let file = fs.readFileSync(funcFile, 'utf8')

        if(!file){
            err = 'Please upload file'
            res.render('index.ejs',{err});
            return
        }
        else {
            try{
                let newFile =  removeLastLine(file);
                vm.runInNewContext(newFile)
            }catch(error){
               err = error.message;
               res.render('index.ejs',{err});
               return 
            }
        }

        fs.truncate(filename, 0, function(err) {
            if (err) throw err
        })
        fs.truncate('output.nc', 0, function(err) {
            if (err) throw err
        })
        
        fs.appendFile(filename,`const {onOpen, onLinear, onClose, onSection, onSectionEnd,
             onCircular, onMovement, onParameter, onRapid, onCycle, onCycleEnd, onCyclePoint} = myModule\n\n${actionCode}` , (err) => {
            if (err) throw err
        })

        fs.readFile(srcFile, 'utf8', (err,data)=>{
            if(err) throw err;
            const helperPath = '../utils/helper.js'
            delete require.cache[require.resolve(helperPath)]
            const filePath = '../../functions.js'
            delete require.cache[require.resolve(filePath)]
            const context = {
                console: console,
                myModule: require(filePath),
                exports: {},
                require: require,
            };
            try{
                //vm.runInNewContextSync(data, context)
                // runCodeSynchronously(data, context)
                // function runCodeSynchronously(code, context) {
                //     const script = new vm.Script(code);
                //     const sandbox = vm.createContext(context);
                //     return script.runInContext(sandbox);
                // }
                //setTimeout(()=>{
                    vm.runInNewContext(data, context, { timeout: 1000 })
                //},3000)
            }catch(error){
                err = error.message;
                res.render('index.ejs',{err});
                return 
            }
        })
        setTimeout(() =>{
            res.status(StatusCodes.OK).sendFile(outputFile)
        },4000)
       
    } catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

function removeLastLine(string) {
    const lines = string.split('\n');
    if (lines.length <= 1) {
      return '';
    } else {
      lines.pop();
      lines.splice(0, 1);
      return lines.join('\n');
    }
  }

module.exports = { functions, actions }