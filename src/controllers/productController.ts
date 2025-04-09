import { Request, Response } from 'express';
import { BadRequestResponse, ErrorResponse, SuccessResponse } from '../helpers/appError';
import { ProductService } from '../services';

const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await ProductService.findAll();
        SuccessResponse(res, products);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const createProduct = async (req: Request, res: Response) => {
    const { name, sku, desc, image_url, cost, price, inventory, type, is_ingredient, ingredients, store_ids } = req?.body ?? {};

    // Validate input
    if (!name) {
        BadRequestResponse(res, 'Tên sản phẩm không được bỏ trống');
        return;
    }

    try {
        // Create a new store
        const store = await ProductService.create({
            name: name,
            sku: sku,
            desc: desc,
            image_url: image_url,
            cost: cost,
            price: price,
            inventory: inventory,
            type: type,
            is_ingredient: is_ingredient ?? false,
            ingredients: ingredients,
            store_ids: store_ids,
        });

        SuccessResponse(res, store);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, code } = req.body;

    // Validate input
    if (!id) {
        BadRequestResponse(res, 'Store ID is required.');
        return;
    }

    if (!name && !code) {
        BadRequestResponse(res, 'At least one field (name or code) is required to update.');
        return;
    }

    try {
        // Check if the store exists
        const existingStore = await ProductService.findOne({ id });
        if (!existingStore) {
            BadRequestResponse(res, 'Cửa hàng không tồn tại');
            return;
        }

        // Update the store
        const updatedStore = await ProductService.update(id, {
            ...existingStore,
            ...req.body,
        });

        SuccessResponse(res, updatedStore);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

export const ProductController = { getProducts, createProduct, updateProduct };
