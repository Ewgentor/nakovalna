import { computeActions } from "@/services/compute";
import { parseArgs } from "util";

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    flag1: {
      type: "string",
    },
    flag2: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

console.log(computeActions( Number(values.flag1), Number(values.flag2)) );
