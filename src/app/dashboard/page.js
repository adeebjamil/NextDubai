import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Dashboard from '../components/Dashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <p>You need to be authenticated to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}