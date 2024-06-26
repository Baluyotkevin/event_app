'use server'

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"

// CREATE CATEGORY
export const createCategory = async ({categoryName}: CreateCategoryParams) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({ name: categoryName })

        return JSON.parse(JSON.stringify(newCategory));

    } catch (err) {
        handleError(err)
    }
}

// GETS ALL CATEGORIES
export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const categories = await Category.find()

        return JSON.parse(JSON.stringify(categories));

    } catch (err) {
        handleError(err)
    }
}