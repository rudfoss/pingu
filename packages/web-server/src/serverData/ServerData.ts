import { DehydratedState } from "react-query/hydration"

/**
 * Shared data between the server and client.
 */
export interface ServerData {
	reactQueryCache?: DehydratedState
}
