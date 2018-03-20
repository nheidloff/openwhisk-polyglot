let main = params => {
    try {
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