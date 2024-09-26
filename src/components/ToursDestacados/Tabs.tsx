interface Tab {
  icon: string
  label: string
  description: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: number
  setActiveTab: (index: number) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className='mb-12'>
    <div className='flex flex-wrap justify-center sm:justify-start space-x-4 mb-4'>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === index ?
              'bg-[#2975BA] text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab(index)}
        >
          <span className='mr-2'>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
    <p className='text-center sm:text-left text-sm text-gray-400'>
      {tabs[activeTab].description}
    </p>
  </div>
)

export default Tabs
