/**
Tests written for jest.
*/

import { ObservableMap } from "./ObservableMap"

describe("ObservableMap", () => {
	it("is defined", () => {
		expect(typeof ObservableMap).toBe("function")
	})
	describe("map interface", () => {
		it("get/set", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")

			expect(test.get("foo")).toBe("bar")
			expect(test.get("foobar")).toBe(42)
			expect(test.get(symbolKey)).toBe("this is a test")
			expect(test.get(symbolKey2)).toBe("this is also a test")
			expect(test.size).toBe(4)
		})
		it("has", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")

			expect(test.has("foo")).toBe(true)
			expect(test.has("foobar")).toBe(true)
			expect(test.has(symbolKey)).toBe(true)
			expect(test.has(symbolKey2)).toBe(true)

			expect(test.has("foo2")).toBe(false)
			expect(test.has("foobar2")).toBe(false)
		})
		it("getMap", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")

			expect(test.getMap(["foo"])).toEqual({
				foo: "bar"
			})
			expect(test.getMap(["foo", symbolKey2])).toEqual({
				foo: "bar",
				[symbolKey2]: "this is also a test"
			})
			expect(test.getMap()).toEqual({
				foo: "bar",
				foobar: 42,
				[symbolKey]: "this is a test",
				[symbolKey2]: "this is also a test"
			})
		})

		it("keys", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")

			expect(Array.from(test.keys())).toEqual(["foo", "foobar", symbolKey, symbolKey2])
		})
		it("values", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")

			expect(Array.from(test.values())).toEqual(["bar", 42, "this is a test", "this is also a test"])
		})
		it("keys", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")

			expect(Array.from(test.entries())).toEqual([
				["foo", "bar"],
				["foobar", 42],
				[symbolKey, "this is a test"],
				[symbolKey2, "this is also a test"]
			])
		})
		it("forEach", () => {
			const test = new ObservableMap()
			const symbolKey = Symbol("bork")
			const symbolKey2 = Symbol("bork")
			const callbackMock = jest.fn()

			test.set("foo", "bar")
			test.set("foobar", 42)
			test.set(symbolKey, "this is a test")
			test.set(symbolKey2, "this is also a test")
			test.forEach(callbackMock)

			expect(callbackMock.mock.calls.length).toBe(4)
			expect(callbackMock.mock.calls[0][0]).toBe("bar")
			expect(callbackMock.mock.calls[0][1]).toBe("foo")
			expect(callbackMock.mock.calls[0][2]).toBe(test)

			expect(callbackMock.mock.calls[1][0]).toBe(42)
			expect(callbackMock.mock.calls[1][1]).toBe("foobar")
			expect(callbackMock.mock.calls[1][2]).toBe(test)

			expect(callbackMock.mock.calls[2][0]).toBe("this is a test")
			expect(callbackMock.mock.calls[2][1]).toBe(symbolKey)
			expect(callbackMock.mock.calls[2][2]).toBe(test)

			expect(callbackMock.mock.calls[3][0]).toBe("this is also a test")
			expect(callbackMock.mock.calls[3][1]).toBe(symbolKey2)
			expect(callbackMock.mock.calls[3][2]).toBe(test)
		})

		it("clear", () => {
			const test = new ObservableMap()

			test.setMany({
				foo: 42,
				bar: true,
				foobar: {
					sub: true
				}
			})

			expect(test.size).toBe(3)
			test.clear()
			expect(test.size).toBe(0)
		})
		it("setMany", () => {
			const test = new ObservableMap()

			test.setMany({
				foo: 42,
				bar: true,
				foobar: {
					sub: true
				}
			})

			expect(test.get("foo")).toBe(42)
			expect(test.get("bar")).toBe(true)
			expect(test.get("foobar")).toEqual({
				sub: true
			})
			expect(test.size).toBe(3)
		})
		it("delete", () => {
			const test = new ObservableMap()
			test.setMany({
				foo: 42,
				bar: true,
				foobar: {
					sub: true
				}
			})

			expect(test.size).toBe(3)
			expect(test.delete("foo")).toBe(true)
			expect(test.delete("foo")).toBe(false)
			expect(test.size).toBe(2)
		})
		it("deleteMany", () => {
			const test = new ObservableMap()
			test.setMany({
				foo: 42,
				bar: true,
				foobar: {
					sub: true
				}
			})

			expect(test.size).toBe(3)
			expect(test.deleteMany(["foo", "bar"]))
			expect(test.size).toBe(1)
		})
	})
})
