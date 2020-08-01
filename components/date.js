import { parseISO, format } from 'date-fns'

export default function Date({ dateString, precise, day }) {
  if (!dateString)
    return <time>''</time>
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, (day ? 'eee ' : '') + 'LLLL d, yyyy' + (precise ? ' HH:mm' : ''))}</time>
}
