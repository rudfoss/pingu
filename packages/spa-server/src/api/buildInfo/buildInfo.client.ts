import { useMemo } from "react"
import { useQuery } from "react-query"
import { useServerData } from "../../react/ServerData"
import { ResponseError } from "../../react/ResponseError"
import { concatUrls } from "@radtools/utilities/generic/concatUrls"
import { BuildInfo } from "./buildInfo"

const fetchBuildInfo = (baseUrl: string) => async (): Promise<BuildInfo> => {
	const response = await fetch(concatUrls([baseUrl, "buildInfo"]))
	if (!response.ok) {
		throw new ResponseError("Failed to fetch BuildInfo", response)
	}
	return await response.json()
}

export const useBuildInfo = () => {
	const { baseUrl } = useServerData()
	const fetcher = useMemo(() => fetchBuildInfo(baseUrl), [baseUrl])
	return useQuery<BuildInfo, ResponseError, BuildInfo>(["buildInfo"], fetchBuildInfo(baseUrl))
}