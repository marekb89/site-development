# site-development / Zadanie Opera

1.	Primarne prosim pouzi nasledovne frameworky (nevyhnutny zaklad): http://angularjs.org/, http://getbootstrap.com/, http://angular-ui.github.io/bootstrap/

2.	Stale je potrebne zavolat dummy service. Ak service vrati chybovy status kod, pouzi vlastne data v JSON formate (napevno niekde v kode, ale prehladne). Daj si zalezat aj na navrhu jednotlivych services a na navrhu svojho kodu (modularnost, responsibility, citatelnost, …)

3.	Tabulka v hornom paneli musi byt znovapouzitelna, budeme ju chciet opatovne pouzit na inom mieste.

4.	Lavy panel – zoznam zamestnancov, aktualne zvoleneho zamestnanca je potrebne graficky odlisit. Pri prvom pristupe nie je vybrany ziadny zamestnanec.

5.	Dolny panel – viem ho editovat. Po kliknuti na tlacidlo “Ulozit” sa automaticky zmeni meno a priezvisko v lavom paneli a data sa zapisu do DB (= zavolas service na update). O problemoch a rieseni sa mozeme pobavit pri prezentacii riesenia.

6.	Horne menu – tabulka, bez pouzitia externeho pluginu (!!!):
  
  a.	Stlpec “Cas v praci” je potrebne vypocitat zo stlpcov Prichod a Odchod na UI. Ak fond na dany den je viac ako 4h, od vysledneho casu je potrebne odratat 30 min na obednajsiu prestavku. Tabulka moze obsahovat aj dni s fondom 0 (vikendy, sviatky, je tam 0 a basta, nic viac nechcem), tabulka obsahuje data pre jeden cely mesiac. V skratke a pre zjednodusenie – vyber si oktober 2015 a vrat data na cely mesiac, vikendom daj fond 0h, nejake dni s fondom 8h a nejake dni s fondom mensim ako 4h, …

  b.	Príchod a Odchod je mozne editovat, po editacii sa automaticky prepocitaju suvisiace stlpce. Ak zamestnancovi chyba viac ako 20 percent casu za vsetky predosle dni (oproti fondu), v lavom menu sa zobrazi vykricnik (vedla priezviska).

  c.	Hodnota v stlpci “Nadriadeny” je link, po kliknuti na hodnotu v stlpci “Nadriadeny” sa automaticky zobrazia data pre zvoleneho zamestnanca. Nie kazdy zamestnanec ma nadriadeneho.

  d.	Horny riadok tabulky sluzi na filtrovanie nad stlpcom. Priklad: Ak napisem do stlpca Nadriadeny string “s”, vyfiltruje mi vsetky zaznamy obsahujuce string “s”. Ak dalej napisem do pola Odchod cislo 15, vyberie mi vsetky zaznamy obsahujuce cislo 15. Ak napisem “s” do stlpca Nadriadeny a cislo 15 do stlpca Odchod, vyberie mi prienik vysledkov oboch filtrov.

  e.	Stlpec “Cas v praci” obsahuje aj graficky indikator – viac alebo presne 8 h – zeleny kruzok, menej ako 8 h – cerveny kruzok, nezaznaceny odchod alebo prichod – oranžový kruzok.

  f.	V pripade, ze tabulka obsahuje viac riadkov a stlpcov ako viem zobrazit, v tabulke viem scrollovat horizontalne aj vertikalne.

7.	Bonus uloha: Stranka ma 3 panely, vieme menit velkost jednotlivych panelov a obsah panelov sa prisposobuje aktualnej velkosti.

![app image](https://github.com/marekb89/site-development/blob/master/uloha.png)
