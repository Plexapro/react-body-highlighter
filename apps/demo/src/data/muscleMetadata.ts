import { Muscle } from '@plexapro/react-body-highlighter'
import { MuscleMetadataItem } from '../types/showcase'

export const MUSCLE_METADATA: Record<string, MuscleMetadataItem> = {
  // Head & Neck
  'head': {
    slug: 'head' as Muscle,
    label: 'Cranium / Head',
    category: 'Head & Neck',
    description: 'Cranial vault, facial muscles, and temporomandibular joint area.',
    commonInjuries: 'Concussion, cranial contusion, facial laceration'
  },
  'neck': {
    slug: 'neck' as Muscle,
    label: 'Cervical Spine / Neck',
    category: 'Head & Neck',
    description: 'Sternocleidomastoid, scalenes, and cervical vertebrae complex.',
    commonInjuries: 'Whiplash, cervical radiculopathy, muscle spasm'
  },
  'left-neck': {
    slug: 'left-neck' as Muscle,
    label: 'Left Cervical / Neck',
    category: 'Head & Neck',
    description: 'Left sternocleidomastoid and lateral cervical musculature.',
    commonInjuries: 'Left acute torticollis, lateral cervical strain'
  },
  'right-neck': {
    slug: 'right-neck' as Muscle,
    label: 'Right Cervical / Neck',
    category: 'Head & Neck',
    description: 'Right sternocleidomastoid and lateral cervical musculature.',
    commonInjuries: 'Right acute torticollis, lateral cervical strain'
  },

  // Torso / Core
  'chest': {
    slug: 'chest' as Muscle,
    label: 'Pectoralis Major & Minor',
    category: 'Core & Torso',
    description: 'Main anterior thoracic muscle driving humeral flexion and adduction.',
    commonInjuries: 'Pectoral tendon tear, sternocostal strain, contusion'
  },
  'left-chest': {
    slug: 'left-chest' as Muscle,
    label: 'Left Pectoralis Major',
    category: 'Core & Torso',
    description: 'Left anterior thoracic muscle driving left humeral adduction.',
    commonInjuries: 'Left pectoral strain, costochondritis'
  },
  'right-chest': {
    slug: 'right-chest' as Muscle,
    label: 'Right Pectoralis Major',
    category: 'Core & Torso',
    description: 'Right anterior thoracic muscle driving right humeral adduction.',
    commonInjuries: 'Right pectoral strain, costochondritis'
  },
  'abs': {
    slug: 'abs' as Muscle,
    label: 'Rectus Abdominis / Core',
    category: 'Core & Torso',
    description: 'Segmented abdominal wall muscle governing lumbar spine flexion.',
    commonInjuries: 'Rectus abdominis strain, sports hernia, athletic pubalgia'
  },
  'left-abs': {
    slug: 'left-abs' as Muscle,
    label: 'Left Rectus Abdominis',
    category: 'Core & Torso',
    description: 'Left anterior abdominal wall segment.',
    commonInjuries: 'Left abdominal wall tear, strain'
  },
  'right-abs': {
    slug: 'right-abs' as Muscle,
    label: 'Right Rectus Abdominis',
    category: 'Core & Torso',
    description: 'Right anterior abdominal wall segment.',
    commonInjuries: 'Right abdominal wall tear, strain'
  },
  'obliques': {
    slug: 'obliques' as Muscle,
    label: 'External & Internal Obliques',
    category: 'Core & Torso',
    description: 'Lateral abdominal wall muscles controlling torso rotation and lateral flexion.',
    commonInjuries: 'Oblique strain, ribcage avulsion, side stitch'
  },
  'left-obliques': {
    slug: 'left-obliques' as Muscle,
    label: 'Left Obliques',
    category: 'Core & Torso',
    description: 'Left anterolateral wall muscles controlling trunk rotation.',
    commonInjuries: 'Left side abdominal strain, rib subluxation'
  },
  'right-obliques': {
    slug: 'right-obliques' as Muscle,
    label: 'Right Obliques',
    category: 'Core & Torso',
    description: 'Right anterolateral wall muscles controlling trunk rotation.',
    commonInjuries: 'Right side abdominal strain, rib subluxation'
  },

  // Upper Extremities / Arms
  'front-deltoids': {
    slug: 'front-deltoids' as Muscle,
    label: 'Anterior Deltoids / Shoulders',
    category: 'Upper Extremities',
    description: 'Anterior shoulder muscle driving arm elevation and forward reach.',
    commonInjuries: 'Anterior shoulder impingement, subacromial bursitis'
  },
  'left-front-deltoids': {
    slug: 'left-front-deltoids' as Muscle,
    label: 'Left Anterior Deltoid',
    category: 'Upper Extremities',
    description: 'Left anterior shoulder muscle.',
    commonInjuries: 'Left rotator cuff tendonitis, anterior labral tear'
  },
  'right-front-deltoids': {
    slug: 'right-front-deltoids' as Muscle,
    label: 'Right Anterior Deltoid',
    category: 'Upper Extremities',
    description: 'Right anterior shoulder muscle.',
    commonInjuries: 'Right rotator cuff tendonitis, anterior labral tear'
  },
  'back-deltoids': {
    slug: 'back-deltoids' as Muscle,
    label: 'Posterior Deltoids',
    category: 'Upper Extremities',
    description: 'Posterior shoulder head driving horizontal abduction and extension.',
    commonInjuries: 'Posterior impingement, myofascial trigger points'
  },
  'left-back-deltoids': {
    slug: 'left-back-deltoids' as Muscle,
    label: 'Left Posterior Deltoid',
    category: 'Upper Extremities',
    description: 'Left posterior shoulder head.',
    commonInjuries: 'Left posterior shoulder strain'
  },
  'right-back-deltoids': {
    slug: 'right-back-deltoids' as Muscle,
    label: 'Right Posterior Deltoid',
    category: 'Upper Extremities',
    description: 'Right posterior shoulder head.',
    commonInjuries: 'Right posterior shoulder strain'
  },
  'biceps': {
    slug: 'biceps' as Muscle,
    label: 'Biceps Brachii',
    category: 'Upper Extremities',
    description: 'Two-headed anterior arm muscle governing elbow flexion and forearm supination.',
    commonInjuries: 'Distal biceps tendon rupture, long-head tendonitis'
  },
  'left-biceps': {
    slug: 'left-biceps' as Muscle,
    label: 'Left Biceps Brachii',
    category: 'Upper Extremities',
    description: 'Left anterior upper arm muscle.',
    commonInjuries: 'Left biceps strain, tendonitis'
  },
  'right-biceps': {
    slug: 'right-biceps' as Muscle,
    label: 'Right Biceps Brachii',
    category: 'Upper Extremities',
    description: 'Right anterior upper arm muscle.',
    commonInjuries: 'Right biceps strain, tendonitis'
  },
  'triceps': {
    slug: 'triceps' as Muscle,
    label: 'Triceps Brachii',
    category: 'Upper Extremities',
    description: 'Three-headed posterior arm muscle driving elbow extension.',
    commonInjuries: 'Triceps tendonitis, olecranon bursitis, muscle tear'
  },
  'left-triceps': {
    slug: 'left-triceps' as Muscle,
    label: 'Left Triceps Brachii',
    category: 'Upper Extremities',
    description: 'Left posterior upper arm muscle.',
    commonInjuries: 'Left triceps strain, tendonitis'
  },
  'right-triceps': {
    slug: 'right-triceps' as Muscle,
    label: 'Right Triceps Brachii',
    category: 'Upper Extremities',
    description: 'Right posterior upper arm muscle.',
    commonInjuries: 'Right triceps strain, tendonitis'
  },
  'forearm': {
    slug: 'forearm' as Muscle,
    label: 'Forearm Flexors & Extensors',
    category: 'Upper Extremities',
    description: 'Complex muscle groups controlling wrist flexion, extension, and grip strength.',
    commonInjuries: 'Medial epicondylitis (Golfer elbow), lateral epicondylitis (Tennis elbow), RSI'
  },
  'left-forearm': {
    slug: 'left-forearm' as Muscle,
    label: 'Left Forearm',
    category: 'Upper Extremities',
    description: 'Left forearm flexor and extensor compartments.',
    commonInjuries: 'Left wrist extensor tendonitis, carpal tunnel syndrome'
  },
  'right-forearm': {
    slug: 'right-forearm' as Muscle,
    label: 'Right Forearm',
    category: 'Upper Extremities',
    description: 'Right forearm flexor and extensor compartments.',
    commonInjuries: 'Right wrist extensor tendonitis, carpal tunnel syndrome'
  },

  // Posterior Chain & Back
  'trapezius': {
    slug: 'trapezius' as Muscle,
    label: 'Trapezius (Upper, Middle, Lower)',
    category: 'Posterior Chain',
    description: 'Broad superficial muscle covering upper back and back of neck.',
    commonInjuries: 'Upper trap spasm, tension headache trigger, postural strain'
  },
  'left-trapezius': {
    slug: 'left-trapezius' as Muscle,
    label: 'Left Trapezius',
    category: 'Posterior Chain',
    description: 'Left side upper, middle, and lower trapezius fibers.',
    commonInjuries: 'Left shoulder blade knot, cervical radiating spasm'
  },
  'right-trapezius': {
    slug: 'right-trapezius' as Muscle,
    label: 'Right Trapezius',
    category: 'Posterior Chain',
    description: 'Right side upper, middle, and lower trapezius fibers.',
    commonInjuries: 'Right shoulder blade knot, cervical radiating spasm'
  },
  'upper-back': {
    slug: 'upper-back' as Muscle,
    label: 'Latissimus Dorsi & Rhomboids',
    category: 'Posterior Chain',
    description: 'Major pulling musculature stabilizing the scapula and upper spine.',
    commonInjuries: 'Rhomboid strain, thoracic spine stiffness, latissimus tear'
  },
  'left-upper-back': {
    slug: 'left-upper-back' as Muscle,
    label: 'Left Upper Back / Lats',
    category: 'Posterior Chain',
    description: 'Left latissimus dorsi and rhomboid major/minor.',
    commonInjuries: 'Left lat pull, thoracic facet irritation'
  },
  'right-upper-back': {
    slug: 'right-upper-back' as Muscle,
    label: 'Right Upper Back / Lats',
    category: 'Posterior Chain',
    description: 'Right latissimus dorsi and rhomboid major/minor.',
    commonInjuries: 'Right lat pull, thoracic facet irritation'
  },
  'lower-back': {
    slug: 'lower-back' as Muscle,
    label: 'Erector Spinae / Lumbar Region',
    category: 'Posterior Chain',
    description: 'Deep and superficial spinal extensors supporting lumbar stability.',
    commonInjuries: 'Acute lumbago, herniated disc, heavy lifting sprain'
  },
  'left-lower-back': {
    slug: 'left-lower-back' as Muscle,
    label: 'Left Lumbar Erector Spinae',
    category: 'Posterior Chain',
    description: 'Left side deep spinal extensors and quadratus lumborum.',
    commonInjuries: 'Left quadratus lumborum spasm, sacroiliac joint dysfunction'
  },
  'right-lower-back': {
    slug: 'right-lower-back' as Muscle,
    label: 'Right Lumbar Erector Spinae',
    category: 'Posterior Chain',
    description: 'Right side deep spinal extensors and quadratus lumborum.',
    commonInjuries: 'Right quadratus lumborum spasm, sacroiliac joint dysfunction'
  },
  'gluteal': {
    slug: 'gluteal' as Muscle,
    label: 'Gluteus Maximus & Medius',
    category: 'Posterior Chain',
    description: 'Powerful hip extensors and pelvic stabilizers.',
    commonInjuries: 'Piriformis syndrome, gluteal tendinopathy, dead butt syndrome'
  },
  'left-gluteal': {
    slug: 'left-gluteal' as Muscle,
    label: 'Left Gluteal Complex',
    category: 'Posterior Chain',
    description: 'Left hip extensor and abductor complex.',
    commonInjuries: 'Left gluteus medius tear, sciatica'
  },
  'right-gluteal': {
    slug: 'right-gluteal' as Muscle,
    label: 'Right Gluteal Complex',
    category: 'Posterior Chain',
    description: 'Right hip extensor and abductor complex.',
    commonInjuries: 'Right gluteus medius tear, sciatica'
  },
  'hamstring': {
    slug: 'hamstring' as Muscle,
    label: 'Hamstring Complex (Biceps Femoris / Semitendinosus)',
    category: 'Posterior Chain',
    description: 'Posterior thigh muscles driving knee flexion and hip extension.',
    commonInjuries: 'High-speed running strain, proximal hamstring tendinopathy'
  },
  'left-hamstring': {
    slug: 'left-hamstring' as Muscle,
    label: 'Left Hamstring',
    category: 'Posterior Chain',
    description: 'Left posterior thigh musculature.',
    commonInjuries: 'Left biceps femoris tear, sprint pull'
  },
  'right-hamstring': {
    slug: 'right-hamstring' as Muscle,
    label: 'Right Hamstring',
    category: 'Posterior Chain',
    description: 'Right posterior thigh musculature.',
    commonInjuries: 'Right biceps femoris tear, sprint pull'
  },

  // Lower Extremities / Legs
  'quadriceps': {
    slug: 'quadriceps' as Muscle,
    label: 'Quadriceps Femoris (Rectus Femoris, Vasto-medial/lateral)',
    category: 'Lower Extremities',
    description: 'Four-headed anterior thigh muscle group extending the knee.',
    commonInjuries: 'Quad tendonitis, patellofemoral pain syndrome, muscle contusion'
  },
  'left-quadriceps': {
    slug: 'left-quadriceps' as Muscle,
    label: 'Left Quadriceps',
    category: 'Lower Extremities',
    description: 'Left anterior thigh muscle complex.',
    commonInjuries: 'Left rectus femoris strain, charley horse'
  },
  'right-quadriceps': {
    slug: 'right-quadriceps' as Muscle,
    label: 'Right Quadriceps',
    category: 'Lower Extremities',
    description: 'Right anterior thigh muscle complex.',
    commonInjuries: 'Right rectus femoris strain, charley horse'
  },
  'adductor': {
    slug: 'adductor' as Muscle,
    label: 'Hip Adductors (Groin)',
    category: 'Lower Extremities',
    description: 'Medial thigh muscles pulling legs toward body midline.',
    commonInjuries: 'Groin pull, adductor longus tendinopathy, athletic pubalgia'
  },
  'left-adductor': {
    slug: 'left-adductor' as Muscle,
    label: 'Left Adductor / Groin',
    category: 'Lower Extremities',
    description: 'Left medial thigh muscle.',
    commonInjuries: 'Left groin sprain'
  },
  'right-adductor': {
    slug: 'right-adductor' as Muscle,
    label: 'Right Adductor / Groin',
    category: 'Lower Extremities',
    description: 'Right medial thigh muscle.',
    commonInjuries: 'Right groin sprain'
  },
  'knees': {
    slug: 'knees' as Muscle,
    label: 'Patellar & Knee Joint Complex',
    category: 'Lower Extremities',
    description: 'Knee joint, patella, collateral & cruciate ligaments, and meniscus.',
    commonInjuries: 'ACL/MCL tear, meniscus tear, patellar tendonitis, runner knee'
  },
  'left-knees': {
    slug: 'left-knees' as Muscle,
    label: 'Left Knee Joint',
    category: 'Lower Extremities',
    description: 'Left knee articular structure and patellar tendon.',
    commonInjuries: 'Left ACL sprain, medial meniscus tear, direct contusion'
  },
  'right-knees': {
    slug: 'right-knees' as Muscle,
    label: 'Right Knee Joint',
    category: 'Lower Extremities',
    description: 'Right knee articular structure and patellar tendon.',
    commonInjuries: 'Right ACL sprain, medial meniscus tear, direct contusion'
  },
  'shins': {
    slug: 'shins' as Muscle,
    label: 'Tibialis Anterior / Shins',
    category: 'Lower Extremities',
    description: 'Anterior lower leg muscle governing foot dorsiflexion and inversion.',
    commonInjuries: 'Medial tibial stress syndrome (Shin splints), anterior compartment syndrome'
  },
  'left-shins': {
    slug: 'left-shins' as Muscle,
    label: 'Left Tibialis Anterior / Shin',
    category: 'Lower Extremities',
    description: 'Left anterior lower leg muscle.',
    commonInjuries: 'Left shin splints, stress fracture'
  },
  'right-shins': {
    slug: 'right-shins' as Muscle,
    label: 'Right Tibialis Anterior / Shin',
    category: 'Lower Extremities',
    description: 'Right anterior lower leg muscle.',
    commonInjuries: 'Right shin splints, stress fracture'
  },
  'calves': {
    slug: 'calves' as Muscle,
    label: 'Gastrocnemius & Soleus',
    category: 'Lower Extremities',
    description: 'Posterior lower leg muscles powering plantarflexion and propulsion.',
    commonInjuries: 'Calf tear (Tennis leg), Achilles tendonitis, calf cramp'
  },
  'left-calves': {
    slug: 'left-calves' as Muscle,
    label: 'Left Gastrocnemius / Calf',
    category: 'Lower Extremities',
    description: 'Left posterior lower leg muscle.',
    commonInjuries: 'Left calf strain, Achilles tendinopathy'
  },
  'right-calves': {
    slug: 'right-calves' as Muscle,
    label: 'Right Gastrocnemius / Calf',
    category: 'Lower Extremities',
    description: 'Right posterior lower leg muscle.',
    commonInjuries: 'Right calf strain, Achilles tendinopathy'
  },
  'left-soleus': {
    slug: 'left-soleus' as Muscle,
    label: 'Left Soleus',
    category: 'Lower Extremities',
    description: 'Deep left plantar flexor muscle below gastrocnemius.',
    commonInjuries: 'Left deep soleus strain, endurance fatigue'
  },
  'right-soleus': {
    slug: 'right-soleus' as Muscle,
    label: 'Right Soleus',
    category: 'Lower Extremities',
    description: 'Deep right plantar flexor muscle below gastrocnemius.',
    commonInjuries: 'Right deep soleus strain, endurance fatigue'
  },
  'ankles': {
    slug: 'ankles' as Muscle,
    label: 'Ankle Joint & Talocrural Complex',
    category: 'Lower Extremities',
    description: 'Talocrural joint, lateral ligament complex (ATFL, CFL), and deltoid ligament.',
    commonInjuries: 'Inversion ankle sprain, high ankle syndesmosis tear'
  },
  'left-ankle': {
    slug: 'left-ankle' as Muscle,
    label: 'Left Ankle Joint',
    category: 'Lower Extremities',
    description: 'Left talocrural joint and lateral malleolus ligaments.',
    commonInjuries: 'Left ATFL sprain, lateral malleolar fracture'
  },
  'right-ankle': {
    slug: 'right-ankle' as Muscle,
    label: 'Right Ankle Joint',
    category: 'Lower Extremities',
    description: 'Right talocrural joint and lateral malleolus ligaments.',
    commonInjuries: 'Right ATFL sprain, lateral malleolar fracture'
  }
}

export const CATEGORIES = [
  'All',
  'Core & Torso',
  'Upper Extremities',
  'Lower Extremities',
  'Posterior Chain',
  'Head & Neck'
] as const
