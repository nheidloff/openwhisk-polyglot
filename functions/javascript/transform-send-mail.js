const jsonata = require('jsonata');

let main = params => {   
    try {
        console.log('transform-send-mail input');
        console.log(params);
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
        
        console.log('transform-send-mail output');
        console.log(outputParameters);
        return outputParameters;
    }
    catch (error) {        
        return {
            error: 'Error in transform-send-mail'
        }
    }
}

exports.main = main;