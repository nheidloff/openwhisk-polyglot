let main = params => {   
    try {
        let inputApplication = params['input-application'];       
        let subject = inputApplication.subject;
        
        let outputReadPersonProfile = params['output-read-person-profile'];  
             
        let phone = outputReadPersonProfile['phone']; 
        
        let outputParameters = {
            'input': {
                'phone': phone,
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