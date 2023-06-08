import { spawn } from 'child_process';
import { once } from 'node:events';
import typeChecker from './typeChecker/index.js';
import saveInLogs from './saveInLogs/index.js';

const geStatisticsAndSave = async (command, args, timeout = Infinity) => {

  typeChecker(command, args, timeout);

  // Timout property don't accept Infinite, in that case it is undefined
  if (!Number.isFinite(timeout)) timeout = undefined;

  let statistics = {};
  
  const child = spawn(command, args, { timeout });

  try {

    await once(child, 'spawn');

    statistics.start = new Date();

    let error = await child.stderr.reduce((a, b) => a.toString() + b, "");

    const [, signal] = await once(child, 'close');

    statistics.duration = Date.now() - statistics.start;

    if (signal) error = "Timeout error";

    if (error) statistics = {
      ...statistics,
      success: false,
      commandSuccess: true,
      error,
    };
    else statistics = {
      ...statistics,
      success: true,
    }

  } catch (err) {

    statistics = {
      start: new Date(),
      error: err.message,
      commandSuccess: false,
      duration: 0,
    }
  }

  await saveInLogs(statistics, command)

}
