import { PrismaClient } from '@prisma/client'
import express, {Request, Response} from 'express'

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  try {
    const allGraphs = await prisma.graph.findMany({
      where: {
        isDeleted: false,
      },
    });
    res.json(allGraphs);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.put('/', async (req: Request, res: Response) => {
  try {
    const newGraph = await prisma.graph.create({
      data: {
        from: req.body.from,
        to: req.body.to,
        weight: req.body.weight,
      },
    });
    res.json({success: true, data: newGraph});
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.patch('/', async (req: Request, res: Response) => {
try {
    const all = await prisma.graph.updateMany({
      data: {
        isDeleted: true,
      },
      where: {
        isDeleted: false,
      }
    });
    res.json({success: true, data: all});
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
