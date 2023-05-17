const  fs = require('fs')
const vm = require('vm')
const path = require('path')

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
        
        
        const replaceWord = ` require('./src/utils/helper')`
        let resultString = functionCode.replace('myModule', replaceWord)
        resultString += `\nmodule.exports = { onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onMovement, onParameter}`
        file.write(resultString)
        //const functionfile = path.join(__dirname, '../../functions.js')
        setTimeout(()=>{
            let err = `file uploading successfully`
            res.status(200).render('index.ejs', {err})
        },3500)
        
    }catch(error){
        console.log(error)
        let err = error.message
        res.status(400).render({err})
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
        console.log('file>>>',file)
        fs.truncate(filename, 0, function(err) {
            if (err) throw err
        })
        fs.truncate('output.nc', 0, function(err) {
            if (err) throw err
        })
        fs.appendFile(filename,`const {onOpen, onLinear, onClose, onSection, onSectionEnd, onCircular, onMovement, onParameter} = myModule\n\n${actionCode}` , (err) => {
            if (err) throw err
        })

        fs.readFile(srcFile, 'utf8', (err,data)=>{
            if(err) throw err;
            const filePath = '../../functions.js'
            delete require.cache[require.resolve(filePath)]
            const context = {
                myModule: require(filePath),
            };
            try{
                 vm.runInNewContext(data, context)
            }catch(error){
                err = error.message;
                res.render('index.ejs',{err});
                return 
            }
        })
        setTimeout(() =>{
            res.status(200).sendFile(outputFile)
        },3500)
       
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

function removeLastLine(string) {
    const lines = string.split('\n');
    if (lines.length <= 1) {
      return '';
    } else {
      lines.pop();
      return lines.join('\n');
    }
  }

module.exports = { functions, actions }