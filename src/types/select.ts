// Generic option type for selects
export interface SelectOption {
  label: string
  value: number
}

export const monthOptions: SelectOption[] = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
]

export const yearOptions: SelectOption[] = (() => {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 10 // -10 years
  const endYear = currentYear + 10 // +10 years

  const years: SelectOption[] = []

  for (let y = startYear; y <= endYear; y++) {
    years.push({ label: y.toString(), value: y })
  }

  return years
})()
