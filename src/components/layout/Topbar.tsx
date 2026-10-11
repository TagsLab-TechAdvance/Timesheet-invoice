import { useNavigate } from 'react-router-dom'
import { IconBell, IconLogout } from '../ui/Icons'

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const navigate = useNavigate()
  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-sub">{subtitle}</div>}
      </div>
      <div className="topbar-right">
        <button className="icon-btn" title="Notifications" aria-label="Notifications">
          <IconBell />
          <span className="dot" />
        </button>
        <div className="admin-chip" onClick={() => navigate('/login')}>
          <div className="avatar">MD</div>
          <span className="small" style={{ fontWeight: 600 }}>Marie Dubois</span>
        </div>
        <button className="icon-btn" title="Log out" aria-label="Log out" onClick={() => navigate('/login')}>
          <IconLogout width={16} height={16} />
        </button>
      </div>
    </header>
  )
}
