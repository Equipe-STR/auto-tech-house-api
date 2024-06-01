import 'dotenv/config'


import { serverHttp } from './app';
import './socket/webSocketConnection';
import 'express-async-errors';
const PORT = process.env.PORT || 3333;



serverHttp.listen(PORT, () => {
  console.log(`🏠 Server is running on PORT ${PORT}`);
});
