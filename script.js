// Array mit 52 wöchentlichen Herausforderungen
const weeklyChallenges = [
    "Schlafe verkehrt herum im Bett!",
    "Lobe drei fremde Menschen!",
    "Trage heute nur bunte Socken!",
    "Sprich den ganzen Tag in Reimen!",
    "Probiere ein neues Rezept aus einem anderen Land!",
    "Gehe rückwärts die Treppe hinauf!",
    "Schreibe einen Brief an dein zukünftiges Ich!",
    "Trinke deinen Kaffee oder Tee aus einer anderen Tasse!",
    "Nimm einen anderen Weg zur Arbeit oder Schule!",
    "Höre eine Musikrichtung, die du normalerweise nicht magst!",
    "Frühstücke zum Abendessen und umgekehrt!",
    "Lerne fünf Wörter in einer neuen Sprache!",
    "Rufe einen alten Freund an, mit dem du lange nicht gesprochen hast!",
    "Zeichne etwas mit deiner nicht-dominanten Hand!",
    "Trage deine Uhr am anderen Handgelenk!",
    "Probiere eine neue Sportart aus!",
    "Stelle deine Möbel in deinem Zimmer um!",
    "Esse mit Stäbchen, egal was es ist!",
    "Lese ein Buch rückwärts (vom Ende zum Anfang)!",
    "Beginne den Tag mit einer kalten Dusche!",
    "Schenke jemandem ein selbstgemachtes Geschenk!",
    "Gehe in ein Restaurant und bestelle etwas Zufälliges!",
    "Tausche für einen Tag die Aufgaben mit jemandem!",
    "Schreibe nur mit Emojis für einen Tag!",
    "Verbringe einen Tag ohne soziale Medien!",
    "Lerne einen neuen Tanz oder eine Tanzfigur!",
    "Pflanze etwas Neues ein!",
    "Fotografiere 10 Dinge, die du noch nie fotografiert hast!",
    "Meditiere 10 Minuten an einem ungewöhnlichen Ort!",
    "Trage heute etwas komplett in deiner Nicht-Lieblingsfarbe!",
    "Backe etwas, das du noch nie gebacken hast!",
    "Schreibe ein Gedicht über deinen Tag!",
    "Höre ein Hörbuch in doppelter Geschwindigkeit!",
    "Mache 10 Fremden ein Kompliment!",
    "Beginne den Tag mit Yoga oder Stretching!",
    "Esse nur Lebensmittel einer bestimmten Farbe heute!",
    "Lerne einen Zaubertrick und zeige ihn jemandem!",
    "Räume einen Bereich auf, den du schon lange aufschiebst!",
    "Gehe in einen Laden und probiere nur Dinge mit geschlossenen Augen!",
    "Schreibe mit deiner linken Hand (oder rechts, wenn du Linkshänder bist)!",
    "Schaue einen Film in einer Sprache, die du nicht verstehst (ohne Untertitel)!",
    "Trage heute überall ein Lächeln zur Schau!",
    "Spiele ein altes Videospiel oder Brettspiel!",
    "Versuche eine neue Atemtechnik!",
    "Mache einen Spaziergang bei Sonnenaufgang oder Sonnenuntergang!",
    "Kreiere ein neues Wort und verwende es den ganzen Tag!",
    "Esse heute alles sehr langsam und achtsam!",
    "Trage deine Kleidung in einer ungewöhnlichen Kombination!",
    "Lerne die Namen von 5 Pflanzen oder Bäumen in deiner Umgebung!",
    "Verbringe eine Stunde ohne Technologie!",
    "Schreibe eine Liste mit 100 Dingen, für die du dankbar bist!",
    "Probiere eine neue Art zu kommunizieren (z.B. nur durch Gesten)!"
];

// Funktion zur Berechnung der aktuellen Woche im Jahr (1-52)
function getCurrentWeekNumber() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    
    // Stelle sicher, dass die Wochennummer zwischen 1 und 52 liegt
    return Math.min(Math.max(weekNumber, 1), 52);
}

// Funktion zum Anzeigen der wöchentlichen Herausforderung
function displayWeeklyChallenge() {
    const weekNumber = getCurrentWeekNumber();
    const challengeIndex = weekNumber - 1; // Array ist 0-basiert
    
    // Zeige Wochennummer an
    document.getElementById('weekNumber').textContent = weekNumber;
    
    // Zeige die Herausforderung an
    const challengeText = weeklyChallenges[challengeIndex];
    document.getElementById('challengeText').textContent = challengeText;
}

// Führe die Funktion aus, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', displayWeeklyChallenge);
