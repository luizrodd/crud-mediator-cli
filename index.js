#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pascalCase = (str) =>
  (str ?? "")
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/[ /\\]/g)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const findFlagIndex = (arr, flag) => arr.findIndex(a => a.toLowerCase() === flag.toLowerCase());
const getFlagValue = (arr, flag) => {
  const i = findFlagIndex(arr, flag);
  if (i === -1) return null;
  const val = arr[i + 1];
  if (!val || val.startsWith("--")) return null;
  return val;
};

const stripFlagAndValue = (arr, flag) => {
  const i = findFlagIndex(arr, flag);
  if (i === -1) return arr;
  const copy = [...arr];
  copy.splice(i, (copy[i + 1] && !copy[i + 1].startsWith("--")) ? 2 : 1);
  return copy;
};

const generateNamespaceFromStartup = (cwd, startupRaw) => {
  const parts = cwd.split(path.sep).filter(Boolean);
  const norm = (s) => s.toLowerCase();
  const startup = startupRaw.trim();

  const idx = parts.findIndex(p => norm(p) === norm(startup));
  if (idx === -1) {
    throw new Error(
      `Didn't find the folder '${startup}' in the current path: ${cwd}\n` +
      `Enter the correct folder or adjust the value of --startup.`
    );
  }
  const nsParts = parts.slice(idx); 
  return nsParts.map(pascalCase).join(".");
};

// ---------- args ----------
let args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: crudcli <Entity> [ReturnType] --startup <RootFolderName>");
  process.exit(1);
}

const startupFlagValue = getFlagValue(args, "--startup");
if (!startupFlagValue) {
  console.error("❌ It's mandatory to inform --startup <RootFolderName> to mount the namespace.");
  process.exit(1);
}

args = stripFlagAndValue(args, "--startup");

const entityRaw = args[0];
if (!entityRaw) {
  console.error("Uso: crudcli <Entity> [ReturnType] --startup <RootFolderName>");
  process.exit(1);
}
const entity = pascalCase(entityRaw);
const returnType = args[1]

const cwd = process.cwd();
let namespace;
try {
  namespace = generateNamespaceFromStartup(cwd, startupFlagValue);
} catch (err) {
  console.error("❌ " + err.message);
  process.exit(1);
}

// ---------- names & paths ----------
const commandName = `${entity}Command`;
const handlerName = `${entity}CommandHandler`;

const commandPath = path.join(cwd, `${commandName}.cs`);
const handlerPath = path.join(cwd, `${handlerName}.cs`);

// ---------- templates ----------
const commandTemplate = `using MediatR;

namespace ${namespace}
{
    public record ${commandName}(
        // TODO: add properties for ${entity}
    ) : IRequest<${returnType}>;
}
`;

const handlerTemplate = `using MediatR;

namespace ${namespace}
{
    public class ${handlerName} : IRequestHandler<${commandName}, ${returnType}>
    {
        public ${handlerName}()
        {
        }

        public async Task<${returnType}> Handle(${commandName} request, CancellationToken cancellationToken)
        {
            // TODO: implement ${entity}
            throw new NotImplementedException();
        }
    }
}
`;

// ---------- write ----------
const writeFile = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.error(`❌ File already exists: ${filePath}`);
    return false;
  }
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log(`✅ Created: ${filePath}`);
  return true;
};

writeFile(commandPath, commandTemplate);
writeFile(handlerPath, handlerTemplate);
