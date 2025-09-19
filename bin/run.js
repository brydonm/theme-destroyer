#!/usr/bin/env node

import {execute} from '@oclif/core'

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await execute({dir: __dirname});
