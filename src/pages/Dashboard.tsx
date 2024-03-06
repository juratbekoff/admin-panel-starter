import { Navbar } from "../components";
import { DashboardCard } from "../components/cards";

const Dashboard = () => {
  return (
    <>
      <Navbar name="Dashboard" />

      <div className="grid grid-cols-7 max-lg:grid-cols-3 gap-4">
        <DashboardCard name="Block-1" value={2} />
        <DashboardCard name="Block-2" value={4} />
        <DashboardCard name="Block-3" value={5} />
      </div>
    </>
  );
};

export default Dashboard;
