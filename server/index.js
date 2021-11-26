import express from 'express';
import router from './router.js';
import fileUploader from 'express-fileupload';

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(fileUploader({}));
app.use('/', router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
