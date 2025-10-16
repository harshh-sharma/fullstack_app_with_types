import DashboardLayout from "../layouts/layout";
import { FiLayers, FiBox, FiDollarSign, FiUsers } from "react-icons/fi";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
            Welcome, Admin!
          </h1>
          <button className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition">
            Add New Category
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FiLayers className="text-blue-500 text-3xl" />
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-gray-500">Categories</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FiBox className="text-green-500 text-3xl" />
            <div>
              <p className="text-2xl font-bold">25</p>
              <p className="text-gray-500">Services</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FiDollarSign className="text-yellow-500 text-3xl" />
            <div>
              <p className="text-2xl font-bold">100+</p>
              <p className="text-gray-500">Price Options</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
            <FiUsers className="text-purple-500 text-3xl" />
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-gray-500">Admins</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-6 shadow hover:scale-105 transform transition cursor-pointer">
            <h2 className="text-xl font-bold">Add Category</h2>
            <p className="mt-1 text-sm">Create a new category quickly</p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-6 shadow hover:scale-105 transform transition cursor-pointer">
            <h2 className="text-xl font-bold">Add Service</h2>
            <p className="mt-1 text-sm">Add services under any category</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg p-6 shadow hover:scale-105 transform transition cursor-pointer">
            <h2 className="text-xl font-bold">View Reports</h2>
            <p className="mt-1 text-sm">Check analytics and revenue stats</p>
          </div>
        </div>

        {/* Recent Activities or Graph Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Added Service</td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">16 Oct 2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Added Category</td>
                  <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">15 Oct 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
