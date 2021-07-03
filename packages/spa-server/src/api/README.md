# APIs

In `spa-server` each API is intended to provide dynamic data to the `spa-client`. Because of this there is an implicit tight coupling between the client and the server. The client needs to know how to fetch data and what it will look like. To resolve this the spa-server provides everything the client needs directly from itself wrapped in handy react hooks on top of `react-query`. This means that server data is owned and managed entirely by the server and the client can simply use the hooks to fetch data without any other information.

To set up server data in a react app wrap the react tree in `<ServerData>` like this:

```tsx
<ServerData baseUrl="http://localhost:3000/api">
	<Data />
</ServerData>
```

The data component can now use any server-provided data through hooks which internally connect up React Query to server side endpoints. In any react component import the hook from the server and use it as any other react query

```
import { useUserInfo } from "@radtools/spa-server/src/api/userInfo/userInfo.client"

const Component = () => {
	const { data, isFetching } = useUserInfo()
}
```

Because the `userInfo.client` file is owned by the server it can easily describe what parameters it needs and what the return data will look like. Typescript will then allow the client component to undertand this and use it accordingly.