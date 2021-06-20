/**
 * Returns a random number between `min` and `max`
 * @param min
 * @param max
 * @returns
 */
export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
