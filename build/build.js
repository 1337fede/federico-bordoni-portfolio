const fs = require("fs");
const path = require("path");
const marked = require("marked");

const DATA_ROOT = "/media/fede-ubuntu/STORAGE/CW";

// ---------------- DATA ----------------
const data = JSON.parse(
    fs.readFileSync(
        path.join(DATA_ROOT, "_assets/events.json"),
        "utf-8"
    )
);


// ---------------- TEMPLATE ----------------
const template = fs.readFileSync(
    path.join(__dirname, "../src/index.template.html"),
    "utf-8"
);

// ---------------- HELPERS ----------------
function resolveDescription(desc) {
    if (!desc) return "";
    desc = desc.trim();

    if (desc.startsWith("@file ")) {
        const filePath = desc.replace("@file ", "").trim();
        return fs.readFileSync(
            path.join(DATA_ROOT, filePath),
            "utf-8"
        );
    }

    return desc;
}

function getVimeoEmbed(url) {
    if (!url) return null;
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (!match) return null;
    return `https://player.vimeo.com/video/${match[1]}`;
}

// ---------------- FILTER ----------------
const projects = data
    .filter(e => e.entrytype === "projects")
    .sort((a, b) => (b.enddate || "").localeCompare(a.enddate || ""));

// ---------------- BUILD SLIDES ----------------
let slides = "";   // ✔ FIXED (was missing)

for (const project of projects) {

    // ---------------- VIDEO ----------------
    let videoHTML = "";

    if (project["local-content"]) {
        videoHTML = `
<video class="project-video" controls muted preload="metadata">
    <source src="${project["local-content"]}" type="video/mp4">
</video>`;
    }

    else if (project.qr) {
        const embedURL = getVimeoEmbed(project.qr);

        if (embedURL) {
            videoHTML = `
<iframe class="project-video"
    src="${embedURL}?controls=1&autopause=1&muted=1"
    allowfullscreen>
</iframe>`;
        }
    }

    // ---------------- MARKDOWN ----------------
    const description = marked.parse(
        resolveDescription(project.description || "")
    );

    const tasks = marked.parse(
        resolveDescription(project.tasks || "")
    );

    // ---------------- SLIDE ----------------
    slides += `
<section>
    <div class="split-slide">

        <div class="left">
            ${videoHTML}
        </div>

        <div class="right">

            <div class="keyvaluegaps">
                <span class="dates">
                    ${project.startdate} → ${project.enddate}
                </span>
            </div>

            <div class="projectname">
                ${project.event}
            </div>

            <div class="keyvaluegaps">
                <div class="description">
                    ${description}
                </div>
            </div>

            <div class="keyvaluegaps">
                <span class="body">LOCATION:</span>
                <span class="location">${project.location ?? ""}</span>
            </div>

            <div class="keyvaluegaps">
                <p><span class="body">SPONSORS:</span></p>
                <span class="sponsors">
                    ${(project.sponsors ?? "")
                        .split("/")
                        .map(s => s.trim())
                        .join("<br>")}
                </span>
            </div>

            ${tasks ? `
            <div class="keyvaluegaps">
                <p><span class="body">MAIN TASKS:</span></p>
                <div class="tasks">
                    ${tasks}
                </div>
            </div>
            ` : ""}

        </div>

    </div>
</section>
`;
}

// ---------------- FINAL OUTPUT ----------------
const finalHTML = template.replace("{{SLIDES}}", slides);

// ---------------- WRITE FILE ----------------
fs.mkdirSync(path.join(__dirname, "../dist"), { recursive: true });

fs.copyFileSync(
    path.join(__dirname, "../src/styles.css"),
    path.join(__dirname, "../dist/styles.css")
);

fs.writeFileSync(
    path.join(__dirname, "../dist/index.html"),
    finalHTML
);

fs.cpSync(
    path.join(DATA_ROOT, "_assets/fonts"),
    path.join(__dirname, "../dist/fonts"),
    { recursive: true }
);

console.log("✔ build complete → dist/index.html");