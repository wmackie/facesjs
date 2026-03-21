import override from "./override.js";
import svgs from "./svgs.js";
import { FaceConfig, Overrides } from "./common.js";

const addWrapper = (svgString: string) => `<g>${svgString}</g>`;

const addTransform = (element: SVGGraphicsElement, newTransform: string) => {
  const oldTransform = element.getAttribute("transform");
  element.setAttribute(
    "transform",
    `${oldTransform ? `${oldTransform} ` : ""}${newTransform}`,
  );
};

const rotateCentered = (element: SVGGraphicsElement, angle: number) => {
  const bbox = element.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  addTransform(element, `rotate(${angle} ${cx} ${cy})`);
};

const scaleStrokeWidthAndChildren = (
  element: SVGGraphicsElement,
  factor: number,
) => {
  if (element.tagName === "style") {
    return;
  }

  const strokeWidth = element.getAttribute("stroke-width");
  if (strokeWidth) {
    element.setAttribute(
      "stroke-width",
      String(parseFloat(strokeWidth) / factor),
    );
  }
  const children = element.childNodes as unknown as SVGGraphicsElement[];
  for (let i = 0; i < children.length; i++) {
    scaleStrokeWidthAndChildren(children[i], factor);
  }
};

// Scale relative to the center of bounding box of element e, like in Raphael.
// Set x and y to 1 and this does nothing. Higher = bigger, lower = smaller.
const scaleCentered = (element: SVGGraphicsElement, x: number, y: number) => {
  const bbox = element.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const tx = (cx * (1 - x)) / x;
  const ty = (cy * (1 - y)) / y;

  addTransform(element, `scale(${x} ${y}) translate(${tx} ${ty})`);

  // Keep apparent stroke width constant, similar to how Raphael does it (I think)
  if (
    Math.abs(x) !== 1 ||
    Math.abs(y) !== 1 ||
    Math.abs(x) + Math.abs(y) !== 2
  ) {
    const factor = (Math.abs(x) + Math.abs(y)) / 2;
    scaleStrokeWidthAndChildren(element, factor);
  }
};

// Translate element such that its center is at (x, y). Specifying xAlign and yAlign can instead make (x, y) the left/right and top/bottom.
const translate = (
  element: SVGGraphicsElement,
  x: number,
  y: number,
  xAlign = "center",
  yAlign = "center",
) => {
  const bbox = element.getBBox();
  let cx;
  let cy;
  if (xAlign === "left") {
    cx = bbox.x;
  } else if (xAlign === "right") {
    cx = bbox.x + bbox.width;
  } else {
    cx = bbox.x + bbox.width / 2;
  }
  if (yAlign === "top") {
    cy = bbox.y;
  } else if (yAlign === "bottom") {
    cy = bbox.y + bbox.height;
  } else {
    cy = bbox.y + bbox.height / 2;
  }

  addTransform(element, `translate(${x - cx} ${y - cy})`);
};

// Defines the range of fat/skinny, relative to the original width of the default head.
const fatScale = (fatness: number) => 0.8 + 0.2 * fatness;

// Y position (in 400x600 viewBox coords) below which hair remains visible when a hat is worn.
// Hair above this line is clipped by the hat; hair that falls below (sides, back, long styles) shows through.
const HAT_HAIR_CLIP_Y: Partial<Record<string, number>> = {
  fedora: 210,
  beret: 230,
  "stealth-beanie": 241,
};

type FeatureInfo = {
  name: Exclude<keyof FaceConfig, "fatness" | "teamColors">;
  positions: [null] | [number, number][];
  scaleFatness?: true;
};

const drawFeature = (
  svg: SVGSVGElement,
  face: FaceConfig,
  info: FeatureInfo,
) => {
  const feature = face[info.name];
  if (!feature || !svgs[info.name]) {
    return;
  }
  const hatClipY = HAT_HAIR_CLIP_Y[face.accessories.id];
  const isHairLayer = info.name === "hair" || info.name === "hairBg";

  // @ts-expect-error
  const baseRawSVG = svgs[info.name][feature.id];
  if (!baseRawSVG) {
    return;
  }

  const applyColorTokens = (svgString: string) => {
    // @ts-expect-error
    if (feature.shave) {
      // @ts-expect-error
      svgString = svgString.replace("$[faceShave]", feature.shave);
      // @ts-expect-error
      svgString = svgString.replace("$[headShave]", feature.shave);
    }
    return svgString
      .replace("$[skinColor]", face.body.color)
      .replace(/\$\[outerwearColor\]/g, face.outerwear.color)
      .replace(/\$\[hairColor\]/g, face.hair.color)
      .replace(/\$\[primary\]/g, face.teamColors[0])
      .replace(/\$\[secondary\]/g, face.teamColors[1])
      .replace(/\$\[accent\]/g, face.teamColors[2]);
  };

  const featureSVGString = applyColorTokens(baseRawSVG);

  const bodySize = face.body.size !== undefined ? face.body.size : 1;

  for (let i = 0; i < info.positions.length; i++) {
    // Check for directional (-left / -right) variants for paired features like eyes.
    // If found, use the explicit variant SVG and skip mirroring for the right side.
    const dirSuffix = i === 0 ? "-left" : "-right";
    // @ts-expect-error
    const dirRawSVG = svgs[info.name]?.[feature.id + dirSuffix];
    const hasDirectionalVariant = !!dirRawSVG;
    const svgStringForPosition = hasDirectionalVariant
      ? applyColorTokens(dirRawSVG)
      : featureSVGString;

    svg.insertAdjacentHTML("beforeend", addWrapper(svgStringForPosition));

    if (hatClipY !== undefined && isHairLayer) {
      (svg.lastChild as Element).setAttribute(
        "clip-path",
        "url(#hat-hair-clip)",
      );
    }

    const position = info.positions[i];

    if (position !== null) {
      // Special case, for the pinocchio nose it should not be centered but should stick out to the left or right
      let xAlign;
      if (feature.id === "nose4" || feature.id === "pinocchio") {
        // @ts-expect-error
        xAlign = feature.flip ? "right" : "left";
      } else {
        xAlign = "center";
      }

      translate(
        svg.lastChild as SVGGraphicsElement,
        position[0],
        position[1],
        xAlign,
      );
    }

    if (feature.hasOwnProperty("angle")) {
      // @ts-expect-error
      rotateCentered(svg.lastChild, (i === 0 ? 1 : -1) * feature.angle);
    }

    // Flip if feature.flip is specified or if this is the second position (for eyes and eyebrows). Scale if feature.size is specified.
    // Skip mirroring if an explicit -right variant was used (it's already drawn for the correct side).
    // @ts-expect-error
    const scale = feature.hasOwnProperty("size") ? feature.size : 1;
    if (
      info.name === "body" ||
      info.name === "jersey" ||
      info.name === "outerwear"
    ) {
      // @ts-expect-error
      scaleCentered(svg.lastChild, bodySize, 1);
      // @ts-expect-error
    } else if ((feature.flip || i === 1) && !hasDirectionalVariant) {
      // @ts-expect-error
      scaleCentered(svg.lastChild, -scale, scale);
    } else if (scale !== 1) {
      // @ts-expect-error
      scaleCentered(svg.lastChild, scale, scale);
    }

    if (info.scaleFatness && info.positions[0] !== null) {
      // Scale individual feature relative to the edge of the head. If fatness is 1, then there are 47 pixels on each side. If fatness is 0, then there are 78 pixels on each side.
      const distance = (78 - 47) * (1 - face.fatness);
      // @ts-expect-error
      translate(svg.lastChild, distance, 0, "left", "top");
    }
  }

  if (
    info.scaleFatness &&
    info.positions.length === 1 &&
    info.positions[0] === null
  ) {
    // @ts-expect-error
    scaleCentered(svg.lastChild, fatScale(face.fatness), 1);
  }
};

export const display = (
  container: HTMLElement | string | null,
  face: FaceConfig,
  overrides?: Overrides,
): void => {
  override(face, overrides);

  const containerElement =
    typeof container === "string"
      ? document.getElementById(container)
      : container;
  if (!containerElement) {
    throw new Error("container not found");
  }
  containerElement.innerHTML = "";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("version", "1.2");
  svg.setAttribute("baseProfile", "tiny");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 400 600");
  svg.setAttribute("preserveAspectRatio", "xMinYMin meet");

  // Needs to be in the DOM here so getBBox will work
  containerElement.appendChild(svg);

  // Inject a clipPath used to show only the below-brim portion of hair when a hat is worn.
  const hatClipY = HAT_HAIR_CLIP_Y[face.accessories.id];
  if (hatClipY !== undefined) {
    svg.insertAdjacentHTML(
      "beforeend",
      `<defs><clipPath id="hat-hair-clip"><rect x="-200" y="${hatClipY}" width="800" height="${800 - hatClipY}"/></clipPath></defs>`,
    );
  }

  const featureInfos: FeatureInfo[] = [
    {
      name: "hairBg",
      positions: [null],
      scaleFatness: true,
    },
    {
      name: "outerwearBg",
      positions: [null],
    },
    {
      name: "body",
      positions: [null],
    },
    {
      name: "jersey",
      positions: [null],
    },
    {
      name: "outerwear",
      positions: [null],
    },
    {
      name: "ear",
      positions: [
        [55, 325] as [number, number],
        [345, 325] as [number, number],
      ],
      scaleFatness: true,
    },
    {
      name: "head",
      positions: [null], // Meaning it just gets placed into the SVG with no translation
      scaleFatness: true,
    },
    {
      name: "eyeLine",
      positions: [null],
    },
    {
      name: "smileLine",
      positions: [
        [150, 435],
        [250, 435],
      ],
    },
    {
      name: "miscLine",
      positions: [null],
    },
    {
      name: "facialHair",
      positions: [null],
      scaleFatness: true,
    },
    {
      name: "eye",
      positions: [
        [140, 310],
        [260, 310],
      ],
    },
    {
      name: "eyebrow",
      positions: [
        [140, 270],
        [260, 270],
      ],
    },
    {
      name: "mouth",
      positions: [[200, 440]],
    },
    {
      name: "nose",
      positions: [[200, 370]],
    },
    {
      name: "hair",
      positions: [null],
      scaleFatness: true,
    },
    {
      name: "glasses",
      positions: [null],
      scaleFatness: true,
    },
    {
      name: "accessories",
      positions: [null],
      scaleFatness: true,
    },
  ];

  for (const info of featureInfos) {
    drawFeature(svg, face, info);
  }
};
