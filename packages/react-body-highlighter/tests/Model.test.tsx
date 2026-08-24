import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Model from '../src/components/Model'
import { IExerciseData, IMuscleStats, ModelType } from '../src/types'

describe('Model Component', () => {
  it('renders anterior view by default', () => {
    const { container } = render(<Model />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 100 200')
    expect(screen.getByTestId('model-anterior')).toBeInTheDocument()
  })

  it('renders posterior view when type="posterior"', () => {
    render(<Model type={ModelType.POSTERIOR} />)
    expect(screen.getByTestId('model-posterior')).toBeInTheDocument()
  })

  it('renders polygons for all anterior muscles', () => {
    render(<Model type={ModelType.ANTERIOR} />)
    const chestPolygons = screen.getAllByTestId('muscle-chest')
    expect(chestPolygons.length).toBeGreaterThanOrEqual(1)
    const headPolygon = screen.getByTestId('muscle-head')
    expect(headPolygon).toBeInTheDocument()
  })

  it('renders polygons for all posterior muscles', () => {
    render(<Model type={ModelType.POSTERIOR} />)
    const trapeziusPolygons = screen.getAllByTestId('muscle-trapezius')
    expect(trapeziusPolygons.length).toBeGreaterThanOrEqual(1)
    const glutealPolygons = screen.getAllByTestId('muscle-gluteal')
    expect(glutealPolygons.length).toBeGreaterThanOrEqual(1)
  })

  it('applies default bodyColor when no muscles are active', () => {
    render(<Model bodyColor='#B6BDC3' />)
    const headPolygon = screen.getByTestId('muscle-head')
    expect(headPolygon).toHaveStyle({ fill: '#B6BDC3' })
  })

  it('applies highlighted color based on exercise frequency', () => {
    const data: IExerciseData[] = [
      { name: 'Bench Press', muscles: ['chest', 'front-deltoids'], frequency: 1 },
      { name: 'Pushups', muscles: ['chest'], frequency: 1 }
    ]
    render(
      <Model
        type={ModelType.ANTERIOR}
        data={data}
        highlightedColors={['#81b1d9', '#277abf']}
      />
    )
    const chestPolygons = screen.getAllByTestId('muscle-chest')
    // Frequency is 2, so second highlightedColor should be applied
    expect(chestPolygons[0]).toHaveStyle({ fill: '#277abf' })

    const frontDelts = screen.getAllByTestId('muscle-front-deltoids')
    // Frequency is 1, so first highlightedColor should be applied
    expect(frontDelts[0]).toHaveStyle({ fill: '#81b1d9' })
  })

  it('supports explicit color in data item', () => {
    const data = [
      { name: 'Custom Chest', muscles: ['chest'], color: '#ff0055' }
    ]
    render(<Model type={ModelType.ANTERIOR} data={data} />)
    const chestPolygons = screen.getAllByTestId('muscle-chest')
    expect(chestPolygons[0]).toHaveStyle({ fill: '#ff0055' })
  })

  it('fires onClick callback with muscle stats when polygon is clicked', () => {
    const handleClick = vi.fn()
    const data: IExerciseData[] = [
      { name: 'Squats', muscles: ['quadriceps'], frequency: 3 }
    ]
    render(<Model type={ModelType.ANTERIOR} data={data} onClick={handleClick} />)

    const quadPolygon = screen.getAllByTestId('muscle-quadriceps')[0]
    fireEvent.click(quadPolygon)

    expect(handleClick).toHaveBeenCalledTimes(1)
    const callbackArg: IMuscleStats = handleClick.mock.calls[0][0]
    expect(callbackArg.muscle).toBe('quadriceps')
    expect(callbackArg.data.frequency).toBe(3)
    expect(callbackArg.data.exercises).toContain('Squats')
  })

  it('fires onHover callback on mouse enter and leave', () => {
    const handleHover = vi.fn()
    render(<Model type={ModelType.ANTERIOR} onHover={handleHover} />)

    const head = screen.getByTestId('muscle-head')
    fireEvent.mouseEnter(head)
    expect(handleHover).toHaveBeenCalledWith(
      expect.objectContaining({
        muscle: 'head'
      })
    )

    fireEvent.mouseLeave(head)
    expect(handleHover).toHaveBeenCalledWith(null)
  })

  it('renders tooltip when renderTooltip prop is provided and polygon is hovered', () => {
    render(
      <Model
        type={ModelType.ANTERIOR}
        renderTooltip={(stats) => <div>Tooltip: {stats.muscle}</div>}
      />
    )

    expect(screen.queryByTestId('rbh-tooltip')).not.toBeInTheDocument()

    const head = screen.getByTestId('muscle-head')
    fireEvent.mouseEnter(head)

    expect(screen.getByTestId('rbh-tooltip')).toBeInTheDocument()
    expect(screen.getByText('Tooltip: head')).toBeInTheDocument()

    fireEvent.mouseLeave(head)
    expect(screen.queryByTestId('rbh-tooltip')).not.toBeInTheDocument()
  })

  it('applies custom border styling', () => {
    render(<Model borderColor='#333333' borderWidth={2} />)
    const head = screen.getByTestId('muscle-head')
    expect(head).toHaveStyle({ stroke: '#333333', strokeWidth: '2' })
  })

  it('does not throw when clicked or hovered without callback props', () => {
    render(<Model type={ModelType.ANTERIOR} />)
    const head = screen.getByTestId('muscle-head')
    expect(() => {
      fireEvent.click(head)
      fireEvent.mouseEnter(head)
      fireEvent.mouseLeave(head)
    }).not.toThrow()
  })

  it('renders custom className and style', () => {
    const { container } = render(
      <Model className='custom-model-class' style={{ margin: '10px' }} />
    )
    const wrapper = container.querySelector('.rbh-wrapper')
    expect(wrapper).toHaveClass('custom-model-class')
    expect(wrapper).toHaveStyle({ margin: '10px' })
  })

  it('handles empty or malformed data gracefully', () => {
    const malformedData = [
      null,
      undefined,
      { name: 'Broken', muscles: ['invalid-slug' as any] }
    ]
    render(<Model data={malformedData as any} />)
    const head = screen.getByTestId('muscle-head')
    expect(head).toBeInTheDocument()
  })
})
