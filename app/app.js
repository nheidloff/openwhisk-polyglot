composer.try(
    composer.sequence(
        composer.seq(composer.retain('polyglot-demo-nh/transform-read-person-profile'), ({ params, result }) => Object.assign(params, result)),
        composer.seq(composer.retain('polyglot-demo-nh/read-person-profile'), ({ params, result }) => Object.assign(params, result)),
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
                composer.seq(composer.retain('polyglot-demo-nh/transform-send-mail'), ({ params, result }) => Object.assign(params, result)),
                composer.seq(composer.retain('polyglot-demo-nh/send-mail'), ({ params, result }) => Object.assign(params, result))
            ),
            composer.sequence(
                composer.seq(composer.retain('polyglot-demo-nh/transform-send-text-message'), ({ params, result }) => Object.assign(params, result)),
                composer.seq(composer.retain('polyglot-demo-nh/send-text-message'), ({ params, result }) => Object.assign(params, result))
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