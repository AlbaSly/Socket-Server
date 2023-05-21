import { Router, Request, Response } from "express";

const router: Router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({ok: true, msg: "All ok!"});
});

router.post('/mensajes', (req: Request, res: Response) => {

    const {cuerpo, de} = req.body;

    res.json({ok: true, msg: "All ok! POST", data: {cuerpo, de}});
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const {cuerpo, de} = req.body;
    const id = req.params.id;

    res.json({ok: true, msg: "All ok! POST", data: {cuerpo, de, id}});
});

export default router;