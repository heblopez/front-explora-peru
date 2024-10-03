interface ProgressCircleProps {
  value: number // Valor del progreso (0 - 100)
  radius?: number
  stroke?: number
  currentStep: number
  totalSteps: number
}

export const ProgressCircle = ({
  value,
  radius = 50, // Radio del círculo
  stroke = 10, // Grosor de la línea del círculo
  currentStep,
  totalSteps
}: ProgressCircleProps) => {
  const normalizedRadius = radius - stroke * 2 // Ajusta el radio para tener en cuenta el grosor del borde
  const circumference = normalizedRadius * 2 * Math.PI // Calcula la circunferencia
  const strokeDashoffset = circumference - (value / 100) * circumference // Calcula el desplazamiento del trazo

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
        stroke='#3e98c7' // Color azul del progreso
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
        fill='#fff' // Color blanco del texto
        fontWeight='bold' // Fuente en negrita para mayor visibilidad
      >
        {`${currentStep} de ${totalSteps}`} {/* Muestra el valor de progreso */}
      </text>
    </svg>
  )
}
