import { useEffect } from "react";
import DashboardLayout from "../layouts/layout";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../store/slices/category.slice";
import type { AppDispatch } from "../store/appStore";
import { useNavigate } from "react-router-dom";

// const categories = [
//   { id: 1, name: "Electronics", description: "Mobiles, Laptops, and more" },
//   { id: 2, name: "Clothing", description: "Men's and Women's Fashion" },
//   { id: 3, name: "Groceries", description: "Daily essentials and food items" },
//   { id: 4, name: "Furniture", description: "Home and office furniture" },
//   { id: 5, name: "Sports", description: "Fitness and outdoor gear" },
// ];

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((store:any) => store?.category.categories);

  const getCategories = async () => {
    dispatch(categoryThunk());
  }

  useEffect(() => {
    getCategories();
  },[])
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category:any) => (
            <div
              key={category.id}
              onClick={() => navigate(`/category/${category?.id}/services`)}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
