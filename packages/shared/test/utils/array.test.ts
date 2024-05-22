import { expect, it } from 'vitest'
import { create } from '../../src/utils'

it('create array', () => {
  expect(create(4)).toStrictEqual([0, 1, 2, 3])
})

it('create array with formatter', () => {
  expect(create(4, idx => idx! * 2)).toStrictEqual([0, 2, 4, 6])
})
