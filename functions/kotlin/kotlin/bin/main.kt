package openwhisk

import io.javalin.Javalin
import com.fasterxml.jackson.annotation.JsonIgnoreProperties

data class InputObject(val phone: String  = "", val subject: String  = "")
@JsonIgnoreProperties(ignoreUnknown = true)
data class InputFunction(val input: InputObject = InputObject())
@JsonIgnoreProperties(ignoreUnknown = true)
data class InputBody(val value: InputFunction = InputFunction())

data class OutputObject(val phone: String = "", val subject: String = "", val ok: Boolean = true)
data class OutputFunction(val outputsendtextmessage: OutputObject = OutputObject())

fun main(args: Array<String>) {
    val app = Javalin.create().apply {
        port(8080)
        exception(Exception::class.java) { e, ctx -> e.printStackTrace() }
    }.start()

    app.post("/init") { ctx -> ctx.status(200) }

    app.post("/run") { ctx ->
        val body = ctx.bodyAsClass(InputBody::class.java)
        val inputFunction = body.value
        val inputObject = inputFunction.input
        val phone = inputObject.phone
        val subject = inputObject.subject

        // real implementation goes here

        val outputObject = OutputObject(phone, subject)
        val outputFunction = OutputFunction(outputObject)

        ctx.json(outputFunction)
        ctx.status(200)
    }
}


/* Input: Sample JSON and Schema

{
    "phone": "+4900000000",
    "subject": "Hello"
}

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "phone": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    }
  },
  "title": "Schema Input of send-text-message"
}

*/

/* Output: Sample JSON and Schema

{
    "ok": true,
    "phone": "+4900000000",
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
  "title": "Schema Output of send-text-message"
}

*/