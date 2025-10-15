import {Router} from "express";
import { isUserAuthenticated } from "../middlewares/authentication";
import { validate } from "../middlewares/validation.middleware";
import { categorySchema } from "../validations/category.validation";
import { addServiceRelatedToCategory, createCategory, deleteCategory, deleteServiceRelatedToCategory, getCategories, getServicesRelatedToCategory, updateCategory, updateServiceRelatedToCategory } from "../controllers/category.controller";
import { serviceSchema } from "../validations/service.validation";

const router = Router();

router.route('/').post(isUserAuthenticated,validate(categorySchema),createCategory)
                 .get(isUserAuthenticated,getCategories);

router.route('/:id').put(isUserAuthenticated,validate(categorySchema), updateCategory)
                    .delete(isUserAuthenticated,deleteCategory);

router.route('/:id/service').get(isUserAuthenticated,getServicesRelatedToCategory)
                            .post(isUserAuthenticated,validate(serviceSchema),addServiceRelatedToCategory);


router.route('/:categoryId/service/:serviceId').delete(isUserAuthenticated,deleteServiceRelatedToCategory)
                                               .put(isUserAuthenticated,updateServiceRelatedToCategory);
export default router;