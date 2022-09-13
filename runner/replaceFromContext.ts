import { Step } from '@bdd-markdown/parser'
import { replacePlaceholders } from './replaceFromExamples'

export const replaceFromContext =
	(context: Record<string, any>) =>
	(step: Step): Step => {
		const replaced = {
			...step,
			title: replacePlaceholders(step.title, context),
		}
		if (step.codeBlock !== undefined) {
			replaced.codeBlock = {
				...step.codeBlock,
				code: replacePlaceholders(step.codeBlock.code, context),
			}
		}
		return replaced
	}
