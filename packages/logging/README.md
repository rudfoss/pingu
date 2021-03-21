# pingu/logging

This project enables logging in the Pingu stack through winston and Application Insights. It provides a client and server package for ease of use and consistency.

## Server

The server package is intended to be used as a base logger that spawns descendants for different tasks. It comes with helper functions to set this up.

To set up using best-initial configuration use `setupAI` before importing the logger.

```typescript
import setupAI from "logging/server/setupAI"
setupAI() // Do this as early as possible.

import Logger from "logging/server"

// Create the base logger for your application.
const log = Logger.createAppLogger("myApp")

// Create a logger for http requets in express
app.use((req, res, next) => {
	req.log = log.newRequestLogger()
	next()
})

// Create a logger for a specific task:
const taskLog = logger.newTaskLogger("my task")
```