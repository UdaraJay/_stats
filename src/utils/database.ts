import { PrismaClient } from '@prisma/client';

// Maybe let people switch out the driver here...
let prisma = new PrismaClient();

export default prisma;
