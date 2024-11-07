import { createApp } from "./index.js";

import { UserModel } from "./models/UserModel.js";

const app = createApp({ userModel: UserModel });