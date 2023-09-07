const fs = require("fs");
const { Native } = require("cfx-natives/scripts/Native");
const { header } = require("cfx-natives/scripts/header");

const debugNatives = [
    "0x3FEF770D40960D5A",
    "0xECB2FC7235A7D137",
    "0xEEF059FAD016D209",
    "0x2975C866E6713290",
    "0xA6E9C38DB51D7748",
    "0xBE8CD9BE829BBEBF",
    "0x7B3703D2D32DFA18",
    "0xC906A7DAB05C8D2B",
    "0x8BDC7BFC57A81E76",
    "0x9E82F0F362881B29"
]
const bDebug = false;

function generateNatives() {
    const path = "./bin/natives.json";
    if (!fs.existsSync(path)) throw new Error(`File ${path} not found`);
    const nativeDB = JSON.parse(fs.readFileSync(path, "utf8"));
    const allNatives = new Array();

    for (const [namespace, natives] of Object.entries(nativeDB)) {
        for (const [hash, native] of Object.entries(natives)) {
            native.hash = hash;
            native.namespace = namespace;
            allNatives.push(native);
        }
    }

    // Sort by name
    allNatives.sort((a, b) => {
        if (a.nativeName > b.nativeName) {
            return 1;
        } else {
            return -1;
        }
    });

    let output = header;
    allNatives.forEach((nativeInfo) => {
        if (bDebug && !debugNatives.includes(nativeInfo.hash)) return;
        if (nativeInfo.namespace != "CFX") return;
        if (nativeInfo.apiset != "server") return;
        const native = new Native(nativeInfo);
        output = output.concat(native.generate());
    });

    if (!fs.existsSync("./src")) {
        fs.mkdirSync("./src");
    }
    fs.writeFileSync("./src/serverNatives.ts", output);

}

generateNatives();