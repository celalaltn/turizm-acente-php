const fs = require("fs");
const path = require("path");

const outDir = path.resolve(__dirname, "..", "out");

const isInsideNextDir = (filePath) => {
  const normalized = filePath.replace(/\\/g, "/");
  return normalized.includes("/_next/") || normalized.includes("/.next/");
};

const copyIfMissing = (sourcePath, targetPath) => {
  if (fs.existsSync(targetPath)) {
    return;
  }
  fs.copyFileSync(sourcePath, targetPath);
};

const copyWithPrefixes = (sourcePath, targetDir, baseName) => {
  const doubleUnderscore = `__next.${baseName}.txt`;
  const singleUnderscore = `_next.${baseName}.txt`;
  copyIfMissing(sourcePath, path.join(targetDir, doubleUnderscore));
  copyIfMissing(sourcePath, path.join(targetDir, singleUnderscore));
};

const walk = (dir, onEntry) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    onEntry(fullPath, entry);
    if (entry.isDirectory()) {
      walk(fullPath, onEntry);
    }
  });
};

if (!fs.existsSync(outDir)) {
  console.warn("out directory not found:", outDir);
  process.exit(0);
}

walk(outDir, (fullPath, entry) => {
  if (isInsideNextDir(fullPath)) {
    return;
  }

  if (entry.isFile() && entry.name.startsWith("__next") && entry.name.endsWith(".txt")) {
    const targetName = `_${entry.name.slice(1)}`;
    const targetPath = path.join(path.dirname(fullPath), targetName);
    copyIfMissing(fullPath, targetPath);
    return;
  }

  if (entry.isDirectory() && entry.name.startsWith("__next.")) {
    const parentDir = path.dirname(fullPath);
    const rootName = entry.name.slice("__next.".length);

    walk(fullPath, (nestedPath, nestedEntry) => {
      if (!nestedEntry.isFile() || !nestedPath.endsWith(".txt")) {
        return;
      }

      const relPath = path
        .relative(fullPath, nestedPath)
        .replace(/\\/g, "/")
        .replace(/\.txt$/, "");

      const parts = relPath.split("/").filter(Boolean);
      if (parts.length === 0) {
        return;
      }

      const targetBase = `${rootName}.${parts.join(".")}`;
      copyWithPrefixes(nestedPath, parentDir, targetBase);
    });
  }
});
