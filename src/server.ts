import 'dotenv/config'


import { severHttp } from './app';
import './socket/sensorsReading/sensorsReadingSocket';
import 'express-async-errors';
const PORT = process.env.PORT || 3333;



severHttp.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
