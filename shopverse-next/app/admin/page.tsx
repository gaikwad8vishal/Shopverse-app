import ProtectedRoute from '@/components/ProtectedRoute';
import AdminDashboard from '@/components/AdminDashboard';
import { UserRole } from '@/lib/types';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.Admin, UserRole.SuperAdmin]}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}