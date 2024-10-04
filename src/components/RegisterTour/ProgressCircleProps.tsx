interface ProgressCircleProps {
  value: number // Valor del progreso (0 - 100)
  radius?: number
  stroke?: number
  currentStep: number
  totalSteps: number
}

export const ProgressCircle = ({
  value,
  radius = 50,
  stroke = 10,
  currentStep,
  totalSteps
}: ProgressCircleProps) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* Círculo de fondo */}
      <circle
        stroke='#d6d6d6' // Color gris claro de fondo
        fill='transparent'
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Círculo de progreso */}
      <circle
        stroke='hsl(217, 91%, 50%)'
        fill='transparent'
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`} // Patrón de línea continua
        strokeDashoffset={strokeDashoffset} // Desplazamiento basado en el progreso
        strokeLinecap='round' // Redondea los extremos del círculo
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: 'stroke-dashoffset 0.35s' }} // Transición suave
        transform={`rotate(-90 ${radius} ${radius})`} // Rotar el círculo 90 grados alrededor de su propio centro
      />
      {/* Texto centrado */}
      <text
        x='50%'
        y='50%'
        textAnchor='middle' // Centra el texto horizontalmente
        dy='.3em' // Ajuste de la altura vertical
        fontSize='14px' // Tamaño de la fuente del porcentaje
        fontWeight='bold'
        className='fill-primary dark:fill-white'
      >
        {`${currentStep} de ${totalSteps}`} {/* Muestra el valor de progreso */}
      </text>
    </svg>
  )
}
