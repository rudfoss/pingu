import seedrandom from "seedrandom"
import { v4 as guid } from "uuid"

/**
 * Returns a buffer of random bytes of the specified length. Given the same seed
 * will allways produce the same set of bytes.
 * @param seed
 * @param length
 */
export const getPseudoRandomBytes = (seed: string, length: number) => {
	if (length < 1) throw new Error("Length must be at least 1")
	const rnd = seedrandom(seed)
	const byteBuffer = Buffer.alloc(length)
	while (length-- > 0) {
		byteBuffer[length] = Buffer.from([(rnd() * 100000) | 0])[0]
	}
	return byteBuffer
}

/**
 * Generates a guid based on a seed string. Given the same seed will generate the same GUID.
 * @param seed
 * @returns
 */
export const generateGuid = (seed: string) => {
	return guid({
		random: getPseudoRandomBytes(seed, 16)
	})
}
