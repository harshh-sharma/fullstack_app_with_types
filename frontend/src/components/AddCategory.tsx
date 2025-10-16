import  { useState } from "react";
import DashboardLayout from "../layouts/layout";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/appStore";
import { addCategoryThunk } from "../store/slices/category.slice";
import toast from "react-hot-toast";

const AddCategory = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // console.log("Category Name:", categoryName);
    // 🔹 Add API call here (dispatch or axios)
    const res = dispatch(addCategoryThunk({name:categoryName}));
    if(addCategoryThunk.fulfilled.match(res)){
        console.log("res?.payload",res?.payload);
        
        toast.success(res?.payload?.message || "Category created successfully")
    }else if (addCategoryThunk.rejected.match(res)){
        toast.error(res?.payload || "failed category add");
        return
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Add New Category</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 border border-gray-100"
        >
          <div className="mb-5">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Category
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
