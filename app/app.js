composer.try(
    composer.sequence(
        composer.task('polyglot-demo-nh/transform-read-person-profile', { merge: true }),
        composer.task('polyglot-demo-nh/read-person-profile', { merge: true }),
        composer.if(
            params => {
                let output = { value: true }
                let outputReadPersonProfile = params['output-read-person-profile'];
                if ((outputReadPersonProfile) && (outputReadPersonProfile['phone'] != '')) {
                    output['value'] = false;
                }                
                return output;
            },                        
            composer.sequence(
                composer.task('polyglot-demo-nh/transform-send-mail', { merge: true }),
                composer.task('polyglot-demo-nh/send-mail', { merge: true })
            ),
            composer.sequence(
                composer.task('polyglot-demo-nh/transform-send-text-message', { merge: true }),
                composer.task('polyglot-demo-nh/send-text-message', { merge: true })
            )
        )
    ),
    params => {
        return {
            ok: false,
            'message': 'An error has occured in the app send-notification application',
            'error-from-function': params.error
        }
    }
)