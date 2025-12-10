const { format: formatTime } = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
  dateStyle: 'short',
})

export { formatTime }
