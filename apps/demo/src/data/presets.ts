import { PresetScenario } from '../types/showcase'

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'plexa-safety-incident',
    title: 'Workplace Safety / EHS Incident Report',
    subtitle: 'Plexa Construction Site Safety & Incident Tracking',
    icon: 'ShieldAlert',
    badge: 'Plexa EHS Verified',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    category: 'Construction & EHS Safety',
    description: 'Subcontractor worker slipped on wet scaffolding platform at Level 3, resulting in severe lower back lumbar strain, right forearm sprain, and left knee impact contusion.',
    context: 'Standard OSHA / SafeWork site incident record logged via mobile tablet in the field.',
    data: [
      {
        name: 'Lumbar Strain (Grade 2)',
        muscles: ['lower-back', 'left-lower-back', 'right-lower-back'],
        frequency: 9
      },
      {
        name: 'Right Forearm Sprain',
        muscles: ['right-forearm'],
        frequency: 7
      },
      {
        name: 'Left Patellar Contusion',
        muscles: ['left-knees'],
        frequency: 6
      },
      {
        name: 'Cervical Whiplash Tension',
        muscles: ['neck', 'left-trapezius'],
        frequency: 4
      }
    ],
    recommendedColors: {
      bodyColor: '#1e293b',
      highlightColors: ['#fde047', '#f97316', '#ef4444', '#b91c1c'],
      borderColor: '#475569',
      borderWidth: 1.5
    },
    metadata: [
      { label: 'OSHA Recordable', value: 'Yes (Incident #2026-9814)' },
      { label: 'Jobsite Location', value: 'Level 3 Scaffolding Bay B' },
      { label: 'Severity Level', value: 'High (Lost Time: 3 Days)' },
      { label: 'PPE Compliance', value: 'Hard Hat, High-Vis, Harness' },
      { label: 'Root Cause', value: 'Slip Hazard / Wet Morning Dew' }
    ],
    caseStudyTitle: 'How Plexa Streamlines EHS Incident Logging',
    caseStudyText: 'In Plexa Site Management, safety managers log worker incidents visually in under 15 seconds. Direct integration with worker compensation forms and OSHA logs reduces documentation friction by 80%.',
    extremities: {
      rightHand: {
        selected: true,
        aspect: 'dorsal',
        color: '#ef4444',
        notes: 'Right hand contusion & dorsal swelling from scaffolding grab impact',
        severity: 7
      },
      leftFoot: {
        selected: false,
        aspect: 'plantar',
        color: '#334155'
      }
    }
  },
  {
    id: 'gym-workout-fatigue',
    title: 'Gym Workout & Muscle Fatigue Tracker',
    subtitle: 'Push Day Hypertrophy & Volume Heatmap',
    icon: 'Flame',
    badge: 'Hypertrophy Track',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    category: 'Fitness & Athletic Recovery',
    description: 'Upper body push split focusing on pectoral overload, anterior deltoid engagement, and triceps lockout volume with core bracing.',
    context: 'Heavy compound session: Barbell Bench Press (5 sets), Incline DB Press (4 sets), Overhead Press (4 sets), Cable Triceps Pushdown (4 sets).',
    data: [
      {
        name: 'Barbell & Dumbbell Bench Press',
        muscles: ['chest', 'left-chest', 'right-chest'],
        frequency: 10
      },
      {
        name: 'Overhead Barbell Shoulder Press',
        muscles: ['front-deltoids', 'left-front-deltoids', 'right-front-deltoids'],
        frequency: 8
      },
      {
        name: 'Triceps Rope Pushdowns & Dips',
        muscles: ['triceps', 'left-triceps', 'right-triceps'],
        frequency: 7
      },
      {
        name: 'Core Bracing & Stabilization',
        muscles: ['abs', 'obliques'],
        frequency: 4
      }
    ],
    recommendedColors: {
      bodyColor: '#0f172a',
      highlightColors: ['#a7f3d0', '#34d399', '#10b981', '#059669'],
      borderColor: '#334155',
      borderWidth: 1.5
    },
    metadata: [
      { label: 'Session Type', value: 'Push Day (Hypertrophy)' },
      { label: 'Total Tonnage', value: '14,850 kg' },
      { label: 'Est. Recovery Time', value: '48 Hours' },
      { label: 'Primary Drivers', value: 'Pectoralis Major, Anterior Deltoids' },
      { label: 'Secondary Synergists', value: 'Triceps Brachii, Core' }
    ],
    caseStudyTitle: 'Automated Recovery & Volume Mapping',
    caseStudyText: 'Fitness and coaching platforms use this component to render real-time workout heatmaps, visually guiding athletes to avoid overtraining and optimize split programming.',
    extremities: {
      leftHand: {
        selected: false,
        aspect: 'palmar',
        color: '#334155'
      },
      rightHand: {
        selected: false,
        aspect: 'palmar',
        color: '#334155'
      }
    }
  },
  {
    id: 'telehealth-pain-map',
    title: 'Telehealth & Physical Therapy Pain Map',
    subtitle: 'Clinical Intake Visual Analogue Scale (VAS)',
    icon: 'Activity',
    badge: 'Clinical VAS 8/10',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    category: 'Healthcare & Physiotherapy',
    description: 'Patient intake evaluation for chronic postural cervical spine pain radiating into the left shoulder blade, paired with an acute lateral ankle inversion sprain.',
    context: 'Remote digital patient triage completed prior to initial orthopedic consultation.',
    data: [
      {
        name: 'Cervical Radiculopathy (VAS 8)',
        muscles: ['neck', 'left-neck'],
        frequency: 8
      },
      {
        name: 'Myofascial Trigger Points (VAS 6)',
        muscles: ['trapezius', 'left-trapezius', 'upper-back', 'left-upper-back'],
        frequency: 6
      },
      {
        name: 'Referred Posterior Shoulder Pain',
        muscles: ['back-deltoids', 'left-back-deltoids'],
        frequency: 5
      },
      {
        name: 'Acute Lateral Ankle Inversion Sprain (VAS 9)',
        muscles: ['left-ankle', 'left-shins'],
        frequency: 9
      }
    ],
    recommendedColors: {
      bodyColor: '#18181b',
      highlightColors: ['#fed7aa', '#fb923c', '#ea580c', '#c2410c'],
      borderColor: '#3f3f46',
      borderWidth: 1.5
    },
    metadata: [
      { label: 'Patient Record', value: '#PT-2026-4401' },
      { label: 'Pain Scale', value: 'VAS 8.5 / 10' },
      { label: 'Onset Duration', value: 'Chronic (>12 weeks neck), Acute (2 days ankle)' },
      { label: 'Aggravating Factors', value: 'Prolonged Desk Work, Weight Bearing' },
      { label: 'Referral Route', value: 'Outpatient Physical Therapy' }
    ],
    caseStudyTitle: 'Empowering Digital Patient Intake',
    caseStudyText: 'Telehealth providers integrate React Body Highlighter to allow patients to visually indicate exact pain loci and severity levels on mobile devices before telehealth consultations.',
    extremities: {
      leftFoot: {
        selected: true,
        aspect: 'dorsal',
        color: '#ea580c',
        notes: 'Acute lateral ankle & dorsal foot edema with tenderness over ATFL',
        severity: 9
      },
      rightFoot: {
        selected: false,
        aspect: 'plantar',
        color: '#27272a'
      }
    }
  }
]

export const THEME_PALETTES = [
  {
    id: 'plexa-blue',
    name: 'Plexa Electric Blue',
    description: 'Plexa brand theme with vivid electric blues',
    bodyColor: '#0f172a',
    highlightColors: ['#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8'],
    borderColor: '#334155',
    borderWidth: 1.5,
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'crimson-alert',
    name: 'Crimson Hazard / Safety',
    description: 'High-visibility yellow-to-crimson hazard scale',
    bodyColor: '#1e293b',
    highlightColors: ['#fde047', '#f97316', '#ef4444', '#991b1b'],
    borderColor: '#475569',
    borderWidth: 1.5,
    badgeColor: 'bg-red-600'
  },
  {
    id: 'emerald-fitness',
    name: 'Emerald Athletic Recovery',
    description: 'Crisp neon greens for hypertrophy and stamina',
    bodyColor: '#0f172a',
    highlightColors: ['#a7f3d0', '#34d399', '#10b981', '#047857'],
    borderColor: '#334155',
    borderWidth: 1.5,
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'cyber-violet',
    name: 'Cyberpunk Violet / Cyan',
    description: 'Futuristic ultraviolet gradient theme',
    bodyColor: '#18181b',
    highlightColors: ['#c084fc', '#a855f7', '#7c3aed', '#4c1d95'],
    borderColor: '#3f3f46',
    borderWidth: 1.5,
    badgeColor: 'bg-purple-600'
  },
  {
    id: 'amber-clinical',
    name: 'Clinical Amber / Warmth',
    description: 'Warm medical diagnostic gradient',
    bodyColor: '#1c1917',
    highlightColors: ['#fde68a', '#f59e0b', '#d97706', '#b45309'],
    borderColor: '#44403c',
    borderWidth: 1.5,
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'slate-minimal',
    name: 'Monochrome Light Slate',
    description: 'Clean light slate aesthetic',
    bodyColor: '#e2e8f0',
    highlightColors: ['#94a3b8', '#64748b', '#475569', '#1e293b'],
    borderColor: '#cbd5e1',
    borderWidth: 1.5,
    badgeColor: 'bg-slate-500'
  }
]
