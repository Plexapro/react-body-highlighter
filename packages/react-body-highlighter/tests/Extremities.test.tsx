import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import FootSvg from '../src/components/FootSvg'
import HandSvg from '../src/components/HandSvg'

describe('Extremities Components', () => {
  describe('HandSvg', () => {
    it('renders left hand with default properties', () => {
      render(<HandSvg position='left' />)
      const hand = screen.getByTestId('hand-svg-left')
      expect(hand).toBeInTheDocument()
      expect(hand).toHaveAttribute('viewBox', '0 0 128 128')
      expect(hand).not.toHaveAttribute('transform')
    })

    it('renders right hand with inverted scale reflection', () => {
      render(<HandSvg position='right' />)
      const hand = screen.getByTestId('hand-svg-right')
      expect(hand).toBeInTheDocument()
      expect(hand).toHaveAttribute('transform', 'scale(-1, 1)')
    })

    it('applies custom fill color and stroke border', () => {
      const { container } = render(
        <HandSvg position='left' color='#00ff00' borderColor='#111111' borderWidth={2} />
      )
      const path = container.querySelector('path')
      expect(path).toHaveAttribute('fill', '#00ff00')
      expect(path).toHaveAttribute('stroke', '#111111')
    })

    it('handles click callback', () => {
      const handleClick = vi.fn()
      render(<HandSvg position='left' onClick={handleClick} />)
      const hand = screen.getByTestId('hand-svg-left')
      fireEvent.click(hand)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies dark theme background fill', () => {
      render(<HandSvg position='left' theme='dark' />)
      const hand = screen.getByTestId('hand-svg-left')
      expect(hand).toHaveAttribute('fill', '#374151')
    })
  })

  describe('FootSvg', () => {
    it('renders left foot with default properties', () => {
      render(<FootSvg position='left' />)
      const foot = screen.getByTestId('foot-svg-left')
      expect(foot).toBeInTheDocument()
      expect(foot).toHaveAttribute('viewBox', '0 0 491.365 491.365')
      expect(foot).not.toHaveAttribute('transform')
    })

    it('renders right foot with inverted scale reflection', () => {
      render(<FootSvg position='right' />)
      const foot = screen.getByTestId('foot-svg-right')
      expect(foot).toBeInTheDocument()
      expect(foot).toHaveAttribute('transform', 'scale(-1, 1)')
    })

    it('applies custom fill color and border', () => {
      const { container } = render(
        <FootSvg position='left' color='#ff5500' borderColor='#222222' borderWidth={1.5} />
      )
      const path = container.querySelector('path')
      expect(path).toHaveAttribute('fill', '#ff5500')
      expect(path).toHaveAttribute('stroke', '#222222')
    })

    it('handles click callback', () => {
      const handleClick = vi.fn()
      render(<FootSvg position='left' onClick={handleClick} />)
      const foot = screen.getByTestId('foot-svg-left')
      fireEvent.click(foot)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies dark theme background fill', () => {
      render(<FootSvg position='left' theme='dark' />)
      const foot = screen.getByTestId('foot-svg-left')
      expect(foot).toHaveAttribute('fill', '#374151')
    })
  })
})
