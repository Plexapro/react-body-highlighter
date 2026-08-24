import { Muscle, IExerciseData } from '@plexapro/react-body-highlighter'

export type ViewMode = 'dual' | 'anterior' | 'posterior'
export type SelectionMode = 'multi' | 'single' | 'intensity'
export type CodeLanguage = 'typescript' | 'javascript'
export type CodeSnippetStyle = 'minimal' | 'full'

export interface ThemePalette {
  id: string
  name: string
  description: string
  bodyColor: string
  highlightColors: string[]
  borderColor: string
  borderWidth: number
  badgeColor: string
}

export interface ExtremityItemState {
  selected: boolean
  aspect: 'dorsal' | 'palmar' | 'plantar'
  color: string
  notes?: string
  severity?: number
}

export interface ExtremitiesState {
  leftHand: ExtremityItemState
  rightHand: ExtremityItemState
  leftFoot: ExtremityItemState
  rightFoot: ExtremityItemState
}

export interface SelectedMuscleDetail {
  muscle: Muscle
  label: string
  frequency: number
  category: string
  notes?: string
}

export interface PresetScenario {
  id: string
  title: string
  subtitle: string
  icon: 'ShieldAlert' | 'Flame' | 'Activity'
  badge: string
  badgeColor: string
  category: string
  description: string
  context: string
  data: IExerciseData[]
  recommendedColors: {
    bodyColor: string
    highlightColors: string[]
    borderColor: string
    borderWidth: number
  }
  metadata: Array<{ label: string; value: string }>
  caseStudyTitle?: string
  caseStudyText?: string
  extremities?: {
    leftHand?: Partial<ExtremityItemState>
    rightHand?: Partial<ExtremityItemState>
    leftFoot?: Partial<ExtremityItemState>
    rightFoot?: Partial<ExtremityItemState>
  }
}

export interface MuscleMetadataItem {
  slug: Muscle
  label: string
  category: 'Core & Torso' | 'Upper Extremities' | 'Lower Extremities' | 'Posterior Chain' | 'Head & Neck'
  description: string
  commonInjuries: string
}

export interface ActiveTooltipData {
  muscle: Muscle
  label: string
  category: string
  frequency: number
  notes?: string
  x: number
  y: number
}
