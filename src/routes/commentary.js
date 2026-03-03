import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { matchIdParamSchema } from "../validation/matches.js";
import { createCommentarySchema, listCommentaryQuerySchema } from "../validation/commentary.js";
import { db } from "../db/db.js";
import { commentary } from "../db/schema.js";

const MAX_LIMIT = 100;

export const commentaryRouter = Router({ mergeParams: true });

commentaryRouter.get('/', (req, res) => {
    res.status(501).json({ 
        message: 'Commentary list'
    });
});

commentaryRouter.post('/', async (req, res) => {
    const paramsResult = matchIdParamSchema.safeParse(req.params);

    if (!paramsResult.success) {
        return res.status(400).json({ 
            error: 'Invalid match ID.',
            details: paramsResult.error.issues 
        });
    }

    const bodyResult = createCommentarySchema.safeParse(req.body);

    if (!bodyResult.success) {
        return res.status(400).json({ 
            error: 'Invalid commentary payload.', 
            details: bodyResult.error.issues 
        });
    }

    try {
        const { minute, ...rest } = bodyResult.data;
        const [result] = await db.insert(commentary).values({
            matchId: paramsResult.data.id,
            minute,
            ...rest
        }).returning();

        res.status(201).json({ 
            data: result
        });
    } catch (error) {
        console.error('Failed to create commentary:', error);
        res.status(500).json({ 
            error: 'Failed to create commentary.' 
        });
    }
});
