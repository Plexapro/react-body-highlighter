import { CSSProperties, ReactNode } from 'react'

export const MuscleType = {
  TRAPEZIUS: 'trapezius',
  LEFT_TRAPEZIUS: 'left-trapezius',
  RIGHT_TRAPEZIUS: 'right-trapezius',
  UPPER_BACK: 'upper-back',
  LEFT_UPPER_BACK: 'left-upper-back',
  RIGHT_UPPER_BACK: 'right-upper-back',
  LOWER_BACK: 'lower-back',
  LEFT_LOWER_BACK: 'left-lower-back',
  RIGHT_LOWER_BACK: 'right-lower-back',
  CHEST: 'chest',
  LEFT_CHEST: 'left-chest',
  RIGHT_CHEST: 'right-chest',
  BICEPS: 'biceps',
  LEFT_BICEPS: 'left-biceps',
  RIGHT_BICEPS: 'right-biceps',
  TRICEPS: 'triceps',
  LEFT_TRICEPS: 'left-triceps',
  RIGHT_TRICEPS: 'right-triceps',
  FOREARM: 'forearm',
  LEFT_FOREARM: 'left-forearm',
  RIGHT_FOREARM: 'right-forearm',
  BACK_DELTOIDS: 'back-deltoids',
  LEFT_BACK_DELTOIDS: 'left-back-deltoids',
  RIGHT_BACK_DELTOIDS: 'right-back-deltoids',
  FRONT_DELTOIDS: 'front-deltoids',
  LEFT_FRONT_DELTOIDS: 'left-front-deltoids',
  RIGHT_FRONT_DELTOIDS: 'right-front-deltoids',
  ABS: 'abs',
  LEFT_ABS: 'left-abs',
  RIGHT_ABS: 'right-abs',
  OBLIQUES: 'obliques',
  LEFT_OBLIQUES: 'left-obliques',
  RIGHT_OBLIQUES: 'right-obliques',
  ADDUCTOR: 'adductor',
  LEFT_ADDUCTOR: 'left-adductor',
  RIGHT_ADDUCTOR: 'right-adductor',
  ABDUCTOR: 'adductor',
  LEFT_ABDUCTOR: 'left-adductor',
  RIGHT_ABDUCTOR: 'right-adductor',
  ABDUCTORS: 'abductors',
  LEFT_ABDUCTORS: 'left-abductors',
  RIGHT_ABDUCTORS: 'right-abductors',
  HAMSTRING: 'hamstring',
  LEFT_HAMSTRING: 'left-hamstring',
  RIGHT_HAMSTRING: 'right-hamstring',
  QUADRICEPS: 'quadriceps',
  LEFT_QUADRICEPS: 'left-quadriceps',
  RIGHT_QUADRICEPS: 'right-quadriceps',
  CALVES: 'calves',
  LEFT_CALVES: 'left-calves',
  RIGHT_CALVES: 'right-calves',
  LEFT_SHINS: 'left-shins',
  RIGHT_SHINS: 'right-shins',
  GLUTEAL: 'gluteal',
  LEFT_GLUTEAL: 'left-gluteal',
  RIGHT_GLUTEAL: 'right-gluteal',
  HEAD: 'head',
  NECK: 'neck',
  LEFT_NECK: 'left-neck',
  RIGHT_NECK: 'right-neck',
  KNEES: 'knees',
  LEFT_KNEES: 'left-knees',
  RIGHT_KNEES: 'right-knees',
  LEFT_SOLEUS: 'left-soleus',
  RIGHT_SOLEUS: 'right-soleus',
  ANKLES: 'ankles',
  LEFT_ANKLE: 'left-ankle',
  RIGHT_ANKLE: 'right-ankle'
} as const

export type Muscle = (typeof MuscleType)[keyof typeof MuscleType]

export const ModelType = {
  POSTERIOR: 'posterior',
  ANTERIOR: 'anterior'
} as const

export type ModelTypeKey = (typeof ModelType)[keyof typeof ModelType]
export type ModelType = ModelTypeKey

export interface IExerciseData {
  name: string
  muscles: Muscle[] | string[]
  frequency?: number
}

export interface IMuscleData {
  exercises: string[]
  frequency: number
}

export interface IMuscleStats {
  muscle: Muscle
  data: IMuscleData
}

export interface IBodyPart {
  name: string
  type: 'anterior' | 'posterior'
  muscles: Muscle[] | string[]
  color?: string
}

export interface ISmallBodyPart {
  name: string
  muscles: Muscle[] | string[]
  color?: string
}

export interface ISVGModelData {
  muscle: Muscle
  svgPoints: string[]
}

export interface IModelProps {
  data?: (IExerciseData | IBodyPart)[]
  type?: ModelTypeKey
  bodyColor?: string
  highlightedColors?: string[]
  borderColor?: string
  borderWidth?: number | string
  style?: CSSProperties
  svgStyle?: CSSProperties
  className?: string
  onClick?: ((exercise: IMuscleStats) => void) | (() => void)
  onHover?: (exercise: IMuscleStats | null) => void
  renderTooltip?: (exercise: IMuscleStats) => ReactNode
}

export type BodyModelProps = IModelProps

export interface HandSvgProps {
  position?: 'left' | 'right'
  color?: string
  borderColor?: string
  borderWidth?: number | string
  width?: number | string
  height?: number | string
  sizing?: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
  theme?: 'light' | 'dark'
}

export type HandModelProps = HandSvgProps

export interface FootSvgProps {
  position?: 'left' | 'right'
  color?: string
  borderColor?: string
  borderWidth?: number | string
  width?: number | string
  height?: number | string
  sizing?: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
  theme?: 'light' | 'dark'
}

export type FootModelProps = FootSvgProps

export interface BodyPartSelection {
  muscle: Muscle
  label?: string
  color?: string
  type?: 'anterior' | 'posterior' | 'hands' | 'foot'
  side?: 'left' | 'right' | 'both'
}

export interface BodyVisualizerProps {
  frontBodyPart?: IBodyPart[]
  backBodyPart?: IBodyPart[]
  handsPart?: ISmallBodyPart[]
  footPart?: ISmallBodyPart[]
  selectedParts?: Array<{ muscle: Muscle; label?: string; color?: string }>
  onPartClick?: (muscle: Muscle) => void
  isDisabled?: boolean
  showSideLabels?: boolean
  showExtremities?: boolean
  size?: 'default' | 'compact'
  bodyColor?: string
  highlightColor?: string
  highlightedColors?: string[]
  borderColor?: string
  borderWidth?: number | string
  className?: string
  style?: CSSProperties
  handleChange?: (data: IMuscleStats, type: string, smallMuscle?: string) => void
}
