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
	hasVision?: boolean
}

export interface Cost {
	incomingToken?: number
	completionToken?: number
}
