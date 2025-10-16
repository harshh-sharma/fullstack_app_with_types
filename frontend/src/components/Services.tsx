import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/layout";
import { useEffect } from "react";

const services = [
  { id: 1, name: "Web Development", type: "IT Service" },
  { id: 2, name: "House Cleaning", type: "Home Service" },
  { id: 3, name: "Plumbing", type: "Repair Service" },
  { id: 4, name: "Photography", type: "Creative Service" },
  { id: 5, name: "Gardening", type: "Home Service" },
];

const Services = () => {
    const {categoryId} = useParams();
    
    const getServices = async () => {
        
    }

    useEffect(() => {
        getServices();
    },[categoryId])
  return (
    <DashboardLayout>
        <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {service.name}
            </h2>
            <p className="text-sm text-gray-500">{service.type}</p>
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Services;
