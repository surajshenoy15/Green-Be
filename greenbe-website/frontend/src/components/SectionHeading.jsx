export default function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto text-center' : ''}>
      {eyebrow && <span className="eyebrow"><span className="h-2 w-2 rounded-full bg-lime" />{eyebrow}</span>}
      <h2 className={`section-title mt-5 ${align === 'center' ? 'mx-auto max-w-4xl' : 'max-w-4xl'}`}>{title}</h2>
      {copy && <p className={`section-copy ${align === 'center' ? 'mx-auto' : ''}`}>{copy}</p>}
    </div>
  )
}
