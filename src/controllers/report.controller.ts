import { Request, Response, NextFunction } from 'express';

export const getSalesReport = async (req: Request, res: Response, next: NextFunction) => {
    
    res.status(501).json({ message: 'Sales report endpoint not implemented' });
};

export const getUserActivityReport = async (req: Request, res: Response, next: NextFunction) => {
    
    res.status(501).json({ message: 'User activity report endpoint not implemented' });
};

export const getInventoryReport = async (req: Request, res: Response, next: NextFunction) => {
  
    res.status(501).json({ message: 'Inventory report endpoint not implemented' });
};