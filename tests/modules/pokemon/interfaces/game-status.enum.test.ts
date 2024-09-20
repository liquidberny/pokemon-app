import { GameStatus } from "@pokemon/interfaces"

describe('GameStatus enum', () => {
    test('should have a value of "playing"',() => {
        expect(GameStatus.Playing).toBe('playing')
        expect(GameStatus.Won).toBe('won')
        expect(GameStatus.Lost).toBe('lost')

    })
})