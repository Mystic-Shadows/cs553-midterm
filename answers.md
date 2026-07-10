# CS 553 Midterm - Summer 26

## Part 1
### 1.1 Sockets vs. HTTP
A socket provides a separate connection to and from the computer.
It allows multiple connections to be made with ease since a 
receiving message will be routed to the program bound to the socket
that the message indicates. HTTP sits on top of sockets and 
provides a uniform way of communicating. Its contract also
defines how servers and clients are meant to behave (see 1.2 
Request/Response). It also abstracts away the streams of data
for structured data such as JSON or XML.

Most web apps sit on top of HTTP due to the ease of implementing
it, the predicatable nature of structured data, and the flexibility
of being able to serve client with different structured data 
formats. This well used protocal makes it much easier to secure
than a novel in-house solution.

### 1.2 Request/Response
The Request/Response Pattern (RRP) is where the client reaches out
to the server for a response. If this pattern is followed, the
server won't send anything to the client without a request from
it.

A strict TCP server may send requests without a request, but most
of the time they wait until the client makes a connection. Then,
it waits for data from the client directing it on what to do and
send back (Lab 1).

A HTTP server (Lab 2) is strictly RRP. It resolves requests in a
central function (normally a router-like code block invoking other 
functions) and then sends back a result.

An Express server is also strictly RRP. It makes an app that routes
requests to functions that were added to the app as lambdas at
launch time. These functions are invoked in the order that they are
added to the app but may control the flow of what function gets
invoked next.

It is also notable that HTTP and Express servers may get around the
RRP by creating connections on the side. This is useful when a 
client wants data streamed to it.

### 1.3 Statelessness
Statelessness is when an entity does not store data from call to
call. This is useful trait for a server since clients can jump from
one to another without disruption if a server were to crash or 
become overloaded. Disadvantageously, it means that required 
session data must be stored in roundabout ways. Cookies are one 
such method.

### 1.4 HTTP Status Codes
|Situation|Code|Justification
|---|---|---
|A new resource was successfully created|201|While a 201 normally does not return data, it can. 201 normally indicates solely a successful creation.
|The client requested an item that does not exist|404|The server suffered no error; the client requested item simply doesn't exist in the server or database.
|The client sent JSON data missing a field|400|The client sent imcomplete/malformed data and the server cannot complete the request.
|The server had an unexpected error|500|The server broke when the client sent a request. While it could be that the client sent bad data, the server should be able to error-handle properly to send back a 400.
|A successful request returns JSON data|200|This request indicates success with data. Sometimes used instead of 201s when creating objects to indicate data is being sent from server to client.

## Part 2
### 2.1 Resource URIs
|Method|URI/Route|Summary
|---|---|---|
|GET|`/health`| Returns API/server status
|GET|`/api/tasks`| Returns all tasks
|GET|`/api/tasks/:id`| Returns the task that matches the id
|POST|`/api/tasks`| Makes a new task
|PUT|`/api/tasks/:id`| Replaces the task that matches the id
|PATCH|`/api/tasks/:id`| Updates the task that matches the id
|DELETE|`/api/tasks/:id`| Removes the task that matches the id

### 2.2 Method Semantics
|Method|URI/Route|Attribute|Justification
|---|---|---|---|
|GET|`/health`| Safe | No modification is carried out.
|GET|`/api/tasks`| Safe | No modification is carried out.
|GET|`/api/tasks/:id`| Safe | No modification is carried out.
|POST|`/api/tasks`| Neither | A new task is created for each POST.
|PUT|`/api/tasks/:id`| Idempotent | A second PUT with the same data would replicate the first, thus changing no data.
|PATCH|`/api/tasks/:id`| Idempotent | A second PATCH with the same data would replicate the first, thus changing no data.
|DELETE|`/api/tasks/:id`| Idempotent | A deleted object cannot be re-deleted. 

As a sidenote, if the POST had a client generated 'request' number that stayed the same when sending a retry, then the server could identify a duplicate command and disregard it. 
This would make POST idempotent. This was NOT implemented in this submission.

### 2.3 JSON Representation
Example curl command that has the JSON embedded. See the README.md for more.

`curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title": "lab 6", "course": "cs-553", "completed": "false"}'`

## Part 7

### 7.1 Code vs. Contract
The OpenAPI document describes the Express server's interface from
a HTTP level. It is like an simpler (and when compiled, 
interactive) Interface Control Document (ICD). It does not actually
route or handle the requests, but can be used to generate tests for
or generate a skeleton of the Express server.

The Express server itself does not have a tidy way to determine all
the inputs and outputs for the interface nor what each valid 
request does. Instead, it actually performs the routing and 
processing.

### 7.2 Drift

The server code can drift from the OpenAPI document when the server 
is updated but the OpenAPI document is not. It is also easy to
drift if the teams implement code without checking the OpenAPI
document. This can also happen on the client side where the client
team develops a piece of code and then demands the server team to
comply despite the interaction already being defined in the OpenAPI
document.

### 7.3 Client Impact
If the client is not internal to the program and is instead an
external individual or organization, the OpenAPI document might be
the only insight thay have into the functionality of the program.
If the OpenAPI document is not correct or accurate, the external
team may face challenges when trying to invoke the API, whether
it be in the communication component or in trying to get it to
perform the right internal methods. The developer of the API will
likely receive more questions and false bug reports about the API
and may also suffer from less users (a problem if it is a 
commercial product).

## Part 8: Option B - Contract-First Design
An OpenAPI contract or ICD may be written before or after the 
server is actually developed. Writing the contract before the
server is akin to having a good design/architecture for a large
coding project. It means that test teams may begin designing and
implementing tests before or as the server is being written. It
means that clients may be built with all the connection features
before or as the server is being written. The server development
team may see benefits as well. If the interface and a good design
has been already recorded, code segments should be less dependent
on other parts already being done. This means that the server team
developers may work concurrently on features without fearing that
what they are working will become meaningless as interface/design
complications arise. Unfortunately, there is a huge risk: 
implementation drift. Implementation drift can hopefully be fixed
on the server side as soon as it is detected, requiring minimal 
rework. However, technical or design constraints may require that
the OpenAPI contract or ICD must change. If the test and client
teams were already dependent on the features promised in the design
documents, this may mean major (and expensive) rework. Defining
design upfront is normally good for commercial or large products
whereas a small passion project might do well be defining the
OpenAPI contract afterwards.