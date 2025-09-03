import { parse } from "node-html-parser";

const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)";

class YoutubeTranscriptError extends Error {
    constructor(message: string) {
        super(`[YoutubeTranscript] ${message}`);
    }
}

type YtFetchConfig = {
    lang?: string; // Object with lang param (eg: en, es, hk, uk) format.
};

async function fetchTranscript(videoId: string, config: YtFetchConfig = {}) {
    console.log("fetchTranscript called with videoId:", videoId);
    const identifier = extractYouTubeID(videoId);
    console.log("Extracted identifier:", identifier);
    
    if (!identifier) {
        throw new Error("Invalid YouTube video ID or URL");
    }
    
    const lang = config?.lang ?? "en";
    try {
        console.log(`Fetching YouTube page for video: ${identifier}`);
        const transcriptUrl = await fetch(
            `https://www.youtube.com/watch?v=${identifier}`,
            {
                headers: {
                    "User-Agent": USER_AGENT,
                },
            }
        )
            .then((res) => {
                console.log(`YouTube page fetch status: ${res.status}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch YouTube page: ${res.status}`);
                }
                return res.text();
            })
            .then((html) => {
                console.log(`HTML length: ${html.length}`);
                return parse(html);
            })
            .then((html) => parseTranscriptEndpoint(html, lang));

        if (!transcriptUrl) {
            throw new Error("Failed to locate a transcript for this video!");
        }

        console.log("Found transcript URL:", transcriptUrl);

        // Result is hopefully some XML.
        const transcriptXML = await fetch(transcriptUrl)
            .then((res) => {
                console.log(`Transcript XML fetch status: ${res.status}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch transcript XML: ${res.status}`);
                }
                return res.text();
            })
            .then((xml) => {
                console.log(`Transcript XML length: ${xml.length}`);
                return parse(xml);
            });

        const chunks = transcriptXML.getElementsByTagName("text");
        console.log(`Found ${chunks.length} transcript chunks`);

        let transcriptions = [];
        for (const chunk of chunks) {
            try {
                const rawAttrs = chunk.rawAttrs || "";
                const [offset, duration] = rawAttrs.split(" ");
                transcriptions.push({
                    text: chunk.text || chunk.innerHTML || "",
                    offset: offset ? convertToMs(offset) : 0,
                    duration: duration ? convertToMs(duration) : 0,
                });
            } catch (chunkError) {
                console.warn("Error processing chunk:", chunkError);
                // Continue with other chunks
            }
        }
        
        console.log(`Successfully parsed ${transcriptions.length} transcript entries`);
        return transcriptions;
    } catch (e: any) {
        console.error("fetchTranscript error:", e);
        throw new YoutubeTranscriptError(e.message || e);
    }
}

function convertToMs(text: string) {
    const float = parseFloat(text.split("=")[1].replace(/"/g, "")) * 1000;
    return Math.round(float);
}

function parseTranscriptEndpoint(document: any, langCode?: string) {
    try {
        // Get all script tags on document page
        const scripts = document.getElementsByTagName("script");
        console.log(`Found ${scripts.length} script tags`);

        // Try multiple patterns for finding the player data
        let playerScript = scripts.find((script: any) =>
            script.textContent?.includes("var ytInitialPlayerResponse = {")
        );

        if (!playerScript) {
            playerScript = scripts.find((script: any) =>
                script.textContent?.includes("ytInitialPlayerResponse")
            );
        }

        if (!playerScript) {
            console.error("Could not find ytInitialPlayerResponse script");
            return null;
        }

        console.log("Found player script");
        
        let dataString = "";
        const scriptContent = playerScript.textContent || "";
        
        // Try different parsing methods
        if (scriptContent.includes("var ytInitialPlayerResponse = {")) {
            dataString = scriptContent
                .split("var ytInitialPlayerResponse = ")[1]
                ?.split("};")[0] + "}";
        } else if (scriptContent.includes("ytInitialPlayerResponse\":")) {
            const match = scriptContent.match(/ytInitialPlayerResponse":\s*({.*?})\s*[,}]/);
            if (match) {
                dataString = match[1];
            }
        }

        if (!dataString) {
            console.error("Could not extract player response data");
            return null;
        }

        console.log("Attempting to parse JSON data...");
        const data = JSON.parse(dataString.trim());
        
        const availableCaptions =
            data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
        
        console.log(`Found ${availableCaptions.length} caption tracks`);

        if (availableCaptions.length === 0) {
            console.log("No captions available for this video");
            return null;
        }

        // If languageCode was specified then search for it's code, otherwise get the first.
        let captionTrack = availableCaptions[0];
        if (langCode) {
            const foundTrack = availableCaptions.find((track: any) =>
                track.languageCode?.includes(langCode)
            );
            if (foundTrack) {
                captionTrack = foundTrack;
            }
        }

        console.log(`Using caption track: ${captionTrack?.languageCode || 'unknown'}`);
        return captionTrack?.baseUrl;
    } catch (e: any) {
        console.error(`parseTranscriptEndpoint Error: ${e.message}`);
        console.error(`Stack: ${e.stack}`);
        return null;
    }
}

export function extractYouTubeID(urlOrID: string): string | null {
    // Regular expression for YouTube ID format
    const regExpID = /^[a-zA-Z0-9_-]{11}$/;

    // Check if the input is a YouTube ID
    if (regExpID.test(urlOrID)) {
        return urlOrID;
    }

    // Regular expression for standard YouTube links
    const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

    // Regular expression for YouTube Shorts links
    const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

    // Check for standard YouTube link
    const matchStandard = urlOrID.match(regExpStandard);

    if (matchStandard) {
        return matchStandard[1];
    }

    // Check for YouTube Shorts link
    const matchShorts = urlOrID.match(regExpShorts);
    if (matchShorts) {
        return matchShorts[1];
    }

    // Return null if no match is found
    return null;
}

export { fetchTranscript, YoutubeTranscriptError };