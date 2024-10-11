export interface LLMProvider {
	name: string
	models: LLMModel[]
}

export interface LLMModel {
	displayName: string
	name: string
	cost: Cost
	default?: boolean
	generateImage?: boolean
	text?: boolean
	vision?: boolean
}

export interface Cost {
	incomingToken?: number
	completionToken?: number
}
