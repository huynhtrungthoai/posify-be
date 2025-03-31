import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { BadRequestResponse, ErrorResponse, SuccessResponse } from '../helpers/appError';
import { createStore as createStoreService, findAllStore, findStore } from '../services/storeService';
dotenv.config();

const getStores = async (_req: Request, res: Response) => {
    try {
        const stores = await findAllStore();

        SuccessResponse(res, stores);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

const createStore = async (req: Request, res: Response) => {
    const { name, code } = req.body;

    // Validate input
    if (!name || !code) {
        BadRequestResponse(res, 'Name and Store code are required.');
        return;
    }

    try {
        // Check if a store with the same code already exists
        const existingStore = await findStore({ code });
        if (existingStore) {
            BadRequestResponse(res, 'A store with this code already exists.');
            return;
        }

        // Create a new store
        const store = await createStoreService({
            name,
            code,
            ...req.body,
        });

        SuccessResponse(res, store);
        return;
    } catch (err) {
        ErrorResponse(res, err.message);
        return;
    }
};

export const StoreController = { getStores, createStore };
