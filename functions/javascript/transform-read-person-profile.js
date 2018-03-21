let main = params => {
    try {
        console.log('transform-read-person-profile input');
        console.log(params);
        let subject = params.subject;
        let id = params.id;        

        let outputParameters = {
            'input': {
                'id': id
            },
            'input-application': {
                'id': id,
                'subject': subject
            }
        }
        console.log('transform-read-person-profile output');
        console.log(outputParameters);
        return outputParameters;
    }
    catch (error) {        
        return { // for testing purposes only
            'input': {
                'id': 'heidloff'
            },
            'input-application': {
                'id': id,
                'subject': subject
            }
        }
    }
}

exports.main = main;