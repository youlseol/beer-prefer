import { Router, Request, Response } from 'express';
import { BeerService } from '../services/BeerService';
import { BeerType, PackagingFormat } from '../../../shared/types/models';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const { type, format } = req.query;
    
    let types: BeerType[] | undefined;
    let formats: PackagingFormat[] | undefined;

    if (type) {
      types = (typeof type === 'string' ? type.split(',') : type) as BeerType[];
    }

    if (format) {
      formats = (typeof format === 'string' ? format.split(',') : format) as PackagingFormat[];
    }

    const beers = BeerService.getBeers(types, formats);
    
    res.json({
      data: beers,
      count: beers.length,
    });
  } catch (error) {
    console.error('Error in GET /api/beers:', error);
    res.status(500).json({ error: 'Failed to fetch beers' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid beer ID' });
    }

    const beer = BeerService.getBeerById(id);
    
    if (!beer) {
      return res.status(404).json({ error: 'Beer not found' });
    }

    res.json({ data: beer });
  } catch (error) {
    console.error(`Error in GET /api/beers/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch beer' });
  }
});

export default router;
