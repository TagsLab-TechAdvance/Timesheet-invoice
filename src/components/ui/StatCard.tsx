import type { ReactNode } from 'react'

export function StatCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
  delta,
  deltaTone = 'up',
}: {
  icon: ReactNode
  iconBg: string
  iconColor: string
  value: string | number
  label: string
  delta?: string
  deltaTone?: 'up' | 'warn'
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </div>
        {delta && <span className={`stat-delta ${deltaTone}`}>{delta}</span>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
