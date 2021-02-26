import { TransformableInfo } from "logform"

export interface LogMessage<
	TData extends Record<string, any> = Record<string, any>
> extends TransformableInfo {
	instanceId?: string
	requestId?: string
	taskName?: string
	data?: TData
	error?: Error
	time?: Date

	// These are specific to Application Insights
	operationId?: string
	parentId?: string
}
