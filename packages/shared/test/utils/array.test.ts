import { describe, expect, it } from 'vitest'
import { create, flat, partition } from '../../src'

describe('array', () => {
  describe('create', () => {
    it('create array', () => {
      expect(create(4)).toStrictEqual([0, 1, 2, 3])
    })

    it('create array with formatter', () => {
      expect(create(4, idx => idx! * 2)).toStrictEqual([0, 2, 4, 6])
    })
  })

  describe('partition', () => {
    const arr = [0, 1, 2, 3]

    it('easy Split', () => {
      expect(partition(arr, i => i > 2)).toStrictEqual([[3], [0, 1, 2]])
    })

    it('multiple Split Conditions', () => {
      expect(partition(arr, i => i < 2, i => i > 0, i => i === 3)).toStrictEqual([
        [0, 1],
        [2, 3],
        [],
        [],
      ])
    })

    it('result not equal to original array', () => {
      expect(partition(arr, i => i > 2)).not.toBe(arr)
    })
  })

  describe('flat', () => {
    const tree = [
      {
        label: 1,
        child: [
          {
            label: 3,
            child: [
              { label: 7 },
              { label: 8 },
            ],
          },
          {
            label: 4,
            child: [
              { label: 9 },
              { label: 10 },
            ],
          },
        ],
      },
      {
        label: 2,
        child: [
          {
            label: 5,
            child: [
              { label: 11 },
              { label: 12 },
            ],
          },
          {
            label: 6,
            child: [
              { label: 13 },
              { label: 14 },
            ],
          },
        ],
      },
    ]

    it('normal Flat', () => {
      expect(flat(tree).length).toBe(2)
    })

    it('normal Flat With Special Key', () => {
      expect(flat(tree, { children: 'child' }).length).toBe(14)
    })

    it('normal Flat With Special Depth', () => {
      expect(flat(tree, { children: 'child', depth: 1 }).length).toBe(6)
    })

    it('normal Flat And Delete Children', () => {
      expect(flat(tree, { children: 'child', removeChildren: true })).toStrictEqual([
        { label: 1 },
        { label: 3 },
        { label: 7 },
        { label: 8 },
        { label: 4 },
        { label: 9 },
        { label: 10 },
        { label: 2 },
        { label: 5 },
        { label: 11 },
        { label: 12 },
        { label: 6 },
        { label: 13 },
        { label: 14 },
      ])
    })

    it('normal Flat With Special Depth And Delete Children', () => {
      expect(flat(tree, { children: 'child', depth: 1, removeChildren: true })).toStrictEqual([
        { label: 1 },
        { label: 3 },
        { label: 4 },
        { label: 2 },
        { label: 5 },
        { label: 6 },
      ])
    })
  })
})
