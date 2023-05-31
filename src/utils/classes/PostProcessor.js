const { Section } = requie('./section')

global.currentSection = Section

//this function may be incorrect, have to check again 
global.isToolChangeNeeded = function (section = currentSection , arguments) {
    if (typeof section !== 'Section' && typeof arguments !== 'string') {
        throw new Error('Please enter valid arguments')
    }
    return false // there is no logic just return false
    
}

module.exports = { currentSection }