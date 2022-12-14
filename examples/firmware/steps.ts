import assert from 'assert/strict'
import os from 'os'
import {
	noMatch,
	StepRunner,
	StepRunnerArgs,
	StepRunResult,
} from '../../runner/runStep.js'

export type FirmwareCIRunContext = {
	appVersion: string
	deviceId: string
	idScope: string
	deviceLog: string[]
}

export const steps: StepRunner<FirmwareCIRunContext>[] = [
	async ({
		step,
		context: { deviceLog },
	}: StepRunnerArgs<FirmwareCIRunContext>): Promise<StepRunResult> => {
		if (!/^the Firmware CI run device log should contain$/.test(step.title))
			return noMatch
		const shouldContain = step.codeBlock?.code.split(os.EOL) ?? []
		if (shouldContain.length === 0)
			throw new Error(`Must provide content to match against!`)

		for (const line of shouldContain) {
			try {
				assert.equal(
					deviceLog.find((s) => s.includes(line)) !== undefined,
					true,
				)
			} catch {
				throw new Error(`Device log does not contain "${line}"!`)
			}
		}
	},
]
