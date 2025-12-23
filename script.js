var haslo = "";
var haslo1 = "";
var dlugosc = 0;
var litery = [];
var miss = 0;
var no = new Audio("no.wav");
var yes = new Audio("yes.wav");
var lost = new Audio("Lost.wav");
var win = new Audio("Win.wav");
var musik = new Audio("Musik.mp3");
musik.loop=true;
var miut = 0;

// Tablica z hasłami do losowania
const hasla = [
  "kraj","zegarek","warunek","ser","drink","pokazać","sznurek","kosz","chmura","zamówienie",
  "rowery","gardło","port","konie","zawody","kalkulator","tendencja","z przodu","worek","konto",
  "kreda","warzywo","ciekły","przyjaciele","napędowy","wosk","latawiec","ściana","hak","kwarc",
  "tata","następstwa","strach","hamulec","pywać","moc","napoje gazowane","dziadek","psy","piec",
  "rolka","sypialnia","aktywność","huśtawka","nauka","choroba","króliki","armia","pomidory","serce",
  "zdrowie","komfort","kochanie","widelec","język","tarcie","szacunek","rynek","yam","błąd",
  "mięsień","zep hyr","krawędź","zmiana","doświadczenie","lekki","broda","sklep","przyjemność","gęś",
  "pociągi","hałas","igła","zdarzenie","zwierzak","kreatura","wybór","ciągnąć","bracia","dodatek",
  "węgiel","mięso","handel","mapa","słuch","śruba","podróż","słoma","krzywa","wózek",
  "ziarno","gałązka","edukacja","pszczoa","cyna","próba","dług","początek","śmierć","zasięg"
];

// Litery polskiego alfabetu
litery = [
  "A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J",
  "K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś",
  "T","U","V","W","X","Y","Z","Ż","Ź"
];
function umute(){
  if (miut == 0){
    musik.play()
    document.getElementById("mut").innerText= "🔊";
    miut=1;
  }
  else{
    musik.pause()
    document.getElementById("mut").innerText= "🔇";
    miut=0;
  }
}
// Funkcja losująca hasło
function losujHaslo() {
  const los = Math.floor(Math.random() * hasla.length);
  ok(hasla[los]);
  alert("Wylosowane hasło zapisane! Kliknij GRAJ, aby rozpocząć.");
}

// Funkcja wypisująca aktualny stan hasła
function wyp_haslo() {
  document.getElementById("plansza").innerHTML = haslo1;
}

// Funkcja OK – zapisanie hasła
function ok(a) {
  if(a===undefined) {
    haslo = document.getElementById("txt").value.toUpperCase();
  } else {
    haslo = a.toUpperCase();
  }

  if (haslo.length === 0) {
    alert("Wpisz hasło!");
    return;
  }

  document.getElementById("txt").value = "";
  yes.play();
  alert("Hasło zapisane! Kliknij GRAJ, aby rozpocząć.");
}

// Funkcja restart – start gry
function restart() {
  if (haslo.length === 0) {
    alert("Najpierw wpisz hasło i kliknij OK lub Losowe Hasło!");
    return;
  }

  document.getElementById("menu").style.display = "none";
  document.getElementById("pojemnik").style.display = "block";

  haslo1 = "";
  miss = 0;
  dlugosc = haslo.length;

  for (let i = 0; i < dlugosc; i++) {
    haslo1 += (haslo.charAt(i) === " ") ? " " : "-";
  }

  document.getElementById("szubienica").innerHTML = '<img src="s0.jpg" alt="szubienica">';
  wyp_haslo();
  start();
}

// Funkcja tworząca alfabet
function start() {
  var trescdiv = "";
  for (let i = 0; i < litery.length; i++) {
    var emelent = "lit" + i;
    trescdiv += '<div class="litera" id="' + emelent + '" onclick="sprawdz(' + i + ')">' + litery[i] + '</div>';
    if ((i + 1) % 7 == 0) trescdiv += '<div style="clear:both;"></div>';
  }
  document.getElementById("alfabet").innerHTML = trescdiv;

  String.prototype.ustawZnak = function (miejsce, znak) {
    if (miejsce > this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
  };
}

// Funkcja sprawdzająca literę
function sprawdz(nr) {
  var trafiona = false;
  for (let i = 0; i < dlugosc; i++) {
    if (haslo.charAt(i) === litery[nr]) {
      haslo1 = haslo1.ustawZnak(i, litery[nr]);
      trafiona = true;
    }
  }

  var emelent = "lit" + nr;
  document.getElementById(emelent).style.cursor = "default";

  if (trafiona) {
    yes.play();
    document.getElementById(emelent).style.background = "#003300";
    document.getElementById(emelent).style.color = "#00C000";
    document.getElementById(emelent).style.border = "3px solid #00C000";
  } else {
    no.play();
    document.getElementById(emelent).style.background = "#330000";
    document.getElementById(emelent).style.color = "#C00000";
    document.getElementById(emelent).style.border = "3px solid #C00000";
    document.getElementById(emelent).setAttribute("onclick", ";");
    miss++;
    var obraz = "s" + miss + ".jpg";
    document.getElementById("szubienica").innerHTML = '<img src="' + obraz + '" alt="szubienica">';
  }

  wyp_haslo();

  // Wygrana
  if (haslo === haslo1) {
    win.play()
    document.getElementById("alfabet").innerHTML =
      "🎉 Wygrana! 🎉<br>Hasło: " + haslo +
      '<br><br><span class="reset" onclick="window.location.reload()">Jeszcze raz</span>';
  }

  // Przegrana
  if (miss === 9) {
    lost.play()
    document.getElementById("alfabet").innerHTML =
      "💀 Przegrana! 💀<br>Hasło: " + haslo +
      '<br><br><span class="reset" onclick="window.location.reload()">Spróbuj ponownie</span>';
  }
}
