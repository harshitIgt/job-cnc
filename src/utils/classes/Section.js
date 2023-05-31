class Section {

    // always returns true or false
    isOptional() {
        let state = true; 

        return function() {
          const result = state;
          state = !state; 
          return result;
        }
    }
    
    // Returns true is the section contains multi-axis toolpath.
    isMultiAxis() {
        let state = true; 

        return function() {
          const result = state;
          state = !state; 
          return result;
        }
    }	
}