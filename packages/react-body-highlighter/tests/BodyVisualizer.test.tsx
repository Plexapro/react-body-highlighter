import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import BodyVisualizer from '../src/components/BodyVisualizer'
import { IBodyPart, ISmallBodyPart, MuscleType } from '../src/types'

describe('BodyVisualizer Component', () => {
  const mockFront: IBodyPart[] = [
    { name: 'Chest Strain', type: 'anterior', muscles: [MuscleType.CHEST], color: '#ff4444' }
  ]
  const mockBack: IBodyPart[] = [
    { name: 'Lower Back Ache', type: 'posterior', muscles: [MuscleType.LOWER_BACK], color: '#ff8800' }
  ]
  const mockHands: ISmallBodyPart[] = [
    { name: 'Left Hand Contusion', muscles: ['left-hand'] }
  ]
  const mockFeet: ISmallBodyPart[] = [
    { name: 'Right Foot Sprain', muscles: ['right-foot'] }
  ]

  it('renders both Front and Back body models simultaneously', () => {
    render(<BodyVisualizer frontBodyPart={mockFront} backBodyPart={mockBack} />)
    expect(screen.getByTestId('model-anterior')).toBeInTheDocument()
    expect(screen.getByTestId('model-posterior')).toBeInTheDocument()
  })

  it('renders side labels by default', () => {
    render(<BodyVisualizer />)
    expect(screen.getByTestId('side-label-front-right')).toHaveTextContent('Right Side')
    expect(screen.getByTestId('side-label-front-left')).toHaveTextContent('Left Side')
    expect(screen.getByTestId('side-label-back-left')).toHaveTextContent('Left Side')
    expect(screen.getByTestId('side-label-back-right')).toHaveTextContent('Right Side')
  })

  it('hides side labels when showSideLabels={false}', () => {
    render(<BodyVisualizer showSideLabels={false} />)
    expect(screen.queryByTestId('side-label-front-right')).not.toBeInTheDocument()
    expect(screen.queryByTestId('side-label-front-left')).not.toBeInTheDocument()
  })

  it('renders extremity sections (hands and feet) by default', () => {
    render(<BodyVisualizer handsPart={mockHands} footPart={mockFeet} />)
    expect(screen.getByTestId('hand-button-left')).toBeInTheDocument()
    expect(screen.getByTestId('hand-button-right')).toBeInTheDocument()
    expect(screen.getByTestId('foot-button-left')).toBeInTheDocument()
    expect(screen.getByTestId('foot-button-right')).toBeInTheDocument()
  })

  it('hides extremity sections when showExtremities={false}', () => {
    render(<BodyVisualizer showExtremities={false} />)
    expect(screen.queryByTestId('hand-button-left')).not.toBeInTheDocument()
    expect(screen.queryByTestId('foot-button-left')).not.toBeInTheDocument()
  })

  it('renders active chips for front, back, hands, and feet', () => {
    render(
      <BodyVisualizer
        frontBodyPart={mockFront}
        backBodyPart={mockBack}
        handsPart={mockHands}
        footPart={mockFeet}
      />
    )
    expect(screen.getByTestId('front-chip')).toHaveTextContent('Chest Strain')
    expect(screen.getByTestId('back-chip')).toHaveTextContent('Lower Back Ache')
    expect(screen.getByTestId('hand-chip')).toHaveTextContent('Left Hand Contusion')
    expect(screen.getByTestId('foot-chip')).toHaveTextContent('Right Foot Sprain')
  })

  it('triggers handleChange and onPartClick when hand is clicked', () => {
    const handleChange = vi.fn()
    const handlePartClick = vi.fn()
    render(
      <BodyVisualizer
        handleChange={handleChange}
        onPartClick={handlePartClick}
      />
    )

    fireEvent.click(screen.getByTestId('hand-button-left'))
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ muscle: 'forearm' }),
      'hands',
      'left-hand'
    )
    expect(handlePartClick).toHaveBeenCalledWith('forearm')
  })

  it('triggers handleChange and onPartClick when foot is clicked', () => {
    const handleChange = vi.fn()
    const handlePartClick = vi.fn()
    render(
      <BodyVisualizer
        handleChange={handleChange}
        onPartClick={handlePartClick}
      />
    )

    fireEvent.click(screen.getByTestId('foot-button-right'))
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ muscle: 'calves' }),
      'foot',
      'right-foot'
    )
    expect(handlePartClick).toHaveBeenCalledWith('calves')
  })

  it('triggers handleChange and onPartClick when anterior body polygon is clicked', () => {
    const handleChange = vi.fn()
    const handlePartClick = vi.fn()
    render(
      <BodyVisualizer
        handleChange={handleChange}
        onPartClick={handlePartClick}
      />
    )

    const chest = screen.getAllByTestId('muscle-chest')[0]
    fireEvent.click(chest)

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ muscle: 'chest' }),
      'anterior'
    )
    expect(handlePartClick).toHaveBeenCalledWith('chest')
  })

  it('disables click handlers when isDisabled={true}', () => {
    const handleChange = vi.fn()
    const handlePartClick = vi.fn()
    render(
      <BodyVisualizer
        isDisabled={true}
        handleChange={handleChange}
        onPartClick={handlePartClick}
      />
    )

    fireEvent.click(screen.getByTestId('hand-button-left'))
    fireEvent.click(screen.getByTestId('foot-button-right'))

    expect(handleChange).not.toHaveBeenCalled()
    expect(handlePartClick).not.toHaveBeenCalled()
  })

  it('populates models using selectedParts convenience prop with label precedence', () => {
    render(
      <BodyVisualizer
        selectedParts={[
          { muscle: MuscleType.CHEST, label: 'Chest Area', color: '#123456' }
        ]}
      />
    )
    expect(screen.getByTestId('front-chip')).toHaveTextContent('Chest Area')
  })

  it('falls back to muscle slug when label is omitted in selectedParts', () => {
    render(
      <BodyVisualizer
        selectedParts={[
          { muscle: MuscleType.CHEST, color: '#123456' }
        ]}
      />
    )
    expect(screen.getByTestId('front-chip')).toHaveTextContent('chest')
  })
})
