import fs from "node:fs";
import path from "node:path";
import { optimize } from "svgo";

const warning =
  "// THIS IS A GENERATED FILE, DO NOT EDIT BY HAND!\n// See tools/process-svgs.js";

/**
 * Parse gender and base key from a filename (without .svg extension).
 *
 * Convention:
 *   name.male.svg   → key="name", gender="male"
 *   name.female.svg → key="name", gender="female"
 *   name.both.svg   → key="name", gender="both"  (explicit)
 *   name.svg        → key="name", gender="both"  (default)
 *
 * Directional variants (-left / -right) carry no gender suffix since they are
 * never selected by generate.ts — display.ts looks them up directly.
 */
const parseFilename = (basename) => {
  for (const g of ["male", "female", "both"]) {
    if (basename.endsWith(`.${g}`)) {
      return { key: basename.slice(0, -(g.length + 1)), gender: g };
    }
  }
  return { key: basename, gender: "both" };
};

const isDirectionalVariant = (name) =>
  name.endsWith("-left") || name.endsWith("-right");

const processSVGs = async () => {
  const svgFolder = path.join(import.meta.dirname, "..", "..", "svgs");

  const folders = fs.readdirSync(svgFolder);

  const svgs = {};
  // gender map: layer → { key → gender }
  const genderMap = {};

  for (const folder of folders) {
    if (folder === ".DS_Store") continue;
    svgs[folder] = {};
    genderMap[folder] = {};

    const subfolder = path.join(svgFolder, folder);
    const files = fs.readdirSync(subfolder);
    for (const file of files) {
      if (!file.endsWith(".svg")) continue;
      const basename = path.basename(file, ".svg");
      const { key, gender } = parseFilename(basename);

      const contents = fs.readFileSync(path.join(subfolder, file), "utf8");
      const result = await optimize(contents, {
        multipass: true,
        plugins: [
          "preset-default",
          {
            name: "inlineStyles",
            params: {
              onlyMatchedOnce: false,
            },
          },

          // After inlineStyles, any remaining classes are extraneous and should
          // be deleted to avoid conflicts.
          {
            name: "removeAttrs",
            params: {
              attrs: "(class)",
            },
          },
        ],
      });

      svgs[folder][key] = result.data
        .replace(/.*<svg.*?>/, "")
        .replace("</svg>", "");

      genderMap[folder][key] = gender;
    }
  }

  fs.writeFileSync(
    path.join(import.meta.dirname, "..", "..", "src", "svgs.ts"),
    `${warning}\n\nexport default ${JSON.stringify(svgs)};`,
  );

  // Build svgsIndex (selectable feature IDs — exclude directional variants)
  // and svgsGenders (parallel array of genders).
  const svgsIndex = {};
  const svgsGenders = {};

  for (const folder of Object.keys(svgs)) {
    const names = Object.keys(svgs[folder]).filter(
      (name) => !isDirectionalVariant(name),
    );
    svgsIndex[folder] = names;
    svgsGenders[folder] = names.map((n) => genderMap[folder][n]);
  }

  fs.writeFileSync(
    path.join(import.meta.dirname, "..", "..", "src", "svgs-index.ts"),
    `${warning}\n\nexport const svgsIndex = ${JSON.stringify(
      svgsIndex,
    )} as const;\n\nexport const svgsGenders = ${JSON.stringify(svgsGenders)} as const;`,
  );

  console.log(
    `Wrote new src/svgs.ts and src/svgs-index.ts at ${new Date().toLocaleTimeString()}`,
  );
};

export { processSVGs };
