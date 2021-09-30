import { Router } from "express";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";

export const uploadRouter = Router();

uploadRouter.post("/", (req: Request, res: Response): any => {
  if (req.files === null) {
    res.status(400);
    return res.json({ msg: "No file uploaded" });
  }

  const file = req.files?.file as UploadedFile;
  const filePath: string = `${__dirname}/../uploads/${file.name}`;
  file.mv(filePath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(filePath);
    res.json({ fileName: file.name, filePath: filePath });
  });
});
uploadRouter.get("/:fileName", function (req: Request, res: Response) {
  res.sendFile(path.resolve(`${__dirname}/../uploads/${req.params.fileName}`));
});
