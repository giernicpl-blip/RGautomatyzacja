/**
 * DEMO: Automatyczny raport sprzedaży na e-mail (Google Apps Script)
 * ------------------------------------------------------------------
 * Co robi: codziennie rano czyta dane z Arkusza Google i wysyła
 * gotowe podsumowanie sprzedaży na wskazany adres e-mail.
 *
 * JAK URUCHOMIĆ (5 minut):
 * 1. Wgraj plik dane_sprzedaz_demo.csv do Arkuszy Google
 *    (Plik -> Importuj -> Prześlij), nazwij zakładkę "Dane".
 * 2. W arkuszu: Rozszerzenia -> Apps Script, wklej ten kod.
 * 3. Podmień EMAIL_ODBIORCY poniżej na swój adres.
 * 4. Kliknij "Uruchom" przy funkcji wyslijRaport (autoryzuj przy pierwszym razie).
 * 5. Automat: ikona zegara (Wyzwalacze) -> Dodaj wyzwalacz ->
 *    wyslijRaport -> czasowy -> codziennie -> 8:00-9:00.
 *
 * DO NAGRANIA DEMO: uruchom ręcznie, pokaż arkusz z danymi,
 * potem skrzynkę z gotowym raportem. "Przed: 2h klikania. Po: samo przyszło o 8:00."
 */

const EMAIL_ODBIORCY = 'twoj.email@gmail.com'; // <-- PODMIEŃ
const NAZWA_ZAKLADKI = 'Dane';

function wyslijRaport() {
  const arkusz = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NAZWA_ZAKLADKI);
  const dane = arkusz.getDataRange().getValues();
  const naglowki = dane.shift(); // usuń wiersz nagłówków

  // Kolumny wg pliku demo: 0-Data, 2-Kanał, 3-Kategoria, 7-Przychód, 10-Status
  const dzis = new Date();
  const wczoraj = new Date(dzis);
  wczoraj.setDate(dzis.getDate() - 1);

  // W wersji demo raportujemy ostatni dzień, który jest w danych:
  const ostatniaData = dane.reduce((max, w) => {
    const d = new Date(w[0]);
    return d > max ? d : max;
  }, new Date(0));

  const tegoDnia = dane.filter(w =>
    new Date(w[0]).toDateString() === ostatniaData.toDateString() && w[10] === 'Opłacone'
  );

  const przychod = tegoDnia.reduce((s, w) => s + Number(w[7]), 0);
  const liczbaZam = tegoDnia.length;
  const sredni = liczbaZam ? przychod / liczbaZam : 0;

  // Podział na kanały
  const kanaly = {};
  tegoDnia.forEach(w => {
    kanaly[w[2]] = (kanaly[w[2]] || 0) + Number(w[7]);
  });

  // Top 3 kategorie
  const kategorie = {};
  tegoDnia.forEach(w => {
    kategorie[w[3]] = (kategorie[w[3]] || 0) + Number(w[7]);
  });
  const top3 = Object.entries(kategorie)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const dataStr = Utilities.formatDate(ostatniaData, 'Europe/Warsaw', 'dd.MM.yyyy');
  const zl = n => n.toFixed(2).replace('.', ',') + ' zł';

  let tresc = `RAPORT SPRZEDAŻY — ${dataStr}\n`;
  tresc += `${'='.repeat(34)}\n\n`;
  tresc += `Przychód:        ${zl(przychod)}\n`;
  tresc += `Zamówienia:      ${liczbaZam}\n`;
  tresc += `Średni koszyk:   ${zl(sredni)}\n\n`;
  tresc += `KANAŁY:\n`;
  Object.entries(kanaly).forEach(([k, v]) => {
    tresc += `  ${k}: ${zl(v)}\n`;
  });
  tresc += `\nTOP KATEGORIE:\n`;
  top3.forEach(([k, v], i) => {
    tresc += `  ${i + 1}. ${k}: ${zl(v)}\n`;
  });
  tresc += `\n--\nRaport wygenerowany automatycznie.`;

  MailApp.sendEmail({
    to: EMAIL_ODBIORCY,
    subject: `📊 Sprzedaż ${dataStr}: ${zl(przychod)} (${liczbaZam} zam.)`,
    body: tresc
  });
}
