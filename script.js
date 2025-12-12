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

const pathPrefix = '/something_new/';

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

// Service Worker registrieren
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(pathPrefix + 'sw.js')
            .then((registration) => {
                console.log('Service Worker registriert:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker Registrierung fehlgeschlagen:', error);
            });
    });
}

// Funktion zum Abrufen der aktuellen wöchentlichen Challenge
function getCurrentChallenge() {
    const weekNumber = getCurrentWeekNumber();
    const challengeIndex = weekNumber - 1;
    return {
        weekNumber: weekNumber,
        challenge: weeklyChallenges[challengeIndex] || 'Keine Herausforderung verfügbar.'
    };
}

// Funktion zum Planen wöchentlicher Benachrichtigungen
function scheduleWeeklyNotification() {
    if (!('Notification' in window)) {
        console.log('Browser unterstützt keine Benachrichtigungen');
        return;
    }

    if (Notification.permission !== 'granted') {
        console.log('Keine Berechtigung für Benachrichtigungen');
        return;
    }

    // Berechne Zeit bis zum nächsten Montag 8:00 Uhr
    const now = new Date();
    const nextMonday = new Date(now);
    
    // Setze auf nächsten Montag (Montag = 1, Sonntag = 0)
    const currentDay = now.getDay();
    const daysUntilMonday = currentDay === 0 ? 1 : (8 - currentDay) % 7;
    nextMonday.setDate(now.getDate() + (daysUntilMonday === 0 ? 7 : daysUntilMonday));
    nextMonday.setHours(8, 0, 0, 0);
    
    const timeUntilMonday = nextMonday - now;
    
    // Speichere die Benachrichtigungszeit
    localStorage.setItem('nextNotificationTime', nextMonday.toISOString());
    
    console.log('Nächste Benachrichtigung geplant für:', nextMonday.toLocaleString('de-DE'));
    
    // Hinweis: setTimeout funktioniert nur solange die Seite geöffnet ist
    // Für persistente Benachrichtigungen wäre ein Backend mit Push API erforderlich
    // Setze Timeout für die nächste Benachrichtigung
    setTimeout(() => {
        showWeeklyNotification();
        // Plane die nächste Benachrichtigung (in einer Woche)
        scheduleWeeklyNotification();
    }, timeUntilMonday);
}

// Funktion zum Anzeigen der wöchentlichen Benachrichtigung
function showWeeklyNotification() {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return;
    }

    const { weekNumber, challenge } = getCurrentChallenge();
    
    // Verwende Service Worker für Benachrichtigungen, falls verfügbar
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('🫎 Neue wöchentliche Challenge!', {
                body: `Woche ${weekNumber}: ${challenge}`,
                icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23667eea'/><text y='.9em' font-size='90' x='50%' text-anchor='middle'>🫎</text></svg>",
                badge: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23667eea'/><text y='.9em' font-size='90' x='50%' text-anchor='middle'>🫎</text></svg>",
                vibrate: [200, 100, 200],
                tag: 'weekly-challenge-' + weekNumber,
                requireInteraction: false,
                data: {
                    url: window.location.origin
                }
            });
        });
    } else {
        // Fallback für normale Benachrichtigungen
        new Notification('🫎 Neue wöchentliche Challenge!', {
            body: `Woche ${weekNumber}: ${challenge}`,
            icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23667eea'/><text y='.9em' font-size='90' x='50%' text-anchor='middle'>🫎</text></svg>",
            tag: 'weekly-challenge-' + weekNumber
        });
    }
}

// Funktion zum Aktualisieren des Benachrichtigungsbuttons
function updateNotificationButton() {
    const button = document.getElementById('notificationButton');
    const info = document.getElementById('notificationInfo');
    
    if (!button) return;
    
    if (!('Notification' in window)) {
        button.textContent = '🔕 Benachrichtigungen nicht verfügbar';
        button.disabled = true;
        button.classList.add('denied');
        info.textContent = 'Dein Browser unterstützt keine Benachrichtigungen.';
        return;
    }
    
    if (Notification.permission === 'granted') {
        button.textContent = '✅ Benachrichtigungen aktiviert';
        button.classList.add('granted');
        button.disabled = true;
        
        const nextNotification = localStorage.getItem('nextNotificationTime');
        if (nextNotification) {
            const date = new Date(nextNotification);
            info.textContent = `Nächste Benachrichtigung: ${date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
        } else {
            info.textContent = 'Du erhältst jeden Montag um 8:00 Uhr eine neue Challenge!';
        }
    } else if (Notification.permission === 'denied') {
        button.textContent = '🔕 Benachrichtigungen blockiert';
        button.classList.add('denied');
        button.disabled = true;
        info.textContent = 'Benachrichtigungen wurden blockiert. Bitte erlaube sie in deinen Browser-Einstellungen.';
    } else {
        button.textContent = '🔔 Benachrichtigungen aktivieren';
        button.disabled = false;
    }
}

// Benachrichtigungsbutton Event-Handler
function handleNotificationButton() {
    const button = document.getElementById('notificationButton');
    
    if (!button) return;
    
    button.addEventListener('click', async () => {
        if (!('Notification' in window)) {
            alert('Dein Browser unterstützt keine Benachrichtigungen.');
            return;
        }
        
        try {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                console.log('Benachrichtigungsberechtigung erteilt');
                updateNotificationButton();
                scheduleWeeklyNotification();
                
                // Zeige sofort eine Test-Benachrichtigung
                showWeeklyNotification();
            } else {
                console.log('Benachrichtigungsberechtigung verweigert');
                updateNotificationButton();
            }
        } catch (error) {
            console.error('Fehler beim Anfordern der Benachrichtigungsberechtigung:', error);
        }
    });
}

// Führe die Funktionen aus, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    displayWeeklyChallenge();
    updateNotificationButton();
    handleNotificationButton();
    
    // Wenn bereits Berechtigung vorhanden, plane Benachrichtigungen
    if ('Notification' in window && Notification.permission === 'granted') {
        scheduleWeeklyNotification();
    }
});
