import DashboardAnalytics from '../../../components/ui/DashboardAnalytics'
import ColumnChart from '../../../components/ui/ColumnChart'

export default function Analytics() {
  return (
    <div className=" p-10 min-h-screen">
      <h1 className="text-3xl font-semibold my-4 ">Analytics</h1>
      <h1 className="  my-4 ">here is the latest update for the last 30 days. check now</h1>
      <DashboardAnalytics/>
      <div className='mt-10'>
        <ColumnChart/>
      </div>
    </div>
  )
}
