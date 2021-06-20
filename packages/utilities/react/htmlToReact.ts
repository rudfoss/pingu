import React from "react"

let domParser: DOMParser

const extractDOMAttributes = (node: Element) => {
	const attrs: { [key: string]: string } = {}
	for (const anAttribute of node.attributes) {
		attrs[anAttribute.name] = anAttribute.value
	}
	return attrs
}

/**
 * Uses built in DOMParser (IE11+) to convert an html/xml string with children into a react element
 * @param htmlString
 * @param type
 * @param additionalRootProps
 */
export const htmlToReact = <TType = React.ReactElement>(
	htmlString: string,
	type: any = "text/html", // Real type DOMParserSupportedType, does not build
	additionalRootProps: object = {},
	process?: (rootNode: Element, document: Document) => void
): TType => {
	domParser = domParser || new DOMParser()
	const doc = domParser.parseFromString(htmlString, type)
	const rootNode = doc.documentElement

	if (process) {
		process(rootNode, doc)
	}

	const attributes = extractDOMAttributes(rootNode)
	return React.createElement(rootNode.nodeName, {
		...attributes,
		...additionalRootProps,
		dangerouslySetInnerHTML: { __html: rootNode.innerHTML }
	}) as any
}
