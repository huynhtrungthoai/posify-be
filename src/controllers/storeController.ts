import { Request, Response } from 'express';
import { BadRequestResponse, ErrorResponse, SuccessResponse } from '../helpers/appError';
import { verify } from 'jsonwebtoken';
import { AppConfig } from '../helpers/config';
import { StoreService } from '../services';

const getStores = async (_req: Request, res: Response) => {
    try {
        const stores = await StoreService.findAll();

        SuccessResponse(res, stores);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const createStore = async (req: Request, res: Response) => {
    const { name } = req.body;
    const access_token = req.headers.authorization?.split(' ')[1];

    // Validate input
    if (!name) {
        BadRequestResponse(res, 'Tên cửa hàng không được bỏ trống');
        return;
    }

    try {
        // Check if a store with the same code already exists
        const store_code = name.toLowerCase().replace(/\s+/g, '-');
        const existingStore = await StoreService.findOne({ code: store_code });
        if (existingStore) {
            BadRequestResponse(res, 'Cửa hàng đã tồn tại!');
            return;
        }

        const decoded_token = verify(access_token, AppConfig.TOKEN_KEY) as { id: string };

        // Create a new store
        const store = await StoreService.create({
            name,
            code: store_code,
            user_id: decoded_token?.id,
            ...req.body,
        });

        SuccessResponse(res, store);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const updateStore = async (req: Request, res: Response) => {
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
        const existingStore = await StoreService.findOne({ id });
        if (!existingStore) {
            BadRequestResponse(res, 'Cửa hàng không tồn tại');
            return;
        }

        // Update the store
        const updatedStore = await StoreService.update(id, {
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

export const StoreController = { getStores, createStore, updateStore };
