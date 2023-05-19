/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

// single prisma client for all CRUD operations across all routes
export const prisma = new PrismaClient();
