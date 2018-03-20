const jsonata = require('jsonata');

let main = params => {   
    try {
        let inputApplication = params['input-application'];       
        let subject = inputApplication.subject;
        
        let outputReadPersonProfile = params['output-read-person-profile'];  
             
        let expression = jsonata("email[type='office'].address[0]");        
        let email = expression.evaluate(outputReadPersonProfile);          
        
        let outputParameters = {
            'input': {
                'email': email,
                'subject': subject
            }
        }        
        
        return outputParameters;
    }
    catch (error) {        
        return {
            error: 'Error in transform-send-mail'
        }
    }
}

exports.main = main;