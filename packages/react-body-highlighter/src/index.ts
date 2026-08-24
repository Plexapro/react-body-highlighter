// Main Package Entry Point (@plexapro/react-body-highlighter)

// Assets
export { anteriorData, posteriorData } from './assets'

// Components
export { default as Model } from './components/Model'
export { default as BodyModel } from './components/Model'
export { default as BodyVisualizer } from './components/BodyVisualizer'
export { HandSvg, default as HandModel } from './components/HandSvg'
export { FootSvg, default as FootModel } from './components/FootSvg'

// Default Export
export { default } from './components/Model'

// Constants
export {
  DEFAULT_BODY_COLOR,
  DEFAULT_HIGHLIGHTED_COLORS,
  DEFAULT_MODEL_TYPE,
  DEFAULT_MUSCLE_DATA
} from './constants'

// Types
export {
  MuscleType,
  ModelType,
  type Muscle,
  type ModelTypeKey,
  type IExerciseData,
  type IMuscleData,
  type IMuscleStats,
  type IBodyPart,
  type ISmallBodyPart,
  type ISVGModelData,
  type IModelProps,
  type BodyModelProps,
  type HandSvgProps,
  type HandModelProps,
  type FootSvgProps,
  type FootModelProps,
  type BodyPartSelection,
  type BodyVisualizerProps
} from './types'

// Utilities
export {
  ensure,
  fillIntensityColor,
  fillMuscleData,
  dedupeBodyParts,
  normalizeBodyParts
} from './utils'
