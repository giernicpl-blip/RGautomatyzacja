# RGAutomatyzacja

Automatyzacje dla małych firm — raporty, dane i powiadomienia, które robią się same.

**Strona:** https://giernicpl-blip.github.io/RGautomatyzacja/index.html
**Demo dashboardu:** https://giernicpl-blip.github.io/RGautomatyzacja/dashboard.html
**Kontakt:** giernicpl@gmail.com

## Co robię

Zamieniam powtarzalną, ręczną pracę biurową w automaty. Na co dzień jestem automatykiem przemysłowym — programuję sterowniki PLC, roboty i systemy monitoringu produkcji. Tę samą niezawodność przenoszę do automatyzacji dla małych firm: raportowanie, przepływ danych, dashboardy, powiadomienia.

Buduję na narzędziach, które klient już ma (Gmail, Arkusze Google, sklep internetowy), więc rozwiązania nie wymagają żadnych płatnych licencji.

## Zawartość repozytorium

| Plik | Opis |
|---|---|
| `index.html` | Strona ofertowa — pakiety usług, przykłady automatyzacji, kontakt |
| `dashboard.html` | Interaktywny dashboard sprzedaży (demo) — czysty HTML/JS/SVG, zero zależności, działa offline |
| `dane_sprzedaz_demo.csv` | Syntetyczne dane sprzedażowe (1464 zamówienia, 6 miesięcy, 2 kanały) użyte w demo |
| `demo_raport_email.gs` | Google Apps Script: automatyczny dzienny raport sprzedaży wysyłany e-mailem |

## Demo: panel sprzedaży

Dashboard prezentuje dane fikcyjnego sklepu internetowego (styczeń–czerwiec 2026):

- KPI: przychód, liczba zamówień, średni koszyk
- trend przychodu tygodniowo
- udział kanałów sprzedaży (sklep www / Allegro)
- top 5 produktów

Filtry kanału i zakresu miesięcy przeliczają wszystkie widoki na żywo. Całość napisana bez bibliotek zewnętrznych — wykresy generowane czystym SVG — dzięki czemu plik działa w każdej przeglądarce, także bez dostępu do internetu.

## Demo: automatyczny raport e-mail

Skrypt Google Apps Script czyta dane sprzedażowe z Arkusza Google i codziennie o wskazanej godzinie wysyła gotowe podsumowanie: przychód dnia, liczbę zamówień, średni koszyk, podział na kanały i top kategorie. Instrukcja uruchomienia znajduje się w komentarzu na początku pliku `demo_raport_email.gs`.

## Stack technologiczny

Python · Google Apps Script · JavaScript · HTML/CSS/SVG · Arkusze Google · a po stronie przemysłowej: PLC, roboty przemysłowe, systemy wizyjne i komunikacja TCP/IP.

## Współpraca

Płatność i faktura przez Useme — bez ryzyka, rozliczenie po odbiorze. Szczegóły pakietów i cennik na [stronie ofertowej](https://TWOJA-NAZWA.github.io/NAZWA-REPO/).

---

*Dane w demo są w całości syntetyczne i nie dotyczą żadnej istniejącej firmy.*
