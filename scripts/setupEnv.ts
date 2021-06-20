/*
This file configures dotEnv when imported.
*/

import path from "path"
import dotEnv from "dotenv"
dotEnv.config({ path: path.resolve(__dirname, "../.env") })
