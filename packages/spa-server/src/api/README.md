# APIs

In `spa-server` each API is intended to provide dynamic data to the `spa-client`. Because of this there is an implicit tight coupling between the client and the server. The client needs to know how to fetch data and what it will look like. To resolve this the spa-server provides everything the client needs directly from itself wrapped in handy react hooks on top of `react-query`. This means that server data is owned and managed entirely by the server and the client can simply use the hooks to fetch data without any other information.

To set up server data in a react app wrap the react tree in `<ServerData>` like this:

