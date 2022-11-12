import { PrismaClient } from '@prisma/client'
import express, {Request, Response} from 'express'

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  try {
    const allGraphs = await prisma.graph.findMany();
    res.json(allGraphs);
  } catch (e) {
    console.log(e);
  }
});

app.put('/', async (req: Request, res: Response) => {
  try {
    const newGraph = await prisma.graph.create({
      data: req.body,
    });
    res.json(newGraph);
  } catch (e) {
    console.log(e);
  }
});

app.patch('/', async (req: Request, res: Response) => {
try {
    await prisma.graph.updateMany({
      data: {
        deleted: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(3003, () => {
  console.log('Server started on http://localhost:3003');
});
