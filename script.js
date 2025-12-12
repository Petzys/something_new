// Array mit 52 wöchentlichen Herausforderungen
const weeklyChallenges = [
    "Probiere einen Tag lang von 15€ zu leben!",
    "Lies ein Buch, was du normalerweise nicht lesen würdest!",
    "Fotografiere 5 Dinge, die du noch nie fotografiert hast!",
    "Lies eine Zeitung, die du normalerweise nicht lesen würdest!",
    "Lobe drei fremde Menschen!",
    "Probiere ein neues Musikinstrument aus!",
    "Backe etwas, das du noch nie gebacken hast!",
    "Mache 5 Liegestütze nachdem jemand deinen Namen sagt!",
    "Schaue dir einen anderen Ort auf der Welt mit Google Street View an!",
    "Schreibe ein Gedicht über deinen Tag!",
    "Schlafe verkehrt herum im Bett!",
    "Iss heute alles sehr langsam und achtsam!",
    "Bringe ungefragt Kuchen zur Arbeit oder zu einer anderen Gruppe von Menschen!",
    "Spiele ein altes Videospiel oder Brettspiel!",
    "Pflanze etwas Neues ein!",
    "Beginne den Tag jodelnd!",
    "Rieche ganz bewusst an etwas, das du normalerweise nicht riechen würdest!",
    "Nimm einen Umweg zur Arbeit!",
    "Lerne einen Zaubertrick und zeige ihn jemandem!",
    "Zeichne etwas mit deiner nicht-dominanten Hand!",
    "Verbringe einen Tag ohne Smartphone!",
    "Sage deinen Liebsten, wie sehr du sie schätzt!",
    "Verwende eine neue Begrüßung jeden Tag (z.B. Grüß Gott, Servus, Moin)!",
    "Lerne einen neuen Tanz oder eine Tanzfigur!",
    "Wirf eine Münze für deine Entscheidungen!",
    "Höre ein Hörbuch in doppelter Geschwindigkeit!",
    "Lerne fünf Wörter in einer neuen Sprache!",
    "Trage Kleidung, die du lang nicht getragen hast!",
    "Lerne etwas Neues über ein völlig unbekanntes Thema (z.B. Programmieren, Astronomie)!",
    "Kreiere ein neues Wort und verwende es den ganzen Tag!",
    "Höre eine Musikrichtung, die du normalerweise nicht magst und versuche, dich darauf einzulassen!",
    "Setze dich in den Park und beobachte die Natur für 10 Minuten ohne Ablenkungen!",
    "Lege dich auf den Boden und beobachte die Decke für 5 Minuten!",
    "Meditiere 10 Minuten an einem ungewöhnlichen Ort!",
    "Rufe einen alten Freund an, mit dem du lange nicht gesprochen hast!",
    "Fange eine richtige Konversation mit einem Fremden an!",
    "Schenke einer fremden Person etwas Kleines!",
    "Trage deine Uhr am anderen Handgelenk!",
    "Mache einen Spaziergang bei Sonnenaufgang oder Sonnenuntergang!",
    "Probiere ein Lebensmittel mal roh (z.B. Kaffeebohne, Kartoffel)!",
    "Iss nur Lebensmittel einer bestimmten Farbe heute!",
    "Stelle deine Möbel in deinem Zimmer um!",
    "Schaue einen Film in einer Sprache, die du nicht verstehst (ohne Untertitel)!",
    "Gib einer fremden Person ein High-Five!",
    "Probiere eine neue Sportart aus!",
    "Fahre anders als sonst zur Arbeit (z.B. mit dem Fahrrad statt dem Auto)!",
    "Frühstücke zum Abendessen und umgekehrt!",
    "Navigiere zu einem unbekannten Ziel ohne technische Hilfsmittel!",
    "Gehe in ein Restaurant und bestelle etwas Zufälliges!",
    "Gehe rückwärts die Treppe hinauf!",
    "Wünsche drei Fremden Personen einen schönen Tag!",
    "Schaue dir Fotos aus deiner Kindheit an!",
];

// Funktion zur Berechnung der aktuellen Woche im Jahr (1-52)
// Verwendet eine einfache Berechnung, die das Jahr in 52 Wochen aufteilt
function getCurrentWeekNumber() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    
    // Berechne die Wochennummer (1-basiert)
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    
    // Stelle sicher, dass die Wochennummer zwischen 1 und 52 liegt
    // Bei Woche 53 wird Woche 52 verwendet (für konsistente 52-Wochen-Challenges)
    return Math.min(Math.max(weekNumber, 1), 52);
}

// Funktion zum Anzeigen der wöchentlichen Herausforderung
function displayWeeklyChallenge() {
    const weekNumber = getCurrentWeekNumber();
    const challengeIndex = weekNumber - 1; // Array ist 0-basiert
    
    // Zeige Wochennummer an mit Fehlerbehandlung
    const weekNumberElement = document.getElementById('weekNumber');
    if (weekNumberElement) {
        weekNumberElement.textContent = weekNumber;
    }
    
    // Zeige die Herausforderung an mit Fehlerbehandlung
    const challengeTextElement = document.getElementById('challengeText');
    if (challengeTextElement && weeklyChallenges[challengeIndex]) {
        challengeTextElement.textContent = weeklyChallenges[challengeIndex];
    } else if (challengeTextElement) {
        challengeTextElement.textContent = 'Keine Herausforderung verfügbar.';
    }
}

// Führe die Funktion aus, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', displayWeeklyChallenge);
