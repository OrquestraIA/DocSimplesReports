import { useState } from 'react'
import WorkspaceSidebar from '../components/WorkspaceSidebar'
import WorkspaceBoard from '../components/WorkspaceBoard'

export default function WorkspacesPage({ 
  requirements = [], 
  onUpdateRequirement,
  users = [],
  currentUser,
  onAddNotification,
  sprints = [],
  tasks = []
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedWorkspace, setSelectedWorkspace] = useState('operacao')
  const [selectedList, setSelectedList] = useState(null)

  return (
    <div className="flex h-[calc(100vh-12rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-gray-50 dark:bg-slate-900">
      <WorkspaceSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        requirements={requirements}
        selectedWorkspace={selectedWorkspace}
        onSelectWorkspace={setSelectedWorkspace}
        selectedList={selectedList}
        onSelectList={setSelectedList}
      />
      <WorkspaceBoard
        requirements={requirements}
        selectedWorkspace={selectedWorkspace}
        selectedList={selectedList}
        onUpdateRequirement={onUpdateRequirement}
        users={users}
        currentUser={currentUser}
        onAddNotification={onAddNotification}
        sprints={sprints}
      />
    </div>
  )
}
