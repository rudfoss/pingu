import { useMemo } from "react"
import { useQuery, UseQueryOptions } from "react-query"
import { useServerData } from "../../react/ServerData"
import { ResponseError } from "../ResponseError"
import { concatUrls } from "@radtools/utilities/generic/concatUrls"
import { BuildInfo } from "./buildInfo"

const fetchBuildInfo = (baseUrl: string) => async (): Promise<BuildInfo> => {
	const response = await fetch(concatUrls([baseUrl, "buildInfo"]))
	if (!response.ok) {
		throw new ResponseError("Failed to fetch BuildInfo", response)
	}
	return await response.json()
}

export const useBuildInfo = (options?: UseQueryOptions<BuildInfo, ResponseError, BuildInfo>) => {
	const { baseUrl } = useServerData()
	const fetcher = useMemo(() => fetchBuildInfo(baseUrl), [baseUrl])
	return useQuery<BuildInfo, ResponseError, BuildInfo>(["buildInfo"], fetcher, options)
}
