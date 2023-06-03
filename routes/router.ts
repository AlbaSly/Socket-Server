import { Router, Request, Response } from "express";
import Server from "../classes/server";

const router: Router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({ok: true, msg: "All ok!"});
});

/**Mandar mensajes de forma global */
router.post('/mensajes', (req: Request, res: Response) => {

    const {
        body,
        from,
    } = req.body;

    const server = Server.Instance;

    server.io.emit("mensaje-nuevo", req.body);

    res.json({ok: true, msg: "All ok! POST", data: {from, body}});
});

/**Mandar mensajes privados */
router.post('/mensajes/:id', (req: Request, res: Response) => {

    const {
        body,
        from,
    } = req.body;

    const id = req.params.id;

    const server = Server.Instance;

    /**Mandar mensaje privado a cierto id */
    server.io.in(id).emit("mensaje-privado", req.body);

    res.status(200).json({ok: true, msg: "All ok! POST", data: {from, body, id}});
});

export default router;