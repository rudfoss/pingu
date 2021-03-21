const toMillis = (hrtime: ReturnType<typeof process.hrtime>) => {
  const [seconds, nanoseconds] = hrtime
  const nanoInMilli = nanoseconds / 1000000
  return seconds * 1000 + (nanoInMilli | 0)
}

/**
 * Starts a timer that ticks every time it is called.
 * Returns the duration of the step and the total duration since started.
 */
export const createTimer = () => {
  const start = toMillis(process.hrtime())
  let last = start
  return () => {
    const next = toMillis(process.hrtime())
    const step = next - last
    const total = next - start
    last = next

    return {
      step,
      total,
      toString: () => `${step}/${total}`
    }
  }
}
