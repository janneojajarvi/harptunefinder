// Copyright: Janne Ojajärvi
// www.huuliharppu.fi
// www.janneojajarvi.com
window.harpLibrary = [];

async function loadGistData() {

    const loaderContainer = document.getElementById("loader-container");
    const loaderBar = document.getElementById("loader-bar");
    const loaderPercent = document.getElementById("loader-percent");

    loaderContainer.style.display = "block";
// Haetaan nuotit tietokannoista session.org ja FolkWiki
    const urls = [
        "sessionSet01.js",
    "sessionSet05.js",
    "sessionSet06.js",
    "sessionSet07.js",
    "sessionSet08.js",
    "sessionSet09.js",
    "sessionSet10.js",
    "sessionSet11.js",
    "sessionSet12.js",
    "sessionSet13.js",
    "sessionSet14.js",
    "sessionSet15.js",
    "sessionSet16.js",
    "sessionSet17.js",
    "sessionSet18.js",
    "extrasetti5.js",
    "folkwikiSet1.js",
    "folkwikiSet2.js",
    "folkwikiSet3.js"
    ];

    let loaded = 0;
    const total = urls.length;
    let allData = [];
    let favorites = [];
    try {
    const saved = localStorage.getItem('myFavorites');
    
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
        favorites = parsed;
    }
} catch (e) {
    console.error("Suosikkien lataus epäonnistui, alustetaan tyhjäksi.");
    favorites = [];
}

    const promises = urls.map(url =>
        fetch(url)
            .then(res => res.text())
            .then(text => {

                const startIdx = text.indexOf('[');
                const endIdx = text.lastIndexOf(']');

                if (startIdx !== -1 && endIdx !== -1) {

                    const rawList = text.substring(startIdx, endIdx + 1);
                    const data = eval(rawList);

                    allData = allData.concat(data);
                }

                loaded++;

                const percent = Math.round((loaded / total) * 100);
                loaderBar.style.width = percent + "%";
                loaderPercent.innerText = percent + "%";

            })
            .catch(err => {
                console.error("Virhe ladattaessa:", url, err);
            })
    );

    await Promise.all(promises);

    window.harpLibrary = allData;

    loaderPercent.innerText = "Valmis! / Ready!";

    setTimeout(() => {
        loaderContainer.style.display = "none";
    }, 800);

    console.log("KAIKKI LADATTU:", window.harpLibrary.length);
}


loadGistData();

window.onload = function() {
    console.log("Sivu ladattu, haku valmiina heti kun Gistit saapuvat.");
    
      // --- KIELIPAKETTI ---
    const translations = {
        fi: {
        settings: "Säädöt & Toiminnot",  
        filter: "Suodatus:",
        filterEasy: "Ilman taivutuksia (✅)",
        filterAll: "Kaikki kappaleet (sis. taivutukset)",
        searchPlaceholder: "Hae biisiä...",
        play: "Soita",
        favPlaceholder: "-- Omat suosikit ❤️ --",
        modalTitle: "Huuliharpun tabulatuurien lukuohje",
        modalFooter: "Varmista, että käytät oikeaa harppua (esim. C-duuri), jotta numerot täsmäävät melodiaan. Kaikki tämän työkalun suositellut harput ovat duuriharppuja",
        instr: [
            "<strong>Plusmerkki (+4):</strong> Puhalla kyseiseen reikään.",
            "<strong>Miinusmerkki (-4):</strong> Ime kyseisestä reiästä.",
            "<strong>Heittomerkki (-4'):</strong> Puolisävelaskeleen taivutus (bend).",
            "<strong>2 tai 3 heittomerkkiä (-3'' tai 3'''):</strong> Kokosävelaskeleen tai 1,5 sävelaskeleen taivutus.",
            "<strong>o-kirjain (+4o):</strong> Ylitaivutus."
        ],
        msgSearching: "Haetaan...",  
            statusKey: "Sävellaji", 
            statusRec: "Suositus", 
            statusHarpSuffix: "-harppu", 
            msgRandomizing: "Arvotaan sopivaa kappaletta...",
        msgNotFound: "Ei löytynyt puhdasta biisiä, kokeile uudestaan.",
        msgNotFoundSrch: "Ei löytynyt sopivia kappaleita.",
        msgDone: "Valmis!",
        msgSearchDone: "Haku valmis!",
        msgError: "Virhe.",
        msgDeleteConfirm: "Poistetaanko",
        msgAnalyzing: "Analysoidaan tuloksia...",
            lib: "Kirjasto & Haku",
            sources: "Lähteet: TheSession & FolkWiki",
            search: "Etsi",
            random: "🎲 Arvo",
            harp: "Huuliharppu",
            tempo: "Tempo (BPM)",
            delete: "Poista",
            info: "ℹ️ Ohje",
            placeholder: "Kirjoita tai liitä ABC-koodi tähän...",
            statusKey: "Sävellaji",
            statusRec: "Suositus",
            shareBtn: "🔗 Jaa",
        shareTitle: "HarpTuneFinder",
        shareText: "Löysin kätevän työkalun huuliharppukappaleiden etsintään tabulatuurien kera!",
        shareCopy: "Linkki kopioitu leikepöydälle!",
        statusKey: "Sävellaji",
        statusRec: "Suositus"
        },
        en: {
        settings: "Settings & Functions",
        filter: "Filter:",
        filterEasy: "No bends (✅)",
        filterAll: "All songs (incl. bends)",
        searchPlaceholder: "Search tune...",
        play: "Play",
        favPlaceholder: "-- My Saved Tunes 💟 --",
        modalTitle: "How to Read Harmonica Tabs",
        modalFooter: "Make sure you use the correct harp (e.g., C major) so the numbers match the melody. All recommended harps in this tool are in major key.",
        instr: [
            "<strong>Plus sign (+4):</strong> Blow into the hole.",
            "<strong>Minus sign (-4):</strong> Draw from the hole.",
            "<strong>Apostrophe (-4'):</strong> Half-step bend.",
            "<strong>Two apostrophes (-3''):</strong> Whole-step bend.",
            "<strong>Three apostrophes (-3'''):</strong> 1,5-step bend.",
            "<strong>Letter o (+4o):</strong> Overbend."
        ],
        msgSearching: "Searching...",
        statusKey: "Key", 
            statusRec: "Recommended", 
            statusHarpSuffix: " harp",
        msgRandomizing: "Picking a random song...",
        msgNotFound: "No clean song found, try again.",
        msgNotFoundSrch: "No matching songs found.",
        msgDone: "Done!",
        msgSearchDone: "Search done!",
        msgError: "Error.",
        msgDeleteConfirm: "Delete",
        msgAnalyzing: "Analyzing results...",
            lib: "Library & Search",
            sources: "Sources: TheSession & FolkWiki",
            search: "Search",
            random: "🎲 Random",
            harp: "Harmonica",
            tempo: "Tempo (BPM)",
            delete: "Delete",
            info: "ℹ️ Info",
            placeholder: "Type or paste ABC code here...",
            statusKey: "Key",
            statusRec: "Recommended",
            shareBtn: "🔗 Share",
        shareTitle: "HarpTuneFinder",
        shareText: "Check out this handy tool for harmonica tabs and sheet music!",
        shareCopy: "Link copied to clipboard!",
        statusKey: "Key",
        statusRec: "Recommended"
        }
    };
    
    // Copyright: Janne Ojajärvi www.huuliharppu.fi

    function updateLanguage(lang) {
        const t = translations[lang];
                
        localStorage.setItem('prefLang', lang);
        
        if(document.getElementById('labelSettings')) document.getElementById('labelSettings').innerText = t.settings;
        if(document.getElementById('labelFilter')) document.getElementById('labelFilter').innerHTML = `<strong>${t.filter}</strong>`;
        if(document.getElementById('playBtn')) document.getElementById('playBtn').innerText = t.play;
        if(document.getElementById('labelLibrary')) document.getElementById('labelLibrary').innerText = t.lib;
        if(document.getElementById('labelSources')) 
    document.getElementById('labelSources').innerText = t.sources;
        if(document.getElementById('searchInput')) document.getElementById('searchInput').placeholder = t.searchPlaceholder;
        if(document.getElementById('modalTitle')) document.getElementById('modalTitle').innerText = t.modalTitle;
        if(document.getElementById('modalFooter')) document.getElementById('modalFooter').innerText = t.modalFooter;
        if(document.getElementById('searchBtn')) document.getElementById('searchBtn').innerText = t.search;
        if(document.getElementById('randomBtn')) document.getElementById('randomBtn').innerText = t.random;
        if(document.getElementById('labelHarp')) document.getElementById('labelHarp').innerText = t.harp;
        if(document.getElementById('labelTempo')) document.getElementById('labelTempo').innerText = t.tempo;
        if(document.getElementById('deleteFavBtn')) document.getElementById('deleteFavBtn').innerText = t.delete;
        if(document.getElementById('infoBtn')) document.getElementById('infoBtn').innerText = t.info;
        if(document.getElementById('shareAppBtn')) {
    // Käytetään t.shareBtn, joka sisältää jo ikonisi (🔗 Jaa / 🔗 Share)
    document.getElementById('shareAppBtn').innerText = t.shareBtn;
}
        if(document.getElementById('abcInput')) document.getElementById('abcInput').placeholder = t.placeholder;

// Alasvetovalikot (Select options)
    const fs = document.getElementById('filterSelect');
    if(fs) {
        fs.options[0].text = t.filterEasy;
        fs.options[1].text = t.filterAll;
    }
    
    const favs = document.getElementById('favoritesSelect');
    if(favs) favs.options[0].text = t.favPlaceholder;

    
    const list = document.getElementById('instructionsList');
    if(list) {
        list.innerHTML = t.instr.map(item => `<li>${item}</li>`).join('');
    }


      
    }

    // Kytketään napit
    document.getElementById('langFi').onclick = () => updateLanguage('fi');
    document.getElementById('langEn').onclick = () => updateLanguage('en');

    // Ladataan tallennettu kieli tai oletus
    const savedLang = localStorage.getItem('prefLang') || 'fi';
    updateLanguage(savedLang);

    // --- ELEMENTTIEN HAKU ---
    const abcInput = document.getElementById('abcInput');
   const statusDisplay = document.querySelector('.status-bar');
    const harpKeySelect = document.getElementById('harpKey');
    const octaveDisplay = document.getElementById('octaveDisplay');
    const tempoRange = document.getElementById('tempoRange');
    const tempoDisplay = document.getElementById('tempoDisplay');
    const playBtn = document.getElementById('playBtn');
    const stopBtn = document.getElementById('stopBtn');
    const favoritesSelect = document.getElementById('favoritesSelect');
    const randomBtn = document.getElementById('randomBtn');
      // --- OHJE-IKKUNAN LOGIIKKA ---
    const modal = document.getElementById("infoModal");
    const infoBtn = document.getElementById("infoBtn");
    const closeSpan = document.getElementsByClassName("close")[0];

    // Avaa ikkuna
    infoBtn.onclick = () => { modal.style.display = "block"; }

    // Sulje ikkuna ruksista
    closeSpan.onclick = () => { modal.style.display = "none"; }

    // Sulje ikkuna klikkaamalla muualta kuin laatikosta
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // --- JAA-NAPIN TOIMINNALLISUUS ---
    const shareBtn = document.getElementById('shareAppBtn');
    if (shareBtn) {
        shareBtn.onclick = async () => {
            // Haetaan nykyinen kieli tallennetusta tiedosta tai oletuksesta
            const currentLang = localStorage.getItem('prefLang') || 'fi';
            const t = translations[currentLang];

            const shareData = {
                title: t.shareTitle,
                text: t.shareText,
                url: 'https://codepen.io/Janne-Ojaj-rvi/full/MYjXBLV'
            };

            // Yritetään käyttää selaimen omaa jakoa (mobiili)
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log("Jako peruutettiin");
                }
            } else {
                // Varajärjestelmä (tietokone): Kopioidaan linkki leikepöydälle
                try {
                    await navigator.clipboard.writeText(shareData.url);
                    alert(t.shareCopy);
                } catch (err) {
                    // Jos kopiointi epäonnistuu (esim. vanha selain)
                    alert("Kopioi tämä linkki: " + shareData.url);
                }
            }
        };
    }

      // --- DARK MODE LOGIIKKA ---
    const darkModeBtn = document.getElementById('darkModeToggle');
    
    // Tarkista onko käyttäjä jo aiemmin valinnut yötilan
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerText = "☀️";
    }

    darkModeBtn.onclick = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Tallennetaan valinta muistiin
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        darkModeBtn.innerText = isDark ? "☀️" : "🌙";
        
        // Päivitetään nuotit, jotta värit asettuvat oikein
        processAbc();
    };
// --- TULOSTUSLOGIIKKA ---
    const printBtn = document.getElementById('printBtn');
    
    printBtn.onclick = () => {
        // 1. Tarkistetaan onko yötila päällä
        const wasDarkMode = document.body.classList.contains('dark-mode');
        
        // 2. Jos oli yötila, poistetaan se hetkeksi
        if (wasDarkMode) {
            document.body.classList.remove('dark-mode');
            processAbc(); // Päivitetään nuotit vaaleiksi
        }
        
        // 3. Pieni viive, jotta selain ehtii piirtää vaaleat nuotit ennen tulostusikkunaa
        setTimeout(() => {
            window.print();
            
            // 4. Palautetaan yötila takaisin tulostusikkunan avaamisen jälkeen
            if (wasDarkMode) {
                document.body.classList.add('dark-mode');
                processAbc(); // Päivitetään nuotit takaisin tummiksi
            }
        }, 100);
    };
  

    // Copyright: Janne Ojajärvi www.huuliharppu.fi
    
    // --- MUUTTUJAT ---
    let octaveOffset = 0;
    let transposeOffset = 0;
    let lastProcessedAbc = "";
    let currentKeyAccidentals = {};
    let synthControl = null;
    let userHasSelectedHarp = false; // Estää automaattisen ylikirjoituksen

  
        // Optimointifunktio
    function autoOptimize() {
        let bestOctave = 0;
        let minScore = 999999;
        let harpShift = parseInt(harpKeySelect.value);

        // Testataan oktaavit -2, -1, 0, 1, 2
        [-2, -1, 0, 1, 2].forEach(testOffset => {
            let score = 0;
            abcInput.value.split('\n').forEach(line => {
                if (/^[A-Z]:/.test(line) || line.trim() === "") return;
                
                line.replace(/([\^_=]?)([A-Ga-gHh])([,']*)/g, (match, acc, note, octs) => {
                    let absPitch = getPitchValue(acc, note, octs);
                    // Laskenta suhteessa testattavaan oktaaviin
                    let relPitch = absPitch - harpShift + transposeOffset + (testOffset * 12);
                    const tab = harpMap[relPitch.toString()] || "";
                    
                    if (tab === "") {
                        score += 100; 
                    } else {
                        let bends = (tab.match(/'/g) || []).length;
                        let overblows = (tab.match(/o/g) || []).length;
                        score += (bends * 1) + (overblows * 2);
                    }
                });
            });

            if (score < minScore) {
                minScore = score;
                bestOctave = testOffset;
            }
        });

        // Päivitetään globaali muuttuja
        octaveOffset = bestOctave;
    }

    
  
    const harpMap = {
        "-5": "-2", "-4": "-3'''", "-3": "-3''", "-2": "-3'", "-1": "-3",
        "0": "+4", "1": "-4'", "2": "-4", "3": "-4o", "4": "+5", "5": "-5", 
        "6": "+5o", "7": "+6", "8": "-6'", "9": "-6", "10": "-7'", "11": "-7",
        "12": "+7", "13": "-7o", "14": "-8", "15": "+8'", "16": "+8", "17": "-9",
        "18": "+9'", "19": "+9", "20": "-10", "21": "+10''", "22": "+10'", "23": "+10"
    };

    // Moodien "perussävellajit"
    const keyData = {
        'C': { acc: {}, hName: 'C', val: 12 }, 'Am': { acc: {}, hName: 'C', val: 12 },
        'B': { acc: {'F':1, 'C':1, 'G':1, 'D':1, 'A':1}, hName: 'B (H)', val: 11 }, // (B tai H-duuri)
        'G': { acc: {'F':1}, hName: 'G', val: 7 }, 'Em': { acc: {'F':1}, hName: 'G', val: 7 },
        'D': { acc: {'F':1, 'C':1}, hName: 'D', val: 14 }, 'Bm': { acc: {'F':1, 'C':1}, hName: 'D', val: 14 },
        'A': { acc: {'F':1, 'C':1, 'G':1}, hName: 'A', val: 9 }, 'F#m': { acc: {'F':1, 'C':1, 'G':1}, hName: 'A', val: 9 },
        'E': { acc: {'F':1, 'C':1, 'G':1, 'D':1}, hName: 'E', val: 16 }, 'C#m': { acc: {'F':1, 'C':1, 'G':1, 'D':1}, hName: 'E', val: 16 },
        'F': { acc: {'B':-1}, hName: 'F', val: 17 }, 'Dm': { acc: {'B':-1}, hName: 'F', val: 17 },
        'Bb': { acc: {'B':-1, 'E':-1}, hName: 'Bb', val: 10 }, 'Gm': { acc: {'B':-1, 'E':-1}, hName: 'Bb', val: 10 },
        'B': { acc: {'F':1, 'C':1, 'G':1, 'D':1, 'A':1}, hName: 'B', val: 11 }, 
        'Bm': { acc: {'F':1, 'C':1}, hName: 'D', val: 14 }, // H-molli (vastaa D-duuria)
        'Eb': { acc: {'B':-1, 'E':-1, 'A':-1}, hName: 'Eb', val: 15 }
    };

    // Apufunktio moodien muuntamiseen vastaavaksi duuriksi etumerkkien osalta
    function getModeEquivalent(root, mode) {
    root = root.replace('H', 'B'); // Muuttaa H:n B:ksi (esim. Hm -> Bm)
        const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
        let idx = notes.indexOf(root.replace('m', '')); // Poistetaan m-kirjain vertailua varten
        if (idx === -1) return root;

        if (mode.includes("dor")) {
            return notes[(idx - 2 + 12) % 12];
        }
        if (mode.includes("mix")) {
            return notes[(idx - 7 + 12) % 12];
        }
        // Luonnollinen molli (m, min tai jos sävelessä on m-pääte)
        if ((mode.includes("m") && !mode.includes("maj")) || mode === "min" || mode === "minor" || root.endsWith("m")) {
            return notes[(idx + 3) % 12];
        }
        return root;
    }

    function analyzeKey(abcText) {
    
    // Poimitaan biisin nimi (T: -rivi) ja näytetään se
const titleMatch = abcText.match(/^T:\s*(.*)/m);
const titleDisplay = document.getElementById('tuneTitleDisplay');
if (titleDisplay) {
    titleDisplay.innerText = titleMatch ? titleMatch[1].trim() : "";
}

      
        const keyMatch = abcText.match(/^K:\s*([A-G][#b]?)([A-Za-z0-9]*)/m);
        if (!keyMatch) return;

        let root = keyMatch[1].trim();
        let mode = keyMatch[2] ? keyMatch[2].toLowerCase().trim() : "";
        root = root.replace('H', 'B');
        
        // 1. Etsitään etumerkit (accidentals) moodin mukaan
        let equivRoot = getModeEquivalent(root, mode);
        let visualData = keyData[equivRoot] || { acc: {} };
        currentKeyAccidentals = visualData.acc;

        // 2. Lasketaan suositusharppu alkuperäisen juuren mukaan
        // Lasketaan suositusharppu kappaleen sävellajin ja moodin perusteella
        // 2. Lasketaan suositusharppu asemien mukaan
        const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
        let rootIdx = notes.indexOf(root.replace('m', ''));
        if (rootIdx === -1) rootIdx = 0; 

        let targetVal = 0;

        if (mode.includes("mix")) {
            targetVal = (rootIdx - 7 + 12) % 12; // 2. asema (Position 2)
        } 
        else if (mode.includes("dor")) {
            targetVal = (rootIdx - 2 + 12) % 12; // 3. asema (Position 3)
        } 
        // Tarkistetaan m-kirjain vain, jos se ei ole osa "major" tai "maj" sanaa
        else if ((mode.includes("m") && !mode.includes("maj")) || root.endsWith("m") || mode === "minor") {
            targetVal = (rootIdx - 9 + 12) % 12; // 4. asema (Position 4)
        } 
        else {
            // Kaikki muut (Major, Maj, tyhjä mode) menevät 1. asemaan
            targetVal = rootIdx; 
        }

        const options = Array.from(harpKeySelect.options).map(o => ({
            val: parseInt(o.value),
            semitone: parseInt(o.value) % 12
        }));

        let bestOption = options.reduce((prev, curr) => 
            Math.abs(curr.semitone - targetVal) < Math.abs(prev.semitone - targetVal) ? curr : prev
        );

        let closest = bestOption.val;
        
        const optText = Array.from(harpKeySelect.options).find(o => parseInt(o.value) === closest).text;
        let recommendedHarpName = optText.split(' ')[0];

        // ------
    const currentLang = localStorage.getItem('prefLang') || 'fi';
    const t = translations[currentLang];
    
    // -------------
  statusDisplay.innerHTML = `<span>${t.statusKey}: ${root}${mode}</span> &nbsp;&nbsp; <span>${t.statusRec}: ${recommendedHarpName}${t.statusHarpSuffix || ""}</span>`;
     
     // -------------------------------------------------------------
    
        if (abcText !== lastProcessedAbc || !userHasSelectedHarp) {
            harpKeySelect.value = closest;
            lastProcessedAbc = abcText;
            userHasSelectedHarp = false;
        }
    }

    
            function getFinalAbc() {
        let harpShift = parseInt(harpKeySelect.value);
        let finalAbc = "";
        
        // Tallennetaan sävellajin alkuperäiset etumerkit
        const defaultAccidentals = JSON.stringify(currentKeyAccidentals);

        abcInput.value.split('\n').forEach(line => {
            if (line.startsWith('Q:')) return; 
            if (/^[A-Z]:/.test(line) || line.trim() === "") { 
                finalAbc += line + "\n";
                if (line.startsWith('K:')) {
                    finalAbc += `Q:1/4=${tempoRange.value}\n`;
                }
                return; 
            }

            // Nollataan tahdin sisäiset muutokset uuden rivin alussa
            currentKeyAccidentals = JSON.parse(defaultAccidentals);

            let processedLine = line.replace(/([|])|([\^_=]?)([A-Ga-gHh])([,']*)/g, (match, bar, acc, note, octs) => {
                // Jos kyseessä on tahtiviiva, palautetaan sävellajin oletusarvot
                if (bar) {
                    currentKeyAccidentals = JSON.parse(defaultAccidentals);
                    return bar;
                }

                let absPitch = getPitchValue(acc, note, octs);
                
                // Päivitetään tahdin sisäinen muisti, jos nuotissa oli tilapäinen etumerkki
                if (acc) {
                    let nU = note.toUpperCase();
                    if (acc === '^') currentKeyAccidentals[nU] = 1;
                    else if (acc === '_') currentKeyAccidentals[nU] = -1;
                    else if (acc === '=') currentKeyAccidentals[nU] = 0;
                }

                let relPitch = absPitch - harpShift + (octaveOffset * 12);
                const tab = harpMap[relPitch.toString()] || "";
                return (tab ? `"${tab}"` : "") + match;
            });
            finalAbc += processedLine + "\n";
        });

        // Palautetaan lopuksi globaali tila alkuperäiseksi
        currentKeyAccidentals = JSON.parse(defaultAccidentals);
        return finalAbc;
    }


    
        function processAbc() {
    if (!abcInput.value) return;
    
    const isNewSong = (abcInput.value !== lastProcessedAbc);
    analyzeKey(abcInput.value);

    if (isNewSong) {
         autoOptimize();
         lastProcessedAbc = abcInput.value;
    }

    octaveDisplay.innerText = octaveOffset;
    tempoDisplay.innerText = tempoRange.value;
    
    const originalValue = abcInput.value;
    
    // 1. Puhdistetaan syöte (soinnut, kaaret, koristenuotit)
    abcInput.value = originalValue
        .replace(/"[^"]*"/g, "")      
        .replace(/[()]/g, "")         
        .replace(/\{[^}]*\}/g, "");
    
    let originalAbc = getFinalAbc(); 
    abcInput.value = originalValue; 

    // --- TÄSMÄKORJAUS ISLAND OF WOODS -TYYPPISIIN MAALEIHIN ---
    // Poistetaan KAIKKI tyhjä tila ja rivinvaihdot tahtiviivan ja maalin väliltä.
    // Tämä regex puree muotoihin "|[1", ":|[1" ja "|1".
    originalAbc = originalAbc.replace(/([|:][|]?)[\s\n]*(\[?[12])/g, "$1$2");
    
    // 3. Näkymän valinta: Mobiili vs. Työpöytä
    const isMobile = window.innerWidth <= 800;
    const dynamicWidth = (!isMobile) ? 740 : 740;

    // 4. ABC-muotoilu tulostusta ja rivitystä varten
    const abcWithFormatting = `%%abc-2.1
%%pagewidth 21cm
%%leftmargin 1cm
%%rightmargin 1cm
%%barsperstaff 4
%%stretchlast 1
` + originalAbc;
    
    ABCJS.renderAbc("paper", abcWithFormatting, {
        responsive: 'resize',
        staffwidth: dynamicWidth,
        wrap: {
            preferredMeasuresPerLine: 4,
            minSpacing: 1.3, // Lasketaan välistystä, jotta 4 tahtia mahtuu varmasti
            maxSpacing: 2.5
        },
        justified: true,
        visualTranspose: (octaveOffset * 12) + transposeOffset,
        add_classes: true,
        paddingtop: 35, 
        paddingbottom: 30 // Tärkeä tila C, D, E ja F -harpuille [cite: 2026-03-22]
    });
}

  
            function getPitchValue(acc, note, octs) {
        const baseMap = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11, 'H': 11 };
        let nU = note.toUpperCase();
        let v = baseMap[nU];

        if (acc === '^') {
            v += 1; // Ylennys
        } else if (acc === '_') {
            v -= 1; // Alennus
        } else if (acc === '=') {
            // Palautusmerkki: käytetään baseMap-arvoa sellaisenaan (ei lisätä sävellajin etumerkkejä)
        } else if (currentKeyAccidentals[nU]) {
            // Jos ei tilapäistä etumerkkiä, käytetään sävellajin etumerkkiä
            v += currentKeyAccidentals[nU];
        }

        if (note === note.toLowerCase()) v += 12;
        if (octs) {
            for (let c of octs) {
                if (c === ',') v -= 12;
                if (c === "'") v += 12;
            }
        }
        return v;
    }

    // Copyright: Janne Ojajärvi www.huuliharppu.fi
    
    // --- OHJAIMET ---
    document.getElementById('octaveUp').onclick = () => { octaveOffset++; processAbc(); };
    document.getElementById('octaveDown').onclick = () => { octaveOffset--; processAbc(); };
    
    
    tempoRange.oninput = () => { 
        tempoDisplay.innerText = tempoRange.value; 
        processAbc(); 
    };
    
    // Kun käyttäjä vaihtaa harppua itse, asetetaan lippu päälle
    harpKeySelect.onchange = () => { 
        userHasSelectedHarp = true; 
        processAbc(); 
    };

    abcInput.oninput = () => {
        userHasSelectedHarp = false; // Jos tekstiä muokataan käsin, sallitaan taas auto-analyysi
        processAbc();
    };
    
    function countMeasures(abc) {
    // Haetaan vain nuottirivit (ne jotka eivät ala kirjaimella ja kaksoispisteellä)
    const musicLines = abc.split('\n').filter(line => 
        line.trim() !== "" && !/^[A-Z]:/.test(line)
    ).join(' ');
    
    // Lasketaan tahtiviivat, mutta vältetään tuplalaskentaa lopetusmerkeissä || tai |]
    const measures = musicLines.split(/\|+/).length - 1;
    return measures;
}

    // --- ARVONTA ---
    randomBtn.onclick = () => {
    const currentLang = localStorage.getItem('prefLang') || 'fi';
    const t = translations[currentLang];
    const filterMode = document.getElementById('filterSelect').value;

    if (window.harpLibrary.length === 0) {
        statusDisplay.innerText = " ";
        return;
    }

    statusDisplay.innerText = t.msgRandomizing;
    let selected = null;
    let attempts = 0;
    const maxAttempts = 100; // Nostettu yrityskertoja, koska ehto on tiukempi

    while (!selected && attempts < maxAttempts) {
        let tempTune = harpLibrary[Math.floor(Math.random() * harpLibrary.length)];
        
        // --- UUSI EHTO: Tarkistetaan tahtien määrä (vähintään 4) ---
        if (countMeasures(tempTune.abc) < 4) {
            attempts++;
            continue; 
        }

        if (filterMode === "all") {
            selected = tempTune;
        } else {
            // "Ei taivutuksia" -logiikka (sisältää oktaavioptimoinnin testauksen)
            const oldAbc = abcInput.value;
            abcInput.value = tempTune.abc;
                if (typeof analyzeKey === "function") analyzeKey(tempTune.abc);
                if (typeof autoOptimize === "function") autoOptimize();
                
                let hasBends = false;
                let harpShift = parseInt(harpKeySelect.value);
                let currentAbc = abcInput.value; 

                currentAbc.split('\n').forEach(line => {
                    if (/^[A-Z]:/.test(line) || line.trim() === "") return;
                    line.replace(/([\^_=]?)([A-Ga-gHh])([,']*)/g, (match, acc, note, octs) => {
                        let absPitch = getPitchValue(acc, note, octs);
                        let relPitch = absPitch - harpShift + ((window.octaveOffset || 0) * 12);
                        const tab = harpMap[relPitch.toString()] || "";
                        // Jos tabulatuuria ei löydy tai se on bend/overblow
                        if (tab === "" || tab.includes("'") || tab.includes("o")) hasBends = true;
                    });
                });

                if (!hasBends) {
                selected = { abc: currentAbc };
            } else {
                abcInput.value = oldAbc; // Palautetaan jos ei kelvannut
                attempts++;
            }
        }
    }

        if (selected) {
            abcInput.value = selected.abc;
            favoritesSelect.value = ""; // Nollaa suosikkivalikko
            userHasSelectedHarp = false;
            processAbc();
            analyzeKey(selected.abc);
        } else {
            statusDisplay.innerText = t.msgNotFound;
        }
    };

    // --- AUDIO JA TALLENNUS ---
    playBtn.onclick = async () => {
        document.getElementById('audio-interface').style.display = "block";
        const visualObj = ABCJS.renderAbc("paper", getFinalAbc(), { 
            visualTranspose: (octaveOffset * 12) + transposeOffset 
        })[0];

        if (synthControl) { try { await synthControl.pause(); } catch(e) {} }
        synthControl = new ABCJS.synth.SynthController();
        await synthControl.load("#audio-control", null, { displayPlay: true, displayRestart: true });
        await synthControl.setTune(visualObj, false);
        
        const startElem = document.querySelector('.abcjs-midi-start');
        if(startElem) startElem.click();
    };

    stopBtn.onclick = async () => {
        if (synthControl) {
            await synthControl.pause();
            document.getElementById('audio-interface').style.display = "none";
        }
    };
    
    

   // --- 1. SUOSIKKIEN LATAUS ---
function loadFavorites() {
    const favoritesSelect = document.getElementById('favoritesSelect');
    if (!favoritesSelect) return;

    // Haetaan kieli (oletus 'en') ja vastaavat käännökset
    const currentLang = localStorage.getItem('prefLang') || 'en';
    const t = translations[currentLang] || translations['en'];

    favoritesSelect.innerHTML = "";
    
    const defaultOpt = document.createElement('option');
    defaultOpt.value = "";
    defaultOpt.innerText = t.favPlaceholder || "-- Saved Songs --";
    favoritesSelect.appendChild(defaultOpt);

    let favs = {};
    try {
        const stored = localStorage.getItem('harpFavorites');
        const parsed = JSON.parse(stored || '{}');
        // Varmistetaan, että kyseessä on objekti eikä taulukko
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            favs = parsed;
        }
    } catch (e) {
        console.error("Virhe suosikkien latauksessa:", e);
        favs = {};
    }

    // Aakkosjärjestys ja listan rakennus
    Object.keys(favs).sort().forEach(name => {
        if (name) { // Estetään tyhjät rivit
            const opt = document.createElement('option');
            opt.value = name;
            opt.innerText = name;
            favoritesSelect.appendChild(opt);
        }
    });
}

// --- 2. SUOSIKKIEN TALLENNUS ---
document.getElementById('saveFavBtn').onclick = () => {
    if (!abcInput || !abcInput.value) return;

    // Haetaan kappaleen nimi T-kentästä
    const nameMatch = abcInput.value.match(/^T:\s*(.*)/m);
    const name = nameMatch ? nameMatch[1].trim() : "Song " + new Date().toLocaleTimeString();

    let favs = {};
    try {
        const stored = localStorage.getItem('harpFavorites');
        const parsed = JSON.parse(stored || '{}');
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            favs = parsed;
        }
    } catch (e) {
        favs = {};
    }

    // Tallennetaan ABC-koodi (sisältäen mahdolliset harppukohtaiset oktaavimuutokset)
    favs[name] = abcInput.value;
    localStorage.setItem('harpFavorites', JSON.stringify(favs));
    
    loadFavorites();
    
    // Asetetaan juuri tallennettu biisi valituksi
    setTimeout(() => { favoritesSelect.value = name; }, 10);
};

// --- 3. SUOSIKIN VALINTA LISTASTA ---
favoritesSelect.onchange = () => {
    const val = favoritesSelect.value;
    if (!val) return;

    let favs = {};
    try {
        favs = JSON.parse(localStorage.getItem('harpFavorites') || '{}');
    } catch (e) {
        favs = {};
    }

    if (favs[val]) {
        abcInput.value = favs[val];
        
        // Estetään automaattista harpun vaihtoa ylikirjoittamasta ladattua nuottia
        if (typeof userHasSelectedHarp !== 'undefined') {
            userHasSelectedHarp = true; 
        }
        
        // Renderöidään nuotit (processAbc sisältää logiikan harpun vireen näyttämiseen)
        if (typeof processAbc === 'function') {
            processAbc();
        }
    }
};


    // Copyright: Janne Ojajärvi www.huuliharppu.fi
    
    
    document.getElementById('shareAppBtn').addEventListener('click', async () => {
    const t = translations[currentLang];

    const shareData = {
        title: t.shareTitle,
        text: t.shareText,
        url: 'https://codepen.io/Janne-Ojaj-rvi/full/MYjXBLV'
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Share dismissed');
        }
    } else {
        navigator.clipboard.writeText(shareData.url);
        alert(t.shareCopy);
    }
});
    
    
    // --- HAKU  ---
     
      
    document.getElementById('searchBtn').onclick = () => {
        const q = document.getElementById('searchInput').value.toLowerCase();
        const filterMode = document.getElementById('filterSelect').value;
        const resDiv = document.getElementById('searchResults');
        const currentLang = localStorage.getItem('prefLang') || 'fi';
        const t = translations[currentLang];

        if (!q) return;

        resDiv.innerHTML = ""; // Tyhjennetään vanhat tulokset
        resDiv.style.display = "block";
        statusDisplay.innerText = t.msgSearching;

        // 1. Suodatetaan kirjastosta osumat nimen perusteella
        const matches = (window.harpLibrary || []).filter(tune => 
    tune.name.toLowerCase().includes(q)
);

        if (matches.length === 0) {
            resDiv.innerHTML = `<div style="padding:10px;">${t.msgNotFoundSrch || "Ei löytynyt"}</div>`;
            statusDisplay.innerText = t.msgNotFoundSrch || "Ei löytynyt";
            return;
        }

        let foundCount = 0;

        // 2. Käydään läpi osumat ja tarkistetaan suodatus
        matches.forEach(tune => {
            let displayAbc = tune.abc;
            let hasBends = false;

            if (filterMode === "easy") {
                // Testataan optimointia "lennosta"
                const oldAbc = abcInput.value;
                abcInput.value = tune.abc;
                
                if (typeof analyzeKey === "function") analyzeKey(tune.abc);
                if (typeof autoOptimize === "function") autoOptimize();
                
                let optimizedAbc = abcInput.value;
                let harpShift = parseInt(harpKeySelect.value);

                optimizedAbc.split('\n').forEach(line => {
                    if (/^[A-Z]:/.test(line) || line.trim() === "") return;
                    line.replace(/([\^_=]?)([A-Ga-gHh])([,']*)/g, (match, acc, note, octs) => {
                        let absPitch = getPitchValue(acc, note, octs);
                        let relPitch = absPitch - harpShift + ((window.octaveOffset || 0) * 12);
                        const tab = harpMap[relPitch.toString()] || "";
                        if (tab === "" || tab.includes("'") || tab.includes("o")) hasBends = true;
                    });
                });

                abcInput.value = oldAbc; // Palautetaan alkuperäinen teksti
                displayAbc = optimizedAbc; // Jos valitaan, käytetään optimoitua versiota
                favoritesSelect.value = ""; // Nollaa valinnan takaisin placeholderiin
            }

            // Lisätään tulos listaan, jos se läpäisee suodattimen
            if (!hasBends || filterMode === "all") {
                foundCount++;
                const row = document.createElement('div');
                row.className = "search-item";
                row.innerHTML = `🏠 ${hasBends ? "🪗 " : "✅ "} <b>${tune.name}</b>`;
                
                row.onclick = () => {
                    abcInput.value = displayAbc;
                    userHasSelectedHarp = false;
                    processAbc();
                    analyzeKey(displayAbc);
                    resDiv.style.display = "none";
                };
                resDiv.appendChild(row);
            }
        });

        if (foundCount === 0) {
            resDiv.innerHTML = `<div style="padding:10px;">${t.msgNotFound || "Ei sopivia tuloksia"}</div>`;
        }
        
        statusDisplay.innerText = t.msgSearchDone || "Haku valmis";
    };

  
      // --- GENRE-HAKU ---
const fetchAndFilter = (genre) => {
    const filterMode = document.getElementById('filterSelect').value;
    const resDiv = document.getElementById('searchResults');
    const currentLang = localStorage.getItem('prefLang') || 'fi';
    const t = translations[currentLang];

    resDiv.innerHTML = ""; 
    resDiv.style.display = "block";
    statusDisplay.innerText = t.msgSearching;

    // MUUTOS TÄSSÄ: Lisätty window. eteen ja varmistus || []
    const matches = (window.harpLibrary || []).filter(tune => {
        const content = (tune.name + " " + tune.abc).toLowerCase();
         // ERIKOISSÄÄNTÖ VALSSILLE:
if (genre === "Waltz") {
            return content.includes("waltz") || content.includes("vals");
        }
        
        // Muut genret normaalisti:
  return content.includes(genre.toLowerCase());
    });

        if (matches.length === 0) {
            resDiv.innerHTML = `<div style="padding:10px;">${t.msgNotFoundSrch || "Ei löytynyt"}</div>`;
            return;
        }

        let foundCount = 0;

        matches.forEach(tune => {
            let displayAbc = tune.abc;
            let hasBends = false;

            if (filterMode === "easy") {
                const oldAbc = abcInput.value;
                abcInput.value = tune.abc;
                
                if (typeof analyzeKey === "function") analyzeKey(tune.abc);
                if (typeof autoOptimize === "function") autoOptimize();
                
                let optimizedAbc = abcInput.value;
                let harpShift = parseInt(harpKeySelect.value);

                optimizedAbc.split('\n').forEach(line => {
                    if (/^[A-Z]:/.test(line) || line.trim() === "") return;
                    line.replace(/([\^_=]?)([A-Ga-gHh])([,']*)/g, (match, acc, note, octs) => {
                        let absPitch = getPitchValue(acc, note, octs);
                        let relPitch = absPitch - harpShift + (octaveOffset * 12);
                        const tab = harpMap[relPitch.toString()] || "";
                        if (tab === "" || tab.includes("'") || tab.includes("o")) hasBends = true;
                    });
                });

                abcInput.value = oldAbc; 
                displayAbc = optimizedAbc;
                favoritesSelect.value = ""; // Nollaa suosikkivalikko
            }

            if (!hasBends || filterMode === "all") {
                foundCount++;
                const row = document.createElement('div');
                row.className = "search-item";
                row.innerHTML = `🎻 ${hasBends ? "🪗 " : "✅ "} <b>${tune.name}</b>`;
                
                row.onclick = () => {
                    abcInput.value = displayAbc;
                    userHasSelectedHarp = false;
                    processAbc();
                    analyzeKey(displayAbc);
                    resDiv.style.display = "none";
                };
                resDiv.appendChild(row);
            }
        });

        if (foundCount === 0) {
            resDiv.innerHTML = `<div style="padding:10px;">${t.msgNotFound}</div>`;
        }
        statusDisplay.innerText = t.msgSearchDone || "Haku valmis";

// Skrollataan hakutuloksiin automaattisesti, jotta käyttäjä näkee ne heti
resDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

    };

    // Kytketään genre-napit toimintaan
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.onclick = () => fetchAndFilter(btn.getAttribute('data-genre'));
    });

    // --- SUOSIKKIEN POISTO ---
const deleteFavBtn = document.getElementById('deleteFavBtn');
if (deleteFavBtn) {
    deleteFavBtn.onclick = () => {
        const val = favoritesSelect.value;
        // Jos valinta on tyhjä tai oletusteksti (esim. "-- Omat tallennukset --"), lopetetaan
        if (!val || val.startsWith('--')) return;

        const currentLang = localStorage.getItem('prefLang') || 'en'; // Oletus nyt englanti
        const t = translations[currentLang];
        
        if (confirm(`${t.msgDeleteConfirm} "${val}"?`)) {
            // Haetaan data ja varmistetaan, että se on objekti
            let favs = {};
            try {
                const stored = localStorage.getItem('harpFavorites');
                favs = stored ? JSON.parse(stored) : {};
                
                // Jos data sattuisi olemaan taulukko, nollataan se objektiksi virheiden välttämiseksi
                if (Array.isArray(favs)) favs = {}; 
            } catch (e) {
                favs = {};
            }

            // Poistetaan avain
            if (favs.hasOwnProperty(val)) {
                delete favs[val];
                localStorage.setItem('harpFavorites', JSON.stringify(favs));
                
                // Päivitetään käyttöliittymä
                loadFavorites();
                
                // Tyhjennetään tekstialue ja nuotit
                if (typeof abcInput !== 'undefined') abcInput.value = "";
                if (typeof processAbc === 'function') processAbc();
            }
        }
    };
}

    // Copyright: Janne Ojajärvi www.huuliharppu.fi

    // Alustukset latauksen lopuksi
    loadFavorites();
    if (abcInput.value) {
        processAbc();
    } else {
        // Jos kenttä on tyhjä, arvotaan heti ensimmäinen kappale
        randomBtn.click();
    }
}; // window.onload päättyy