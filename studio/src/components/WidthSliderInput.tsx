import React from 'react'
import {NumberInputProps, set, unset} from 'sanity'

export function WidthSliderInput(props: NumberInputProps) {
  const {value, onChange, schemaType} = props

  const range = (schemaType.options as any)?.range || {}
  const min = typeof range.min === 'number' ? range.min : 20
  const max = typeof range.max === 'number' ? range.max : 80
  const step = typeof range.step === 'number' ? range.step : 5

  const current = typeof value === 'number' ? value : min

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)

    if (Number.isNaN(next)) {
      onChange(unset())
      return
    }

    onChange(set(next))
  }

  return (
    <div style={{paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          marginBottom: 4,
        }}
      >
        <span>{schemaType.title}</span>
        <span>{current}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handleChange}
        style={{width: '100%'}}
      />
    </div>
  )
}
