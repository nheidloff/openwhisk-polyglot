package docker;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Function {

	@RequestMapping(value="/init", method=RequestMethod.POST)	
	public ResponseEntity<String> get() {
	    return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value="/run", method=RequestMethod.POST)	
	public ResponseEntity<OutputFunction> get(@RequestBody InputBody inputBody) {
		InputFunction inputFunction = inputBody.getValue();
		InputObject inputObject = inputFunction.getInput();
		String email = inputObject.getEmail();
		String subject = inputObject.getSubject();	
		
		OutputFunction outputFunction = new OutputFunction();
		OutputObject outputObject = new OutputObject();
		System.out.println("subject " + subject);
		System.out.println("email " + email);
		
		if ((inputObject != null) && (email != null) && (subject != null)) {
			// real implementation goes here
			outputObject.setEmail(email);
			outputObject.setOk(true);
			outputObject.setSubject(subject);	
		}
		else {
			outputObject.setOk(false);
			outputObject.setEmail("");	
			outputObject.setSubject("");
		}
		outputFunction.setOutputsendmail(outputObject);
		
		HttpHeaders responseHeaders = setHeaders(outputObject);
		return new ResponseEntity<OutputFunction>(outputFunction, responseHeaders, HttpStatus.OK);
	}
	
	private HttpHeaders setHeaders(OutputObject outputObject) {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Content-Type", "application/json");
		
		// don't use this in production
		// this is a workaround since I didn't manage to convince Spring not to return "Transfer-Encoding: chunked"
		// see https://github.com/jthomas/ow/issues/2
		int size = 54;
		if (outputObject.isOk() == false) size++;
		int outputObjectStringLength = size + outputObject.getEmail().length() + outputObject.getSubject().length();
		responseHeaders.set(HttpHeaders.CONTENT_LENGTH, new Integer(outputObjectStringLength).toString());
		
		return responseHeaders;
	}
}


/* Input: Sample JSON and Schema

{
    "email": "abc@gmail.com",
    "subject": "Hello"
}

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    }
  },
  "title": "Schema Input of send-mail"
}

*/

/* Output: Sample JSON and Schema

{
    "ok": true,
    "email": "abc@gmail.com",
    "subject": "Hello"
}

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "ok": {
      "type": "boolean"
    },
    "email": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    }
  },
  "title": "Schema Output of send-mail"
}

*/