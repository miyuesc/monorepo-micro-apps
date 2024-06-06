import { describe, expect, it } from 'vitest'
import { has } from '@miyue-mma/shared'

describe('object', () => {
  describe('has path', () => {
    const fish = {
      name: 'Bass',
      weight: 8,
      sizes: [
        {
          maturity: 'adult',
          range: [7, 18],
          unit: 'inches',
        },
      ],
    }

    it('custom has with path string', () => {
      expect(has(fish, 'sizes[0].range[1]')).toBe(true)
      expect(has(fish, 'sizes.0.range.1')).toBe(true)
      expect(has(fish, 'sizes.1.range.1')).toBe(false)
      expect(has(fish, 'size')).toBe(false)
    })
  })
})
